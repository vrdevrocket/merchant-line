import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { FormHeader, StyledSubmitButton, StyledCancelButton, SharedInput } from "@components";
import { useHistory } from "react-router";
import { line_step, PATH_HOME, PATH_LINE_LOGIN_SETTING, ROCKET_CALENDLY } from "@configs";
import { useTranslation } from "react-i18next";
import { theme } from "@utils";
import { URL_INTEGRATION_SETTING } from "@configs";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setEditLineToken, setFirstTimeUser } from "@redux";
enum enumInputName {
    webhookURL = "webhookURL",
    callbackURL = "callbackURL",
    lineURL = "lineURL",
    liffURL = "liffURL",
    init = "",
}

export const LineMessaging = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [lineAccessToken, setLineAccessToken] = useState("");
    const handleChangeToken = (e) => {
        setLineAccessToken(e.target.value);
    };
    const initIntegration = useSelector(selectAuth).userInfo?.merchant?.lineIntegration;

    // useEffect(() => {
    //     dispatch(setLoading(true));
    //     setTimeout(() => {
    //         dispatch(setLoading(false));
    //     }, 1000);
    // });
    const handleGoNext = () => {
        dispatch(setEditLineToken(lineAccessToken));
        history.push(PATH_LINE_LOGIN_SETTING);
    };
    const handleGoFullMode = () => {
        dispatch(setFirstTimeUser(true));
        history.push(PATH_HOME);
    };
    const handleNext = () => {
        history.push(PATH_LINE_LOGIN_SETTING);
    };
    const handleContactMessage = () => {
        window.open(ROCKET_CALENDLY);
    };
    return (
        <StyledLayout>
            <div className="form-wrap">
                <div className="flex-layout">
                    <div className="left">
                        <FormHeader current={0} stepLen={line_step} />
                        <div className="page-header">
                            <h3>{t("page.new_account.line_massage")}</h3>
                        </div>
                        <div className="label">
                            <p className="title">{t("page.Webhook_URL")}</p>
                            <div className="input-field">
                                <SharedInput
                                    name={enumInputName.webhookURL}
                                    value={URL_INTEGRATION_SETTING.webHookURL}
                                    parentClassName="input-w-70"
                                    disable={true}
                                />
                            </div>
                        </div>
                        <div className="label">
                            <p className="title">{t("page.channel_access_token_long_live")}</p>
                            <div className="">
                                <Input.TextArea
                                    name="lineMessaging.accessToken"
                                    className={"input-w-70"}
                                    onChange={handleChangeToken}
                                    autosize={{ minRows: 4, maxRows: 10 }}
                                    value={
                                        lineAccessToken
                                            ? lineAccessToken
                                            : initIntegration?.lineMessaging.accessToken
                                    }
                                />
                            </div>
                        </div>
                        <div className="btn-layout">
                            <StyledCancelButton
                                type="sub"
                                text={t("page.new_account.full_mode")}
                                htmlType="button"
                                className="btn-full-mode"
                                onClick={handleGoFullMode}
                            />
                            <div className="">
                                <StyledCancelButton
                                    type="sub"
                                    text={t("page.new_account.do_later")}
                                    htmlType="button"
                                    className="btn-later"
                                    onClick={handleNext}
                                />
                                <StyledSubmitButton
                                    type="default"
                                    text={t("page.continue")}
                                    onClick={handleGoNext}
                                    className="btn-continue"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="img-des">
                            <img src="/images/newUser/line-message.png" />
                            <div className="title">
                                <p>{t("page.new_account.need_help")}</p>
                            </div>
                            <Button className="download-btn" onClick={handleContactMessage}>
                                {t("page.new_account.book_appoinment")}
                            </Button>
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
        align-items: flex-start;
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
            align-items: center;
            flex-direction: column;
            margin: 0;
            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                flex-direction: column;
                align-items: unset;
            }
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
                width: auto;
                height: auto;
            }
            .img-des {
                position: relative;
                margin-top: 64px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .title {
                    p {
                        font-weight: 700;
                        font-size: 35px;
                        line-height: 55px;
                        text-align: center;
                        color: #0263e0;
                        margin-bottom: 0;
                    }
                    margin-bottom: 32px;
                }
                .download-btn {
                    width: 230px;
                    height: 49px;
                    background: #ffffff;
                    border: 1px solid #646464;
                    border-radius: 4px;
                    font-weight: bold;
                    color: #646464;
                    &:hover {
                        color: #646464;
                        background: rgb(247 247 247);
                        border: 1px solid #646464;
                    }
                }
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
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
        .btn-later {
            margin-right: 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
            border: 0;
        }
        .btn-full-mode {
            border: 0;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
            padding: 0;
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
`;
