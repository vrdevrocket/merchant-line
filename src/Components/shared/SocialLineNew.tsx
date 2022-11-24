import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const SharedSocialLineNew = () => {
    //hooks
    const { t } = useTranslation();

    return (
        <StyledSocialLine>
            <div className="line_left"></div>
            <div className="text">{t("page.or")}</div>
            <div className="line_right"></div>
        </StyledSocialLine>
    );
};

const StyledSocialLine = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    /* max-width: 450px; */
    margin: 32px 0;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        margin-top: 12px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
        margin-top: 4px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        margin: 32px;
    }
    .line_left,
    .line_right {
        height: 1px;
        background-color: #e1e1e1;
        flex: 1;
    }
    .text {
        color: #a5a5a5;
        margin: 0 12px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
    }
`;
