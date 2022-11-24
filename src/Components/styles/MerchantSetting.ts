import styled from "styled-components";

export const StyledMerchantSetting = styled.div`
    padding-right: 0;
    /* height: calc(100vh - 50px); */
    height: 86vh;
    position: relative;
    display: flex;
    flex-direction: column;

    color: #000000;
    position: relative;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: 94vh;
    }
    .form-wrap {
        flex: 1;
        position: relative;
        height: 10vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    form {
        padding: 3.5rem;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            padding: 16px;
        }
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
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
    }
    .merchant_setting {
        font-style: normal;
        font-weight: bold;
        font-size: 35px;
        line-height: 1.5em;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
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
        width: 33px;
        height: 33px;
        background-color: #000000;
        border-radius: 50%;
        opacity: 0.29;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 110px;
        bottom: 0;
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
    .ground_qrcode {
        display: flex;
        align-items: flex-start;
        margin-bottom: 16px;
        .image {
            width: 200px;
            height: 200px;
            overflow: hidden;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                width: 100px;
                height: 100px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .qr-btn {
            padding: 6px 12px;
            font-size: 16px;
            margin-left: 16px;
        }
    }
    .group_link {
        display: flex;
        align-items: center;
        .copy {
            width: 22px;
            margin-left: 12px;
            position: relative;
            top: -7px;
        }
    }
    .desc_link {
        font-weight: normal;
        font-size: 12px;
        line-height: 1.5em;
        color: #646464;
        margin-top: -10px;
    }
    .visible-ms {
        display: block;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .visible-ms {
            display: none;
        }
        .title {
            margin-bottom: 20px;
        }
        .btn-layout {
            margin-bottom: 60px;
            margin-top: 30px;
            button {
                flex: 1;
            }
        }
    }
`;
