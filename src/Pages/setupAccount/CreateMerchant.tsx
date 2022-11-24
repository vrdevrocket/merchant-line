import { useState } from "react";
import styled from "styled-components";
import { SwitchLang, LogoRocket, NewComponentMerchantPreview } from "@components";
import { useTranslation } from "react-i18next";
import { ModuleMerchantFrom } from "@modules";
import { LeftBottom } from "./LeftBottom";
import { RightTop } from "./RightTop";
import { TextQuote } from "./TextQuote";
import { TextArrow } from "./TextArrow";
import { ComponentNewMerchantPreview } from "./Preview";
import { selectTheme } from "@redux";
import { useSelector } from "react-redux";
export const CreateMerchant = () => {
    // const dispatch = useDispatch();
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    const mainColor = Theme.mainColor;
    const [changeColor, setChangeColor] = useState(false);
    const handleChangeColor = () => {
        setChangeColor(true);
    };
    return (
        <StyledLayout>
            <div className="content-layout">
                <div className="content-left visible-md">
                    <StyledInfoLayout>
                        <div className="right-top-icon">
                            <RightTop />
                        </div>
                        <div className="title">
                            <h4>
                                {t("page.create_merchant.screen_client")}
                                {/* <span>{t("page.create_merchant.client")}</span> */}
                            </h4>
                        </div>
                        <div className="image-layout">
                            <div className="image">
                                <NewComponentMerchantPreview />
                                <div className="text-quote">
                                    <TextQuote />
                                </div>
                                <div className="text-arrow">
                                    <TextArrow />
                                </div>
                            </div>
                        </div>
                        <div className="right-bottom-icon">
                            <LeftBottom />
                        </div>
                    </StyledInfoLayout>
                </div>
                <div className="content-right">
                    <div className="form-title-layout">
                        <div className="lang-switch">
                            <SwitchLang />
                        </div>
                        <LogoRocket />
                        <h3 className="merchant-title">{t("page.new_account.fill_information")}</h3>
                    </div>
                    <ModuleMerchantFrom changeColor={handleChangeColor} />
                </div>
            </div>

            {/* <div className="visible-ms">
                <ComponentNewMerchantPreview>
                    <div className="content-left">
                        <StyledInfoLayout>
                            <div className="right-top-icon">
                                <RightTop />
                            </div>
                            <div className="title">
                                <h4>
                                    {t("page.create_merchant.screen_client")}{" "}
                                    <span>{t("page.create_merchant.client")}</span>
                                </h4>
                            </div>
                            <div className="image-layout">
                                <div className="image">
                                    <NewComponentMerchantPreview />
                                    <div className="text-quote">
                                        <TextQuote />
                                    </div>
                                    <div className="text-arrow">
                                        <ArrowMobile />
                                    </div>
                                </div>
                            </div>
                            <div className="right-bottom-icon">
                                <LeftBottom />
                            </div>
                        </StyledInfoLayout>
                    </div>
                </ComponentNewMerchantPreview>
            </div> */}
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    background: #ffffff;
    height: 100vh;
    max-height: 100vh;
    overflow-y: scroll;
    .lang-switch {
        display: flex;
        justify-content: end;
    }
    .content-layout {
        display: flex;
        .content-left {
            flex: 1;
            padding: 36px;
            .title {
                h4 {
                    font-style: normal;
                    font-weight: 800;
                    font-size: 45px;
                    line-height: 61px;
                    text-align: center;
                    color: #ffffff;
                    margin: 30px 0 24px 0;
                }
            }
            .image-layout {
                display: flex;
                justify-content: center;
                align-items: center;
                .image {
                    position: relative;
                    width: 360px;
                    margin: auto;
                    .text-quote {
                        position: absolute;
                        top: -31px;
                        right: -64px;
                    }
                    .text-arrow {
                        position: absolute;
                        bottom: 52px;
                        left: -144px;
                    }
                }
            }
        }
        .content-right {
            flex: 1;
            padding: 36px;
            .form-title-layout {
                text-align: center;
                .merchant-title {
                    margin: 20px 0 54px 0;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 35px;
                    line-height: 48px;
                    text-align: center;
                    color: #000000;
                }
            }
        }
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
        .lang-switch {
            margin-bottom: 16px;
        }
        .content-layout {
            display: flex;
            margin-bottom: 86px;
            .content-left {
                padding: 0;
                margin: 0 -16px;
                margin-bottom: 20px;
                .title {
                    h4 {
                        font-style: normal;
                        font-weight: 800;
                        font-size: 27px;
                        line-height: 30px;
                        text-align: center;
                        color: #ffffff;
                        margin: 30px 0 24px 0;
                        span {
                            font-style: normal;
                            font-weight: 800;
                            font-size: 56px;
                            line-height: 76px;
                            text-align: center;
                        }
                    }
                }
                .image-layout {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .image {
                        position: relative;
                        width: 360px;
                        margin: auto;
                        margin-bottom: 20px;
                        .text-quote {
                            position: absolute;
                            top: -31px;
                            right: -64px;
                            /* svg {
                                width: 55px;
                                height: 40px;
                            } */
                        }
                        .text-arrow {
                            position: absolute;
                            bottom: 52px;
                            left: -144px;
                        }
                    }
                }
            }
            .content-right {
                padding: 16px;
                .form-title-layout {
                    svg {
                        width: 52px;
                        height: 52px;
                    }
                    .merchant-title {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 26px;
                        line-height: 41px;
                        color: #000000;
                        margin-top: 16px;
                        margin-bottom: 32px;
                    }
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhonePro}) {
        .content-layout {
            .content-left {
                .image-layout {
                    .image {
                        .text-quote {
                            position: absolute;
                            top: -18px;
                            right: -32px;
                            svg {
                                width: 55px;
                                height: 40px;
                            }
                        }
                        .text-arrow {
                            position: absolute;
                            bottom: 52px;
                            left: -35px;
                            svg {
                                width: 72px;
                                height: 76px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakMobileSmallPhone}) {
        .content-layout {
            .content-left {
                .image-layout {
                    .image {
                        .text-quote {
                            position: absolute;
                            top: -18px;
                            right: -32px;
                            svg {
                                width: 55px;
                                height: 40px;
                            }
                        }
                        .text-arrow {
                            position: absolute;
                            bottom: 52px;
                            left: -35px;
                            svg {
                                width: 72px;
                                height: 76px;
                            }
                        }
                    }
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone12Pro}) {
        .content-layout {
            .content-left {
                .image-layout {
                    .image {
                        .text-quote {
                            position: absolute;
                            top: -18px;
                            right: -14px;
                            svg {
                                width: 55px;
                                height: 40px;
                            }
                        }
                        .text-arrow {
                            position: absolute;
                            bottom: 52px;
                            left: -16px;
                            svg {
                                width: 72px;
                                height: 76px;
                            }
                        }
                    }
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
        .content-layout {
            .content-left {
                .image-layout {
                    .image {
                        .text-quote {
                            position: absolute;
                            top: -18px;
                            right: -6px;
                            svg {
                                width: 55px;
                                height: 40px;
                            }
                        }
                        .text-arrow {
                            position: absolute;
                            bottom: 52px;
                            left: -13px;
                            svg {
                                width: 72px;
                                height: 76px;
                            }
                        }
                    }
                }
            }
        }
    }
`;
const StyledInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 90vh;
    background: linear-gradient(180deg, #ff5e86 0%, #fa847d 100%);
    position: relative;
    border-radius: 42px;
    position: sticky;
    top: 2rem;
    .right-bottom-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        svg {
            opacity: 0.4;
        }
    }
    .right-top-icon {
        position: absolute;
        top: 0;
        left: 0;
        svg {
            opacity: 0.4;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: 100%;
        border-radius: 0;
    }
`;

const ArrowMobile = () => (
    <svg width="75" height="78" viewBox="0 0 75 78" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M45.6442 11.835C45.6442 11.835 42.9755 9.48705 38.318 6.71381C33.6604 3.94057 30.8929 2.81853 30.8929 2.81853C30.879 4.52382 30.4618 7.38622 36.0982 10.834M45.6442 11.835C45.6442 11.835 43.7631 13.1591 38.8935 15.1135C34.024 17.0679 31.0603 18.3005 31.0603 18.3005C30.1208 17.5482 30.7268 13.9914 36.0982 10.834M45.6442 11.835C44.0583 11.2176 38.6194 10.9104 36.0982 10.834"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M73.3572 62.8506C17.8205 83.7284 10.9595 31.7923 20.8459 30.067C32.6701 28.0034 36.729 46.368 13.0934 40.9372C1.1808 38.1999 -2.60082 13.8476 29.1654 11.6045"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
