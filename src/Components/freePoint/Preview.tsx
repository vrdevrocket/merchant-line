import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

import { SharedButtonPreview, StyledPreview } from "@components";
// import { selectTheme } from "@redux";
import { IFreePoint } from "@interfaces";
import { BLANK_IMAGE_URL } from "@configs";
import { numberFormatter } from "@utils";
import { selectTheme, useAppSelector, selectApp } from "@redux";

// interface IProps {
// under: string;
// onToggleUnder: (value: string) => void;

// }

interface IProps {
    freePoint: IFreePoint;
}

SwiperCore.use([Navigation, Pagination]);

export const ComponentFreePointPreview = (props: IProps) => {
    //page props
    const { freePoint } = props;
    // const { under, onToggleUnder } = props;
    //page Hooks
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    // state
    const app = useAppSelector(selectApp);
    const [toggleShow, setToggleShow] = useState<boolean>(true);
    const [indexImg, setIndexImg] = useState<number>(1);
    //page variable
    const mainColor = Theme.mainColor;
    const subColor = Theme.subColor;
    const dateFormFormat = moment(freePoint?.startDate).format("yyyy/MM/DD HH:mm");
    const dateToFormat = moment(freePoint?.endDate).format("yyyy/MM/DD HH:mm");
    useEffect(() => {
        if (app.mobile) {
            setToggleShow(false);
        }
    }, [app]);
    const handleToggleShow = () => {
        setToggleShow(!toggleShow);
    };
    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };

    return (
        <StyledPreview toggleShow={toggleShow} mainColor={mainColor} subColor={subColor}>
            <div className="header" onClick={handleToggleShow}>
                {toggleShow ? <CaretDownFilled /> : <CaretUpFilled />}
                <span>{t("page.preview")}</span>
            </div>
            <div className="page_body">
                <div className="body">
                    <div className="text_name">
                        <div className="name">{freePoint?.name || t("page.name")}</div>
                        <div className="date_text eng">
                            {dateFormFormat} - {dateToFormat}
                        </div>
                        {/* <div className="nick_name">{t("page.collect_coupons")}</div> */}
                    </div>
                </div>
                <div className="code">
                    <div className="coupon_code">{t("page.point_given")}:</div>
                    <div className="number eng">{numberFormatter(freePoint.point)}</div>
                </div>
                <div className="content">
                    <Swiper
                        pagination={true}
                        grabCursor={true}
                        slidesPerView={1}
                        onRealIndexChange={handleChangeIndexImg}
                    >
                        {freePoint.imageUrl.length > 0 && (
                            <div className="number-image">{`${indexImg}/${freePoint.imageUrl.length}`}</div>
                        )}
                        {freePoint.imageUrl.length ? (
                            freePoint.imageUrl.map((item, index) => (
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
                </div>
                <div className="btn-main">
                    <SharedButtonPreview color={mainColor} text={t("page.collect_free_point")} />
                </div>
            </div>
        </StyledPreview>
    );
};
