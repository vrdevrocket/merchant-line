import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
    StyledCard,
    SharedButtonSub,
    IConDown,
    SharedInput,
    IconCopy,
    LightIcon,
    DarkIcon,
} from "@components";
import { BackLayout } from "./Back";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setImage, setLogo, setFullName, setQRImage, selectTheme } from "@redux";
import QRCode from "react-qr-code";
import { downloadImage, useConvertBase64, copyText } from "@utils";
import { merchantAPI } from "@api";
import html2canvas from "html2canvas";
import { Tooltip, Avatar, Radio } from "antd";
import { enumCoverTheme, gain_banner_text } from "@configs";
import { MobileHalfFrame } from "./MobileHalf";
import { StoreFrame } from "./Store";
const htmlToImage = require("html-to-image");
export const PageQRCode = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [qrImageUrl, setQrImageUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const Theme = useSelector(selectTheme);
    const { userInfo } = useSelector(selectAuth);
    const urlImage = Theme.logo;
    const mainColor = Theme.mainColor;
    const [optionValue, setOptionValue] = useState("become_member");
    const [themeName, setThemeName] = useState<enumCoverTheme>(enumCoverTheme.DARK);
    const [isCopy, setIsCopy] = useState<{ status: boolean; value: number }>({
        status: false,
        value: 0,
    });
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const fullName = useSelector(selectTheme).fullName;
    const posterRef = useRef<HTMLDivElement>(null);
    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");
    const downLoadQR = useCallback(() => {
        downloadImage(qrImageUrl, "QR-code");
    }, [qrImageUrl]);

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
    const showTooltipCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
    };
    useEffect(() => {
        (async () => {
            if (merchantId) {
                const response = await merchantAPI.getMerchant(merchantId);

                // setProfile(response.data);
                // dispatch(setMainColor(response.data.themeColor || "#862929"));
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
    const handleCopyText = useCallback(() => {
        copyText(clientLink, () => showTooltipCopy());
    }, []);
    const handleChooseOption = (e) => {
        setOptionValue(e.target.value);
    };
    const downloadGraphic = useCallback(() => {
        const node = document.getElementById("image-banner");
        htmlToImage
            .toPng(node)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = dataUrl || "image.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    }, []);
    return (
        <StyledContainer>
            <div className="page-layout">
                <BackLayout />
                <h3>{t("page.gain_friend.create_QR_code")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="header-title">
                                <div className="header-layout">
                                    <h4 className="title">{t("page.gain_friend.QR_code")}</h4>
                                    <p className="title-des">
                                        {t("page.gain_friend.users_scan_image")}
                                    </p>
                                </div>
                            </div>

                            <div className="ground_qrcode">
                                <div className="image">
                                    {qrImageUrl && qrImageUrl !== "" ? (
                                        <img src={qrImageUrl} />
                                    ) : (
                                        <div id="QRPoster" ref={posterRef}>
                                            <QRCode value={clientLink} size={130} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-field">
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
                                    <div className="visible-md">
                                        <div className="input-field">
                                            <SharedInput
                                                notErr={true}
                                                parentClassName="input-link"
                                                disable={true}
                                                value={clientLink}
                                            />
                                            <Tooltip
                                                title={
                                                    isCopied
                                                        ? t("message.copied")
                                                        : t("message.copy")
                                                }
                                            >
                                                <div className="icon-copy" onClick={handleCopyText}>
                                                    <IconCopy />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="visible-ms mobile-input">
                                <div className="input-field">
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
                            </div>
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="header-title theme-header">
                                <h4 className="title">{t("page.gain_friend.qr_poster")}</h4>
                                <div className="switch-theme">
                                    <div
                                        className={
                                            themeName === enumCoverTheme.LIGHT
                                                ? "light active"
                                                : "light"
                                        }
                                        onClick={() => setThemeName(enumCoverTheme.LIGHT)}
                                    >
                                        <LightIcon
                                            color={
                                                themeName === enumCoverTheme.LIGHT
                                                    ? "white"
                                                    : "#0263E0"
                                            }
                                        />
                                    </div>
                                    <div
                                        className={
                                            themeName === enumCoverTheme.DARK
                                                ? "dark active"
                                                : "dark"
                                        }
                                        onClick={() => setThemeName(enumCoverTheme.DARK)}
                                    >
                                        <DarkIcon
                                            color={
                                                themeName === enumCoverTheme.DARK
                                                    ? "white"
                                                    : "#0263E0"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <StyledBanner
                                mainColor={mainColor}
                                id="image-banner"
                                isLight={themeName === enumCoverTheme.LIGHT}
                            >
                                <div className="info">
                                    <Avatar className="future-avatar" src={urlImage || ""} />
                                    <h5>{t(`page.gain_friend.${optionValue}`)}</h5>
                                    <p>{fullName}</p>
                                </div>
                                <div className="mobile-frame">
                                    <h6>{t("page.gain_friend.how_to_use_your_code")}</h6>
                                    <h5>{t("page.gain_friend.how_to_use_qr_code_title")}</h5>
                                    <MobileHalfFrame
                                        color={
                                            themeName === enumCoverTheme.LIGHT ? "#ececec" : "white"
                                        }
                                        isLight={themeName === enumCoverTheme.LIGHT}
                                    />
                                    <div className="middle-frame">
                                        <div className="qr-code-again">
                                            {qrImageUrl && qrImageUrl !== "" ? (
                                                <img src={qrImageUrl} />
                                            ) : (
                                                <div id="QRPoster" ref={posterRef}>
                                                    <QRCode value={clientLink} size={130} />
                                                </div>
                                            )}
                                        </div>
                                        <p>{t("page.gain_friend.how_to_use_your_code")}</p>
                                    </div>
                                </div>
                            </StyledBanner>
                            <div className="ratio-layout">
                                <Radio.Group onChange={handleChooseOption} value={optionValue}>
                                    {gain_banner_text.map((item) => (
                                        <Radio className="ratio-item" value={item.name}>
                                            {t(`page.gain_friend.${item.name}`)}
                                        </Radio>
                                    ))}
                                </Radio.Group>
                            </div>
                            <div>
                                <SharedButtonSub
                                    type="Gray"
                                    size="small"
                                    className="download-graphic"
                                    onClick={downloadGraphic}
                                    text={<>{t("page.gain_friend.download_graphic")}</>}
                                    htmlType="button"
                                />
                            </div>
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <h4 className="title header-layout store">
                                {t("page.gain_friend.how_to_use_your_code")}
                            </h4>
                            <div className="store-layout">
                                <h5>{t("page.gain_friend.display_in_your_store")}</h5>
                                <div className="image-layout">
                                    <StoreFrame />
                                    <img src="images/newUser/store-img.png" />
                                </div>
                            </div>
                        </StyledCard>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};
const StyledBanner = styled.div<{ isLight: boolean; mainColor: string }>`
    display: flex;
    justify-content: space-between;
    padding: 24px 24px 0 24px;
    background: ${(p) => p.mainColor};
    /* p.isLight
            ? "linear-gradient(0deg, rgba(2, 99, 224, 0.08), rgba(2, 99, 224, 0.08)), #FFFFFF"
            : "#0263E0"}; */
    color: ${(p) => (p.isLight ? "black" : "white")};
    position: relative;
    .info {
        .future-avatar {
            width: 54px;
            height: 54px;
            border: 1px solid #fff;
            border-color: ${(p) => (p.isLight ? "black" : "white")};
        }
        h5 {
            font-style: normal;
            font-weight: 700;
            font-size: 48px;
            line-height: 65px;
            color: inherit;
            margin-top: 30px;
            max-width: 318px;
            max-height: 250px;
            white-space: normal;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        p {
            font-weight: 700;
            font-size: 48px;
            line-height: 65px;
            margin: 0;
            max-width: 318px;
            max-height: 250px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .mobile-frame {
        display: flex;
        align-items: baseline;
        flex-direction: column;
        text-align: center;
        align-items: center;
        position: relative;
        h6 {
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            color: inherit;
        }
        h5 {
            font-style: normal;
            font-weight: 900;
            font-size: 28px;
            line-height: 38px;
            text-align: center;
            color: inherit;
            margin-bottom: 22px;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 15px;
            text-align: center;
            max-width: 152px;
        }
        .middle-frame {
            position: absolute;
            bottom: 0;

            .qr-code-again {
                background-color: #fff;
                padding: 14px;
                margin-bottom: 14px;
                border-radius: 4px;
                img {
                    width: 130px;
                    height: 130px;
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .info {
            .future-avatar {
                width: 23px;
                height: 23px;
                position: absolute;
                top: 14px;
                left: 14px;
            }
            h5 {
                font-style: normal;
                font-weight: 700;
                font-size: 26px;
                line-height: 35px;
                text-align: center;
                color: inherit;
            }
        }
        .mobile-frame {
            h6 {
                font-style: normal;
                font-weight: 400;
                font-size: 10px;
                line-height: 14px;
                text-align: center;
                color: inherit;
            }
            h5 {
                font-style: normal;
                font-weight: 900;
                font-size: 12px;
                line-height: 16px;
                text-align: center;
                color: inherit;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 5px;
                line-height: 7px;
                text-align: center;
                max-width: 64px;
                text-align: center;
                align-items: center;
                margin: auto;
                padding: 2px 0;
            }
            .middle-frame {
                position: absolute;
                bottom: 0;
                .qr-code-again {
                    padding: 4px;
                    margin-bottom: 4px;
                    max-width: 75px;
                    margin: auto;
                    img {
                        width: 64px;
                        height: 64px;
                    }
                }
            }
            svg {
                width: 116px;
                height: 112px;
            }
            .qr-code-again {
                svg {
                    width: initial;
                    height: initial;
                }
            }
        }
        .ratio-layout {
            margin: 10px 0;
            .ratio-item {
                /* display: block;
            height: 30px;
            line-height: 30px; */
            }
        }
    }
`;
const StyledContainer = styled.div`
    overflow: auto;
    height: 84vh;
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
        cursor: grab;
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
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 37px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 20px;
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
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 1.5rem;
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
        .ground_qrcode {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
            .image {
                img {
                    width: 120px;
                    height: 120px;
                }
            }
            .flex-field {
                margin-left: 20px;
                .qr-btn {
                    padding: 13px 25px;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .input-field {
                    display: flex;
                    align-items: center;
                    width: 474px;
                    .input-link {
                        flex: 11;
                    }
                    .icon-copy {
                        flex: 1;
                        display: flex;
                        justify-content: end;
                    }
                }
            }
        }
    }

    .header-title {
        display: flex;
        justify-content: space-between;
        .header-layout {
            /* margin-bottom: 20px; */
            .title {
                margin-bottom: 4px;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #a5a5a5;
            }
        }
        .switch-theme {
            display: flex;
            height: 36px;
            background: #f7f7f8;
            border-radius: 46px;
            width: 100px;
            align-items: center;
            padding: 2px;
            justify-content: space-between;
            cursor: pointer;
            .dark {
                background: transparent;

                width: 48px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .light {
                background: transparent;
                width: 48px;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .active {
                background: #0263e0;
                border-radius: 36px;
                box-shadow: 0px 0px 14px rgb(131 140 149 / 25%);
                transition: 0.3s;
            }
        }
    }
    .ratio-layout {
        margin: 30px 0;
        .ratio-item {
            display: block;
            height: 30px;
            line-height: 30px;
        }
    }
    .download-graphic {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        padding: 13px;
        background: #0263e0;
        border-radius: 4px;
    }
    .store-layout {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        h5 {
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            color: #000000;
        }
        .image-layout {
            position: relative;
            img {
                position: absolute;
                left: 20px;
                bottom: 112px;
            }
        }
    }
    .header-layout {
        padding-bottom: 20px;
        /* border-bottom: 1px solid #e1e1e1; */
    }
    .header-layout {
        &.store {
            border-bottom: 1px solid #e1e1e1;
        }
    }
    .visible-md {
        display: block;
    }
    .visible-ms {
        display: none;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .visible-md {
            display: none;
        }
        .visible-ms {
            display: block;
        }
        .card-wrap {
            .ground_qrcode {
                .image {
                    img {
                        width: 84px;
                        height: 84px;
                    }
                }
                .flex-field {
                    .qr-btn {
                        max-width: 160px;
                    }
                    .input-field {
                        .input-link {
                        }
                        .icon-copy {
                        }
                    }
                }
            }
            .title {
                margin-bottom: 10px;
            }
        }
        .mobile-input {
            .input-field {
                display: flex;
                align-items: center;
                .input-link {
                    flex: 9;
                }
                .icon-copy {
                    flex: 1;
                    margin-left: 10px;
                }
            }
        }
        .ratio-layout {
            margin: 10px 0;
            .ratio-item {
            }
        }
        .download-graphic {
            max-width: initial;
        }
        .theme-header {
            margin-bottom: 20px;
        }
        .header-layout {
            padding-bottom: initial;
        }
    }
`;
