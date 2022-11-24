import { ILayout } from "@interfaces";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { selectApp } from "@redux";
import { IconLoadingPage } from "@components";
export const FullWidthLayout = (props: ILayout) => {
    const loading = useSelector(selectApp).loading;
    return (
        <>
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
                {props.children}
            </Spin>
        </>
    );
};
