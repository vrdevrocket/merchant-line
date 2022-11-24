import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { logout } from "@redux";
import {
    CheckingEmail,
    // SharedSocialLine,
    SharedSocialLineNew,
    StyledExternalAuth,
    SwitchLang,
} from "@components";
import { resetTimeResendEmail, selectTimeResendEmail, setTimeResendEmail } from "@redux";
import { ModuleLine, ModuleGoogle, ModuleFaceBookMobile } from "@modules";
import { authApi } from "@api";
import { showErrorMessage, useNotify } from "@utils";
import { IExternalAuthState } from "@interfaces";
import { enumExternalAuthType } from "@configs";

const state: IExternalAuthState = {
    type: enumExternalAuthType.LOGIN,
};

export const PageVerifyEmail = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    //redux state
    const timeSendEmail = useSelector(selectTimeResendEmail).time;
    //page variable
    const { email } = useParams<{ email: string }>();
    let time = timeSendEmail;

    useEffect(() => {
        if (typeof timeSendEmail === "number" && typeof time === "number") {
            const id = setInterval(() => {
                dispatch(setTimeResendEmail(time));
                time = +time - 1;
                if (time <= 0) {
                    clearInterval(id);
                    dispatch(resetTimeResendEmail());
                }
            }, 1000);
        }
        return () => {
            dispatch(resetTimeResendEmail());
        };
    }, []);
    const errorHandler = (err: any) => {
        //handle Error
        if (err.response) {
            const { status, data } = err.response;
            if (status === 401) {
                error(data?.message);
            } else if (status === 500) {
                error(dispatch(data?.message));
            } else if (data?.message) {
                error(dispatch(data?.message));
            } else {
                error(t("page.login_failed"));
            }
        } else {
            error(t("page.login_failed"));
        }
        dispatch(logout());
    };

    const reSendEmailRecover = async () => {
        try {
            //WHAT : call api sign up
            if (typeof timeSendEmail === "number") return;
            const values = email;
            const res = await authApi.reSendEmail(values);
            if (res.status === 200) {
                success(t("message.email_send"));
                let timeSend = 60;
                const id = setInterval(() => {
                    dispatch(setTimeResendEmail(timeSend));
                    timeSend = timeSend - 1;
                    if (timeSend <= 0) {
                        clearInterval(id);
                        dispatch(resetTimeResendEmail());
                    }
                }, 1000);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };
    return (
        <StyledLayout>
            <StyledContainer>
                <div className="lang-change-layout">
                    <SwitchLang />
                </div>
                <div className="email-layout">
                    <div className="checking-mail-icon">
                        <CheckingEmail />
                    </div>
                    <div className="title">{t("page.text_verify_email")}</div>
                    <div className="sub-desc">
                        {t("page.sub_desc")}
                        <span className="value">{email}</span>
                        {t("page.sub_desc_text")}
                    </div>
                    <div className="desc">
                        {t("page.desc_verify_email")}{" "}
                        <span onClick={reSendEmailRecover}> {timeSendEmail}</span>
                    </div>
                </div>
                <SharedSocialLineNew />
                <div>
                    <h3 className="login-title">{t("page.log_in")}</h3>
                    <StyledExternalAuth>
                        <ModuleLine state={state} />
                        <ModuleFaceBookMobile errorHandler={errorHandler} state={state} />
                        <ModuleGoogle errorHandler={errorHandler} state={state} />
                    </StyledExternalAuth>
                </div>
            </StyledContainer>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const StyledContainer = styled.div`
    background: #ffffff;
    text-align: center;
    max-width: 80vw;
    margin: auto;

    .lang-change-layout {
        position: absolute;
        top: 38px;
        right: 38px;
    }
    .email-layout {
        padding: 40px;
        padding-bottom: 0;
        .checking-mail-icon {
            margin: 32px;
            svg {
                height: 138px;
            }
        }
    }
    .login-title {
        margin: 24px 0;
    }
    .login {
        margin: 30px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin: 25px;
        }
    }
    .main-color {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        color: #a5a5a5;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 18px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 16px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin: 12px 0;
        }
    }
    .title {
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: 48px;
        color: #000000;
        margin-top: 24px;
        margin-bottom: 8px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 50px;
            line-height: 60px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 45px;
            line-height: 50px;
        }
    }
    .sub-desc {
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #a5a5a5;
        margin-bottom: 32px;
        .value {
            font-size: 16px;
            line-height: 22px;
            color: #5c5b5b;
            font-weight: bold;
        }
    }
    .desc {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
        span {
            color: #f22f46;
            cursor: pointer;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 18px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 16px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        max-width: 100%;
        padding: 16px;
        margin: unset;
        height: 100%;
        .lang-change-layout {
            margin-bottom: 32px;
            top: 32px;
            right: 32px;
        }
        .email-layout {
            padding: 0;
            margin-top: 64px;
            .checking-mail-icon {
                margin: 0;
                svg {
                    width: 95.98px;
                    height: 84px;
                }
            }
            .title {
                font-weight: 700;
                font-size: 26px;
                line-height: 35px;
                text-align: center;
            }
            .sub-desc {
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                text-align: center;
                color: #a5a5a5;
            }
            .desc {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                text-align: center;
                color: #000000;
            }
        }
        .login-title {
            font-weight: 700;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
        }
    }
`;
