import React, { useState, useRef, useEffect } from "react";
import { merchantAPI } from "@api";
import styled from "styled-components";
import { Divider, Input, Tooltip, Switch, Button } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
    // IconClipPath,
    FormHeader,
    StyledSubmitButton,
    StyledCancelButton,
    SharedInput,
    MailBox,
    TransparentClipPath,
} from "@components";
import { IIntegration } from "@interfaces";
import { useHistory } from "react-router";
import { line_step, PATH_HOME } from "@configs";
import { useTranslation } from "react-i18next";
import { showErrorMessage, theme } from "@utils";
import { useYup } from "@validations";
import { URL_INTEGRATION_SETTING, ROCKET_CALENDLY } from "@configs";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, getInfo, setLoading, setFirstTimeUser } from "@redux";
import { useNotify } from "@utils";
enum enumInputName {
    webhookURL = "webhookURL",
    callbackURL = "callbackURL",
    lineURL = "lineURL",
    liffURL = "liffURL",
    init = "",
}
const InitFormikVal: IIntegration = {
    lineMessaging: {
        accessToken: "",
    },
    lineLoginApi: {
        channelID: "",
        channelSecret: "",
        liffUrl: "",
        getEmail: false,
    },
};
export const LineLoginSetting = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [isCopy, setIsCopy] = useState<{ status: boolean; typeInput: enumInputName }>({
        status: false,
        typeInput: enumInputName.init,
    });
    const dispatch = useDispatch();
    const { YupIntegration } = useYup();
    const { success, error } = useNotify();
    const formRef = useRef(null);
    const initIntegration = useSelector(selectAuth).userInfo?.merchant?.lineIntegration;
    const { editLineToken } = useSelector(selectAuth);
    const copyClipBoard = async (url: enumInputName) => {
        const form = formRef.current;
        if (form) {
            //@ts-ignore
            //WHY: ref type any
            await navigator.clipboard.writeText(form[url].value);
            setIsCopy({ status: true, typeInput: url });
            setTimeout(() => setIsCopy({ ...isCopy, status: false }), 5000);
        }
    };
    const handleGoNext = () => {
        history.push(PATH_HOME);
    };

    useEffect(() => {
        dispatch(setLoading(true));

        if (initIntegration) {
            setFieldValue("lineMessaging.accessToken", initIntegration.lineMessaging.accessToken);
            setFieldValue("lineLoginApi.channelID", initIntegration.lineLoginApi.channelID);
            setFieldValue("lineLoginApi.channelSecret", initIntegration.lineLoginApi.channelSecret);
            setFieldValue("lineLoginApi.getEmail", initIntegration.lineLoginApi.getEmail);
            setFieldValue("lineLoginApi.liffUrl", initIntegration.lineLoginApi.liffUrl);
        }
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    }, [initIntegration]);
    const sendSubmit = async () => {
        dispatch(setLoading(true));
        try {
            await merchantAPI.updateLINEconfig({
                ...values,
                ...{
                    lineMessaging: {
                        accessToken: editLineToken, // add prev page edited line access token;
                    },
                },
            });
            success(t("message.update.success"));
            dispatch(setFirstTimeUser(true));
            handleGoNext();
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        } finally {
            dispatch(getInfo());
            dispatch(setLoading(false));
        }
    };
    const integrationSchema = Yup.object().shape(YupIntegration);
    const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: InitFormikVal,
            validateOnChange: true,
            validationSchema: integrationSchema,
            onSubmit: sendSubmit,
        });
    const handleChangeSwitch = (e: boolean) => {
        setFieldValue("lineLoginApi.getEmail", e);
    };
    const handleContactMessage = () => {
        window.open(ROCKET_CALENDLY);
    };
    return (
        <StyledLayout>
            <div className="form-wrap">
                <div className="flex-layout">
                    <div className="left">
                        <FormHeader current={1} stepLen={line_step} />
                        <div className="page-header">
                            {/* <h3>{t("page.new_account.line_massage")}</h3> */}
                            <h3>{t("page.LINE_login_API")}</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="label">
                                <div className="label">
                                    <p className="title">{t("page.channel_ID")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            parentClassName="input-w-70"
                                            name="lineLoginApi.channelID"
                                            value={values.lineLoginApi.channelID}
                                            touched={touched.lineLoginApi?.channelID}
                                            errors={errors.lineLoginApi?.channelID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.channel_Secret")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            parentClassName="input-w-70"
                                            name="lineLoginApi.channelSecret"
                                            value={values.lineLoginApi.channelSecret}
                                            touched={touched.lineLoginApi?.channelSecret}
                                            errors={errors.lineLoginApi?.channelSecret}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.callback_URL")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            value={URL_INTEGRATION_SETTING.callbackURL}
                                            parentClassName="input-w-70"
                                            disable={true}
                                            name={enumInputName.callbackURL}
                                        />
                                        <Tooltip
                                            title={
                                                isCopy.status &&
                                                isCopy.typeInput === enumInputName.callbackURL
                                                    ? t("message.copied")
                                                    : t("message.copy")
                                            }
                                        >
                                            <div
                                                className="clip-path"
                                                onClick={() =>
                                                    copyClipBoard(enumInputName.callbackURL)
                                                }
                                            >
                                                <TransparentClipPath />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <Divider />
                                <div className="switch-field">
                                    <div className="mail-box">
                                        <MailBox />
                                    </div>
                                    <div>
                                        <span className="switch-label">
                                            {t("page.get_email_addresses_of_LINE_friends")}
                                        </span>
                                        <Switch
                                            onChange={handleChangeSwitch}
                                            checked={values.lineLoginApi.getEmail}
                                        />
                                    </div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.LINE_login_Sample_page")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            value={URL_INTEGRATION_SETTING.LINELoginURL}
                                            parentClassName="input-w-70"
                                            disable={true}
                                            name={enumInputName.lineURL}
                                        />
                                        <Tooltip
                                            title={
                                                isCopy.status &&
                                                isCopy.typeInput === enumInputName.lineURL
                                                    ? t("message.copied")
                                                    : t("message.copy")
                                            }
                                        >
                                            <div
                                                className="clip-path"
                                                onClick={() => copyClipBoard(enumInputName.lineURL)}
                                            >
                                                <TransparentClipPath />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.LIFF_Endpoint_URL")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            value={URL_INTEGRATION_SETTING.LIFFEndPointURL}
                                            parentClassName="input-w-70"
                                            disable={true}
                                            name={enumInputName.liffURL}
                                        />
                                        <Tooltip
                                            title={
                                                isCopy.status &&
                                                isCopy.typeInput === enumInputName.liffURL
                                                    ? t("message.copied")
                                                    : t("message.copy")
                                            }
                                        >
                                            <div
                                                className="clip-path"
                                                onClick={() => copyClipBoard(enumInputName.liffURL)}
                                            >
                                                <TransparentClipPath />
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.LIFF_URL")}</p>
                                    <div className="input-field">
                                        <SharedInput
                                            parentClassName="input-w-70"
                                            name="lineLoginApi.liffUrl"
                                            value={values.lineLoginApi.liffUrl}
                                            touched={touched.lineLoginApi?.liffUrl}
                                            errors={errors.lineLoginApi?.liffUrl}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="label">
                                <p className="title">{t("page.channel_access_token_long_live")}</p>
                                <div className="">
                                    <Input.TextArea
                                        name="lineMessaging.accessToken"
                                        className={"input-w-70"}
                                        autosize={{ minRows: 4, maxRows: 10 }}
                                        value={initIntegration?.lineMessaging.accessToken}
                                    />
                                </div>
                            </div>
                            <div className="btn-layout">
                                <StyledCancelButton
                                    type="sub"
                                    text={t("page.new_account.full_mode")}
                                    htmlType="button"
                                    className="btn-full-mode"
                                    onClick={handleGoNext}
                                />
                                <div className="">
                                    <StyledSubmitButton
                                        type="default"
                                        text={t("page.continue")}
                                        htmlType="submit"
                                        className="btn-continue"
                                        // onClick={handleGoNext}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="right">
                        <div className="img-des">
                            <img src="/images/newUser/line-message.png" />
                            <div className="title">
                                <p>{t("page.new_account.need_help")}</p>
                            </div>
                            <Button className="download-btn" onClick={handleContactMessage}>
                                {t("page.new_account.download")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    .ant-input-disabled {
        border-color: #f5f5f5 !important;
    }
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
            flex: 1;
            margin-right: 40px;
            margin-bottom: 40px;
            a {
                text-decoration: none;
                color: ${theme.colors.main};
                align-items: center;
            }
        }
        .right {
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                img {
                    margin-bottom: 14px;
                }
            }
            @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                flex-direction: column;
                align-items: unset;
            }
            h4 {
                font-style: normal;
                font-weight: 600;
                font-size: 35px;
                line-height: 48px;
                color: #000000;
            }
            .small-header {
                font-size: 25px;
                font-weight: 700;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #777e91;
            }
            /* img {
                width: 335px;
                height: 356px;
            } */
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
    .title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
    }
    .input-field {
        position: relative;
        .clip-path {
            position: absolute;
            right: 13px;
            top: 13px;
        }
    }
    .switch-field {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        height: 64px;
        background: rgba(2, 99, 224, 0.08);
        border-radius: 12px;
        margin-bottom: 16px;
        .mail-box {
            width: 32px;
            height: 32px;
            background: #0263e0;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            svg {
                margin: auto;
            }
        }
        .switch-label {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            color: #000000;
            margin-right: 10px;
        }
    }
`;
