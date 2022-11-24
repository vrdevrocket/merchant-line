import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import Parser from "html-react-parser";
import { useEffect, useState } from "react";
import { CaretDownFilled, CaretUpFilled, RightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { BLANK_IMAGE_URL } from "@configs";
import { IconStarSub, SharedButtonPreview, StyledPreview } from "@components";
import { IVariant } from "@interfaces";
import { numberFormatter } from "@utils";
import { selectTheme, useAppSelector, selectApp } from "@redux";

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

export const ComponentRewardPreview = (props: IProps) => {
    //hook
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    // props
    const { images, desc, name, quantity, points, limit, variants } = props;
    // state
    const app = useAppSelector(selectApp);
    const [count, setCount] = useState<number>(1);

    const [isShow, setIsShow] = useState<boolean>(true);
    const [indexImg, setIndexImg] = useState<number>(1);
    //variables
    const mainColor = Theme.mainColor;

    useEffect(() => {
        if (app.mobile) {
            setIsShow(false);
        }
    }, [app]);

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

    const handleToggle = () => {
        setIsShow(!isShow);
    };

    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };

    return (
        <StyledPreview toggleShow={isShow}>
            <div className="header" onClick={handleToggle}>
                {isShow ? <CaretDownFilled /> : <CaretUpFilled />}
                <span>{t("page.preview")}</span>
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
        </StyledPreview>
    );
};
