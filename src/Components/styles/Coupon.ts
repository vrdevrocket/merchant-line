import styled from "styled-components";

export const StyledCoupon = styled.div`
    padding: 3rem 0 0 1.5rem;
    margin-bottom: 3rem;
    position: relative;
    height: calc(100vh - 64px);
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) and (min-width: ${(p) =>
            p.theme.breakPoints.breakTablet}) {
        display: block;
    }
    form {
        flex: 1;
        overflow: auto;
    }
    .create_coupon {
        font-style: normal;
        font-weight: bold;
        color: #000000;
        font-size: 35px;
        line-height: 1.5em;
        margin-bottom: 18px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            font-size: 28px;
            margin-bottom: 12px;
        }
    }
    .page-header {
        h3 {
            font-style: normal;
            font-weight: bold;
            color: #000000;
            font-size: 35px;
            line-height: 1.5em;
            margin-bottom: 18px;
            span {
                color: #6c7084;
                font-size: 12px;
                margin-left: 22px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                font-size: 28px;
                margin-bottom: 12px;
            }
        }
    }
    .page-body {
        height: 80vh;
        /* overflow-y: scroll;
        overflow-x: hidden; */
        width: 662px;
        > div {
            width: 642px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
                width: 100%;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) and (min-width: ${(p) =>
                    p.theme.breakPoints.breakTablet}) {
                width: 100%;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) and (min-width: ${(p) =>
                p.theme.breakPoints.breakTablet}) {
            width: 100%;
        }

        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileSmallPhone}) {
            width: 340px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakSmall}) {
            width: 250px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            height: initial;
            overflow: initial;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakSmall}) {
            padding: 20px 25px;
        }
        /* ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        } */
    }
    .input_group {
        display: flex;
        justify-content: space-between;
        margin-top: 28px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            display: initial;
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
    /* .preview-field {
        padding: 40px 20px;
        position: relative;
        border: 1px dashed #6c7084;
        border-radius: 12px;
        .img-wrap {
            overflow: hidden;
            position: relative;
            border-radius: 10px;
            cursor: pointer;
            height: 100%;
            img {
                object-fit: cover;
                width: 100%;
                object-position: center;
                @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                    object-fit: contain;
                }
            }
            .img-layer {
                position: absolute;
                z-index: 2;
                background-color: transparent;
                width: 100%;
                height: 100%;
                :hover {
                    background-color: rgba(68, 61, 65, 0.45);
                }
                :hover .icon {
                    display: block;
                }
                .icon {
                    display: none;
                }
                .icon-full-screen {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                }
                .icon-delete {
                    position: absolute;
                    right: 10px;
                    top: 10px;
                }
            }
        }
        .button-upload-preview {
            overflow: hidden;
            position: absolute;
            right: 20px;
            bottom: 14px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            button {
                border: none;
                font-size: 14px;
                font-weight: 600;
            }
            input {
                position: absolute;
                z-index: 1;
                opacity: 0;
                cursor: pointer;
            }
        }
    } */
    .ant-upload.ant-upload-drag .ant-upload {
        padding: 80px !important;
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
    .activate {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
    }
    .ant-switch {
        margin-left: 12px;
    }
    .ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
    .ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
        min-height: 200px;
    }
    .ant-upload.ant-upload-drag .ant-upload {
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            padding: 30px !important;
            margin-bottom: 24px;
        }
    }
    .copy {
        cursor: pointer;
    }
    .btn-drag {
        background: #6c7084 !important;
        font-size: 16px;
        color: white !important;
        padding: 6px 16px;
        height: auto;
        border-radius: 2px;
        margin-bottom: 18px;
    }
    //
    //
    .variants-field {
        .variant-wrap {
            display: flex;
            align-items: center;
            width: fit-content;
            .icon {
                visibility: hidden;
                cursor: pointer;
            }
            :hover .icon {
                visibility: visible;
            }
            .variant-item {
                min-width: 92px;
                max-width: 120px;
                overflow: hidden;
                background-color: #e1e1e1;
                cursor: inherit;
                margin: 7px 7px 7px 0;
                padding: 10px;
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
`;

export const StyledCouponList = styled.div`
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
    h3,
    p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }
    .space {
        padding: 0 5px;
    }
    .page-header,
    .page-header > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .page-header {
        margin-bottom: 14px;
        .add-btn:hover {
            color: white !important;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            flex-direction: column;
            align-items: flex-start;
            div {
                justify-content: flex-start;
            }
            h3 {
                font-size: 20px;
            }
        }
        h3 {
            margin-right: 44px;
            font-weight: 700;
            font-size: 35px;
            margin-bottom: 0;
        }
        p {
            color: ${(p) => p.theme.colors.fadedText};
            font-size: 16px;
            font-weight: 600;
        }
    }
    .table {
        flex: 1;
        overflow: auto;
        display: flex;

        ::-webkit-scrollbar {
            display: none;
        }
        .table_ground {
            width: 100%;
        }
    }
    .page-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;
    }
    .table-row {
        min-height: 124px;
    }
    .table-row,
    .table-header {
        padding: 10px 18px;
        border-radius: 1px;
        margin: 0 0 18px 0;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            min-width: 750px;
        }
    }
    .table-header {
        padding: 18px 18px 12px 18px;
        background-color: #f0f0f0;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .table-row {
        border-radius: 6px;
        background-color: white;
        .col-item {
            display: flex;
            align-items: center;
            .edit-btn:hover {
                color: white !important;
            }
            p {
                margin-bottom: 0;
                font-size: 16px;
                color: #6c7084;
            }
            .user-name {
                font-weight: 600;
                margin-left: 38px;
            }
        }
    }
    .table-header {
        .col-item {
            display: flex;
            align-items: center;
            p {
                text-transform: uppercase;
                color: ${(p) => p.theme.colors.fadedText};
                font-size: 14px;
                font-weight: 700;
                margin-bottom: 0;
                margin-right: 10px;
            }
            .filter-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                & > i {
                    cursor: pointer;
                }
                & > i:hover svg {
                    color: ${(p) => p.theme.colors.fadedText};
                }
            }
        }
    }
    .add-btn {
        height: 42px;
        background: #f22f46;
        min-width: fit-content;
        padding: 4px 12px;
        color: white;
        font-size: 16px;
        width: 148px;
    }
    .copy {
        cursor: pointer;
        margin-left: 8px;
    }
`;
