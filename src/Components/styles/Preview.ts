import styled from "styled-components";

export const StyledPreview = styled.div<{
    mainColor?: string;
    subColor?: string;
    toggleShow: boolean;
}>`
    /* overflow-y: auto; */
    /* min-height: 811px; */
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    width: 375px;

    background-color: #f7f7f8;
    border-radius: 4px;
    position: relative;
    overflow: auto;
    position: absolute;
    right: 3.5rem;
    bottom: 0;
    /* opacity: ${(p) => (p.toggleShow ? "1" : "0.5")}; */
    height: ${(p) => (p.toggleShow ? "812px" : "56px")};
    transition: height 0.5s;
    max-height: calc(100vh - 54px);
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        /* right: 1.5rem;
        bottom: 0;
        width: calc(100% - 3rem); */
        right: 0;
        bottom: 0px;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .header {
        color: black;
        cursor: pointer;
        padding: 24px;
        display: flex;
        align-items: center;
        background-color: #ffffff;
        span {
            display: inline-block;
            margin-left: 12px;
            font-weight: 600;
            font-size: 25px;
            line-height: 33px;
        }
    }
    .page_body {
        height: calc(100% - 82px);
        /* display: ${(p) => (p.toggleShow ? "inherit" : "none")}; */
        overflow: auto;
        ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
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
    .body {
        width: 100%;
        height: 180px;
        /* position: relative;
        display: flex;
        justify-content: center; */
        overflow: hidden;
        min-height: 150px;
        background-color: ${(p) => p.mainColor};
        position: relative;
        width: 90%;
        margin: 24px auto 0 auto;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        .text_name {
            position: absolute;
            top: 22px;
            left: 25px;
            .name {
                font-weight: bold;
                font-size: 18px;
                line-height: normal;
                color: #ffffff;
                max-width: 290px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .date_text {
                font-weight: normal;
                font-size: 14px;
                line-height: 1.5rem;
                color: #ffffff;
                margin-top: 30px;
            }
            .nick_name {
                padding: 4px 18px;
                font-weight: normal;
                font-size: 13px;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.22);
                border-radius: 17px;
                margin-top: 10px;
                text-align: center;
                min-width: 120px;
                width: fit-content;
            }
            .coupon-name {
                line-break: anywhere;
                white-space: pre-wrap;
            }
        }
    }
    .code {
        display: flex;
        padding: 18px 25px;
        background-color: #ffffff;
        align-items: center;
        width: 90%;
        margin: 0 auto 16px auto;
        /* max-width: 100%; */

        .coupon_code {
            min-width: fit-content;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 19px;
            color: #717171;
            margin-right: 12px;
        }
        .number {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
            width: 170px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .content {
        width: 90%;
        margin: 0 auto;
        border-radius: 8px;
        padding: 28px 20px;
        background-color: #ffffff;
        .image {
            width: 100%;
            height: 295px;
            object-fit: cover;
            border-radius: 4px;
        }
        .guideline {
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 1.5rem;
            color: #464646;
            margin-top: 24px;
            word-wrap: break-word; /* IE 5.5-7 */
            white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
            white-space: pre-wrap; /* current browsers */
        }
    }
    .btn-main {
        width: 90%;
        margin: 0 auto;
        margin-top: 16px;
        margin-bottom: 32px;
    }
    //update
    .img-field {
        .img-wrap {
            background-color: white;
            overflow: hidden;
            max-height: 375px;
            display: flex;
            justify-content: center;
            img {
                object-fit: cover;
                height: 375px;
                width: 375px;
                object-position: center;
            }
            .empty-img {
                width: 375;
                padding: 30px;
            }
        }
    }
    .name-field {
        background-color: white;
        padding: 12px;
        p {
            color: ${(p) => p.theme.colors.fadedColor};
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            font-weight: 600;
            font-size: 14px;
            margin-bottom: 0px;
        }
    }
    .quantity-field {
        padding: 12px;
        margin: 12px;
        background-color: white;
        border-radius: 4px;
        .count-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                margin: 0 12px;
                color: black;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 0;
            }
            .item-left {
                .item-left-top {
                    display: flex;
                    align-items: center;
                }
            }
            .item-right {
                display: flex;
                align-items: center;

                button {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border-width: 0px;
                    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    background-color: white;
                }
                button:active {
                    transform: scale(0.95);
                }
            }
        }
    }
    .select-field {
        padding: 12px;
        background-color: white;
        margin: 12px;
        border-radius: 4px;
        .select-opts {
            width: 100%;
            margin-top: 6px;
            div {
                border-color: transparent !important;
            }
        }
    }
    .description-field {
        padding: 12px;
        background-color: white;
        margin-top: 12px;
        flex: 1;
        p {
            width: 100%;
            word-wrap: break-word; /* IE 5.5-7 */
            white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
            white-space: pre-wrap; /* current browsers */
        }
        h5 {
            font-weight: 600;
        }
        * {
            color: black;
        }
    }
    .text-small {
        color: ${(p) => p.theme.colors.fadedText};
        font-size: 12px;
        font-weight: 600;
    }
    h5 {
        font-size: 20px;
        font-weight: 500;
        color: black;
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: normal;
    }
    .swiper-pagination-bullet {
        opacity: 0.6;
    }
    .swiper-pagination-bullet-active {
        background-color: black;
        opacity: 1;
    }
    .number-image {
        z-index: 2;
        background-color: white;
        position: absolute;
        top: 1rem;
        right: 1rem;
        border-radius: 1rem;
        padding: 0 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    // custom arrow preview
    .ant-select-selection__rendered {
        font-size: 18px;
        color: black;
        margin-left: 0px;
    }
    .ant-select-arrow {
        position: absolute;
        top: -5px;
        right: 0px;
        span {
            font-size: 20px;
            font-weight: bold;
        }
    }
    .name-field {
        h5 {
            font-size: 27px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .header {
            padding: 17px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            background: #ffffff;
        }
    }
`;
