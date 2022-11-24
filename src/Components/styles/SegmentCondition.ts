import styled from "styled-components";

export const StyledSegmentCondition = styled.div`
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .button-field {
        display: flex;
        width: 100%;
        .btn-action {
            height: 49px;
            font-size: 16px;
            font-weight: 600;
            min-width: 118px;
            margin-right: 14px;
        }
        .btn-back {
            border-color: #e1e1e1;
            background-color: #e1e1e1;
            color: black;
        }
        .btn-cancel {
            border-color: black;
            color: black;
            :hover,
            :focus-within {
                border-color: black !important;
            }
        }
        .btn-save {
            color: white;
            border-color: #0263e0;
            background-color: #0263e0;
            flex: 1;
            :hover {
                border-color: #0263e0 !important;
            }
        }
    }

    .form-field {
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            display: none;
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
            padding: 17px;
            background-color: #f7f7f8;
            border-radius: 6px;
            .icon-add {
                align-self: center;
                cursor: pointer;
            }
        }
        .item-field {
            margin-bottom: 44px;
            h5 {
                margin-bottom: 14px;
                font-weight: 600;
                color: black;
                font-size: 16px;
            }
        }
    }
    .space {
        height: 60px;
    }
    .step-1 {
        .or-label {
            color: #a5a5a5;
            font-weight: 600;
            font-size: 14;
            text-transform: uppercase;
            margin: 14px 0;
        }
        .or-btn {
            background-color: #0263e0;
            color: white;
            font-size: 14;
            text-transform: uppercase;
            margin: 14px 0;
        }
    }
    .step-2 {
        .item-field {
            h5 {
                font-weight: 600;
                font-size: 16px;
            }
            .choose-item {
                cursor: pointer;
                background-color: #f7f7f8;
                border-radius: 4px;
                height: 50px;
                width: 100%;
                margin: 6px 0px;
                padding: 0 21px;
                display: flex;
                align-items: center;
                color: #646464;
                font-size: 16px;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
                overflow-wrap: anywhere;
                :hover {
                    background-color: #e9e9e9;
                }
            }
        }
    }
    .step-3 {
        .ant-radio-group {
            width: 100%;
        }
        .radio-field {
            margin-bottom: 24px;
            width: 100%;

            .input-with-tag {
                overflow: auto;
                ::-webkit-scrollbar {
                    display: none;
                }
                position: relative;
                display: flex;
                align-items: center;
                height: 49px;
                width: 100%;
                border: 1px #d9d9d9 solid;
                border-radius: 4px;
                z-index: 1;
                .tag {
                    position: relative;
                    margin: 5px;
                    background-color: #e1e1e1;
                    padding: 4px 10px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    white-space: nowrap;

                    .icon-remove {
                        margin-left: 6px;
                        cursor: pointer;
                    }
                }
            }
            input {
                width: 100%;
                min-width: 60px;
                height: 44px;
                font-size: 14px;
                border-width: 0px;
                border-color: transparent !important;
                :hover {
                    border-color: transparent;
                }
            }
        }
        .radio-field-date {
            margin-bottom: 24px;
            width: 100%;
            .date-input {
                width: 100%;
                height: 48px;
                input {
                    height: 48px;
                    background-color: #f7f7f8;
                }
            }
        }
        .radio-field-calender {
            margin-bottom: 24px;
            width: 100%;
            .ant-calendar-picker {
                width: 100%;
                height: 48px;
                .ant-calendar-picker-input {
                    height: 48px;
                }
            }
        }
        .radio-field-number {
            margin-bottom: 24px;
            width: 100%;
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            input[type="number"] {
                -moz-appearance: textfield; /* Firefox */
            }
            .input-number {
                height: 48px;
            }
        }
        .input-err {
            border-color: ${(p) => p.theme.colors.danger}!important;
            input,
            .ant-calendar-picker-input,
            .ant-select-selection--multiple {
                border-color: ${(p) => p.theme.colors.danger}!important;
            }
        }
        .select-multi-field {
            width: 100%;

            .ant-select-selection--multiple {
                height: ${(p) => p.theme.heights.input};
                display: flex;
                align-items: center;
                font-size: 16px;
            }
            input {
                height: 100%;
            }
        }
    }
    .item-show {
        display: flex;
        position: relative;
        flex-wrap: wrap;
        background-color: white;
        margin: 8px 0;
        border-radius: 6px;
        padding-right: 20px;
        cursor: pointer;
        :hover .btn-delete {
            visibility: visible;
        }
        div {
            margin: 5px 12px;
        }
        .title,
        .value {
            font-weight: 700;
            font-size: 16px;
            color: #646464;
        }
        .sub-key {
            font-weight: 400;
            font-size: 16px;
            color: #646464;
        }
        .btn-delete {
            visibility: hidden;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 10px;
            padding: 0 20px;
            margin-top: auto;
            margin-bottom: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 2;
        }
    }
`;
