import { useTranslation } from "react-i18next";
import { Form, Spin } from "antd";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    SharedSocialLine,
    SharedInput,
    StyledLogin,
    IconLoadingPage,
    AuthButton,
    SwitchLang,
    PreviewArrowRight,
    MessageQuote,
    MessageLeftArrow,
} from "@components";
import { ILineLogin, ILogin, IMessageError, ILineState, ILineSignup } from "@interfaces";
import {
    enumExternalAuthType,
    enumExternalMethod,
    LINE_AUTH_URL,
    PATH_ACCOUNTS,
    PATH_CREATE_BUSINESS,
    PATH_FORGOT_PASSWORD,
    PATH_SIGN_UP,
} from "@configs";
import { lineLogin, lineSignup, login, logout, selectAuth, setRemember } from "@redux";
import { LineApi } from "@api";
import { ModuleExternalLogin } from "@modules";
import { showErrorMessage, theme, useNotify } from "@utils";

const initialData: ILogin = {
    email: process.env.EMAIL_USER || "",
    password: process.env.PASSWORD || "",
};

export const PageLogin = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    //redux state
    const { isRemember, line, externalLogin } = useSelector(selectAuth);
    // state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //page variable
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.email"),
                })
            )
            .email(t("validation.email_invalid"))
            .max(
                255,
                t("validation.max_length", {
                    returnObjects: true,
                    name: t("page.email"),
                })
            ),
        password: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.password"),
                })
            )
            .min(
                6,
                t("validation.min", {
                    returnObjects: true,
                    name: t("page.password"),
                    number: 6,
                })
            ),
    });

    useEffect(() => {
        if (externalLogin === enumExternalMethod.LINE) {
            externalLine();
        }
    }, []);

    const handleMoveForgotPassword = useCallback(() => {
        history.push(PATH_FORGOT_PASSWORD);
    }, []);

    const handleChangeRemember = useCallback(() => {
        dispatch(setRemember(!isRemember));
    }, [isRemember]);

    const handleLogin = async (
        values: ILogin,
        { setSubmitting, setErrors }: FormikHelpers<ILogin>
    ) => {
        setIsLoading(true);
        try {
            //WHAT: CALL API LOGIN
            const res = await dispatch(login(values));
            //WHAT: wrap function in create async thunk
            //@ts-ignore
            unwrapResult(res);

            success(t("page.login_successfully"));
            history.push(PATH_ACCOUNTS);
            //@ts-ignore
            if (res.data.x_token) {
                success(t("page.login_successfully"));
                history.push(PATH_ACCOUNTS);
            } else {
                error(t("page.email_password_correct"));
            }
            //@ts-ignore
            if (!res.payload.x_token) {
                error(t("page.email_password_correct"));
            } else {
                success(t("page.login_successfully"));
            }
        } catch (err: any) {
            const { status, data } = err.response;
            if (status === 400) {
                let errorsEmail: string[] = [];
                let errorsPassword: string[] = [];
                const message: IMessageError[] = data?.message;
                message.forEach((item) => {
                    if (item.property === "email") {
                        errorsEmail = Object.keys(item.constraints);
                        if (errorsEmail.length >= 1) {
                            setErrors({
                                email: item.constraints[errorsEmail[0]],
                            });
                            dispatch(error(item.constraints[errorsEmail[0]]));
                        }
                    }
                    if (item.property === "password") {
                        errorsPassword = Object.keys(item.constraints);
                        if (errorsPassword.length >= 1) {
                            setErrors({
                                email: item.constraints[errorsPassword[0]],
                            });
                            error(item.constraints[errorsPassword[0]]);
                        }
                    }
                });
                setErrors({ email: data?.message });
            } else if (status === 401) {
                error(showErrorMessage(err.response));
            } else if (status === 500) {
                error(showErrorMessage(err.response));
            } else if (data?.message) {
                error(showErrorMessage(err.response));
            } else {
                // error(t("page.login_failed"));
            }
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    const externalLine = async () => {
        const lineLoginApi = LineApi(LINE_AUTH_URL);
        try {
            if (line?.code) {
                const lineState = JSON.parse(line?.state) as ILineState;
                if (lineState.type === enumExternalAuthType.LOGIN) {
                    const lineAccessToken = await lineLoginApi.login(line?.code);
                    if (!lineAccessToken.data) {
                        dispatch(logout());
                    }
                    const lineLoginData: ILineLogin = {
                        token: lineAccessToken.data.access_token,
                        refreshToken: lineAccessToken.data.refresh_token,
                        tokenId: lineAccessToken.data.id_token,
                    };
                    const res = await dispatch(lineLogin(lineLoginData));
                    //WHAT: wrap function in create async thunk
                    //@ts-ignore
                    unwrapResult(res);

                    success(t("page.login_successfully"));
                    history.push(PATH_ACCOUNTS);
                    //@ts-ignore
                    if (res.data.x_token) {
                        success(t("page.login_successfully"));
                        history.push(PATH_ACCOUNTS);
                    } else {
                        error(t("page.email_password_correct"));
                    }
                } else if (lineState.type === enumExternalAuthType.SIGNUP) {
                    const lineAccessToken = await lineLoginApi.login(line?.code);
                    if (!lineAccessToken.data) {
                        dispatch(logout());
                    }

                    const lineSignupData: ILineSignup = {
                        token: lineAccessToken.data.access_token,
                        refreshToken: lineAccessToken.data.refresh_token,
                        tokenId: lineAccessToken.data.id_token,
                        inviteId: lineState?.inviteId,
                    };

                    const res = await dispatch(lineSignup(lineSignupData)); // 400
                    //WHAT: wrap function in create async thunk
                    //@ts-ignore
                    unwrapResult(res);
                    success(t("page.login_successfully"));
                    history.push(PATH_CREATE_BUSINESS);
                    //@ts-ignore
                    if (res.payload.accessToken) {
                        success(t("page.login_successfully"));
                        history.push(PATH_CREATE_BUSINESS);
                    } else {
                        error(t("page.email_password_correct"));
                    }
                    //@ts-ignore
                    // if (!res.data.x_token) {
                    //     error(t("page.email_password_correct"));
                    // } else {
                    //     success(t("page.login_successfully"));
                    // }
                } else {
                    dispatch(logout());
                }
            } else {
                dispatch(logout());
            }
        } catch (err) {
            errorHandler(err);
        }
    };

    const errorHandler = (err: any) => {
        //handle Error
        if (err.response) {
            const { status } = err.response;
            if (status === 200 || status === 201) {
                success(t("page.login_successfully"));
            } else {
                error(showErrorMessage(err.response)); // 500 400
            }
        }
    };
    // formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: initialData,
            validationSchema: loginSchema,
            onSubmit: handleLogin,
        });

    return (
        <>
            <Spin
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                spinning={isLoading}
                size="large"
                indicator={<IconLoadingPage />}
            >
                <StyledLogin>
                    <StyledLeftLogin>
                        <div className="support-image">
                            <div style={{ position: "relative" }}>
                                <div className="submit-arrow">
                                    <PreviewArrowRight />
                                </div>
                                <div className="support-message">
                                    <div className="message-body">
                                        <p>{t("page.support_message")}</p>
                                        <div className="msg-quote">
                                            <MessageQuote />
                                        </div>
                                    </div>
                                    <div className="arrow-layout">
                                        <div className="arrow">
                                            <MessageLeftArrow />
                                        </div>
                                    </div>
                                    <div className="message-footer">
                                        <p>{t("page.director_name")}</p>
                                        <img src="/images/newUser/msg-logo.png" />
                                    </div>
                                </div>
                            </div>
                            <img
                                className="supporter-image"
                                src="/images/newUser/asian_woman.png"
                                alt="rocket guide supporter"
                            />
                        </div>
                    </StyledLeftLogin>
                    <div className="login-layout">
                        <div className="lang-layout">
                            <SwitchLang />
                        </div>
                        <ModuleExternalLogin />
                        <SharedSocialLine />
                        <form onSubmit={handleSubmit}>
                            <Form.Item colon={false} label={t("page.email")} className="main-color">
                                <SharedInput
                                    name="email"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
                                    value={values.email}
                                    onBlur={handleBlur}
                                    errors={errors.email}
                                    touched={touched.email}
                                />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label={t("page.password")}
                                className="main-color"
                            >
                                <SharedInput
                                    name="password"
                                    style={{ width: "100%" }}
                                    type="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    onBlur={handleBlur}
                                    errors={errors.password}
                                    touched={touched.password}
                                />
                            </Form.Item>
                            <div className="flex-layout">
                                <div className="remember">
                                    <input
                                        style={{
                                            height: "initial",
                                            marginRight: "8px",
                                            position: "relative",
                                            top: "2px",
                                        }}
                                        // checked={remember}
                                        onClick={handleChangeRemember}
                                        type="checkbox"
                                        id="remember"
                                    />
                                    <label className="label__remember" htmlFor="remember">
                                        {t("page.remember_me")}
                                    </label>
                                </div>
                                <div className="forgot">
                                    {t("page.forgot")}
                                    <span onClick={handleMoveForgotPassword}>
                                        {t("page.password")}?
                                    </span>
                                </div>
                            </div>
                            <AuthButton
                                type="primary"
                                size="large"
                                text={t("page.login")}
                                htmlType="submit"
                                disable={isSubmitting}
                            />
                        </form>

                        <div className="create">
                            <span className="need-account">{t("page.need_account")}</span>
                            <Link to={PATH_SIGN_UP}>{t("page.free_sign_up")}</Link>
                        </div>
                    </div>
                </StyledLogin>
            </Spin>
        </>
    );
};
const StyledLeftLogin = styled.div`
    flex: 3;
    background: ${theme.colors.main};
    height: 100vh;
    position: relative;
    background-image: url("images/newUser/background-circle.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
        position: unset;
        width: 100%;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        display: none;
    }
    .support-image {
        position: absolute;
        bottom: 0;
        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            .supporter-image {
                width: 590px;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakLarge}) {
            .supporter-image {
                width: 560px;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            height: 700px;
            width: auto;
            position: relative;
            .supporter-image {
                position: absolute;
                bottom: 0;
            }
        }
    }
    .submit-arrow {
        position: absolute;
        bottom: -370px;
        right: -128px;
    }
    .support-message {
        position: absolute;
        max-width: 417px;
        right: -244px;
        border-radius: 20px;
        top: -233px;
        box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            position: absolute;
            max-width: 360px;
            right: -137px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            position: absolute;
            max-width: 360px;
            right: 220px;
            border-radius: 20px;
            top: 68px;
        }
        p {
            margin: 0;
        }
        .message-body {
            padding: 26px;
            background: #fff;
            border-top-left-radius: 26px;
            border-top-right-radius: 26px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                padding: 18px;
            }
            p {
                font-weight: 800;
                font-size: 20px;
                line-height: 27px;
                color: #000000;
                @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                    font-size: 18px;
                }
            }
            .msg-quote {
                display: flex;
                flex-direction: row-reverse;
            }
        }
        .arrow-layout {
            position: relative;
            .arrow {
                position: absolute;
                left: -30px;
                bottom: 10px;
            }
        }
        .message-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 26px;
            background: #ffd9de;
            border-bottom-right-radius: 18px;
            border-bottom-left-radius: 18px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                padding: 18px;
            }
            p {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #000000;
                max-width: 137px;
            }
        }
    }
`;
