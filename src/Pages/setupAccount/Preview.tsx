import { useTranslation } from "react-i18next";

import SwiperCore, { Navigation, Pagination } from "swiper";

import { useState } from "react";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";

interface IProps {
    children: JSX.Element;
}

SwiperCore.use([Navigation, Pagination]);

export const ComponentNewMerchantPreview = (props: IProps) => {
    const { t } = useTranslation();
    const [toggleShow, setToggleShow] = useState<boolean>(false);

    const handleToggle = () => {
        setToggleShow(!toggleShow);
    };

    return (
        <StyledPreview toggleShow={toggleShow}>
            <div className="header" onClick={handleToggle}>
                {toggleShow ? <CaretDownFilled /> : <CaretUpFilled />}
                <span>{t("page.preview")}</span>
            </div>
            <div className="page_body">{props.children}</div>
        </StyledPreview>
    );
};
import styled from "styled-components";

export const StyledPreview = styled.div<{
    toggleShow: boolean;
}>`
    z-index: 1;
    filter: drop-shadow(0px 16px 64px rgba(108, 112, 132, 0.36));
    background-color: #f7f7f8;
    border-radius: 4px;
    position: absolute;
    height: ${(p) => (p.toggleShow ? "812px" : "56px")};
    transition: height 0.5s;
    max-height: calc(100vh - 54px);
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        right: 0;
        bottom: 0px;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .header {
        color: black;
        cursor: pointer;
        padding: 16px;
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
        height: calc(100% - 64px);
        /* height: 100%; */
        overflow: auto;
        .title {
            h4 {
                font-weight: 800;
                font-size: 24px;
                line-height: 33px;
                color: #ffffff;
                margin: 27px 0 20px 0;
                span {
                    font-style: normal;
                    font-weight: 800;
                    font-size: 36px;
                    line-height: 49px;
                }
            }
        }
        .image-layout {
            .image {
                position: relative;
                .text-quote {
                    position: absolute;
                    top: -20px;
                    right: 18px;
                    svg {
                        width: 60px;
                    }
                }
                .text-arrow {
                    position: absolute;
                    bottom: 68px;
                    left: 2px;
                }
            }
        }
    }
`;
