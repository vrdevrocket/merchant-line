import { theme } from "@utils";
import styled from "styled-components";

export const StyledNewMerchantSetting = styled.div`
    /* padding-right: 0;
    height: calc(100vh - ${(p) => p.theme.header.height}); */
    position: relative;
    display: flex;
    flex-direction: column;

    color: #000000;
    position: relative;
    .form-layout {
        flex: 2;
    }

    .main-color {
        color: ${theme.colors.main};
    }
    .form-wrap {
        flex: 1;
        position: relative;
        height: 10vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .label_input {
            input {
                background: #ffffff;
                border: 0.5px solid #a5a5a5;
                box-sizing: border-box;
                border-radius: 5px;
            }
        }
    }
    form {
        /* padding: 3.5rem; */
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            padding: 1.5rem;
        }
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                display: none;
            }
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
        .card-wrap {
            margin-bottom: 28px;
        }
        .btn-layout {
            display: flex;
            justify-content: end;
            .btn-later {
                margin-right: 16px;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: black;
                border: 0;
                @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                    font-size: inherit;
                }
            }
            .btn-continue {
                font-weight: bold;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                border: 1px solid #0263e0;
                margin-right: 0;
            }
        }
    }
    .merchant_setting {
        font-style: normal;
        font-weight: bold;
        font-size: 35px;
        line-height: 1.5em;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        margin-top: ${(p) => p.theme.margins.pageHeader};
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            font-size: 28px;
            margin-bottom: 12px;
        }
    }
    .label_input,
    .you_are_on {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
    }
    .you_are_on {
        margin-bottom: 10px;
    }
    .change_password {
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #f22f46;
        cursor: pointer;
    }
    .switch_group {
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #646464;
        margin-top: 18px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin-top: 12px;
        }
    }
    .ant-switch {
        margin-right: 24px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            margin-right: 12px;
        }
    }
    .avatar-logo {
    }
    .avatar {
        margin-bottom: 42px;
        position: relative;
        .box_title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            p {
                margin: 0 4px 0 0;
            }
            button {
                padding: 0 4px;
                border: 0;
                background: transparent;
                height: auto;
            }
        }
    }
    .avatar .box_title {
        margin: 27px 0 20px 0px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5em;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 14px;
        }
    }
    .avatar-layout {
        position: relative;
        width: 110px;
        &:hover {
            .remove-icon-layout {
                visibility: visible;
            }
        }
    }
    .remove-icon-layout {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        visibility: hidden;
        display: flex;
        justify-content: end;
        padding: 8px;
    }
    .avatar .box_title span {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 1.5em;
        position: relative;
        top: -1px;
        display: inline-block;
        margin-left: 4px;
    }
    .avatar .camera {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.29;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 55px;
        bottom: 54px;
        -webkit-transform: translate(-50%, 50%);
        -ms-transform: translate(-50%, 50%);
        transform: translate(-50%, 50%);
        cursor: pointer;
    }
    .flex-field {
        display: flex;
        align-items: center;
        .input-link {
            flex: 1;
        }
        .icon-copy {
            margin-left: 1rem;
            cursor: pointer;
            :active {
                transform: scale(0.9);
            }
        }
    }

    .status-field {
        margin-top: 30px;
        display: flex;
        align-items: center;

        .title {
            font-weight: 600;
            font-size: 16px;
            color: black;
            margin-bottom: 0px;
            padding-right: 22px;
        }
    }
`;
