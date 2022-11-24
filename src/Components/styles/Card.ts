import styled from "styled-components";

export const StyledCard = styled.div<{ maxWidth?: string }>`
    padding: 3.5rem;
    border-radius: 4px;
    background-color: white;
    max-width: 760px;
    max-width: ${(p) => p.maxWidth};
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
        /* width: 98%; */
    }
    .devider {
        padding-top: 48px;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            display: none;
        } */
    }
    .title {
        font-weight: bold;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
        }
        span {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
    h3 {
        font-weight: 600;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            margin-bottom: 16px;
        }
    }
    .fit-content {
        width: 320px;
        min-width: fit-content;
        &:hover .line {
            visibility: visible;
        }
    }
    .label {
        margin-bottom: 20px;
        p {
            font-weight: 600;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .line {
            height: 1px;
            width: calc(100% - 30px);
            background-color: ${(p) => p.theme.colors.fadedText};
            visibility: hidden;
        }
        .title {
            font-size: 12px;
            color: ${(p) => p.theme.colors.fadedText};
            margin-bottom: 5px;
            font-weight: 900;
            text-transform: uppercase;
        }
        .content {
            font-size: 16px;
            color: black;
        }
        .input-change-name {
            &:hover .icon-edit-name {
                visibility: visible;
            }
            .icon-edit-name {
                visibility: hidden;
                cursor: pointer;
                padding: 8px;
            }
            width: 100%;
            input {
                font-weight: 600;
                padding-left: 0;
                border: none;
                font-size: 16px;
                color: black;
                /* color: ${(p) => p.theme.colors.fadedText}; */
                &:focus,
                :active,
                :focus-visible {
                    border: none !important;
                    border-width: 0 !important;
                }
            }
        }
    }
    .button-field {
        display: flex;
    }
    .current-tags {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .visible-md {
        display: block;
    }
    .visible-ms {
        display: none;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .visible-md {
            display: none;
        }
        .visible-ms {
            display: block;
        }
        h3,
        h4 {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        .title {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        .main-title {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        .label {
            margin-bottom: 12px;
            .title {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #000000;
            }
            .content {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #6c7084;
            }
            .input-change-name {
                input {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    color: #6c7084;
                }
            }
        }
    }
    .title-header {
        font-style: normal;
        font-weight: 700 !important;
        font-size: 25px !important;
        line-height: 22px !important;
        color: #000000 !important;
        margin: 0;
        .sub-title {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
`;

//

export const StyledCardItem = styled.div`
    padding: 40px 50px;
    max-width: 650px;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 32px;
    position: relative;
    h3 {
        font-weight: bold;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 4px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) and (min-width: ${(p) =>
            p.theme.breakPoints.breakTablet}) {
        width: 100%;
        max-width: initial;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        width: 100%;
        padding: 30px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakSmall}) {
        padding: 20px 25px;
    }
    .title {
        font-weight: bold;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
        }
        span {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
    .label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #000000;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 14px;
        }
        .title {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 21px;
            color: #000000;
            margin-bottom: 8px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
                font-size: 14px;
            }
        }
    }
    // update
    .col-item {
        margin-top: 28px;
    }
    .ant-calendar-picker-input,
    .ant-time-picker-input {
        width: 100%;
        height: ${(p) => p.theme.heights.input};
        font-size: 16px;
    }
    .select-input {
        width: 100%;
        .ant-select-selection--multiple {
            min-height: ${(p) => p.theme.heights.input};
            display: flex;
            align-items: center;
            .ant-select-selection__rendered {
                width: 100%;
            }
        }
    }
    .button-field {
        display: flex;
    }
    .current-tags {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .p-validity {
        margin: 50px 0 0 0;
        padding-bottom: 24px;
    }
    .ant-row {
        margin-top: 28px;
    }
`;

export const StyledSmallCard = styled.div<{ maxWidth?: string }>`
    padding: 32px 24px 24px 24px;
    border-radius: 4px;
    background-color: white;
    max-width: 667px;
    max-width: ${(p) => p.maxWidth};
    height: calc(100% - 77px);
    h3 {
        font-weight: 600;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
    }
`;
