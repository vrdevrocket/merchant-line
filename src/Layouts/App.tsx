import { Layout, Spin } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {
    StyledContainer,
    ComponentHeader,
    ComponentSidebar,
    IconLoadingPage,
    ComponentMenuHeader,
    StyledPageInner,
    ProfileSidebar,
} from "@components";
import { selectApp, useAppSelector } from "@redux";
import { ILayout } from "@interfaces";

export const LayoutApp = (props: ILayout) => {
    const loading = useSelector(selectApp).loading;
    const app = useAppSelector(selectApp);
    return (
        <StyledContainer>
            <ComponentHeader />
            {!app.mobile && <ComponentMenuHeader />}
            <Layout className="workspace">
                <StyledSideBar>
                    <ComponentSidebar
                        sidebarTheme={"light"}
                        sidebarMode={"inline"}
                        sidebarIcons={true}
                        collapsed={false}
                    />
                </StyledSideBar>
                <ProfileSidebar
                    sidebarTheme={"light"}
                    sidebarMode={"inline"}
                    sidebarIcons={true}
                    collapsed={false}
                />
                <Layout>
                    <Layout.Content>
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
                            <StyledPageInner>{props.children}</StyledPageInner>
                        </Spin>
                    </Layout.Content>
                </Layout>
            </Layout>
        </StyledContainer>
    );
};

const StyledSideBar = styled.div`
    box-shadow: 1px 3px 6px rgba(162, 162, 162, 0.161);
    z-index: 10;

    .menu-item-text {
        font-weight: 700;
        font-size: 16px;
        color: ${(p) => p.theme.colors.black}!important;
        &:hover {
            color: ${(p) => p.theme.colors.black}!important;
        }
        .sub-item-text a {
            color: #646464 !important;
            font-weight: 400;
            font-size: 16px;
        }
    }
    .menu-after {
        &::after {
            display: flex;
            content: "";
            width: 100%;
            height: 1px;
            background-color: #e1e1e1;
            margin: 16px auto;
        }
    }
    .menu-after.pricing_features {
        &::after {
            /* height: 0; */
        }
    }
    .menu-after.loyalty {
        &::after {
            /* height: 0; */
        }
    }
    /* .menu-after.set_theme {
        &::after {
            height: 0;
        }
    } */
    .menu-after.contacts_title {
        &::after {
            height: 0;
        }
    }
`;
