import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { BackMain, IconCopy, StyledCard, SharedInput } from "@components";
import { useHistory } from "react-router";
import { BackLayout } from "./Back";
import { Avatar, Button, Form, Switch, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@redux";
import { copyText } from "@utils";
import { MobileFrame } from "./Mobile";

export const PageCreateUrl = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const [isCopied, setIsCopied] = useState(false);
    const showTooltipCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
    };
    const handleCopyText = useCallback(() => {
        copyText(clientLink, () => showTooltipCopy());
    }, []);
    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");
    return (
        <StyledContainer>
            <div className="page-layout">
                <BackLayout />
                <h3>{t("page.gain_friend.create_url_link")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <h4 className="title">{t("page.gain_friend.copy_URL")}</h4>
                            <p className="title-des">{t("page.gain_friend.share_your_URL")}</p>
                            <Form.Item colon={false} className="label_input">
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
                    <div className="card-wrap">
                        <StyledCard>
                            <h4 className="title header-title">
                                {t("page.gain_friend.how_to_use_your_URL")}
                            </h4>
                            <div className="share-link">
                                <div className="fb-share">
                                    <h4 className="title">
                                        {t("page.gain_friend.share_throught_social")}
                                    </h4>
                                    <div className="frame-layout">
                                        <img
                                            className="facebook-rocket"
                                            src="images/newUser/rocket-fb.png"
                                        />
                                        <MobileFrame />
                                        <img
                                            className="fb-share"
                                            src="images/newUser/fb-share.png"
                                        />
                                    </div>
                                </div>
                                <div className="ig-share">
                                    <h4 className="title">{t("page.gain_friend.custom_chat")}</h4>
                                    <div className="frame-layout">
                                        <img
                                            className="facebook-rocket"
                                            src="images/newUser/rocket-fb.png"
                                        />
                                        <MobileFrame />
                                        <img
                                            className="fb-share"
                                            src="images/newUser/ig-share.png"
                                        />
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
        .title {
            margin-bottom: 8px;
        }
        .title-des {
            margin-bottom: 32px;
        }
        .header-title {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e1e1e1;
        }
        .flex-field {
            display: flex;
            align-items: center;
            .input-link {
                flex: 11;
            }
            .icon-copy {
                flex: 1;
                display: flex;
                justify-content: end;
            }
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
        .share-link {
            display: flex;
            column-gap: 30px;
            .frame-layout {
                position: relative;
                .facebook-rocket {
                    position: absolute;
                    top: 29px;
                    left: 6px;
                }
                .fb-share {
                    position: absolute;
                    bottom: 29px;
                    left: 6px;
                }
            }
        }
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .fb-share,
        .ig-share {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .card-wrap {
            .share-link {
                display: flex;
                column-gap: 30px;
                .frame-layout {
                    width: 120px;
                    svg {
                        width: 120px;
                        height: 240px;
                    }
                    .facebook-rocket {
                        width: 114px;
                        position: absolute;
                        top: 7px;
                        left: 3px;
                    }
                    .fb-share {
                        width: 114px;
                        position: absolute;
                        bottom: 8px;
                        left: 3px;
                    }
                }
            }
        }
    }
`;
