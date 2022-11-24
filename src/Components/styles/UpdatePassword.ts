import styled from "styled-components";

export const StyledUpdatePassword = styled.div`
    .main-color {
        color: #000;
    }
    .title_welcome {
        text-align: center;
        font-weight: 600;
        font-size: 35px;
        line-height: 47px;
        margin-bottom: 10px;
        max-width: 450px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 25px;
            margin: 25px;
            margin-bottom: 20px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 20px;
            max-width: 250px;
            margin-bottom: 15px;
        }
    }
    .signing {
        font-weight: normal;
        font-size: 20px;
        line-height: 27px;
        color: #000000;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-bottom: 50px;
        max-width: 450px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            max-width: 250px;
            margin-bottom: 30px;
        }
        @media (max-height: 720px) {
            margin-bottom: 12px;
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
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
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
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
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
        font-weight: 400;
        font-size: 16px;
        line-height: 21px;
        color: #646464;
        margin-bottom: 30px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 14px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
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
        margin-top: 40px;
        span {
            color: #f22f46;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 18px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 16px;
        }
    }
    .btn-continue {
        margin-top: 25px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin-top: 20px;
        }
    }
`;
