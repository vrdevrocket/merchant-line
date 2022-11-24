import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAuth, selectTheme, useAppSelector, selectApp } from "@redux";

import {
    StyledCard,
    SharedButtonSub,
    LightIcon,
    DarkIcon,
    MessageRightArrow,
    ArrowRight,
} from "@components";
import { Radio } from "antd";

import { banner_ratio, enumCoverTheme } from "@configs";
import { downloadImage } from "@utils";
import { BackLayout } from "./Back";
import { MenuIcon } from "./MenuIcon";
import { ChatIcon } from "./Chat";
import { Select } from "antd";
import { MobileHalfFrame } from "./MobileHalf";
import { Check } from "./Check";
import { Retencle } from "./Retencle";
import { LongRetencle } from "./LongRetencle";
const htmlToImage = require("html-to-image");
const { Option } = Select;
export const PageMenu = () => {
    //page Hooks
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    const urlImage = Theme.logo;
    const mainColor = Theme.mainColor;
    const [qrImageUrl, setQrImageUrl] = useState("");
    const { userInfo } = useSelector(selectAuth);
    const [optionValue, setOptionValue] = useState<number>(0);
    const [bannerSize, setBannerSize] = useState<string>("800 × 270");
    const [themeName, setThemeName] = useState<enumCoverTheme>(enumCoverTheme.DARK);
    const posterRef = useRef<HTMLDivElement>(null);
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const fullName = useSelector(selectTheme).fullName;
    const app = useAppSelector(selectApp);
    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");
    const downLoadQR = useCallback(() => {
        downloadImage(qrImageUrl, "QR-code");
    }, [qrImageUrl]);
    const handleChooseOption = (e) => {
        console.log(e.target.value);
        setOptionValue(e.target.value);
    };
    const handleSelectBannerSize = (value) => {
        setBannerSize(value);
    };
    const downloadGraphic = useCallback(() => {
        const idName = optionValue === 0 ? "image-banner" : "image-banner-two";
        const node = document.getElementById(idName);
        htmlToImage
            .toPng(node, { width: 1200, height: 425 })
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
    }, [optionValue]);
    return (
        <StyledContainer>
            <div className="page-layout">
                <BackLayout />
                <h3>{t("page.gain_friend.create_rich_menu")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="header-title">
                                <div className="header-layout">
                                    <h4 className="title">
                                        {t("page.gain_friend.create_rich_menu_second")}
                                    </h4>
                                    {/* <p>{t("page.gain_friend.download_print_members")}</p> */}
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
                                <div className="ratio-layout">
                                    <Radio.Group
                                        className="ratio-flex"
                                        onChange={handleChooseOption}
                                        value={optionValue}
                                    >
                                        <Radio className="ratio-item" value={0}>
                                            <StyledBanner
                                                id="image-banner"
                                                isLight={themeName === enumCoverTheme.LIGHT}
                                                mainColor={mainColor}
                                                className="full-width"
                                            >
                                                <div className="mobile-frame">
                                                    <MobileHalfFrame
                                                        isLight={themeName === enumCoverTheme.LIGHT}
                                                    />
                                                    <div className="inside-frame">
                                                        <Check
                                                            color={
                                                                themeName === enumCoverTheme.LIGHT
                                                                    ? "black"
                                                                    : "white"
                                                            }
                                                            size={app.mobile ? 28 : 71}
                                                        />
                                                        <LongRetencle
                                                            color={
                                                                themeName === enumCoverTheme.LIGHT
                                                                    ? "black"
                                                                    : "white"
                                                            }
                                                            width={app.mobile ? 53 : 131}
                                                        />
                                                        <Retencle
                                                            color={
                                                                themeName === enumCoverTheme.LIGHT
                                                                    ? "black"
                                                                    : "white"
                                                            }
                                                            width={app.mobile ? 31 : 77}
                                                        />
                                                    </div>
                                                </div>
                                                <div style={{ textAlign: "center" }}>
                                                    <h4>{t("page.gain_friend.subscribe")}</h4>
                                                    <h5>{fullName}</h5>
                                                    <p>{t("page.gain_friend.become_member_now")}</p>
                                                </div>
                                            </StyledBanner>
                                        </Radio>
                                        <Radio className="ratio-item two-column" value={1}>
                                            <span id="image-banner-two" className="download-banner">
                                                <StyledBanner
                                                    isLight={themeName === enumCoverTheme.LIGHT}
                                                    className="item-banner"
                                                    mainColor={mainColor}
                                                >
                                                    <div className="mobile-frame">
                                                        <MobileHalfFrame
                                                            isLight={
                                                                themeName === enumCoverTheme.LIGHT
                                                            }
                                                        />
                                                        <div className="inside-frame">
                                                            <Check
                                                                color={
                                                                    themeName ===
                                                                    enumCoverTheme.LIGHT
                                                                        ? "black"
                                                                        : "white"
                                                                }
                                                                size={app.mobile ? 24 : 60}
                                                            />
                                                            <h5>
                                                                {t("page.gain_friend.subscribe")}
                                                            </h5>
                                                            <p>
                                                                {t("page.gain_friend.register")}{" "}
                                                                <ArrowRight
                                                                    color={
                                                                        themeName ===
                                                                        enumCoverTheme.LIGHT
                                                                            ? "black"
                                                                            : "white"
                                                                    }
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </StyledBanner>
                                                <StyledBanner
                                                    isLight={themeName === enumCoverTheme.LIGHT}
                                                    className="item-banner"
                                                    mainColor={mainColor}
                                                >
                                                    <ChatIcon
                                                        color={
                                                            themeName === enumCoverTheme.LIGHT
                                                                ? "black"
                                                                : "white"
                                                        }
                                                        width={app.mobile ? 40 : 100}
                                                        height={app.mobile ? 34 : 84}
                                                    />
                                                    <div className="contact">
                                                        <h5>{t("page.gain_friend.contact_us")}</h5>
                                                        <p>
                                                            {t("page.gain_friend.contact_us")}{" "}
                                                            <ArrowRight
                                                                color={
                                                                    themeName ===
                                                                    enumCoverTheme.LIGHT
                                                                        ? "black"
                                                                        : "white"
                                                                }
                                                            />
                                                        </p>
                                                    </div>
                                                </StyledBanner>
                                            </span>
                                        </Radio>
                                    </Radio.Group>
                                </div>
                                <div className="card-footer">
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
                            <h4 className="title header-layout">
                                {t("page.gain_friend.how_to_use_your_rich_menu")}
                            </h4>
                            <div className="store-demo-layout">
                                <div className="store-layout">
                                    <h5>{t("page.gain_friend.paste_graphic_menu")}</h5>
                                    <div className="image-layout">
                                        <img src="images/newUser/menu-content.png" />
                                    </div>
                                </div>
                                <div className="store-demo">
                                    <h5>{t("page.gain_friend.rich_menu_account")}</h5>
                                    <div className="image-layout">
                                        <img src="images/newUser/rich-menu-demo.png" />
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
    padding: 24px;
    background: ${(p) => p.mainColor};
    color: ${(p) => (p.isLight ? "black" : "white")};
    padding-bottom: 0;
    .future-avatar {
        position: absolute;
        width: 24px;
        height: 24px;
        right: -15px;
        top: -14px;
    }
    h4 {
        font-style: normal;
        font-weight: 800;
        font-size: 51px;
        line-height: 70px;
        color: inherit;
    }
    h5 {
        font-style: normal;
        font-weight: 800;
        font-size: 31px;
        color: inherit;
        max-width: 300px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    p {
        font-style: italic;
        font-weight: 600;
        font-size: 26px;
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
        max-width: 220px;

        .mobile-half-frame {
            width: 100%;
            height: 209px;
        }

        .inside-frame {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 16px;
            position: absolute;
            bottom: 10px;
            justify-content: space-evenly;
        }
    }
    .contact {
        h5 {
            font-style: normal;
            font-weight: 700;
            font-size: 32px;
            line-height: 44px;
            /* identical to box height */

            text-align: center;
            color: inherit;
        }
        p {
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 27px;
            text-align: center;
            color: inherit;
            svg {
                width: 10px;
                height: 10px;
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        h4 {
            font-size: 20px;
        }
        h5 {
            font-size: 12px;
        }
        p {
            font-size: 13px;
        }
        .mobile-frame {
            max-width: 91px;

            .mobile-half-frame {
                height: 92px;
            }

            .inside-frame {
                row-gap: 2px;
            }
        }
        .contact {
            h5 {
                font-style: normal;
                font-weight: 700;
                font-size: 13px;
                line-height: 18px;
                color: inherit;
            }
            p {
                font-style: normal;
                font-weight: 300;
                font-size: 8px;
                line-height: 11px;
                color: inherit;
                svg {
                    width: 6px;
                    height: 6px;
                }
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
        /* font-weight: 700;
        font-size: 25px;
        color: black; */
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    padding: 3.5rem;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
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
        .store-frame {
            display: flex;
            flex-direction: column;
            row-gap: 20px;
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
        /* margin-bottom: 20px; */
        /* padding-bottom: 20px; */
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
    .two-column {
        span:nth-child(2) {
            display: flex;
            /* column-gap: 2px; */
        }
        .download-banner {
            display: flex;
            column-gap: 2px;
        }
        .mobile-frame {
            .inside-frame {
                row-gap: 4px;
                h5 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 32px;
                    line-height: 44px;
                    color: inherit;
                }
                p {
                    font-style: normal;
                    font-weight: 300;
                    font-size: 20px;
                    line-height: 27px;
                    text-align: center;
                    color: inherit;

                    svg {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
        }
    }
    .ratio-layout {
        margin: 30px 0;
        .ratio-flex {
            display: flex;
            flex-direction: column;
            row-gap: 16px;
        }
        .ratio-item {
            display: block;
            line-height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span:nth-child(1) {
                flex: 1;
            }
            span:nth-child(2) {
                flex: 28;
            }

            .item-banner {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                flex: 1;
                button {
                    text-transform: uppercase;
                    height: 42px;
                    min-width: 120px;
                    border: 0;
                    font-weight: 900;
                    font-size: 18px;
                    border-radius: 22px;
                    padding: 4px 16px;
                }
            }
            /* } */
        }
    }
    .card-footer {
        .select-banner-size {
            margin-bottom: 20px;
            label {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
            .ant-select {
                margin-top: 14px;
                .ant-select-selection--single {
                    height: 100%;
                }
                .ant-select-selection__rendered {
                    height: 48px;
                    display: flex;
                    align-items: center;
                }
            }
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
            /* position: relative;
            padding-top: 40px;
            img {
                position: absolute;
                left: 10px;
                bottom: 165px;
            } */
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
        .ratio-layout {
            margin: 30px 0;
            .ratio-item {
                display: block;
                line-height: 30px;
                display: flex;
                align-items: center;
                .full-width {
                    h4 {
                        font-style: normal;
                        font-weight: 800;
                        font-size: 24px;
                        line-height: 33px;
                        text-align: center;
                        color: inherit;
                        margin: 0;
                    }
                    p {
                        font-style: italic;
                        font-weight: 600;
                        font-size: 14px;
                        line-height: 19px;
                        text-align: center;
                        margin: 0;
                    }
                }
                .register-contact {
                    display: flex;
                    margin-top: 10px;
                    column-gap: 2px;
                    .item-banner {
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        flex: 1;
                        width: 146px;
                        svg {
                            width: 31px;
                            height: 33px;
                        }
                        button {
                            text-transform: uppercase;
                            height: 36px;
                            min-width: 120px;
                            border: 0;
                            font-weight: 900;
                            font-size: 14px;
                            border-radius: 16px;
                            padding: 4px 16px;
                        }
                    }
                }
            }
        }
        .two-column {
            .mobile-frame {
                .inside-frame {
                    row-gap: 4px;
                    h5 {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 13px;
                        line-height: 18px;
                        margin: 0;
                        color: inherit;
                    }
                    p {
                        font-style: normal;
                        font-weight: 300;
                        font-size: 8px;
                        line-height: 11px;
                        margin: 0;
                        color: inherit;
                    }
                }
            }
        }
        .download-graphic {
            max-width: initial;
        }
        .store-layout {
            .image-layout {
                img {
                    width: 128.77px;
                    height: 119.11px;
                }
            }
        }
        .store-demo {
            .image-layout {
                img {
                    width: 128.77px;
                }
            }
        }
    }
`;
