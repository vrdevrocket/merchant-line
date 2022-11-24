import { BackMain } from "@components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components";

export const BackLayout = () => {
    const history = useHistory();
    const { t } = useTranslation();
    return (
        <StyledLayout onClick={() => history.goBack()}>
            <BackMain />
            <p className="back-link">{t("page.back_to_main_page")}</p>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 8px;
    p {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #646464;
        margin: 0;
    }
`;
