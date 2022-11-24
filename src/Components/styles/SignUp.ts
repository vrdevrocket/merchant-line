import styled from "styled-components";

export const StyledSignUp = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
        /* flex-direction: column; */
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        justify-content: unset;
        align-items: unset;
        height: initial;
        display: initial;
    }
    .signup-left-layout {
    }
    .signup-layout {
        text-align: center;
        background-color: #fff;
        margin: 40px 90px;
        padding: 26px 44px;
        margin-bottom: 16px;
        border-radius: 12px;
        /* height: 80vh; */

        @media (max-width: ${(p) => p.theme.breakPoints.break14Laptop}) {
            margin: 40px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) {
            /* margin: 40px; */
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            /* margin: 40px; */
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            width: 100%;
            height: 100%;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            padding: 16px;
            margin: 0;
            margin-bottom: 16px;
        }

        .lang-layout {
            display: flex;
            justify-content: end;
            margin-bottom: 30px;
            .web-logo {
                display: block;
            }
            .m-logo {
                display: none;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;

                .m-logo {
                    display: block;
                    svg {
                        width: 32px;
                        height: 32px;
                    }
                }
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            .web-logo {
                display: none;
            }
        }
        .signup-title {
            font-style: normal;
            font-weight: 600;
            font-size: 35px;
            line-height: 48px;
            margin: 10px 0;
            color: #000000;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin-top: 16px;
                font-style: normal;
                font-weight: 700;
                font-size: 26px;
                line-height: 35px;
                color: #000000;
            }
        }
        .welcome-text {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #646464;
        }
        .sign_up {
            margin-bottom: 30px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin: 25px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin: 16px;
                display: none;
            }
        }
        .ant-form-item-label {
            width: 100% !important;
            text-align: left;
        }
        .ant-form-item {
            width: 450px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                width: 100%;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakLarge}) {
                width: 100%;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                width: 100%;
            }
            @media (max-width: 320px) {
                width: 100%;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
                width: 100%;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                input {
                    height: 48px;
                }
            }
        }
        input {
            border-color: #d9d9d9 !important;
            box-shadow: none !important;
        }
        .ant-form-item-label > label {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
        }
        .ant-input {
            height: ${(p) => p.theme.heights.input};
            font-weight: 600;
            font-size: 20px;
            line-height: 27px;
            color: #000;
            padding: 15px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 18px;
                height: 45px;
                padding: 10px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
                font-size: 16px;
            }
        }
        .main-color {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 27px;
            color: #a5a5a5;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 18px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
                font-size: 16px;
            }
        }
        .log_in {
            margin-top: 22px;
            text-decoration: none;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #f22f46;
            .have-account {
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #a5a5a5;
                margin-right: 4px;
            }
            cursor: pointer;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 18px;
                margin-top: 25px;
                /* margin-bottom: 26px; */
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
                font-size: 16px;
                margin-top: 20px;
            }
        }
        .term_condition {
            display: flex;
            align-items: baseline;
            input {
                flex: 1;
            }
            p {
                flex: 16;
                text-align: initial;
                a {
                    text-decoration: none;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    color: #646464;
                    .color-blue {
                        color: #0263e0;
                    }
                }
            }
        }
    }
`;
