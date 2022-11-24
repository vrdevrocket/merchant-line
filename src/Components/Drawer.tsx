import { Drawer, Spin } from "antd";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { SharedButtonDefault, IconLoadingDrawer } from "@components";
import { useWindowDimensions } from "@utils";
import { enumDrawerPlacement } from "@configs";

interface IProps {
    children?: JSX.Element | JSX.Element[];
    title: string | JSX.Element;
    placement: enumDrawerPlacement;
    handleSubmit?: () => void;
    spinning?: boolean;
    visible: boolean;
    handleClose: () => void;
    isSubmitting?: boolean;
    customButton?: JSX.Element | JSX.Element[] | undefined;
}
export const ComponentDrawer = (props: IProps) => {
    // page hook
    const { t } = useTranslation();
    // page variable
    const { width } = useWindowDimensions();
    const defaultWidth = 530;
    const {
        children,
        handleClose,
        handleSubmit,
        isSubmitting,
        title,
        visible,
        spinning,
        customButton,
        placement,
    } = props;

    return (
        <Drawer
            title={title}
            width={width <= defaultWidth ? width : defaultWidth}
            visible={visible}
            onClose={handleClose}
            placement={placement}
            bodyStyle={{ height: "90%", padding: 40 }}
            style={{ maxWidth: "100vw" }}
            height={placement === enumDrawerPlacement.BOTTOM ? "84vh" : "100vh"}
        >
            <StyledContainer>
                <Spin
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    spinning={spinning ? true : false}
                    indicator={<IconLoadingDrawer />}
                >
                    <div className="drawer-inner">
                        <div className="form-field">{children}</div>
                        <div className="button-field">
                            {customButton || (
                                <>
                                    {" "}
                                    <SharedButtonDefault
                                        style={{
                                            background: "#0263E0",
                                            width: 110,
                                            marginRight: 14,
                                            color: "white",
                                            fontSize: 16,
                                            padding: 14,
                                            fontWeight: 600,
                                            height: 49,
                                        }}
                                        text={t("page.save")}
                                        type="default"
                                        size="default"
                                        onClick={handleSubmit}
                                        className="primary-btn"
                                        disable={isSubmitting}
                                    />
                                    <SharedButtonDefault
                                        style={{
                                            color: "black",
                                            width: 110,
                                            background: "white",
                                            borderColor: "black",
                                            fontSize: 16,
                                            padding: 14,
                                            fontWeight: 600,
                                            height: 49,
                                        }}
                                        text={t("page.cancel")}
                                        type="default"
                                        size="default"
                                        onClick={handleClose}
                                        className="default-btn"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </Spin>
            </StyledContainer>
        </Drawer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-width: 100vw;
    .drawer-inner {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        max-width: 100vw;
    }
    .ant-spin-nested-loading {
        height: 100%;
        .ant-spin-container {
            height: 100%;
        }
    }
    .primary-btn:hover {
        color: white !important;
    }
    .default-btn:hover {
        border-color: black !important;
        color: black !important;
    }
    .button-field {
        display: flex;
    }

    .form-field {
        margin-bottom: 10px;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        ::-webkit-scrollbar {
            width: 5px;
            height: 5px;
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
        .form-input {
            margin-bottom: 20px;
            p {
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: 600;
                color: black;
            }
            h4 {
                color: black;
                font-size: 20px;
                font-weight: 600;
            }
            .ant-radio-wrapper {
                span {
                    font-size: 16px;
                    font-weight: 600;
                }
                .ant-radio-inner {
                    width: 19px;
                    height: 19px;
                    border-color: ${(p) => p.theme.colors.fadedText};
                    &::after {
                        width: 11px;
                        height: 11px;
                    }
                }
            }
        }
        .flex-field {
            display: flex;
            justify-content: center;
            align-items: center;
            .flex-1 {
                flex: 1;
            }
            .right-icon {
                margin-left: 12px;
                cursor: pointer;
            }
        }
        .data-field {
            display: flex;
            flex-direction: column;
            .icon-add {
                align-self: center;
                cursor: pointer;
            }
        }
        .input-with-search {
            font-size: 16px;
            width: 100%;
            .ant-select-selection__rendered {
                height: ${(p) => p.theme.heights.input};
                display: flex;
                align-items: center;
            }
            .ant-select-selection--single {
                height: ${(p) => p.theme.heights.input};
            }
            .ant-select {
                height: 100%;
            }
        }
    }
    /* import  export drawer */
    .page-import-export {
        .field-import,
        .field-export {
            position: relative;
            border: 2px solid rgb(183 183 183 / 92%);
            border-radius: 6px;
            margin-bottom: 20px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            svg {
                width: 48px;
                height: 48px;
                fill: #635d5d;
                margin-bottom: 16px;
            }
            .title {
                color: #272727;
                font-size: 18px;
                font-weight: 600;
            }
            .content {
                font-weight: 500;
            }
        }
        .input-import {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }
        .err-text {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            font-weight: 600;
            color: ${(p) => p.theme.colors.danger};
        }
        .border-red {
            border: 1px solid ${(p) => p.theme.colors.danger};
        }
    }
    .page-import-step-2 {
        .btn-download-template {
            width: 200px;
            margin: 10px 0;
            height: auto;
            font-size: 16px;
            padding: 8px 0;
            color: white !important;
            background-color: green;
        }
        .btn-import-file {
            width: 100%;
            margin: 10px 0;
            background-color: ${(p) => p.theme.colors.primary};
            color: white !important;
            font-size: 16px;
            padding: 8px 0;
            height: auto;
        }
    }
`;
