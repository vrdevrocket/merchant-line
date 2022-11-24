import { enumLanuage } from "@configs";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
export const SwitchLang = () => {
    const { t, i18n } = useTranslation();
    const i18nextLng = window.localStorage.i18nextLng;
    const handleChangeLang = (params: enumLanuage) => {
        i18n.changeLanguage(params);
    };
    return (
        <StyledLayout>
            <button
                className={i18nextLng === enumLanuage.TH ? "left active" : "left"}
                type="button"
                onClick={() => handleChangeLang(enumLanuage.TH)}
            >
                {t("page.language.lang_th")}
            </button>
            <button
                className={
                    i18nextLng === enumLanuage.EN || i18nextLng === enumLanuage.EN_GB
                        ? "right active"
                        : "right"
                }
                onClick={() => handleChangeLang(enumLanuage.EN)}
                type="button"
            >
                {t("page.language.lang_en")}
            </button>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    display: flex;
    justify-content: center;
    max-width: 110px;

    button {
        border: 0;
        background-color: #f7f7f8;
        color: #646464;
        padding: 8px 16px;
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        &:focus-visible {
            outline: 0;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            padding: 8px 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 12px;
            line-height: 16px;
            color: #646464;
        }
    }
    button.active {
        background: #646464;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        color: #ffffff;
        transition: 0.1s;
    }
    button.left {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-right: 0;
    }
    button.right {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border-left: 0;
    }
`;
