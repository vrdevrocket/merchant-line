import { theme } from "@utils";
import styled from "styled-components";

export const StyledContentNew = styled.div<{ notImage?: boolean }>`
    /* background-color: #fff; */
    position: relative;
    padding: ${(p) => (p.notImage ? "0 !important" : "initial")};
    /* padding: 80px 200px; */
    /* width: 100%; */
    height: 100%;
    max-width: 1170px;
    margin: auto;
    padding-top: 80px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 40px 50px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 20px 30px;
    }
`;
export const StyledNewWrapper = styled.div<{ notImage?: boolean }>`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #fff;
    /* background: ${(p) => (p.notImage ? "#fff" : 'url("/images/backgroundAuth.png")')}; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    overflow-y: scroll;
    .bg-image__leftBottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 419px;
        height: 321px;
        object-fit: cover;
        @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
            width: 300px;
            height: 230px;
        }
    }
    .bg-image__rightBottom {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 483px;
        height: 360px;
        object-fit: cover;
        @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
            width: 345px;
            height: 268px;
        }
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
        background-image: initial;
    }
`;
export const FormWrapper = styled.div`
    max-width: 680px;
    margin: auto;
    @media (max-width: ${theme.breakPoints.breakTablet}) {
        margin: initial;
        max-width: initial;
    }
    .form-item {
        .label {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: ${theme.colors.black};
            margin-bottom: 10px;
            .color {
                color: ${theme.colors.main};
            }
        }
        .input-field {
            margin-bottom: 32px;
            &.select-layout {
                display: flex;
                @media (max-width: ${theme.breakPoints.breakTablet}) {
                    max-width: 411px;
                    overflow-x: scroll;
                    padding: 10px 0;
                }
            }
            .new-account-input {
                input {
                    border-radius: 6px;
                    ::placeholder {
                        color: ${theme.colors.text};
                    }
                }
            }
            .ant-select-selection--single {
                height: 100%;
            }
            .ant-select-selection__rendered {
                height: 48px;
                display: flex;
                align-items: center;
            }
            .error {
                text-align: left;
                color: #f43f3f;
                visibility: visible;
                font-size: 11px;
                font-weight: 700;
            }
        }
    }
    .two-col {
        display: flex;
        justify-content: space-between;
        @media (max-width: ${theme.breakPoints.breakTablet}) {
            flex-direction: column;
        }
        .left {
            flex: 1;
            margin-right: 10px;
            @media (max-width: ${theme.breakPoints.breakTablet}) {
                margin-right: 0;
            }
        }
        .right {
            flex: 1;

            @media (max-width: ${theme.breakPoints.breakTablet}) {
                margin-left: 0;
            }
        }
    }
    .btn-layout {
        display: flex;
        justify-content: end;
        margin-top: 16px;
        margin-bottom: 60px;
        .btn-later {
            margin-right: 16px;
        }
        .btn-continue {
            font-weight: bold;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            border: 1px solid #0263e0;
            margin-right: 0;
            @media (max-width: ${theme.breakPoints.breakTablet}) {
                max-width: 100%;
                width: 100%;
            }
        }
    }
    .select-theme {
        display: flex;
        flex-wrap: wrap;
        column-gap: 16px;
        row-gap: 16px;
        .picker-container {
            width: 100%;
            background: #f4f4f4;
            padding: 20px;
        }
    }
    .agree-terms {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;

        .read-more {
            color: #0263e0;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
    }
`;
