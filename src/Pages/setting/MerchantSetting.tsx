import styled from "styled-components";
import React from "react";
import { Progress, Avatar, Button, Form, Switch, Tooltip } from "antd";
import { FormikHelpers, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import * as Yup from "yup";
// import { v4 as uuidv4 } from "uuid";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import QrReader from 'react-qr-scanner';
// import ReactDOM from "react-dom";

import {
    ComponentMerchantPreview,
    ComponentTheme,
    IconCamera,
    PointIcon,
    IconCopy,
    InfoIcon,
    SharedButtonSub,
    SharedInput,
    StyledCancelButton,
    StyledCard,
    StyledMerchantSetting,
    StyledSubmitButton,
    // ComponentQRCode,
    IConDown,
    ComponentInfoBox,
    IconStarCircle,
    TierDemoButton,
    Coupon,
} from "@components";
import {
    // selectApp,
    selectAuth,
    selectTheme,
    setFullName,
    setImage,
    setLogo,
    setQRImage,
    setLoading,
    setMainColor,
    selectApp,
    useAppSelector,
    // useAppSelector,
} from "@redux";
// import { ModuleChangePassword } from "@modules";
import { IAccountName, IInfo } from "@interfaces";
import { merchantAPI } from "@api";
import { enumPlacement, enumValidation, IMAGE_TYPE, PATH_CHOOSE_PLAN } from "@configs";
import { useConvertBase64, copyText, useNotify, downloadImage, showErrorMessage } from "@utils";
import { DeleteOutlined } from "@ant-design/icons";
import { PreviewBanner } from "src/Components/PreviewBanner";
const textString = "390px × 270px Maximum 10MB";
const textLogoString = "200px × 200px Maximum 10MB";

// const uuid = uuidv4();

export const PageMerchantSetting = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const Theme = useSelector(selectTheme);
    const app = useAppSelector(selectApp);
    const { success, error } = useNotify();
    // redux state
    const plan = useSelector(selectAuth).plan;
    // page ref
    const posterRef = useRef<HTMLDivElement>(null);
    // page variable
    // const clientUrl = process.env.REACT_APP_CLIENT_URL;
    //page state
    const [profile, setProfile] = useState<IInfo>();
    const [under, setUnder] = useState<string>(t("page.use_point"));
    const [isCopied, setIsCopied] = useState(false);
    const [isCopy, setIsCopy] = useState<{ status: boolean; value: number }>({
        status: false,
        value: 0,
    });
    const [qrImageUrl, setQrImageUrl] = useState("");
    //page variable

    // ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));

    const mainColor = Theme.mainColor;
    const urlImage = Theme.image;
    const urlLogo = Theme.logo;
    const logoImage = Theme.logo;
    const fullName = Theme.fullName;
    const subColor = Theme.subColor;
    const navigation: Array<string> = [
        t("page.use_point"),
        t("page.benefits"),
        t("page.coupon"),
        t("page.history"),
    ];
    // let qrImageUrl = '';// Theme.qrInviteLinkImgUrl;
    const data: IAccountName = {
        accountName: profile?.name,
        enableAccess: profile?.enableAccess || false,
    };

    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");

    const merchantSettingSchema = Yup.object().shape({
        accountName: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.account_name"),
                })
            )
            .max(
                255,
                t("validation.max_length", {
                    returnObjects: true,
                    name: t("page.account_name"),
                })
            ),
    });
    useEffect(() => {
        (async () => {
            if (merchantId) {
                const response = await merchantAPI.getMerchant(merchantId);

                setProfile(response.data);
                dispatch(setMainColor(response.data.themeColor || "#862929"));
                dispatch(setImage(response.data.logoUrl));
                dispatch(setLogo(response.data.logoSmallUrl));
                dispatch(setFullName(response.data.name || ""));

                setQrImageUrl(response.data.qrInviteLinkImgUrl);

                response.data?.qrInviteLinkImgUrl
                    ? dispatch(setQRImage(response.data.qrInviteLinkImgUrl))
                    : uploadQRCode();
            }
        })();
    }, []);
    const uploadQRCode = async () => {
        if (posterRef.current) {
            const formData = new FormData();
            const canvas = await html2canvas(posterRef.current);

            const file = useConvertBase64(canvas.toDataURL());
            formData.append("file", file, "image.jpg");
            const res = await merchantAPI.uploadImage(formData);
            const qrImageLink = res.data.publicUrl;

            setQrImageUrl(qrImageLink);
            dispatch(setQRImage(qrImageLink));
        }

        return "null";
    };
    const handleChangeLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            //@ts-ignore
            const image = e.target.files[0];
            if (!image) {
                //WHAT: image empty
                error(t("validation.image.empty"));
                return;
            }
            if (!IMAGE_TYPE.some((imageType) => imageType === image.type)) {
                error(t("validation.image.wrong_type"));
                return;
            }
            if (image.size >= enumValidation.MAX_FILE_SIZE) {
                error(t("validation.image.max_size"));
                return;
            }
            const formData = new FormData();
            formData.append("file", image);
            const res = await merchantAPI.uploadImage(formData);
            dispatch(setLogo(res.data.publicUrl));
        } catch (error: any) {
            //
            // const data = error.response.data;
            if (error.response) {
                error(showErrorMessage(error.response));
            } else {
                error(t("page.image_error"));
            }
        }
    };
    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            //@ts-ignore
            const image = e.target.files[0];
            if (!image) {
                //WHAT: image empty
                error(t("validation.image.empty"));
                return;
            }
            if (!IMAGE_TYPE.some((imageType) => imageType === image.type)) {
                error(t("validation.image.wrong_type"));
                return;
            }
            if (image.size >= enumValidation.MAX_FILE_SIZE) {
                error(t("validation.image.max_size"));
                return;
            }
            const formData = new FormData();
            formData.append("file", image);
            const res = await merchantAPI.uploadImage(formData);
            dispatch(setImage(res.data.publicUrl));
        } catch (error: any) {
            //
            // const data = error.response.data;
            if (error.response) {
                error(showErrorMessage(error.response));
            } else {
                error(t("page.image_error"));
            }
        }
    };

    const handleSave = async (
        values: IAccountName,
        { setSubmitting }: FormikHelpers<IAccountName>
    ) => {
        dispatch(setLoading(true));
        try {
            setSubmitting(true);
            const res = await merchantAPI.updateProfileMerchantById({
                name: values.accountName || "",
                themeColor: mainColor,
                logoUrl: urlImage,
                logoSmallUrl: urlLogo,
                qrInviteLinkImgUrl: qrImageUrl,
                enableAccess: values.enableAccess,
            });
            if (res.data) {
                setProfile(res.data);
                success(t("page.update_profile_successfully"));
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update_profile_fail"));
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    const handleCopyText = useCallback(() => {
        copyText(clientLink, () => showTooltipCopy());
    }, []);

    const handleUpgrade = () => {
        history.push(PATH_CHOOSE_PLAN);
    };

    const showTooltipCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
    };

    const gotoBack = () => {
        history.goBack();
    };

    const handleToggleUnder = (values: string) => {
        setUnder(values);
    };
    const handleRemoveImageLogo = () => {
        dispatch(setLogo(""));
    };
    const handleRemoveImage = () => {
        dispatch(setImage(""));
    };
    const handleCopyTextQr = useCallback(() => {
        const textCopy = `<img src="${qrImageUrl}" />`;
        copyText(textCopy, () => setIsCopy({ value: 2, status: true }));
        setTimeout(() => setIsCopy({ value: 0, status: false }), 5000);
    }, []);
    const downLoadQR = useCallback(() => {
        downloadImage(qrImageUrl, "QR-code");
    }, [qrImageUrl]);

    //formik
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        errors,
        touched,
    } = useFormik({
        initialValues: data,
        validationSchema: merchantSettingSchema,
        enableReinitialize: true,
        onSubmit: handleSave,
    });

    return (
        <StyledMerchantSetting>
            <div className="form-wrap">
                <form onSubmit={handleSubmit}>
                    {/* <div>
                        <QrReader
                            delay={3000}
                            style={previewStyle}
                            onError={handleError}
                            onScan={handleScan}
                        />

                    </div> */}
                    <div className="merchant_setting">
                        {t("page.merchant_account_settings")}
                        <ComponentInfoBox
                            videoUrl="abc"
                            title={t("page.box_info.account_setting")}
                            body={[t("page.box_info.account_setting_body")]}
                            placement={enumPlacement.RIGHT}
                        />
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="title">{t("page.basic_settings")}</div>
                            <Form.Item
                                colon={false}
                                label={t("page.account_name")}
                                className="label_input"
                            >
                                <SharedInput
                                    name="accountName"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                    onChange={(e: React.ChangeEvent<any>) => {
                                        const value = e.target.value;
                                        dispatch(setFullName(value));
                                        handleChange(e);
                                    }}
                                    value={values.accountName}
                                    onBlur={handleBlur}
                                    errors={errors.accountName}
                                    touched={touched.accountName}
                                />
                            </Form.Item>
                            <ComponentTheme
                                style={{
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "21px",
                                    marginBottom: "14px",
                                }}
                            />
                            <div className="avatar visible-ms">
                                <div className="box_title">
                                    <p>{t("page.logo_image")}</p>
                                    <Tooltip placement="topLeft" title={`${textLogoString}`}>
                                        <Button>
                                            <InfoIcon />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className="avatar-layout">
                                    <Avatar size={110} src={urlLogo} shape="square" />
                                    {urlLogo && (
                                        <div className="remove-icon-layout">
                                            <DeleteOutlined
                                                style={{ color: "white", fontSize: 20 }}
                                                onClick={handleRemoveImageLogo}
                                            />
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="file_update_logo"
                                    type="file"
                                    hidden
                                    onChange={handleChangeLogo}
                                />
                                <label className="camera" htmlFor="file_update_logo">
                                    <IconCamera />
                                </label>
                            </div>
                            <div className="avatar visible-ms">
                                <div className="box_title">
                                    <p>{t("page.cover_image")}</p>
                                    <Tooltip placement="topLeft" title={`${textString}`}>
                                        <Button>
                                            <InfoIcon />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className="avatar-layout">
                                    <Avatar size={110} src={urlImage} shape="square" />
                                    {urlImage && (
                                        <div className="remove-icon-layout">
                                            <DeleteOutlined
                                                style={{ color: "white", fontSize: 20 }}
                                                onClick={handleRemoveImage}
                                            />
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="file_update_img"
                                    type="file"
                                    hidden
                                    onChange={handleChangeImage}
                                />
                                <label className="camera" htmlFor="file_update_img">
                                    <IconCamera />
                                </label>
                            </div>
                            <Form.Item
                                colon={false}
                                label={t("page.client_link")}
                                className="label_input"
                            >
                                <div className="flex-field">
                                    <SharedInput
                                        notErr={true}
                                        parentClassName="input-link"
                                        disable={true}
                                        value={clientLink}
                                    />
                                    <Tooltip
                                        title={isCopied ? t("message.copied") : t("message.copy")}
                                    >
                                        <div className="icon-copy" onClick={handleCopyText}>
                                            <IconCopy />
                                        </div>
                                    </Tooltip>
                                </div>
                            </Form.Item>
                        </StyledCard>
                    </div>
                    {app.mobile && (
                        <StyledPreview mainColor={mainColor} subColor={subColor}>
                            <div className="inner-layout">
                                <div className="page-body">
                                    <div className="body">
                                        {urlImage ? (
                                            <div className="preview-image">
                                                {urlImage && <img src={urlImage} />}
                                            </div>
                                        ) : (
                                            <div className="overlay">
                                                <PreviewBanner color={mainColor} />
                                            </div>
                                        )}

                                        <div className="text_name">
                                            {logoImage ? (
                                                <div className="logo-image">
                                                    {logoImage && <img src={logoImage} />}
                                                </div>
                                            ) : (
                                                <StyledLogoText color={mainColor}>
                                                    {fullName}
                                                </StyledLogoText>
                                            )}
                                            <div className="name"></div>
                                            <div className="nick_name">
                                                {t("page.member_details")}
                                            </div>
                                        </div>

                                        <div className="overlay_children"></div>
                                    </div>
                                    <div className="content">
                                        <Avatar alt="Avatar" size={62} src="/images/dumpAvt.png" />
                                        <div className="profile-info">
                                            <div className="avatar_name">
                                                <div className="hello">Hello</div>
                                                <div className="name">{t("page.david")} </div>
                                            </div>
                                            <div className="user-actions">
                                                <div className="star">
                                                    <IconStarCircle color={mainColor} />
                                                </div>
                                                <TierDemoButton
                                                    color={"#B99128"}
                                                    height={24}
                                                    width={60}
                                                    iconWidth={"12"}
                                                    iconHeight={"12"}
                                                    icon="diamond"
                                                    size="small"
                                                />
                                                {/* <div className="good">
                                <span>{t("page.good")}</span> <ArrowRight />
                            </div> */}
                                            </div>
                                        </div>
                                        <div className="user-progress">
                                            <Progress
                                                percent={70}
                                                strokeColor={mainColor}
                                                showInfo={false}
                                                size="small"
                                            />
                                            <div className="progress-info">
                                                <p className="label eng">NO. 2021 04 07</p>
                                                <StyledProgressText color={mainColor}>
                                                    Spend{" "}
                                                    <span className="next-spendBath eng">
                                                        {1000}฿
                                                    </span>{" "}
                                                    to upgrade to VIP
                                                </StyledProgressText>
                                            </div>
                                        </div>
                                        <div className="star_coupans">
                                            <div className="star_point">
                                                <PointIcon />
                                                <span className="point eng">{t("page.1820")}</span>
                                                <span className="desc">{t("page.points")}</span>
                                            </div>
                                            <div className="star_point">
                                                <Coupon />
                                                <span className="point eng">
                                                    {t("page._5")}
                                                    <span className="coupon">
                                                        {" "}
                                                        {t("page.coupon")}
                                                    </span>
                                                </span>
                                                <span className="desc">{t("page.coupons")}</span>
                                            </div>
                                        </div>
                                        {/* <div className="desc_end">{t("page.Expiration_month")}</div> */}
                                    </div>
                                    <div className="navigation_bar_content">
                                        {navigation.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <div
                                                        key={index}
                                                        // className={under === item ? `item under` : "item"}
                                                        // onClick={() => {
                                                        //     onToggleUnder(item);
                                                        // }}
                                                    >
                                                        {item}
                                                    </div>
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                    <div className="footer"></div>
                                </div>
                            </div>
                        </StyledPreview>
                    )}
                    {/* <div className="card-wrap">
                        <StyledCard>
                            <div className="title">{t("page.qr_code")}</div>
                            <div className="ground_qrcode">
                                <div className="image">
                                    {qrImageUrl && qrImageUrl !== "" ? (
                                        <img src={qrImageUrl} />
                                    ) : (
                                        <div id="QRPoster" ref={posterRef}>
                                            <QRCode value={clientLink} size={200} />
                                        </div>
                                    )}
                                </div>
                                <SharedButtonSub
                                    type="Gray"
                                    size="small"
                                    className="qr-btn"
                                    onClick={downLoadQR}
                                    text={
                                        <>
                                            <IConDown style={{ marginRight: "12px" }} />
                                            {t("page.download")}
                                        </>
                                    }
                                    htmlType="button"
                                />
                            </div>
                            <div className="group_link">
                                <SharedInput
                                    styleParent={{ flex: 1 }}
                                    value={`<img src="${qrImageUrl}" />`}
                                    disable={true}
                                />
                                <Tooltip
                                    title={
                                        isCopy.status && isCopy.value === 2
                                            ? t("message.copied")
                                            : t("message.copy")
                                    }
                                >
                                    <div className="copy" onClick={handleCopyTextQr}>
                                        <IconCopy />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="desc_link">{t("page.desc_qr_code")}</div>
                        </StyledCard>
                    </div> */}
                    {/* <div className="card-wrap">
                        <StyledCard>
                            <div className="title">{t("page.plan_settings")}</div>
                            <div className="you_are_on">{t("page.you_are_on")}</div>
                            <SharedButtonSub
                                text={plan?.name || t("page.empty_text")}
                                style={{
                                    fontSize: "16px",
                                    marginRight: "12px",
                                    cursor: "initial",
                                }}
                                type="disable"
                            />
                            <SharedButtonSub
                                text={t("page.upgrade")}
                                style={{ fontSize: "16px" }}
                                type="default"
                                onClick={handleUpgrade}
                            />
                        </StyledCard>
                        <div className="label status-field">
                            <div className="title">{t("page.activate")}</div>{" "}
                            <Switch
                                checked={values.enableAccess}
                                onChange={(e) => setFieldValue("enableAccess", e)}
                            />
                        </div>
                    </div> */}
                    <div className="btn-layout">
                        <StyledSubmitButton
                            type="default"
                            text={t("page.save")}
                            htmlType="submit"
                            disable={isSubmitting}
                        />
                        <StyledCancelButton
                            type="sub"
                            text={t("page.cancel")}
                            htmlType="button"
                            onClick={gotoBack}
                        />
                    </div>
                </form>

                {!app.mobile && (
                    <ComponentMerchantPreview under={under} onToggleUnder={handleToggleUnder} />
                )}
            </div>
        </StyledMerchantSetting>
    );
};

const StyledLogoText = styled.div<{ color: string }>`
    font-weight: normal;
    font-size: 10px;
    line-height: normal;
    color: #ffffff;
    width: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 6px;
    height: 36px;
    display: flex;
    align-items: center;
    padding: 3px;
    border: 2px solid #fff;
    border-radius: 50%;
    margin-right: 10px;
    background-color: ${(p) => p.color};
    z-index: 1;
`;
const StyledProgressText = styled.p<{ color: string }>`
    font-size: 11px;
    color: black;
    margin-top: 2px;
    .next-spendBath {
        color: ${(p) => p.color};
    }
`;

const StyledPreview = styled.div<{
    mainColor: string;
    subColor: string;
}>`
    /* max-width: 370px; */
    margin: auto;
    /* z-index: 3;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    max-width: 370px;
    width: 100%;
    background-color: ${(p) => p.theme.colors.gray_1};
    border-radius: 4px;
    border: 0;
    overflow: hidden;
    height: 812px;
    transition: height 0.5s;
    filter: "drop-shadow(0px 24px 60px rgba(130, 45, 32, 0.21))"; */

    .new-mode-header {
        background: #fff;
        padding: 15px 24px 0 24px;
        p {
            color: black;
            font-weight: bold;
            margin: 0;
        }

        .noti-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .url-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .header {
        cursor: pointer;
        padding: 32px 24px;
        display: flex;
        align-items: center;
        span {
            display: inline-block;
            margin-left: 12px;
            font-weight: 600;
            font-size: 25px;
            line-height: 33px;
        }
    }
    .page-body {
        flex: 1;
        overflow: hidden;
        background-color: rgb(248, 248, 248);
        ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
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
        .body {
            width: 100%;
            height: 272px;
            position: relative;
            display: flex;
            justify-content: center;
            overflow: hidden;
            .preview-image {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .text_name {
                position: absolute;
                top: 16px;
                left: 6%;
                position: absolute;
                top: 16px;
                left: 2%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                img {
                    width: 36px;
                    margin-left: 6px;
                    height: 36px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
                .nick_name {
                    padding: 4px 18px;
                    font-weight: normal;
                    font-size: 13px;
                    color: #ffffff;
                    background: rgba(0, 0, 0, 0.22);
                    border-radius: 17px;
                    z-index: 1;
                }
            }
            .overlay {
                background: ${(p) => p.mainColor};
                width: 100%;
                height: 100%;
            }
            .overlay_children {
                position: absolute;
                bottom: 0;
                width: 100%;
                left: 0;
                right: 0;
                height: 30%;
                background: linear-gradient(
                    180deg,
                    rgba(255, 255, 255, 0) 19%,
                    rgba(248, 248, 248, 0.502) 65.33%,
                    ${(p) => p.theme.colors.gray_1} 100%
                );
            }
            .backgroundFFF {
                position: absolute;
                width: 365px;
                height: 365px;
                border-radius: 50%;
                top: -45px;
                right: -195px;
                background-color: #fff;
                overflow: hidden;
                border: 10px solid ${(p) => p.subColor};
                @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                    right: -226px;
                    top: -50px;
                }
                img {
                    width: 50%;
                    height: 50%;
                    object-fit: cover;
                    position: absolute;
                    top: 35px;
                    left: 0;
                }
            }
        }
        .content {
            width: calc(100% - 30px);
            position: relative;
            margin: 0 auto;
            background-color: #fff;
            bottom: 84px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: rgb(175 175 175 / 16%) 0px 0px 8px;
            transform: translate(0, -30%);
            .profile-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                margin-bottom: 10px;
                .user-actions {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
            .star {
                margin-right: 10px;
            }
            .ant-avatar {
                position: absolute;
                top: 0;
                right: -11px;
                transform: translate(-50%, -50%);
            }
            .user-progress {
                margin-bottom: 8px;
                .progress-info {
                    display: flex;
                    justify-content: space-between;
                    &:first-child {
                        color: #919191;
                    }

                    p.label {
                        margin-top: 2px;
                        font-size: 11px;
                        color: #919191;
                    }
                    p.text {
                        font-size: 11px;
                        color: black;
                    }
                }
            }
        }
        .avatar_name {
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            .name {
                font-weight: bold;
            }
        }
        .good {
            text-align: center;
            color: #fff;
            font-weight: bold;
            font-size: 8px;
            line-height: 11px;
            padding: 4px 8px;
            background: #816b00;
            display: inline-block;
            border-radius: 12px;
            position: relative;
            span {
                display: inline-block;
                margin: 0 8px;
            }
        }
        .star_coupans {
            display: flex;
            align-items: center;
            flex-flow: row;
            margin-bottom: 12px;
            .point {
                color: ${(p) => p.mainColor};
                font-weight: 700;
                display: initial !important;
            }
            .coupon {
                font-size: 16px;
                color: black;
                display: initial !important;
                font-weight: 700;
            }
            .star_point {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 27%;
                margin-right: 10px;
                box-shadow: rgb(143 143 143 / 16%) 0px 3px 6px;
                padding: 3%;
                span {
                    display: block;
                }
            }
            .line {
                height: 40px;
                width: 1px;
                background-color: #707070;
            }
            .desc {
                font-weight: 500;
                font-size: 10px;
                line-height: 13px;
                color: #989898;
                position: relative;
                left: 2px;
            }
        }
        .desc_end {
            font-weight: normal;
            font-size: 8px;
            line-height: 11px;
            width: 50%;
            margin-left: 12px;
            text-align: center;
            color: #989898;
        }
        .navigation_bar_content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            position: relative;
            top: -160px;
            padding: 0 22px 10px 20px;
            .item {
                /* width: 25%; */
                text-align: center;
                padding: 15px 0;
                font-weight: normal;
                font-size: 16px;
                line-height: 21px;
                color: #989898;
                cursor: pointer;
                position: relative;

                font-style: normal;
            }
            .under {
                font-weight: 600;
                color: #000000;
                font-style: normal;
                /* &::after {
                    content: "";
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    width: 35%;
                    height: 3px;
                    background-color: ${(p) => p.mainColor};
                    transform: translateX(-50%);
                } */
            }
        }
    }
    .footer {
        height: 90px;
        width: 100%;
        background: ${(p) => p.theme.colors.gray_1};
        position: relative;
        top: -54px;
    }
`;
