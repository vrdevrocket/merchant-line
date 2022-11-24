import { SharedButtonDefault } from "@components";
import { enumNotificationAction } from "@configs";
import { INotifications } from "@interfaces";
import { Avatar, Modal } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
interface Iprops {
    isVisible: boolean;
    handleOk: (enumNotificationAction) => void;
    customer: INotifications | undefined;
    handleCancel: () => void;
    confirmType: enumNotificationAction;
}
const defaultAvatar = "/images/newUser/default-user.png";
export const ModuleConfirmModal = (props: Iprops) => {
    const { isVisible, handleOk, customer, confirmType, handleCancel } = props;
    const { t } = useTranslation();
    return (
        <StyledModal
            title={
                confirmType === enumNotificationAction.RESOLVED ? (
                    <h4>{t("page.redeem.confirm_accept_redeem")}</h4>
                ) : (
                    <h4>{t("page.redeem.confirm_reject_redeem")}</h4>
                )
            }
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={"500px"}
            footer={null}
        >
            <div className="user-info">
                <Avatar src={defaultAvatar} className="avatar" alt="field not found" />
                <p className="name">{customer?.client_user?.fullName}</p>
                <p className="phone">{customer?.client_user?.phoneNumber}</p>
            </div>
            <div className="code">
                {t("page.redeem.code")}
                <p className="number">{customer?.ticketCode}</p>
            </div>
            <div className="btn-layout">
                <SharedButtonDefault
                    style={{
                        background: "white",
                        fontSize: 16,
                        padding: 14,
                        fontWeight: 600,
                        height: 49,
                        backgroundColor: "#0263E0",
                        color: "#fff",
                    }}
                    text={
                        confirmType === enumNotificationAction.RESOLVED
                            ? t("page.redeem.confirm_redeem")
                            : t("page.redeem.reject_redeem")
                    }
                    type="default"
                    size="default"
                    className="default-btn"
                    onClick={() => handleOk(confirmType)}
                />
            </div>
        </StyledModal>
    );
};
const StyledModal = styled(Modal)`
    .ant-modal-close {
        top: 6px !important;
    }
    .ant-modal-content {
        border-radius: 8px;
        .ant-modal-header {
            background: #f7f7f8;
            padding: 16px 28px !important;
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #000000;
            }
        }
        .ant-modal-body {
            display: flex;
            flex-direction: column;
            padding: 28px !important;
            align-items: center;
            text-align: center;
            p {
                margin: 0;
            }
            .user-info {
                width: 100%;
                padding-bottom: 20px;
                border-bottom: 1px dashed #e1e1e1;
                .avatar {
                    width: 42px;
                    height: 42px;
                }
                .name {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                }
                .phone {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    color: #646464;
                }
            }
            .code {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                text-align: center;
                color: #646464;
                padding: 16px;
                background: #f7f7f8;
                width: 100%;
                text-align: center;
                align-items: center;
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
                margin-top: 20px;
                border-radius: 8px;

                .number {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 35px;
                    line-height: 48px;
                    display: flex;
                    align-items: center;
                    color: #0263e0;
                }
            }
            .btn-layout {
                width: 100%;
                padding-top: 20px;
                border-top: 1px solid #e1e1e1;
                button {
                    width: 100%;
                }
            }
        }
    }
`;
