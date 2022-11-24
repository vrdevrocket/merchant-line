import styled from "styled-components";

export const StyledCreatePassword = styled.div`
    text-align: center;
    .lang-switch {
        position: absolute;
        top: 38px;
        right: 38px;
    }
    .password-icon-layout {
        svg {
            height: 138px;
        }
    }
    &::-webkit-scrollbar {
        display: none;
    }
    .main-color {
        color: #000;
    }
    .title_welcome {
        text-align: center;
        line-height: 47px;
        margin-bottom: 10px;
        max-width: 450px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 30px;
        font-weight: 700;
        font-size: 35px;
        line-height: 48px;
        color: #000000;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 25px;
            margin: 25px;
            margin-bottom: 20px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            max-width: 190px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 20px;
            max-width: 100%;
            margin-bottom: 15px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakSmall}) {
            max-width: 160px;
        }
    }
    .signing {
        font-weight: normal;
        font-size: 20px;
        line-height: 27px;

        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 35px;
        max-width: 450px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #a5a5a5;
        .email {
            color: #5c5b5b;
            font-weight: bold;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            max-width: 190px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            max-width: 100%;
            margin-bottom: 30px;
        }
        @media (max-height: 720px) {
            margin-bottom: 12px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakSmall}) {
            max-width: 160px;
        }
    }
    .ant-form-item-label {
        width: 100% !important;
        text-align: left;
    }
    .ant-form-item {
        width: 450px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            width: 250px;
        }
        @media (max-width: 320px) {
            width: 200px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            width: 100%;
        }
    }
    .ant-form-item-label > label {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        font-weight: 600;
        color: #000;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 18px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 16px;
        }
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
    .forgot {
        margin-top: 13px;
        font-weight: bold;
        font-size: 16px;
        line-height: 21px;
        color: #646464;
        span {
            color: #f22f46;
        }
    }
    .label__remember {
        font-weight: bold;
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
    .login_instead {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        font-weight: bold;
        color: #000;
        text-align: center;
        margin-top: 26px;
        span {
            color: #f22f46;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 18px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 16px;
        }
        .instead {
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #a5a5a5;
        }
    }
    .btn-continue {
        margin-top: 25px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin-top: 20px;
        }
    }
    button {
        font-weight: bold;
    }
    .btn-layout {
        margin-top: 32px;
    }
`;
