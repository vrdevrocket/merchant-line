import styled from "styled-components";

export const StyledForgotPassword = styled.div`
    position: relative;
    background: #f7f7f8;
    text-align: center;
    max-width: 80vw;
    margin: auto;
    .main-color {
        color: #000;
    }
    .recover_password {
        text-align: center;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 33px;
        margin-bottom: 50px;
        max-width: 450px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 20px;
            margin: 25px;
            margin-bottom: 20px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 20px;
            max-width: 180px;
            margin-bottom: 15px;
        }
    }
    input {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
    }
    .close {
        cursor: pointer;
        position: absolute;
        top: -30px;
        right: -55px;
        width: 20px;
        height: 20px;
        object-fit: cover;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            top: -10px;
            right: -35px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            top: -20px;
            right: -5px;
        }
    }
    .signing {
        font-weight: normal;
        font-size: 20px;
        line-height: 27px;
        color: #000000;
        text-align: center;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 50px;
        max-width: 450px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            max-width: 250px;
            margin-bottom: 30px;
        }
    }
    .return_login {
        font-size: 16px;
        font-weight: 700;
        color: black;
        text-align: center;
        margin: 16px auto;
        cursor: pointer;
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
            width: 230px;
        }
    }
    .ant-form-item-label > label {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #a5a5a5;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 14px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 12px;
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
    .custom_btn {
        margin-top: 50px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            margin-top: 30x;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            height: 45px !important;
            margin-top: 20px;
        }
    }
`;
