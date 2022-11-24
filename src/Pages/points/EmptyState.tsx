import { MemberAddIcon, MemberScanIcon } from "@components";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
export const ModuelEmptyState = () => {
    const { t } = useTranslation();
    return (
        <StyledLayout>
            <div className="icon-layout">
                <MemberAddIcon />
                <span>{t("page.member_points.or")}</span>
                <MemberScanIcon />
            </div>
            <p>{t("page.member_points.search_qrcode")}</p>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    padding: 12px;
    flex-direction: column;
    display: flex;
    align-items: center;
    row-gap: 12px;
    background: transparent;
    color: #6c7084;
`;
