import { GainMenuIcon, GainPosterIcon, GainQrIcon, GainUrlIcon } from "@components";
import { enumGainIcon } from "@configs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface Iprops {
    item: {
        url: string;
        title: string;
        description: string;
        img: string;
        icon: enumGainIcon;
    };
}
const defaultImg = "rectangle.png";

export const ComponentCard = (props: Iprops) => {
    const { t } = useTranslation();
    const {
        item: { title, description, img, url, icon },
    } = props;
    const imgUrl = img ? img : defaultImg;
    return (
        <StyledLayout>
            <Link to={url}>
                <div className="image">
                    {icon === enumGainIcon.GAIN_URL_ICON && <GainUrlIcon />}
                    {icon === enumGainIcon.GAIN_QR_ICON && <GainQrIcon />}
                    {icon === enumGainIcon.GAIN_MENU_ICON && <GainMenuIcon />}
                    {icon === enumGainIcon.GAIN_POSTER_ICON && <GainPosterIcon />}
                    {/* <img src={`/images/newUser/${imgUrl}`} /> */}
                </div>
                <h5 className="title">{t(`page.gain_friend.${title}`)}</h5>
                <p>{t(`page.gain_friend.${description}`)}</p>
            </Link>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    padding: 16px;
    background: #ffffff;
    border-radius: 8px;
    max-width: 332px;
    a {
        text-decoration: none;
        &:hover {
            text-decoration: none;
        }
    }
    .image {
        margin-bottom: 24px;
        margin-bottom: 24px;
        min-height: 138px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title {
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 27px;
        margin-bottom: 8px;
    }
    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #646464;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        max-width: 174px;
        .image {
            height: 72px;
        }
        .title {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            color: #646464;
        }
    }
`;
