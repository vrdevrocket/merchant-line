import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Avatar, Progress } from "antd";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import { Coupon, IconStarCircle, TierDemoButton } from "@components";
import { selectTheme, useAppSelector, selectApp } from "@redux";
import { BackArrow, PointIcon } from "./icon";
import { PreviewBanner } from "./PreviewBanner";

interface IProps {
    newMode?: boolean;
    under: string;
    onToggleUnder: (value: string) => void;
}

export const ComponentMerchantPreview = (props: IProps) => {
    //page props
    const { under, onToggleUnder, newMode } = props;
    //page Hooks
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    const app = useAppSelector(selectApp);
    //state
    const [toggleShow, setToggleShow] = useState<boolean>(true);
    useEffect(() => {
        if (app.mobile) {
            setToggleShow(false);
        }
    }, [app]);
    //page variable
    const mainColor = Theme.mainColor;
    const urlImage = Theme.image;
    const logoImage = Theme.logo;
    const subColor = Theme.subColor;
    const fullName = Theme.fullName;
    const navigation: Array<string> = [
        t("page.use_point"),
        t("page.benefits"),
        t("page.coupon"),
        t("page.history"),
    ];

    return (
        <StyledPreview
            toggleShow={toggleShow}
            mainColor={mainColor}
            subColor={subColor}
            newMode={newMode || false}
        >
            <div className="inner-layout">
                {newMode ? (
                    <div className="new-mode-header">
                        <div className="noti-bar">
                            <p>16:05</p>
                            <p>blach icon</p>
                        </div>
                        <div className="url-bar">
                            <BackArrow />
                            <div className="url-name">
                                <p>Rocket</p>
                                <small>rocket.in.th</small>
                            </div>
                            <BackArrow />
                        </div>
                    </div>
                ) : (
                    <div className="header" onClick={() => setToggleShow(!toggleShow)}>
                        {toggleShow ? <CaretDownFilled /> : <CaretUpFilled />}
                        <span>{t("page.preview")}</span>
                    </div>
                )}
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
                                <StyledLogoText color={mainColor}>{fullName}</StyledLogoText>
                            )}
                            <div className="name"></div>
                            <div className="nick_name">{t("page.member_details")}</div>
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
                                    Spend <span className="next-spendBath eng">{1000}฿</span> to
                                    upgrade to VIP
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
                                    <span className="coupon"> {t("page.coupon")}</span>
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
                                        className={under === item ? `item under` : "item"}
                                        onClick={() => {
                                            onToggleUnder(item);
                                        }}
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
    );
};

const StyledProgressText = styled.p<{ color: string }>`
    font-size: 11px;
    color: black;
    margin-top: 2px;
    .next-spendBath {
        color: ${(p) => p.color};
    }
`;
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
const StyledPreview = styled.div<{
    mainColor: string;
    subColor: string;
    toggleShow: boolean;
    newMode: boolean;
}>`
    z-index: 3;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    max-width: ${(p) => (p.newMode ? "370px" : "390px")};
    width: 100%;
    background-color: ${(p) => p.theme.colors.gray_1};
    border-radius: ${(p) => (p.newMode ? "58px" : "4px")};
    border: ${(p) => (p.newMode ? "6px solid #fff" : 0)};
    position: relative;
    overflow: hidden;
    position: absolute;
    display: flex;
    flex-direction: column;
    right: ${(p) => (p.newMode ? "20.5rem" : "3.5rem")};
    bottom: ${(p) => (p.newMode ? "auto" : 0)};
    max-height: calc(100vh - 62px);
    height: ${(p) => (p.newMode ? "770px" : p.toggleShow ? "812px" : "56px")};
    transition: height 0.5s;
    filter: ${(p) => (p.newMode ? "drop-shadow(0px 24px 60px rgba(130, 45, 32, 0.21))" : "unset")};

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
        height: 352px;
        width: 100%;
        background: ${(p) => p.theme.colors.gray_1};
        position: relative;
        top: -54px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        right: 0;
        bottom: 0;
        width: 100vw;
        max-width: 100%;
        .header {
            padding: 17px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            background: #ffffff;
        }
    }
`;
