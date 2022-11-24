import styled from "styled-components";

export const StyledLoyaltyDetail = styled.div`
    padding-right: 0;
    display: flex;
    flex-direction: column;
    height: 84vh;
    position: relative;

    .page-header {
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        h3 {
            margin-right: 44px;
            font-weight: 700;
            font-size: 35px;
            margin-bottom: 0;
            color: black;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                font-size: 28px;
            }
        }
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
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            padding: 16px;
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
        .page-body {
            .card-wrap {
                margin-bottom: 28px;

                /*  variant-reward */
                .variants-field {
                    .variant-items {
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .title {
                        font-style: normal;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 21px;
                        color: #000000;
                        margin-bottom: 8px;
                        display: inline-block;
                    }
                    .variant-wrap {
                        display: flex;
                        align-items: center;
                        width: fit-content;
                        position: relative;
                        margin-right: 2px;
                        .icon {
                            display: none;
                            /* visibility: hidden; */
                            cursor: pointer;
                            /* position: absolute;
                            right: 12px; */
                            margin-right: 12px;
                        }
                        :hover .icon {
                            display: block;
                            /* visibility: visible; */
                        }
                        .variant-item {
                            min-width: 92px;
                            max-width: 120px;
                            overflow: hidden;
                            background-color: #e1e1e1;
                            cursor: inherit;
                            /* margin: 7px 7px 7px 0; */
                            margin: 7px 5px 7px 0;
                            padding: 10px;
                            padding-right: 18px;
                            font-size: 16px;
                            border-radius: 6px;
                            text-align: center;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: 600;
                            box-shadow: 0 0px 1px rgba(0, 0, 0, 0.1), 0 0px 1px rgba(0, 0, 0, 0.1);
                        }
                    }
                    margin-top: 30px;
                    .button-variant-add {
                        border: 1px solid #646464;
                        min-width: 92px;
                        font-size: 16px;
                        margin-top: 10px;
                        height: 40px;
                        color: #646464;
                        border-color: #646464 !important;
                    }
                }
                //
            }
            .ck-editor__editable {
                min-height: 300px;
            }
            .err-input {
                input {
                    border-color: ${(p) => p.theme.colors.danger};
                }
                .ant-select-selection--multiple {
                    border-color: ${(p) => p.theme.colors.danger};
                }
                :hover,
                :focus input {
                    border-color: ${(p) => p.theme.colors.danger};
                }
            }
            .err-text {
                text-align: left;
                color: #f43f3f;
                visibility: visible;
                font-size: 11px;
                font-weight: 700;
            }
            .date-picker-field {
                p {
                    color: black;
                    font-size: 16px;
                    margin-bottom: 11px;
                }
                .col-item {
                    margin: 11px 0;
                }
                .ant-calendar-picker {
                    width: 100%;
                    input {
                        color: #6c7084;
                        font-size: 16px;
                    }
                    .ant-calendar-picker-input {
                        height: ${(p) => p.theme.heights.input};
                    }
                }
                .ant-time-picker {
                    width: 100%;
                    .ant-time-picker-input {
                        height: ${(p) => p.theme.heights.input};
                        :hover,
                        :focus-within,
                        :focus {
                            border-color: transparent;
                        }
                    }
                }
            }
            .button-field {
                display: flex;
                .button {
                    height: ${(p) => p.theme.heights.button};
                    min-width: 117px;
                }
                .button-save {
                    background-color: ${(p) => p.theme.colors.primary};
                    color: white;
                    margin-right: 10px;
                    :hover,
                    :focus-within {
                        border-color: ${(p) => p.theme.colors.primary}!important;
                    }
                }
                .button-cancel {
                    color: black;
                    border-color: black;
                    :hover,
                    :focus-within {
                        border-color: black !important;
                    }
                }
            }
            .switch-field {
                display: flex;
                align-items: center;
                margin-bottom: 32px;
                p {
                    color: black;
                    font-size: 16px;
                    font-weight: 600;
                    margin-right: 26px;
                }
            }
            .date {
                margin-top: 50px;
                margin-bottom: 16px;
                @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                    margin-top: 42px;
                }
                .label {
                    margin-bottom: 24px;
                }
                .date_ground {
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                        display: block;
                    }
                    .date_from_to {
                        display: inline-block;
                        min-width: 100px;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 16px;
                        line-height: 1.5em;
                        color: #000000;
                        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                            font-size: 14px;
                        }
                        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                            margin-bottom: 24px;
                        }
                    }
                }
            }
            .label {
                /* margin-bottom: 1rem; */
            }
            .for-custom-margin {
                margin-bottom: 20px;
            }
        }
    }

    // other
    .group_link {
        display: flex;
        align-items: center;
        .copy {
            width: 22px;
            margin-left: 12px;
            position: relative;
            top: -7px;
            cursor: pointer;
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
    }
    .desc_link {
        font-weight: normal;
        font-size: 12px;
        line-height: 1.5em;
        color: #646464;
        margin-top: -10px;
    }
    .mb-22 {
        margin-bottom: 22px;
    }
    .mb-6 {
        margin-bottom: 6px;
    }
    // update
    .display-coupon {
        width: 100%;
        overflow-wrap: break-word;
        .title {
            margin-bottom: 1rem;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
        }
        .sub-title {
            margin: 0.75rem 0 1rem 0;
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
            color: #000000;
            overflow-wrap: break-word;
            color: rgba(0, 0, 0, 0.4);
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: calc(100vh - 48px);
        .page-header {
            margin-bottom: 16px;
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 18px;
                line-height: 22px;
                color: #000000;
            }
            p {
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #646464;
            }
            div:nth-child(2) {
                margin-top: 0;
            }
        }
        .page-body {
            .title {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin-bottom: 20px;
            }
            .card-wrap {
                .variants-field {
                    .label {
                        .title {
                            font-style: normal;
                            font-weight: 700;
                            font-size: 14px;
                            line-height: 19px;
                            color: #000000;
                            margin: 0;
                        }
                    }
                    .variant-layout {
                        display: flex;
                        align-items: center;
                        .button-variant-add {
                            margin: 0;
                        }
                    }
                }
            }
        }
        .btn-layout {
            margin-bottom: 60px;
        }
    }
`;
