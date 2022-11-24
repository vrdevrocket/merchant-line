import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledCard } from "@components";
import { ComponentCard } from "./Card";
import { gainAdvertise, gainShop } from "@configs";

export const PageMember = () => {
    //page Hooks
    const { t } = useTranslation();

    return (
        <StyledContainer>
            <div className="page-layout">
                <h3>{t("page.gain_friend.get_your_member")}</h3>
                <div className="main">
                    <h4>{t("page.gain_friend.advertise_online")}</h4>
                    <div className="list-advertise">
                        {gainAdvertise.map((item) => (
                            <ComponentCard item={item} key={item.url} />
                        ))}
                    </div>
                    <h4 className="advertise-title">
                        {t("page.gain_friend.advertise_your_store")}
                    </h4>
                    <div className="list-store">
                        {gainShop.map((item) => (
                            <ComponentCard item={item} key={item.url} />
                        ))}
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    overflow: auto;
    height: 86vh;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
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
    .main {
        width: 100%;
        /* max-width: ${(p) => p.theme.maxWidths.cardWrap}; */
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
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
        .list-advertise,
        .list-store {
            display: flex;
            column-gap: 20px;
        }
        .advertise-title {
            margin-top: 42px;
        }
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            ::-webkit-scrollbar {
                display: none;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            .list-advertise,
            .list-store {
                column-gap: 10px;
                row-gap: 10px;
                flex-wrap: wrap;
            }
        }
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 37px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    padding: 3.5rem;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 1.5rem;
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
    }
`;
