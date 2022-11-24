import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Divider, Input, Tooltip, Switch } from "antd";
import { useFormik } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
    IconClipPath,
    SharedInput,
    StyledCancelButton,
    StyledCard,
    StyledSubmitButton,
    ComponentInfoBox,
} from "@components";
import { IIntegration } from "@interfaces";
import { URL_INTEGRATION_SETTING, enumPlacement } from "@configs";
import { useYup } from "@validations";
import { merchantAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";
import { selectAuth, getInfo, setLoading } from "@redux";

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

export const PageSettingIntegration = () => {
    //hook
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { YupIntegration } = useYup();
    const { success, error } = useNotify();
    //redux state
    const initIntegration = useSelector(selectAuth).userInfo?.merchant?.lineIntegration;

    // state
    const [isCopy, setIsCopy] = useState<{ status: boolean; typeInput: enumInputName }>({
        status: false,
        typeInput: enumInputName.init,
    });
    // ref
    const formRef = useRef(null);

    useEffect(() => {
        if (initIntegration) {
            setFieldValue("lineMessaging.accessToken", initIntegration.lineMessaging.accessToken);
            setFieldValue("lineLoginApi.channelID", initIntegration.lineLoginApi.channelID);
            setFieldValue("lineLoginApi.channelSecret", initIntegration.lineLoginApi.channelSecret);
            setFieldValue("lineLoginApi.getEmail", initIntegration.lineLoginApi.getEmail);
            setFieldValue("lineLoginApi.liffUrl", initIntegration.lineLoginApi.liffUrl);
        }
    }, [initIntegration]);

    const handleChangeSwitch = (e: boolean) => {
        setFieldValue("lineLoginApi.getEmail", e);
    };

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

    // const showToolTip = (e: boolean) => {
    //     console.log(e);
    // };

    const goBack = useCallback(() => history.goBack(), []);

    const sendSubmit = async () => {
        dispatch(setLoading(true));
        try {
            await merchantAPI.updateLINEconfig(values);
            success(t("message.update.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        } finally {
            dispatch(getInfo());
            dispatch(setLoading(false));
        }
    };

    // formmik
    const integrationSchema = Yup.object().shape(YupIntegration);
    const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: InitFormikVal,
            validateOnChange: true,
            validationSchema: integrationSchema,
            onSubmit: sendSubmit,
        });
    // useEffect(() => console.log(values), [values]);
    return (
        <StyledContainer ref={formRef}>
            <div className="page">
                <h3>
                    {t("page.integrations")}
                    <ComponentInfoBox
                        videoUrl="acb"
                        title={t("page.box_info.integration")}
                        body={[t("page.box_info.integration_body")]}
                        placement={enumPlacement.RIGHT}
                    />
                </h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <h4 className="main-title">
                                {t("page.LINE_Messaging")}
                                <ComponentInfoBox
                                    title={t("page.box_info.line_message")}
                                    body={[t("page.box_info.line_message_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </h4>
                            <p className="sub-title">
                                {t("page.the_settings_for_connecting_your_LINE_account")}
                            </p>
                            <div className="label">
                                <p className="title">{t("page.Webhook_URL")}</p>
                                <div className="input-field">
                                    <SharedInput
                                        name={enumInputName.webhookURL}
                                        value={URL_INTEGRATION_SETTING.webHookURL}
                                        parentClassName="input-w-70"
                                        disable={true}
                                    />
                                    <Tooltip
                                        title={
                                            isCopy.status &&
                                            isCopy.typeInput === enumInputName.webhookURL
                                                ? t("message.copied")
                                                : t("message.copy")
                                        }
                                    >
                                        <div
                                            className="clip-path"
                                            onClick={() => copyClipBoard(enumInputName.webhookURL)}
                                        >
                                            <IconClipPath />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="label">
                                <p className="title">{t("page.channel_access_token_long_live")}</p>
                                <div className="">
                                    <Input.TextArea
                                        name="lineMessaging.accessToken"
                                        className={
                                            touched.lineMessaging?.accessToken &&
                                            errors.lineMessaging?.accessToken
                                                ? "input-w-70 input-invalid"
                                                : "input-w-70"
                                        }
                                        autosize={{ minRows: 4, maxRows: 10 }}
                                        value={values.lineMessaging.accessToken}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div
                                        className={
                                            touched.lineMessaging?.accessToken &&
                                            errors.lineMessaging?.accessToken
                                                ? "text-err"
                                                : "text-err err-hide"
                                        }
                                    >
                                        {errors.lineMessaging?.accessToken || t("page.empty_text")}
                                    </div>
                                </div>
                            </div>
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <h4>
                                {t("page.LINE_login_API")}
                                <ComponentInfoBox
                                    videoUrl="acb"
                                    title={t("page.box_info.line_login_api")}
                                    body={[t("page.box_info.line_login_api_body")]}
                                    placement={enumPlacement.RIGHT}
                                />
                            </h4>
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
                                            onClick={() => copyClipBoard(enumInputName.callbackURL)}
                                        >
                                            <IconClipPath />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                            <Divider />
                            <div className="switch-field">
                                <Switch
                                    onChange={handleChangeSwitch}
                                    checked={values.lineLoginApi.getEmail}
                                />
                                <span>{t("page.get_email_addresses_of_LINE_friends")}</span>
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
                                            <IconClipPath />
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
                                            <IconClipPath />
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
                        </StyledCard>
                    </div>
                </div>
                <div className="button-field">
                    <div className="btn-back">
                        <StyledCancelButton
                            onClick={goBack}
                            type="sub"
                            text={t("page.back")}
                            htmlType="button"
                        />
                    </div>
                    <div className="save-btn">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            htmlType="submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.form`
    overflow: auto;
    /* height: calc(100vh - 56px); */
    height: 86vh;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #807c7c;
        cursor: grab !important;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .main {
        width: 100%;
        max-width: ${(p) => p.theme.maxWidths.cardWrap};
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            display: none;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        }
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .button-field {
        display: flex;
        .btn-back {
            margin-right: 12px;
        }
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 28px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    padding: 3.5rem;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
    }
    .card-wrap {
        margin-bottom: 28px;
        .main-title {
            margin-bottom: 8px;
        }
        .sub-title {
            font-size: 14px;
            color: gray;
            margin-bottom: 24px;
        }
        .input-field {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .input-w-70 {
            width: 90%;
            .ant-input-disabled {
                cursor: inherit;
            }
        }
        .clip-path {
            margin-bottom: 10px;
            margin-left: 12px;
        }
        .text-err {
            text-align: left;
            color: #f43f3f;
            visibility: visible;
            font-size: 11px;
            font-weight: 700;
        }
        .err-hide {
            visibility: hidden;
        }
        .input-invalid {
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
    .button-field {
        margin-top: 12px;
        button {
            min-width: 118px;
            height: ${(p) => p.theme.heights.button};
            font-size: 16px;
            font-weight: 500;
        }
    }
    .switch-field {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        span {
            margin-left: 5px;
        }
    }

    .current-plan {
        margin-right: 12px;
        span {
            cursor: inherit;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
        }
    }
    .btn-action {
        background-color: #0263e0;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .page {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin-bottom: 16px;
            }
            .button-field {
                column-gap: 12px;
                margin-bottom: 60px;
                .btn-back {
                    flex: 1;
                    margin-right: 0;
                    button {
                        width: 100%;
                        max-width: initial;
                    }
                }
                .save-btn {
                    flex: 1;
                    button {
                        width: 100%;
                        max-width: initial;
                        margin-right: 0;
                    }
                }
            }
        }
    }
`;
