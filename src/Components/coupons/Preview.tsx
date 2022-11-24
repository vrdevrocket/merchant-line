import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Parser from "html-react-parser";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import { SharedButtonPreview, StyledPreview } from "@components";
import { selectTheme, useAppSelector, selectApp } from "@redux";
import { ICoupon } from "@interfaces";
import { BLANK_IMAGE_URL } from "@configs";

// interface IProps {
// under: string;
// onToggleUnder: (value: string) => void;

// }

interface IProps {
    coupon: ICoupon;
}

SwiperCore.use([Navigation, Pagination]);

export const ComponentCouponPreview = (props: IProps) => {
    //page props
    const { coupon } = props;
    // const { under, onToggleUnder } = props;
    //page Hooks
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    //state
    const [toggleShow, setToggleShow] = useState<boolean>(true);
    const [indexImg, setIndexImg] = useState<number>(1);
    const app = useAppSelector(selectApp);
    //page variable
    const mainColor = Theme.mainColor;
    const subColor = Theme.subColor;
    const dateFormFormat = moment(coupon?.startDate).format("yyyy/MM/DD HH:mm");
    const dateToFormat = moment(coupon?.endDate).format("yyyy/MM/DD HH:mm");
    useEffect(() => {
        if (app.mobile) {
            setToggleShow(false);
        }
    }, [app]);
    const handleToggle = () => {
        setToggleShow(!toggleShow);
    };

    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };

    const formatCouponName = () => {
        if (coupon.name)
            if (coupon.name.length > 25) {
                return coupon.name.slice(0, 25) + "<br/>" + coupon.name.slice(25);
            } else return coupon.name;
        else return "";
    };

    return (
        <StyledPreview toggleShow={toggleShow} mainColor={mainColor} subColor={subColor}>
            <div className="header" onClick={handleToggle}>
                {toggleShow ? <CaretDownFilled /> : <CaretUpFilled />}
                <span>{t("page.preview")}</span>
            </div>
            <div className="page_body">
                <div className="body">
                    <div className="text_name">
                        <div className="name coupon-name">
                            {Parser(formatCouponName()) || t("page.name")}
                        </div>
                        <div className="date_text eng">
                            {dateFormFormat} - {dateToFormat}
                        </div>
                        <div className="nick_name">{t("page.collect_coupons")}</div>
                    </div>
                </div>
                <div className="code">
                    <div className="coupon_code">{t("page.coupon_code")}:</div>
                    <div className="number">{coupon?.code}</div>
                </div>
                <div className="content">
                    <Swiper
                        pagination={true}
                        slidesPerView={1}
                        grabCursor={true}
                        onActiveIndexChange={handleChangeIndexImg}
                    >
                        {coupon.imageUrl.length > 0 && (
                            <div className="number-image">{`${indexImg}/${coupon.imageUrl.length}`}</div>
                        )}
                        {coupon.imageUrl.length ? (
                            coupon.imageUrl.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <img className="image" src={item} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <img className="image" src={BLANK_IMAGE_URL} />
                            </SwiperSlide>
                        )}
                    </Swiper>
                    {coupon.guideline && (
                        <div className="guideline">{Parser(coupon.guideline)}</div>
                    )}
                </div>
                <div className="btn-main">
                    <SharedButtonPreview color={mainColor} text={t("page.use_coupon")} />
                </div>
            </div>
        </StyledPreview>
    );
};
