import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import { BLANK_IMAGE_URL } from "@configs";
import styled from "styled-components";
import { IPoster } from "@interfaces";
SwiperCore.use([Navigation, Pagination]);
// const images = [
//     "https://rewarding-rocket.s3.ap-southeast-1.amazonaws.com/1657004053769-Rectangle%202410.png",
//     "https://rewarding-rocket.s3.ap-southeast-1.amazonaws.com/1657004047583-Group%20427321136.png",
// ];
interface Iprops {
    posters: IPoster[];
}
export const ModuelBenefitCarousel = (props: Iprops) => {
    const { posters } = props;
    const [indexImg, setIndexImg] = useState<number>(1);
    const handleChangeIndexImg = (e: SwiperCore) => {
        const index = e.realIndex;
        setIndexImg(index + 1);
    };
    const handleClick = (url: string) => {
        window.open(url);
    };
    return (
        <StyledLayout>
            <Swiper
                pagination={true}
                slidesPerView={1}
                grabCursor={true}
                onActiveIndexChange={handleChangeIndexImg}
            >
                {posters.length ? (
                    posters.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img
                                className="image"
                                src={item.imageUrl}
                                alt={item.imageUrl}
                                onClick={() => handleClick(item.link)}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <img className="image" src={BLANK_IMAGE_URL} />
                    </SwiperSlide>
                )}
            </Swiper>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    height: 100%;
    .swiper-container {
        width: 390px;
        height: 100%;
        .image {
            width: 393px;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .swiper-container {
            width: 100%;
            height: 100%;
            .image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
        }
    }
`;
