import { SuccessIcon } from "@components";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
interface Iprops {
    isVisible: boolean;
    handleCancel: () => void;
}
export const ModuleAlertSuccess = (props: Iprops) => {
    const { isVisible, handleCancel } = props;
    const { t } = useTranslation();
    return (
        <StyledModal
            title={"-"}
            visible={isVisible}
            onCancel={handleCancel}
            className="update-modal"
            width="206px"
            style={{ marginTop: "20vh" }}
            footer={null}
        >
            <div>
                <SuccessIcon />
                <p className="success-message">{t("page.member_points.send_point_successful")}</p>
            </div>
        </StyledModal>
    );
};
const StyledModal = styled(Modal)`
    .ant-modal-content {
        .ant-modal-close {
            display: none;
        }
        .ant-modal-header {
            display: none;
        }
        .ant-modal-body {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding: 32px !important;
            text-align: center;
            .success-message {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #000000;
            }
        }
    }
`;
