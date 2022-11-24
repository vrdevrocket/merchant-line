import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getInfo, selectAuth, setFirstTimeUser, setLoading } from "@redux";
import {
    FormHeader,
    StyledCancelButton,
    StyledSubmitButton,
    // StyledCard,
    LineNew,
    FBNew,
    GoogleNew,
    PhoneNew,
    SignUpMethod,
} from "@components";
import { useFormik } from "formik";
import { showErrorMessage, theme, useNotify } from "@utils";
import { useHistory } from "react-router";
import { new_account_step, enumStatus, PATH_PREPARING_ACCOUNT, PATH_HOME } from "@configs";
import { Skeleton, Switch } from "antd";
import { enumSignUpMethods } from "@configs";
import { merchantAPI } from "@api";
import { ISignupMethod } from "@interfaces";
interface ICustomerMethod {
    LINEOA: boolean;
    FACEBOOK: boolean;
    GOOGLE: boolean;
    EMAIL: boolean;
    TEL: boolean;
}
const initFormikVal: ISignupMethod = {
    fields: [],
    turnOn: false,
    welcomeScreenImages: [],
    welcomeScreenStatus: enumStatus.INACTIVE,
    signUpMethods: [enumSignUpMethods.LINEOA],
};
export const CreateSignupMethod = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const plan = useSelector(selectAuth).plan;
    const signUpSettings = useSelector(selectAuth).userInfo?.merchant.signUpSettings;
    const { success, error, warning } = useNotify();
    const dispatch = useDispatch();
    const multiSignUp = (plan && plan.multiSignUp) || false;

    const checkMultiSignup = () => {
        if (!multiSignUp) warning(t("message.feature_not_available"));
    };
    const [signUpMethodItem, setSignUpMethodItem] = useState<ICustomerMethod>({
        LINEOA: true,
        FACEBOOK: false,
        GOOGLE: false,
        EMAIL: false,
        TEL: false,
    });
    useEffect(() => {
        dispatch(setLoading(true));
        if (signUpSettings) {
            setValues(signUpSettings);
            // if (signUpSettings.fields) setIndexFieldItem(signUpSettings.fields.length);
            setSignUpMethodItem((prev) => ({
                ...prev,
                FACEBOOK: signUpSettings.signUpMethods.includes(enumSignUpMethods.FACEBOOK),
                EMAIL: signUpSettings.signUpMethods.includes(enumSignUpMethods.EMAIL),
                TEL: signUpSettings.signUpMethods.includes(enumSignUpMethods.TEL),
                LINEOA: signUpSettings.signUpMethods.includes(enumSignUpMethods.LINEOA),
                GOOGLE: signUpSettings.signUpMethods.includes(enumSignUpMethods.GOOGLE),
            }));
            dispatch(setLoading(false));
        }
    }, [signUpSettings]);

    const handleSignUPMethod = (e: boolean, type: enumSignUpMethods) => {
        switch (type) {
            case enumSignUpMethods.EMAIL: {
                setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: !e }));
                break;
            }
            case enumSignUpMethods.TEL: {
                setSignUpMethodItem((prev) => ({ ...prev, TEL: e, EMAIL: !e }));
                break;
            }
            case enumSignUpMethods.GOOGLE: {
                if (
                    !e &&
                    !signUpMethodItem.TEL &&
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.FACEBOOK &&
                    !signUpMethodItem.LINEOA
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, GOOGLE: e, LINEOA: true }));
                } else setSignUpMethodItem((prev) => ({ ...prev, GOOGLE: e }));
                break;
            }
            case enumSignUpMethods.LINEOA: {
                if (
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.FACEBOOK &&
                    !signUpMethodItem.GOOGLE &&
                    !signUpMethodItem.TEL
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, LINEOA: true }));
                } else {
                    setSignUpMethodItem((prev) => ({ ...prev, LINEOA: e }));
                }
                break;
            }
            case enumSignUpMethods.FACEBOOK: {
                if (
                    !e &&
                    !signUpMethodItem.TEL &&
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.GOOGLE &&
                    !signUpMethodItem.LINEOA
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, FACEBOOK: e, LINEOA: true }));
                } else setSignUpMethodItem((prev) => ({ ...prev, FACEBOOK: e }));
                break;
            }
            default:
                break;
        }
    };
    const sendSubmit = async () => {
        dispatch(setLoading(true));
        try {
            const arr = [
                ...(Object.keys(signUpMethodItem).filter((key) => {
                    if (signUpMethodItem[key]) return key;
                }) as enumSignUpMethods[]),
            ];
            // return console.log(arr);
            await merchantAPI.updateSignUpMethod({ ...values, signUpMethods: arr });
            dispatch(getInfo());
            success(t("message.update.success"));
            history.push(PATH_PREPARING_ACCOUNT);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const switchPhoneMail = (e: boolean) => {
        if (e) {
            setSignUpMethodItem((prev) => ({ ...prev, TEL: e }));
        } else {
            if (!signUpMethodItem.FACEBOOK && !signUpMethodItem.GOOGLE)
                setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: e, LINEOA: true }));
            else setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: e }));
        }
    };
    // formik
    const { values, handleSubmit, setValues } = useFormik({
        initialValues: initFormikVal,
        onSubmit: sendSubmit,
    });
    const gotoFullMode = () => {
        dispatch(setFirstTimeUser(true));
        history.push(PATH_HOME);
    };
    return (
        <StyledLayout>
            <div className="form-wrap">
                <div className="flex-layout">
                    <div className="left">
                        <FormHeader current={3} stepLen={new_account_step} />
                        <form onSubmit={handleSubmit}>
                            <div className="page-header">
                                <h3>{t("page.new_account.signup_method_title")}</h3>
                            </div>
                            <div className="card-wrap">
                                <fieldset disabled={!multiSignUp} onClick={checkMultiSignup}>
                                    <Skeleton
                                        active
                                        className="skeleton"
                                        loading={false}
                                        paragraph={{ rows: 4 }}
                                    >
                                        <StyledNewCard>
                                            {/* <h4>{t("page.customer_sign_up_method")}</h4> */}
                                            <div className="switch-field label">
                                                <p>
                                                    <LineNew />
                                                    <span>{t("page.LINEOA_chat")}</span>
                                                </p>

                                                <Switch
                                                    disabled={!plan?.multiSignUp}
                                                    checked={signUpMethodItem.LINEOA}
                                                    onChange={(e) =>
                                                        handleSignUPMethod(
                                                            e,
                                                            enumSignUpMethods.LINEOA
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className=" switch-field label">
                                                <p>
                                                    <FBNew />
                                                    <span>{t("page.facebook")}</span>
                                                </p>

                                                <Switch
                                                    disabled={!plan?.multiSignUp}
                                                    checked={signUpMethodItem.FACEBOOK}
                                                    onChange={(e) =>
                                                        handleSignUPMethod(
                                                            e,
                                                            enumSignUpMethods.FACEBOOK
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className=" switch-field label">
                                                <p>
                                                    <GoogleNew />
                                                    <span>{t("page.google")}</span>
                                                </p>

                                                <Switch
                                                    disabled={!plan?.multiSignUp}
                                                    checked={signUpMethodItem.GOOGLE}
                                                    onChange={(e) =>
                                                        handleSignUPMethod(
                                                            e,
                                                            enumSignUpMethods.GOOGLE
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className=" switch-field label flex-wrap">
                                                <p>
                                                    <PhoneNew />
                                                    <span>{t("page.telephone")}</span>
                                                </p>

                                                <Switch
                                                    disabled={!plan?.multiSignUp}
                                                    onChange={switchPhoneMail}
                                                    checked={signUpMethodItem.TEL}
                                                />
                                            </div>
                                        </StyledNewCard>
                                    </Skeleton>
                                </fieldset>
                            </div>
                            <div className="btn-layout">
                                <StyledCancelButton
                                    type="sub"
                                    text={t("page.new_account.full_mode")}
                                    htmlType="button"
                                    onClick={gotoFullMode}
                                    className="btn-full-mode"
                                />
                                <div>
                                    <StyledSubmitButton
                                        type="default"
                                        text={t("page.continue")}
                                        htmlType="submit"
                                        className="btn-continue"
                                        // disable={isSubmitting}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <div>
                            <SignUpMethod />
                            {/* <img src="/images/newUser/signup-method.png" /> */}
                        </div>
                        <div>
                            <h4>{t("page.new_account.signup_method")}</h4>
                            <p>{t("page.new_account.signup_des")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    .page-header {
        h3 {
            font-style: normal;
            font-weight: 700;
            font-size: 35px;
            line-height: 48px;
            color: #000000;
            margin-top: 48px;
            margin-bottom: 30px;
        }
    }
    .flex-layout {
        display: flex;
        align-items: center;
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            flex-direction: column;
            align-items: unset;
        }
        .left {
            flex: 3;
            margin-right: 40px;
            a {
                text-decoration: none;
                color: ${theme.colors.main};
                align-items: center;
            }
        }
        .right {
            flex: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 40px;
            text-align: center;
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 35px;
                line-height: 48px;
                color: #23262f;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #777e91;
            }
            img {
                width: 439px;
                height: 360px;
            }
        }
    }
    .card-wrap {
        margin-bottom: 20px;
        .title {
            margin: 10px;
        }
    }
    .btn-layout {
        display: flex;
        justify-content: space-between;

        .btn-later {
            margin-right: 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
        }
        .btn-full-mode {
            border: 0;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
        }
        .btn-continue {
            font-weight: bold;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            border: 1px solid #0263e0;
            margin-right: 0;
        }
    }
    .switch-field {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 24px;
        align-items: center;
        p {
            margin: 0;
        }
        span {
            margin-left: 15px;
            font-size: 16px;
            color: ${(p) => p.theme.colors.fadedColor};
        }
        .turn-on {
            font-weight: 500;
            color: black;
        }
    }
`;
export const StyledNewCard = styled.div`
    padding: 3.5rem 0;
    border-radius: 4px;
    background-color: white;
    max-width: 760px;
    .devider {
        padding-top: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            display: none;
        }
    }
    .title {
        font-weight: bold;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
        }
        span {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
    h3 {
        font-weight: 600;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
    }
    .fit-content {
        width: 320px;
        min-width: fit-content;
        &:hover .line {
            visibility: visible;
        }
    }
    .label {
        margin-bottom: 20px;
        padding-left: 20px;
        padding-right: 20px;
        p {
            font-weight: 600;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .line {
            height: 1px;
            width: calc(100% - 30px);
            background-color: ${(p) => p.theme.colors.fadedText};
            visibility: hidden;
        }
        .title {
            font-size: 12px;
            color: ${(p) => p.theme.colors.fadedText};
            margin-bottom: 5px;
            font-weight: 900;
            text-transform: uppercase;
        }
        .content {
            font-size: 16px;
            color: black;
        }
        .input-change-name {
            &:hover .icon-edit-name {
                visibility: visible;
            }
            .icon-edit-name {
                visibility: hidden;
                cursor: pointer;
                padding: 8px;
            }
            width: 100%;
            input {
                font-weight: 600;
                padding-left: 0;
                border: none;
                font-size: 16px;
                color: black;
                /* color: ${(p) => p.theme.colors.fadedText}; */
                &:focus,
                :active,
                :focus-visible {
                    border: none !important;
                    border-width: 0 !important;
                }
            }
        }
    }
    .button-field {
        display: flex;
    }
    .current-tags {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`;
