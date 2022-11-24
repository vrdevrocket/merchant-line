import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css"; // core Swiper
import "swiper/swiper-bundle.min.js";
import "swiper/swiper-bundle.css";
import Parser from "html-react-parser";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ALL_SELECT, BLANK_IMAGE_URL } from "@configs";
import { StyledPreview, SharedButtonPreview } from "@components";
import { IMembershipTier } from "@interfaces";

import { selectTheme, useAppSelector, selectApp } from "@redux";

interface IProps {
    images: string[];
    name: string;
    memberships?: string[];
    memberShipTiers?: IMembershipTier[];
    desc: string;
}
SwiperCore.use([Navigation, Pagination]);

export const ComponentBenefitPreview = (props: IProps) => {
    //hook
    const { t } = useTranslation();
    const Theme = useSelector(selectTheme);
    //state
    const app = useAppSelector(selectApp);
    const [toggleShow, setToggleShow] = useState<boolean>(true);
    const [indexImg, setIndexImg] = useState<number>(1);
    useEffect(() => {
        if (app.mobile) {
            setToggleShow(false);
        }
    }, [app]);
    // props
    const { images, desc, name, memberships, memberShipTiers } = props;
    const tiers = memberships?.includes(ALL_SELECT)
        ? // ? memberShipTiers
          []
        : memberShipTiers?.filter((tier) =>
              memberships?.some((membership) => membership === tier._id)
          );

    //variables
    const mainColor = Theme.mainColor;

    const handleToggle = () => {
        setToggleShow(!toggleShow);
    };

    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };

    return (
        <StyledPreview toggleShow={toggleShow}>
            <div className="header" onClick={handleToggle}>
                {toggleShow ? <CaretDownFilled /> : <CaretUpFilled />}
                <span>{t("page.preview")}</span>
            </div>
            <div className="page_body">
                <div className="img-field">
                    <Swiper
                        pagination={true}
                        grabCursor={true}
                        slidesPerView={1}
                        onRealIndexChange={handleChangeIndexImg}
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
                    <h5>{name}</h5>
                    <StyledMField>
                        {tiers?.map((item) => (
                            <StyledMembership
                                key={item._id}
                                bgColor={item?.color || "rgb(129 107 0)"}
                            >
                                {item.iconUrl && <img src={item.iconUrl} />}
                                <p className="membershipName">{item.membershipName}</p>
                            </StyledMembership>
                        ))}
                    </StyledMField>
                </div>
                <div className="description-field">
                    <h5>{t("page.descriptions")}</h5>
                    <p>{Parser(desc)}</p>
                </div>
                <div className="btn-main">
                    <SharedButtonPreview color={mainColor} text={t("page.redeem_benefit")} />
                </div>
            </div>
        </StyledPreview>
    );
};

const StyledMembership = styled.div<{ bgColor: string }>`
    background-color: ${(p) => p.bgColor};
    margin-right: 8px;
    color: white;
    font-weight: 600px;
    width: fit-content;
    max-width: 100px;
    padding: 4px 8px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
    span {
        width: fit-content;
        min-width: 26px;
    }
    img {
        width: 12px;
        height: 12px;
    }
    p.membershipName {
        margin-bottom: 0px;
        margin-left: 6px;
        font-size: 8px;
        font-family: "Segoe UI", "Roboto", sans-serif;
        font-weight: bold;
        color: #ffffff;
    }
`;

const StyledMField = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
