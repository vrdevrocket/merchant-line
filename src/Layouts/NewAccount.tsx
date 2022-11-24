import { useHistory, useLocation } from "react-router";
import { Layout, Spin } from "antd";
import styled from "styled-components";
import { BackArrow, LayoutCircle, LayoutSpot, IconLoadingPage, SwitchLang } from "@components";
import { useTranslation } from "react-i18next";
import {
    PATH_ACCOUNT_SUCCESS,
    PATH_CREATE_BUSINESS,
    PATH_LINE_LOGIN_SETTING,
    PATH_LINE_MESSAGE,
    PATH_LOYALTY_RULES,
    PATH_PREPARING_ACCOUNT,
    PATH_REWARD_LIST,
    PATH_USER_SIGNUP_METHOD,
} from "@configs";
import { useSelector } from "react-redux";
import { selectApp } from "@redux";
import { theme } from "@utils";
const { Sider, Content } = Layout;

interface IAppModuleLayout {
    children?: string | JSX.Element | JSX.Element[];
}

export const NewAccount = (props: IAppModuleLayout) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const { t } = useTranslation();
    const loading = useSelector(selectApp).loading;
    const handleGoBack = () => history.goBack();
    const PATH_VERIFY_CREATE_FORM = "/create-account-business";
    const noImageSidebar =
        pathname.includes(PATH_VERIFY_CREATE_FORM) ||
        pathname.includes(PATH_REWARD_LIST) ||
        pathname.includes(PATH_USER_SIGNUP_METHOD) ||
        pathname.includes(PATH_LOYALTY_RULES) ||
        pathname.includes(PATH_ACCOUNT_SUCCESS) ||
        pathname.includes(PATH_LINE_MESSAGE) ||
        pathname.includes(PATH_LINE_LOGIN_SETTING);
    const noBackButn =
        pathname.includes(PATH_VERIFY_CREATE_FORM) ||
        pathname.includes(PATH_ACCOUNT_SUCCESS) ||
        pathname.includes(PATH_LINE_MESSAGE);

    const noSmallSidebar =
        pathname.includes(PATH_CREATE_BUSINESS) || pathname.includes(PATH_LINE_LOGIN_SETTING);

    const noSwitchLang =
        pathname.includes(PATH_ACCOUNT_SUCCESS) || pathname.includes(PATH_PREPARING_ACCOUNT);
    return (
        <WrapperLayout>
            <Spin
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
                spinning={loading}
                size="large"
                indicator={<IconLoadingPage />}
            >
                <Layout className="scrollable-container">
                    <Layout className="new-account-layout">
                        <Sider
                            className={!noSmallSidebar ? "left-sider" : "left-sider-small"}
                            theme="light"
                        >
                            {!noBackButn && (
                                <StyledBackButton onClick={handleGoBack}>
                                    <BackArrow />
                                    <span>{t("page.back")}</span>
                                </StyledBackButton>
                            )}
                        </Sider>
                        <Content className="main-content">{props.children}</Content>
                        {noImageSidebar ? (
                            <Sider className="right-sider-small" theme="light">
                                {!noSwitchLang && (
                                    <StyledLangLayout>
                                        <SwitchLang />
                                    </StyledLangLayout>
                                )}
                            </Sider>
                        ) : (
                            <Sider className="right-sider" theme="light">
                                {!noSwitchLang && (
                                    <StyledLangLayout>
                                        <SwitchLang />
                                    </StyledLangLayout>
                                )}
                                <div className="cover" />
                                <div className="layout-spot">
                                    <LayoutSpot />
                                </div>
                                <div className="layout-circle">
                                    <LayoutCircle />
                                </div>
                            </Sider>
                        )}
                    </Layout>
                </Layout>
            </Spin>
        </WrapperLayout>
    );
};
const StyledLangLayout = styled.div`
    position: absolute;
    top: 30px;
    right: 38px;
    @media (max-width: ${theme.breakPoints.breakTablet}) {
        top: 21px;
        right: 21px;
    }
`;
const StyledBackButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80px;
    background: #fff;
    border: 0;
    padding: 0;
    margin: auto;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    color: #000000;
    span {
        padding-left: 4px;
    }
    &:hover {
        color: ${theme.colors.primary};
        svg {
            path {
                stroke: ${theme.colors.primary};
            }
        }
    }
`;
const WrapperLayout = styled.div`
    /* min-height: 100vh; */
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    overflow-y: scroll;
    .ant-spin-nested-loading {
        width: 100%;
        height: 100%;
        .ant-spin-container {
            height: 100%;
        }
    }
    .new-account-layout {
        height: 100%;
        min-height: 100vh;
        .left-sider {
            width: 20% !important;
            max-width: 20% !important;
            min-width: 20% !important;
            flex: auto !important;
            padding-top: 120px;
        }
        .left-sider-small {
            width: 17% !important;
            max-width: 17% !important;
            min-width: 17% !important;
            flex: auto !important;
            padding-top: 120px;
        }
        .right-sider {
            width: 16% !important;
            max-width: 16% !important;
            min-width: 16% !important;
            flex: auto !important;
            .cover {
                background: linear-gradient(352.72deg, #e61136 4.56%, #ffc2c3 160.58%);
                width: 100%;
                height: 100%;
                /* svg {
                    width: 100%;
                } */
            }
            .layout-spot {
                position: absolute;
                top: 20%;
                right: 0;
                opacity: 0.7;
            }
            .layout-circle {
                position: absolute;
                right: 0px;
                bottom: 0;
                height: 309px;
            }
        }
        .right-sider-small {
            width: 7% !important;
            max-width: 7% !important;
            min-width: 7% !important;
            flex: auto !important;
        }
    }
    .ant-layout-header {
        background: #fff;
        padding: 0;
    }
    .main-content {
        padding-top: 120px;
        background: #fff;
        .main-content-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    .ant-layout-footer {
        background: #fff;
        padding: 0;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        .new-account-layout {
            height: 100%;
            min-height: 100vh;
            .left-sider {
                width: 0% !important;
                max-width: 0% !important;
                min-width: 0% !important;
                flex: auto !important;
                padding-top: 0px;
            }
            .left-sider-small {
                width: 0% !important;
                max-width: 0% !important;
                min-width: 0% !important;
                flex: auto !important;
                padding-top: 0px;
            }
            .right-sider {
                width: 0% !important;
                max-width: 0% !important;
                min-width: 0% !important;
                flex: auto !important;
                .cover {
                    background: linear-gradient(352.72deg, #e61136 4.56%, #ffc2c3 160.58%);
                    width: 100%;
                    height: 100%;
                    /* svg {
                    width: 100%;
                } */
                }
                .layout-spot {
                    position: absolute;
                    top: 20%;
                    right: 0;
                    opacity: 0.7;
                }
                .layout-circle {
                    position: absolute;
                    right: 0px;
                    bottom: 0;
                    height: 309px;
                }
            }
            .right-sider-small {
                width: 0% !important;
                max-width: 0% !important;
                min-width: 0% !important;
                flex: auto !important;
            }
        }
        .main-content {
            padding-top: 00px;
            background: #fff;
        }
    }
`;
