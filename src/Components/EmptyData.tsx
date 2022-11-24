import { useTranslation } from "react-i18next";
import styled from "styled-components";

export const ComponentEmptyData = () => {
    const { t } = useTranslation();
    return (
        <StyledContainer>
            <p>{t("page.data_not_found")}</p>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    align-self: flex-start;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    p {
        font-size: 16px;
        color: ${(p) => p.theme.colors.fadedText};
    }
`;
