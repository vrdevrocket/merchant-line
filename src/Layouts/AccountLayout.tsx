import { Layout, Spin } from "antd";
// import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectApp } from "@redux";

import { StyledContainer, StyledPageInner, IconLoadingPage } from "@components";
import { ILayout } from "@interfaces";
// import { enumTheme } from "@configs";

export const AccountLayout = (props: ILayout) => {
    const loading = useSelector(selectApp).loading;
    return (
        <StyledContainer>
            <Layout className="workspace">
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
