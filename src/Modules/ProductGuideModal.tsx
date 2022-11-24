import { Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { SharedButtonSub, SharedInput, IconCopy, CheckIcon } from "@components";
import {
    selectAuth,
    setFirstTimeUser,
    setProductUser,
    useAppSelector,
    selectApp,
    setMobileDrawer,
} from "@redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";
import { copyText } from "@utils";
import { LOU_ID, PATH_HOME_NEW } from "@configs";
import { useHistory } from "react-router";

export const ModuleProductGuideModal = () => {
    // hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux state
    const [isCopied, setIsCopied] = useState(false);
    const productUser = useSelector(selectAuth).productUser;
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const history = useHistory();
    const app = useAppSelector(selectApp);
    const clientLink = merchantId
        ? `${process.env.REACT_APP_CLIENT_URL}/client-link/${merchantId}`
        : t("page.empty_text");
    const handleCancel = () => {
        if (app.mobile) {
            dispatch(setMobileDrawer(true));
        }
        dispatch(setProductUser(false));
        dispatch(setFirstTimeUser(false));
        // @ts-ignore
        LOU.startTour(LOU_ID, false);
        history.push(PATH_HOME_NEW);
    };
    const handleCopyText = useCallback(() => {
        copyText(clientLink, () => showTooltipCopy());
    }, []);
    const showTooltipCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
    };
    return (
        <StyledLayout
            mask={true}
            onCancel={handleCancel}
            footer={false}
            okText={t("page.upgrade")}
            visible={productUser}
            // visible={true}
            centered={true}
            width={1200}
        >
            <div className="body-content">
                <StyledImageLayout>
                    {app.mobile ? (
                        <img src="/images/newUser/product-guide-mobile.png" />
                    ) : (
                        <img src="/images/newUser/product-guide.png" />
                    )}
                </StyledImageLayout>
                <div className="desc">
                    <div>
                        <h4>{t("page.product_point")}</h4>
                        <p>{t("page.product_point_1")}</p>
                        <p>{t("page.product_point_2")}</p>
                        <p>{t("page.product_point_3")}</p>
                        <p>{t("page.product_point_4")}</p>
                        <p>{t("page.product_point_5")}</p>
                        {/* <p>{t("page.product_loyalty_text_5")}</p>
                        <p>{t("page.product_loyalty_text_6")}</p> */}
                        <div className="flex-field">
                            <SharedInput
                                notErr={true}
                                parentClassName="input-link"
                                disable={true}
                                value={clientLink}
                            />
                            <Tooltip title={isCopied ? t("message.copied") : t("message.copy")}>
                                <button
                                    className={isCopied ? "icon-copied" : "icon-copy"}
                                    onClick={handleCopyText}
                                >
                                    {isCopied ? <CheckIcon /> : <IconCopy />} {t("page.copy_link")}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="content-footer">
                        <SharedButtonSub
                            onClick={handleCancel}
                            text={t("page.continue")}
                            type="default"
                        />
                    </div>
                </div>
            </div>
        </StyledLayout>
    );
};
const StyledImageLayout = styled.div`
    width: 767px;
    flex: 3;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background: linear-gradient(180.47deg, #ffc042 0.39%, #ffdd99 99.58%);
    img {
        padding-top: 50px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        filter: initial;
        background: #fff;
        width: 100%;
        height: 100%;
        img {
            padding: 0;
            width: 100%;
            height: 100%;
        }
    }
`;
const StyledLayout = styled(Modal)`
    .ant-modal-content {
        border-radius: 16px;
        .ant-modal-body {
            padding: 50px 32px 50px 0 !important;

            .body-content {
                min-height: 538px;
                display: flex;
                justify-content: space-between;
                /* flex-direction: row; */
                column-gap: 32px;
                .desc {
                    flex: 2;
                    flex-direction: column;
                    justify-content: space-between;

                    display: flex;
                    h4 {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 35px;
                        line-height: 48px;
                        color: #000000;
                        margin-bottom: 20px;
                    }
                    p {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 16px;
                        line-height: 22px;
                        color: #a5a5a5;
                    }
                    .flex-field {
                        display: flex;
                        column-gap: 10px;

                        .input-link {
                            flex: 2;
                        }
                        .icon-copy {
                            flex: 1;
                            height: 48px;
                            background: #0263e0;
                            border-radius: 8px;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                            border-color: #0263e0;
                            outline: 0;
                            color: #fff;
                            font-weight: bold;
                            border: 1px solid transparent;
                            svg {
                                path {
                                    stroke: #fff;
                                }
                            }
                        }
                        .icon-copied {
                            flex: 1;
                            height: 48px;
                            background: #6cd14e;
                            border-radius: 8px;
                            flex-direction: row;
                            justify-content: center;
                            align-items: center;
                            border-color: #6cd14e;
                            outline: 0;
                            color: #fff;
                            font-weight: bold;
                            border: 1px solid transparent;
                            svg {
                                path {
                                    stroke: #fff;
                                }
                            }
                        }
                    }
                }

                .content-footer {
                    display: flex;
                    justify-content: end;
                }
            }
        }
    }
    .ant-modal-close {
        display: none;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .ant-modal-content {
            .ant-modal-body {
                padding: 20px !important;
                .body-content {
                    /* min-height: 538px; */
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    row-gap: 20px;
                    align-items: center;
                    .desc {
                        flex: 2;
                        flex-direction: column;
                        justify-content: space-between;
                        row-gap: 40px;
                        display: flex;
                        h4 {
                            font-style: normal;
                            font-weight: 700;
                            font-size: 20px;
                            line-height: 27px;
                            color: #000000;
                        }
                        p {
                            font-style: normal;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 22px;
                            color: #a5a5a5;
                        }
                    }

                    .content-footer {
                        display: flex;
                        justify-content: end;
                    }
                }
            }
        }
    }
`;
