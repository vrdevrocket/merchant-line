import styled from "styled-components";

import { SharedButtonDefault } from "@components";

export const StyledTable = styled.div`
    /* padding: 2rem 3.5rem 3.5rem 3.5rem; */
    padding-right: 0;
    display: flex;
    flex-direction: column;
    /* margin-bottom: 3.5rem; */
    height: 84vh;
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
    /* min-height: calc(100vh - ${(p) => p.theme.header.height}); */
    padding: 3.5rem;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 6px;
        height: 0;
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
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    h3,
    p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
        line-height: normal;
    }
    .delete-btn {
        color: green;
        font-weight: 600;
        text-align: center;
    }
    .duplicate-btn {
        color: red;
        font-weight: 600;
        text-align: center;
    }
    .space {
        padding: 0 5px;
    }
    .page-header,
    .page-header > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            flex-wrap: wrap;
        }
    }
    .page-header {
        flex-wrap: wrap;
        padding: 1.5rem 0 14px 0;
        .add-btn {
            background-color: ${(p) => p.theme.colors.danger};
            color: white;
            justify-content: space-evenly;
            border: 0;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            flex-direction: column;
            align-items: flex-start;
            div {
                justify-content: flex-start;
            }
            div:nth-child(2) {
                margin-top: 12px;
            }
            h3 {
                font-size: 20px;
            }
        }
        h3 {
            margin-right: 11px;
            font-weight: 700;
            font-size: 35px;
            margin-bottom: 0;
            color: black;
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

        /* ::-webkit-scrollbar {
            display: none;
        } */
        ::-webkit-scrollbar {
            width: 6px;
            height: 0;
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
    }
    .page-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;
    }
    .indiana-scroll-container {
        width: 100%;
    }
    .data-table {
        padding: 4px 4px;
    }
    .table-row,
    .table-header {
        padding: 10px 18px;
        border-radius: 1px;
        margin: 0 0 18px 0;
        width: 100%;
        /* min-width: 1400px; */
        min-width: 680px;
    }
    .table-header {
        padding: 18px 18px 12px 18px;
        background-color: #f0f0f0;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 1;
        margin: 0;
        .header-row {
            height: 28px;
        }
    }
    .table-row {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        border-radius: 6px;
        background-color: white;
        height: 68px;
        .col-item {
            display: flex;
            align-items: center;
            .edit-btn {
                padding: 4px 13px;
                height: 26px;
                margin-left: 4px;
                font-size: 12px;
                background-color: #0263e0;
                border-color: #0263e0;
            }
            p {
                margin-bottom: 0;
                font-size: 16px;
                color: #6c7084;
            }
            .user-name {
                font-weight: 600;
                margin-left: 20px;
            }
            .ml-0 {
                margin-left: 0;
            }
            .col-merge-metrics {
                .text-bolder {
                    font-weight: 700;
                }
            }
        }
    }
    .table-row:hover {
        box-shadow: 0px 0px #1e7cf5, 0px 0 5px #1e7cf5;
        /* box-shadow: 0 5px 7px rgba(0, 0, 0, 0.07), 0 5px 7px rgba(0, 0, 0, 0.07); */
    }
    .table-row-large {
        height: 100px;
        margin-bottom: 28px;
        .avatar {
            height: 80px;
            width: 80px;
            min-width: 80px;
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
        .option-dropdown {
            display: flex;
            justify-content: flex-end;
        }
        .visible-ms {
            display: none;
        }
    }
    .short-text {
        width: 40%;
        p {
            width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
        }
    }
    .copy {
        :active {
            transform: scale(0.95);
        }
        svg:hover {
            cursor: pointer;
        }
    }
    .table_ground {
        flex: 1;
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 16px;
    }
    // update 12/ 8
    .page-layout {
        display: flex;
        flex-direction: column;
        flex: 1;
        .table {
            flex: 1;
        }
    }
    .button-import-export {
        border: 1px solid #f4394f !important;
        background: #f0f0f0 !important;
        color: #f4394f !important;
        border: 1px solid #f4394f !important;
    }
    .flex-header {
        .search-input {
            height: 42px;
            max-width: 210px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            flex-direction: column;
            align-items: flex-start !important;
            .space {
                height: 10px;
            }
        }
    }
    .visible-ms {
        display: none;
    }
    .action-col {
        display: flex;
        justify-content: space-between;
    }
    .contact-user {
        margin-left: 10px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .page-header {
            flex-direction: row;
            align-items: center;
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin-right: 4px;
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
        .table {
            .table-header {
                display: none;
            }
            .table-row {
                min-width: initial;
                padding: 16px;
                height: initial;
                margin-bottom: 8px;
                .ant-avatar {
                    width: 36px;
                    height: 36px;
                    min-width: 36px;
                }
                .item-info {
                    margin-left: 8px;
                    p {
                        margin: 0;
                    }
                    .user-name {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 19px;
                        display: flex;
                        align-items: center;
                        color: #000000;
                    }
                    p {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 19px;
                        color: #000000;
                    }
                    .item-desc {
                        height: 19px;
                    }
                    .item-date {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 10px;
                        line-height: 14px;
                        display: flex;
                        align-items: center;
                        color: #a5a5a5;
                    }
                    .contact-user {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 19px;
                        display: flex;
                        align-items: center;
                        color: #000000;
                    }
                    .member,
                    .phone {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #a5a5a5;
                        padding-top: 4px;
                    }
                    .source-name {
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 19px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        color: #000000;
                    }
                }
                .point {
                    flex-direction: column;
                    align-items: end;
                    .point-number {
                        font-weight: 700;
                        font-size: 16px;
                        line-height: 22px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        color: #000000;
                    }
                    .point-label {
                        font-weight: 400;
                        font-size: 10px;
                        line-height: 14px;
                        display: flex;
                        align-items: center;
                        text-align: right;
                        color: #a5a5a5;
                    }
                }
                .copy-action {
                    justify-content: end;
                }
                .col-item {
                    align-items: flex-start;
                }
                .point {
                    align-items: end;
                }
            }
        }
        .table-row {
            .visible-md {
                display: none;
            }
            .visible-ms {
                display: block;
            }
        }
        .page-layout {
            .visible-md {
                display: none;
            }
            .visible-ms {
                display: block;
            }
        }
        .action-col {
            display: flex;
            justify-content: space-between;
        }
        .page-layout {
            .search-layout {
                margin-bottom: 8px;
                .search-input {
                    height: 42px;
                    max-width: 100%;
                }
            }
        }
        .member-code {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            display: flex;
            align-items: center;
            color: #a5a5a5;
            justify-content: end;
            min-height: 50px;
        }
        .m-member-code {
            justify-content: end;
        }
    }
`;

export const StyledTableButtonTop = styled(SharedButtonDefault)`
    height: 42px;
    background: ${(props) => props.theme.colors.main};
    min-width: fit-content;
    padding: 4px 12px;
    color: white;
    font-size: 16px;
    width: 148px;
    .btn-text {
        margin-left: 10px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        width: auto;
        height: 34px;
    }
`;

export const StyledExportButton = styled(SharedButtonDefault)`
    height: 42px;

    min-width: fit-content;
    padding: 4px 12px;
    font-size: 16px;
    width: 148px;
`;
