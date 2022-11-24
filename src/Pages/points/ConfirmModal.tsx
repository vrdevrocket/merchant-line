import { AddPointIcon, SharedButtonDefault, SuccessIcon } from "@components";
import { IContactDetail, IPoint } from "@interfaces";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import ScrollContainer from "react-indiana-drag-scroll";
import styled from "styled-components";
interface Iprops {
    isVisible: boolean;
    handleOk: () => void;
    values: IPoint;
    customerName: string;
    isSubmitting: boolean;
    handleCancel: () => void;
    isUpdate: boolean;
    userData: IContactDetail | undefined;
}
export const ModuleConfirmModal = (props: Iprops) => {
    const {
        isVisible,
        handleOk,
        values,
        customerName,
        isSubmitting,
        isUpdate,
        handleCancel,
        userData,
    } = props;
    const { t } = useTranslation();
    const changeBahtPoint = (baht: number | undefined) => {
        if (!baht || userData === undefined) return null;
        const bathSpent = userData?.user?.currentTier?.bahtSpent || 0;
        const point = userData?.user?.currentTier?.points || 0;
        return Math.floor((baht / bathSpent) * point) || "0";
    };
    return (
        <StyledModal
            title={isUpdate ? null : <h4>{t("page.member_points.confirm_points")}</h4>}
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className={isUpdate ? "update-modal" : ""}
            width={isUpdate ? "206px" : "522px"}
            footer={
                isUpdate
                    ? null
                    : [
                          <SharedButtonDefault
                              style={{
                                  width: 110,
                                  background: "white",
                                  fontSize: 16,
                                  padding: 14,
                                  fontWeight: 600,
                                  height: 49,
                                  backgroundColor: "#0263E0",
                                  color: "#fff",
                              }}
                              text={t("page.member_points.confirm")}
                              type="default"
                              size="default"
                              className="default-btn"
                              disable={isSubmitting}
                              onClick={handleOk}
                          />,
                      ]
            }
        >
            {isUpdate ? (
                <div>
                    <SuccessIcon />
                    <p className="success-message">Send points successful !</p>
                </div>
            ) : (
                <div style={isSubmitting ? { opacity: 0.6 } : {}}>
                    <div className="form-group">
                        <label>{t("page.member_points.name")}</label>
                        <div className="value">{customerName || "-"}</div>
                    </div>
                    <div className="point-value">
                        <div className="point-label">
                            {values.add?.points || values.add?.sales
                                ? t("page.member_points.add_points")
                                : t("page.member_points.use_points")}
                        </div>
                        <AddPointIcon />
                        <div
                            className={
                                values.add?.points || values.add?.sales
                                    ? "point-value-num green"
                                    : "point-value-num red"
                            }
                        >
                            {values.add?.points || values.add?.sales ? "+ " : "- "}
                            {values.add?.points ||
                                changeBahtPoint(values.add?.sales) ||
                                values.use?.points}
                            {t("page.member_points.points")}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>{t("page.member_points.notation")}</label>
                        <div className="value">{values.note || "-"}</div>
                    </div>
                    <div className="form-group">
                        <label>{t("page.member_points.attach_images")}</label>
                        <div className="img-layout">
                            <ScrollContainer horizontal={true} className="image-value">
                                {/* <div className="image-value"> */}
                                {values.image_url.map((url) => (
                                    <img src={url} key={url} />
                                ))}
                                {/* </div> */}
                            </ScrollContainer>
                        </div>
                    </div>
                </div>
            )}
        </StyledModal>
    );
};
const StyledModal = styled(Modal)`
    &.update-modal {
        .ant-modal-body {
            text-align: center;
            .success-message {
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #000000;
            }
        }
        .ant-modal-close {
            display: none;
        }
    }
    .ant-modal-content {
        /* .ant-modal-close {
            display: none;
        } */
        border-radius: 8px;
        .ant-modal-header {
            background: #f7f7f8;
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
            align-items: baseline;
            flex-direction: column;

            padding: 32px 32px 0 32px !important;
            .form-group {
                margin-bottom: 16px;
                label {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    color: #a5a5a5;
                }
                .value {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                }
                .img-layout {
                    margin-top: 16px;
                }
                .image-value {
                    display: flex;
                    width: 457px;
                    overflow-x: scroll;

                    img {
                        width: 253.44px;
                        height: 154px;
                        margin-right: 19px;
                    }
                }
            }
            .point-value {
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                padding: 16px;
                border: 1px solid #f7f7f8;
                box-shadow: 0px 3px 6px rgb(162 162 162 / 16%);
                border-radius: 8px;
                margin-bottom: 16px;
                .point-label {
                    flex: 1;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    display: flex;
                    align-items: center;
                    color: #a5a5a5;
                }
                .point-value-num {
                    flex: 1;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 25px;
                    line-height: 34px;
                    color: #6cd14e;
                    display: flex;
                    justify-content: center;
                    &.red {
                        color: #f22f46;
                    }
                    &.green {
                        color: #6cd14e;
                    }
                }
            }
        }
        .ant-modal-footer {
        }
    }
`;
