import { SharedButtonDefault } from "@components";
import { Divider, Modal } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useNotify } from "@utils";
import QrReader from "modern-react-qr-reader";

export const ModuleModalQRWeb = ({ isVisible, handleOk, handleSearchFromQr }) => {
    const { t } = useTranslation();
    const { error } = useNotify();
    const handleScan = (data) => {
        if (data === null) return;
        handleSearchFromQr(data);
    };
    const handleError = (err) => {
        error(err);
    };
    return (
        <StyledModal
            title={
                <>
                    <h4>{t("page.member_points.scan_QR_code")}</h4>
                    <p>{t("page.member_points.scan_qr_code_des")}</p>
                </>
            }
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleOk}
            width="358px"
            footer={null}
        >
            {isVisible ? (
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                />
            ) : (
                <div className="qr-code-placeholder" />
            )}
            <Divider className="qr-divider" />
            <SharedButtonDefault
                style={{
                    width: 110,
                    background: "white",
                    // borderColor: "black",
                    fontSize: 16,
                    padding: 14,
                    fontWeight: 600,
                    height: 49,
                    backgroundColor: "#0263E0",
                    color: "#fff",
                }}
                text={t("page.member_points.ok")}
                type="default"
                size="default"
                className="default-btn"
                onClick={handleOk}
            />
        </StyledModal>
    );
};
const StyledModal = styled(Modal)`
    .ant-modal-content {
        .ant-modal-close {
            display: none;
        }
        .ant-modal-header {
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #000000;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #646464;
            }
        }
        .ant-modal-body {
            display: flex;
            align-items: center;
            flex-direction: column;
            .qr-code-scaner {
                width: 312px;
                height: 312px;
            }
            .qr-divider {
            }
            .qr-code-placeholder {
                width: 312px;
                height: 312px;
            }
        }
        .ant-modal-footer {
            /* border-top: 1px solid #e1e1e1; */
            padding: 20px;
        }
    }
`;
