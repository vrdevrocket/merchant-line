import styled from "styled-components";

export const StyledLogin = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        justify-content: initial;
        align-items: initial;
        height: initial;
        display: initial;
        height: initial;
    }
    .login-left-layout {
        flex: 3;
    }
    .login-layout {
        text-align: center;
        background-color: #fff;
        margin: 40px 90px;
        padding: 26px 44px;
        margin-bottom: 15px;
        border-radius: 12px;

        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            margin: 40px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            width: 100%;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            padding: 16px;
            margin: 0 0 16px 0;
            /* height: 100vh;
            overflow-y: scroll; */
        }
        .lang-layout {
            display: flex;
            justify-content: end;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin-bottom: 8px;
            }
        }
        .login-title {
            font-style: normal;
            font-weight: 600;
            font-size: 35px;
            line-height: 48px;
            margin: 10px 0;
            color: #000000;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin-top: 16px;
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
        .login {
            margin-bottom: 31px;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #a5a5a5;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin: 25px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                margin: 16px;
            }
        }
        .ant-form-item-label {
            width: 100% !important;
            text-align: left;
        }
        .ant-form-item {
            width: 450px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                width: 360px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakLarge}) {
                width: 300px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                width: 250px;
            }
            @media (max-width: 320px) {
                width: 200px;
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
        .ant-form-item-label > label {
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
        }

        input {
            border-color: #d9d9d9 !important;
            box-shadow: none !important;
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
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 16px;
            }
        }
        .main-color {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #a5a5a5;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 18px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 16px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
                margin: 12px 0;
            }
        }
        .flex-layout {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .forgot {
            margin: 13px 0;
            font-weight: bold;
            font-size: 16px;
            line-height: 21px;
            color: #646464;
            span {
                color: #f22f46;
                cursor: pointer;
                margin-left: 4px;
            }
        }

        .label__remember {
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            color: #646464;
            margin-bottom: 30px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 14px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 12px;
            }
        }
        .create {
            margin-top: 16px;
            .need-account {
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #a5a5a5;
                margin-right: 4px;
            }
            a {
                text-decoration: none;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #f22f46;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 16px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                font-size: 14px;
                /* padding-bottom: 26px; */
            }
        }
        .btn-login {
            margin-top: 8px;
        }
    }
`;
