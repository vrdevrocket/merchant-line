import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setImage, setLogo, setFullName, setQRImage, selectTheme } from "@redux";
import QRCode from "react-qr-code";
import {
    StyledCard,
    SharedButtonSub,
    IConDown,
    SharedInput,
    IconCopy,
    LightIcon,
    DarkIcon,
} from "@components";
import { Avatar } from "antd";
import { StoreFrame } from "./Store";
import { enumCoverTheme, gain_banner_text } from "@configs";
import { MobileHalfFrame } from "./MobileHalf";
import { downloadImage, useConvertBase64, copyText } from "@utils";
import { BackLayout } from "./Back";
const htmlToImage = require("html-to-image");
export const PagePoster = () => {
    //page Hooks
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    const urlImage = Theme.logo;
    const mainColor = Theme.mainColor;
    const [qrImageUrl, setQrImageUrl] = useState("");
    const { userInfo } = useSelector(selectAuth);
    const [themeName, setThemeName] = useState<enumCoverTheme>(enumCoverTheme.DARK);
    const posterRef = useRef<HTMLDivElement>(null);
    const fullName = useSelector(selectTheme).fullName;
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");
    const downLoadQR = useCallback(() => {
        downloadImage(qrImageUrl, "QR-code");
    }, [qrImageUrl]);
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
                <h3>{t("page.gain_friend.create_poster")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="header-title">
                                <div className="header-layout">
                                    <h4 className="title">
                                        {t("page.gain_friend.customize_poster")}
                                    </h4>
                                    <p>{t("page.gain_friend.download_print_members")}</p>
                                </div>
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
                            <div className="store-frame">
                                <StyledBanner
                                    mainColor={mainColor}
                                    id="image-banner"
                                    isLight={themeName === enumCoverTheme.LIGHT}
                                >
                                    <div className="mobile-frame">
                                        <p>
                                            {fullName}
                                            {t("page.gain_friend.started_official_account")}
                                        </p>
                                        <Avatar className="future-avatar" src={urlImage || ""} />
                                        <h5>{t("page.gain_friend.shop_mermbership")}</h5>
                                        <h5>{fullName}</h5>
                                        <h5>{t("page.gain_friend.got_it_today")}</h5>
                                        <div className="mobile-svg-layout">
                                            <MobileHalfFrame
                                                isLight={themeName === enumCoverTheme.LIGHT}
                                            />
                                        </div>
                                        <div className="middle-frame">
                                            <div className="qr-code-again">
                                                {qrImageUrl && qrImageUrl !== "" ? (
                                                    <img src={qrImageUrl} />
                                                ) : (
                                                    <div id="QRPoster" ref={posterRef}>
                                                        <QRCode value={clientLink} size={90} />
                                                    </div>
                                                )}
                                            </div>
                                            <p>{t("page.gain_friend.how_to_use_poster_thai")}</p>
                                        </div>
                                    </div>
                                </StyledBanner>
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
                            </div>
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <h4 className="title header-layout store-header">
                                {t("page.gain_friend.how_to_use_poster")}
                            </h4>
                            <div className="store-demo-layout">
                                <div className="store-layout">
                                    <h5>{t("page.gain_friend.display_in_your_store")}</h5>
                                    <div className="image-layout">
                                        <StoreFrame />
                                        <img src="images/newUser/store-scan-image.png" />
                                    </div>
                                </div>
                                <div className="store-demo">
                                    <h5>{t("page.gain_friend.post_social_media")}</h5>
                                    <div className="image-layout">
                                        {/* <StoreFrame /> */}
                                        <img src="images/newUser/store-demo.png" />
                                    </div>
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
    color: ${(p) => (p.isLight ? "black" : "white")};

    .future-avatar {
        position: absolute;
        width: 24px;
        height: 24px;
        left: -15px;
        top: -14px;
        border: 1px solid;
        border-color: ${(p) => (p.isLight ? "black" : "white")};
    }
    h5 {
        font-style: normal;
        font-weight: 700;
        font-size: 60px;
        line-height: 82px;
        text-align: center;
        color: inherit;
    }

    .mobile-frame {
        display: flex;
        align-items: baseline;
        flex-direction: column;
        text-align: center;
        align-items: center;
        position: relative;
        max-width: 272px;
        p {
            font-style: normal;
            font-weight: 700;
            font-size: 9px;
            line-height: 12px;
            text-align: center;
        }
        h5 {
            font-style: normal;
            font-weight: 800;
            font-size: 27px;
            line-height: 34px;
            margin: 0;
            color: inherit;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 11px;
            line-height: 15px;
            text-align: center;
            max-width: 180px;
            margin-bottom: 4px;
        }
        .mobile-svg-layout {
            padding-top: 20px;
            svg {
                max-width: 189px;
                height: 185px;
            }
        }

        .middle-frame {
            position: absolute;
            bottom: 0;
            p {
                padding: 0 20px;
                margin-top: 10px;
            }
            .qr-code-again {
                background-color: #fff;
                padding: 8px;
                max-width: 107px;
                margin: auto;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                img {
                    width: 86px;
                    height: 86px;
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        max-width: 325px;
        .mobile-frame {
            display: flex;
            align-items: baseline;
            flex-direction: column;
            text-align: center;
            align-items: center;
            position: relative;
            p {
                font-style: normal;
                font-weight: 700;
                font-size: 9px;
                line-height: 12px;
                text-align: center;
            }
            h5 {
                font-style: normal;
                font-weight: 900;
                font-size: 28px;
                line-height: 38px;
                text-align: center;
                color: inherit;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 11px;
                line-height: 15px;
                text-align: center;
            }
            .mobile-svg-layout {
                svg {
                    max-width: 189px;
                    height: 195px;
                }
            }

            .middle-frame {
                position: absolute;
                bottom: 0;

                .qr-code-again {
                    background-color: #fff;
                    padding: 10px;
                    margin-bottom: 14px;
                    img {
                        width: 86px;
                        height: 86px;
                    }
                }
            }
        }
    }
`;
const StyledContainer = styled.div`
    overflow: auto;
    height: 86vh;
    display: flex;
    flex-direction: column;
    h3 {
    }
    .store-header {
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 20px;
    }
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
        .store-frame {
            display: flex;
            column-gap: 40px;
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
                    padding: 6px 12px;
                    font-size: 16px;
                }
                .input-field {
                    display: flex;
                    align-items: center;
                    width: 400px;
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
        margin-bottom: 20px;
        /* padding-bottom: 20px; */
        /* border-bottom: 1px solid #e1e1e1; */
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
                color: #646464;
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
    .store-demo-layout {
        display: flex;
        column-gap: 84px;
        justify-content: space-around;
        align-items: baseline;
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
            padding-top: 40px;
            img {
                position: absolute;
                left: 10px;
                bottom: 165px;
            }
        }
    }
    .store-demo {
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
            padding-top: 36px;
            /* position: relative;
            img {
                position: absolute;
                left: 20px;
                bottom: 112px;
            } */
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
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
            .store-frame {
                display: flex;
                row-gap: 30px;
                flex-direction: column;
                align-items: center;
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
                        padding: 6px 12px;
                        font-size: 16px;
                    }
                    .input-field {
                        display: flex;
                        align-items: center;
                        width: 400px;
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
        .download-graphic {
            max-width: initial;
        }
        .store-demo-layout {
            display: flex;
            column-gap: 10px;
            justify-content: space-around;
            align-items: baseline;
            .store-layout {
                .image-layout {
                    svg {
                        width: 128px;
                        height: 135px;
                    }
                    img {
                        position: absolute;
                        left: 10px;
                        bottom: 82px;
                        width: 31px;
                    }
                }
            }
            .store-demo {
                img {
                    width: 114px;
                    height: 230px;
                }
            }
        }
    }
`;
