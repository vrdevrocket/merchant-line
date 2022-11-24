import { Form, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useHistory, useParams } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
    CreatePasswordSvg,
    ShareButton,
    SharedInput,
    StyledCreatePassword,
    SwitchLang,
} from "@components";
import { INitCreatePassword } from "@interfaces";
import { authApi } from "@api";
import { setAuth } from "@redux";
import { enumValidation, PATH_LOGIN, PATH_CREATE_BUSINESS } from "@configs";
import { showErrorMessage, useNotify } from "@utils";
// import { authApi } from "@api";

export const PageCreatePassword = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { success, error } = useNotify();
    const { resetPasswordId } = useParams<{ resetPasswordId: string }>();
    //page state
    const [toggleLoading, setToggleLoading] = useState<boolean>(false);
    //page variable
    const data: INitCreatePassword = {
        name: "",
        password: "",
        confirmPassword: "",
    };

    const href = window.location.href;
    const url = new URL(href);
    const email = url.searchParams.get("email");
    const createPasswordSchema = Yup.object().shape({
        // name: Yup.string()
        //     .required(
        //         t("validation.required", {
        //             returnObjects: true,
        //             name: t("page.name"),
        //         })
        //     )
        //     .max(
        //         255,
        //         t("validation.max_length", {
        //             returnObjects: true,
        //             name: t("page.name"),
        //         })
        //     ),
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
            )
            .max(
                enumValidation.MAX_PASSWORD,
                t("validation.max_length_number", {
                    returnObjects: true,
                    name: t("page.password"),
                    number: enumValidation.MAX_PASSWORD,
                })
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], t("validation.password_must_match"))
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.confirm_password"),
                })
            ),
    });

    const handleCreatePassword = async (
        values: INitCreatePassword,
        { setSubmitting }: FormikHelpers<INitCreatePassword>
    ) => {
        try {
            //WHAT : call api create password
            setToggleLoading(true);
            const res = await authApi.createPassword({
                fullName: values.name || "Loyalty Merchant",
                password: values.password,
                resetPasswordId: resetPasswordId,
            });
            if (res.data) {
                dispatch(setAuth(res.data));
                success(t("page.create_account_successfully"));
                history.push(PATH_CREATE_BUSINESS);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.create_account_fail"));
        } finally {
            setSubmitting(false);
            setToggleLoading(false);
        }
    };

    const handleMoveLogin = () => {
        //
        history.push(PATH_LOGIN);
    };
    //formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: data,
            validationSchema: createPasswordSchema,
            onSubmit: handleCreatePassword,
        });
    return (
        <Spin spinning={toggleLoading} size="large">
            <StyledLayout>
                <div className="lang-switch">
                    <SwitchLang />
                </div>
                <StyledContainer>
                    <StyledCreatePassword>
                        <div className="password-icon-layout">
                            <CreatePasswordSvg />
                        </div>
                        <div className="title_welcome main-color">{t("page.welcome_to_Admin")}</div>
                        <div className="signing">
                            {t("page.you_are_signing")} <span className="email">{email}</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {/* <Form.Item
                                colon={false}
                                label={t("page.what_is_your_name")}
                                className="main-color"
                            >
                                <SharedInput
                                    name="name"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
                                    value={values.name || ""}
                                    onBlur={handleBlur}
                                    errors={errors.name}
                                    touched={touched.name}
                                />
                            </Form.Item> */}
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
                            <Form.Item
                                colon={false}
                                label={t("page.confirm_password")}
                                className="main-color"
                            >
                                <SharedInput
                                    name="confirmPassword"
                                    style={{ width: "100%" }}
                                    type="password"
                                    onChange={handleChange}
                                    value={values.confirmPassword}
                                    onBlur={handleBlur}
                                    errors={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                />
                            </Form.Item>
                            <div className="btn-layout">
                                <ShareButton
                                    type="primary"
                                    size="large"
                                    text={t("page.continue")}
                                    htmlType="submit"
                                    disable={isSubmitting}
                                    className="btn-text"
                                />
                            </div>
                            <div className="login_instead">
                                <span style={{ cursor: "pointer" }} onClick={handleMoveLogin}>
                                    {t("page.login")}
                                </span>{" "}
                                {/* <span className="instead">{t("page.instead")}</span> */}
                            </div>
                        </form>
                    </StyledCreatePassword>
                </StyledContainer>
            </StyledLayout>
        </Spin>
    );
};
const StyledLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
    align-items: end;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        display: unset;
    }
    .lang-switch {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 30px;
        margin-right: 30px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin: 0;
        }
    }
`;
const StyledContainer = styled.div`
    background: #f7f7f8;
    text-align: center;
    max-width: 80vw;
    margin: auto;
    .err-input {
    }
    .err-text {
        font-weight: 500;
        color: ${(p) => p.theme.colors.danger};
        font-size: 12px;
    }
    .invalid-input {
        border-color: ${(p) => p.theme.colors.danger}!important;
        &:focus-within {
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
    .valid-input {
    }
    .ant-form-item-control {
        line-height: 1.5 !important;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
        max-width: 100%;
        padding: 16px;
        margin: unset;
        height: 100%;
        padding: 0;
        margin-top: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
`;
