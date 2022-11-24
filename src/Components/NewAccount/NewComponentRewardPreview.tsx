import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import Parser from "html-react-parser";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { BackArrow, Battery, Cellular, CloseIcon, Wifi } from "../icon";
import { BLANK_IMAGE_URL } from "@configs";
import { IconStarSub, SharedButtonPreview } from "@components";
import { IVariant } from "@interfaces";
import { numberFormatter, theme } from "@utils";
import { selectTheme } from "@redux";
import styled from "styled-components";
interface IProps {
    images: string[];
    name: string;
    quantity?: number;
    points?: number;
    desc: string;
    limit?: number;
    variants: IVariant[];
}
const { Option } = Select;
SwiperCore.use([Navigation, Pagination]);

export const NewComponentRewardPreview = (props: IProps) => {
    //hook
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    // props
    const { images, desc, name, quantity, points, limit, variants } = props;
    // state
    const [count, setCount] = useState<number>(1);
    const [indexImg, setIndexImg] = useState<number>(1);
    //variables
    const mainColor = Theme.mainColor;

    const handleAddCount = () => {
        let maxCount = Infinity;
        if (limit || quantity) {
            maxCount = Math.min(limit ? limit : Infinity, quantity ? quantity : Infinity);
        }
        if (count < maxCount) setCount(count + 1);
    };
    const handleMinusCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleCalculatePoint = () => {
        return 500;
    };

    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };

    return (
        <StyledNewPreview>
            <div className="new-mode-header">
                <div className="noti-bar">
                    <p>16:05</p>
                    <p>
                        <Cellular />
                        <Wifi />
                        <Battery />
                    </p>
                </div>
                <div className="url-bar">
                    <BackArrow />
                    <div className="url-name">
                        <p>Rocket</p>
                        <small>rocket.in.th</small>
                    </div>
                    <CloseIcon />
                </div>
            </div>
            <div className="page_body">
                <div className="img-field">
                    <Swiper
                        pagination={true}
                        grabCursor={true}
                        slidesPerView={1}
                        onActiveIndexChange={handleChangeIndexImg}
                    >
                        {images.length > 0 && (
                            <div className="number-image">{`${indexImg}/${images.length}`}</div>
                        )}
                        {images.length ? (
                            images.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="img-wrap">
                                        <img src={item} />
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <div className="img-wrap">
                                    <img className="empty-img" src={BLANK_IMAGE_URL} />
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className="name-field">
                    {quantity ? (
                        <p>
                            {t("page.quantity_available", {
                                returnObjects: true,
                                number: numberFormatter(quantity),
                            })}
                        </p>
                    ) : (
                        <></>
                    )}
                    <h5>{name}</h5>
                </div>
                <div className="quantity-field">
                    <div className="count-item">
                        <div className="item-left">
                            <div className="item-left-top">
                                <IconStarSub size={16} color={"red"} />
                                <p className="eng">
                                    {numberFormatter(points)} x {numberFormatter(count)}
                                </p>
                            </div>
                            <div className="text-small">
                                {t("page.have_points_left", {
                                    returnObjects: true,
                                    number: handleCalculatePoint(),
                                })}
                            </div>
                        </div>
                        <div className="item-right">
                            <button onClick={handleMinusCount} className=" btn-minus">
                                -
                            </button>
                            <p className="eng">{numberFormatter(count)}</p>
                            <button onClick={handleAddCount} className=" btn-add">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {variants.length > 0 && (
                    <div className="select-field">
                        <div className="text-small">{t("page.select_type")}</div>
                        <Select
                            //@ts-ignore
                            getPopupContainer={(trigger) => trigger.parentNode}
                            className="select-opts"
                            optionFilterProp="children"
                            defaultActiveFirstOption={true}
                            suffixIcon={<RightOutlined />}
                            notFoundContent={false}
                            defaultValue={variants[0].name}
                        >
                            {variants?.map((item) => (
                                <Option key={item._id} value={item.name}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}

                <div className="description-field">
                    <h5>{t("page.descriptions")}</h5>
                    <p>{Parser(desc)}</p>
                </div>
                <div className="btn-main">
                    <SharedButtonPreview color={mainColor} text={t("page.redeem_reward")} />
                </div>
            </div>
        </StyledNewPreview>
    );
};

export const StyledNewPreview = styled.div<{
    mainColor?: string;
    subColor?: string;
}>`
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    width: 375px;

    background-color: #f7f7f8;
    border-radius: 4px;
    position: relative;
    overflow: auto;
    position: absolute;
    right: 10rem;
    bottom: auto;
    height: 770px;
    transition: height 0.5s;
    max-height: 770px;
    border: 6px solid #fff;
    border-radius: 60px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        right: 1.5rem;
        bottom: 0;
        width: calc(100% - 3rem);
    }
    @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
        position: unset;
        margin-left: 2rem;
    }
    .new-mode-header {
        background: #fff;
        padding: 15px 24px 0 24px;
        p {
            color: black;
            font-weight: bold;
            margin: 0;
        }

        .noti-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            svg {
                margin: 0 2px;
            }
        }
        .url-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
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
                height: 250px;
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
`;
