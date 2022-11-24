import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { SharedButtonSub } from "@components";
import { selectAuth, setFirstTimeUser, setProductUser, useAppSelector, selectApp } from "@redux";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
export const ModuleUserGuideModal = () => {
    // hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux state

    const isFirstTime = useSelector(selectAuth).firstTimeUser;
    const isFirstLogin = useSelector(selectAuth).auth?.isFirstLogin;
    const app = useAppSelector(selectApp);
    useEffect(() => {
        if (isFirstLogin) {
            dispatch(setFirstTimeUser(true));
        }
    }, [isFirstLogin]);

    const handleCancel = () => {
        dispatch(setFirstTimeUser(false));
        dispatch(setProductUser(true));
    };
    return (
        <StyledLayout
            mask={true}
            onCancel={handleCancel}
            footer={false}
            okText={t("page.upgrade")}
            visible={isFirstTime}
            // visible={true}
            centered={true}
            width={1200}
        >
            <div className="body-content">
                <StyledImageLayout>
                    {app.mobile ? (
                        <img src="/images/newUser/shop-mobile.png" />
                    ) : (
                        <img src="/images/newUser/service-info.png" />
                    )}
                </StyledImageLayout>
                <div className="desc">
                    <div>
                        <h4>{t("page.product_loyalty")}</h4>
                        <p>{t("page.product_loyalty_text")}</p>
                        <p>{t("page.product_loyalty_text_1")}</p>
                        <p>{t("page.product_loyalty_text_2")}</p>
                        <p>{t("page.product_loyalty_text_3")}</p>
                        <p>{t("page.product_loyalty_text_4")}</p>
                        <p>{t("page.product_loyalty_text_5")}</p>
                        <p>{t("page.product_loyalty_text_6")}</p>
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
    background: linear-gradient(180deg, #ff5e86 0%, #fa847d 100%);
    img {
        padding-top: 50px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        filter: initial;
        background: #fff;
        width: 100%;
        img {
            width: 100%;
            padding: 0;
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
