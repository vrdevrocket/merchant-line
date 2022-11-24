import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import { INotifications } from "@interfaces";
import styled from "styled-components";
import { enumNotificationAction } from "@configs";
import { SharedButtonDefault } from "@components";
import { Avatar } from "antd";
interface Iprops {
    isVisible: boolean;
    handleCancel: () => void;
    handleOk: (enumNotificationAction) => void;
    customer: INotifications | undefined;
    confirmType: enumNotificationAction;
}
export const ModuleMobilePopup = (props: Iprops) => {
    const { t } = useTranslation();
    const { isVisible, handleCancel, customer, confirmType, handleOk } = props;
    return (
        <StyledDrawer
            title={
                confirmType === enumNotificationAction.RESOLVED ? (
                    <div className="h-layout">
                        <h4>{t("page.redeem.confirm_accept_redeem")}</h4>
                        <div onClick={handleCancel}>
                            <CloseIcon />
                        </div>
                    </div>
                ) : (
                    <div className="h-layout">
                        <h4>{t("page.redeem.confirm_reject_redeem")}</h4>
                        <div onClick={handleCancel}>
                            <CloseIcon />
                        </div>
                    </div>
                )
            }
            placement={"bottom"}
            closable={false}
            onClose={handleCancel}
            visible={isVisible}
            height="60vh"
        >
            <div className="user-info">
                <Avatar src={""} className="avatar" alt="field not found" />
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
        </StyledDrawer>
    );
};
const CloseIcon = () => (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.5L17 17.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 17.5L17 1.5" stroke="#646464" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const StyledDrawer = styled(Drawer)`
    .ant-drawer-wrapper-body {
        .ant-drawer-header {
            padding: 32px 16px !important;
            height: 70px !important;
            .ant-drawer-title {
                width: 100%;
                .h-layout {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    h4 {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 25px;
                        line-height: 34px;
                        text-align: center;
                        color: #000000;
                        margin: 0;
                    }
                }
            }
        }
        .ant-drawer-body {
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
