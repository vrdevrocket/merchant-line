import { dateFormatHM } from "@configs";
import { enumActivityType, IActivity, IContactDetail } from "@interfaces";
import { Modal, Avatar, Divider } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
interface Iprops {
    isVisible: boolean;
    handleCancel: () => void;
    detail: IActivity | undefined;
    customer: IContactDetail | undefined;
}
const defaultAvatar = "/images/newUser/default-user.png";
export const ModuleDetailActivity = (props: Iprops) => {
    const { isVisible, handleCancel, customer, detail } = props;
    const { t } = useTranslation();
    return (
        <StyledModal
            title={t("page.member_points.history_points")}
            visible={isVisible}
            onCancel={handleCancel}
            width="522px"
            style={{ marginTop: "20vh" }}
            footer={null}
        >
            <div>
                <div className="form-group">
                    <td className="user-info">
                        <Avatar src={detail?.userImage || defaultAvatar} className="avatar" />
                        <div className="user-name">
                            <p>{customer?.fullName}</p>
                            <p>{customer?.phoneNumber}</p>
                            <div className="id">
                                {t("page.member_points.id", {
                                    id: customer?.memberCode,
                                })}
                            </div>
                        </div>
                    </td>
                </div>
                <div className="point-value">
                    <div className="point-label">
                        {detail?.type === enumActivityType.GIVEN
                            ? t("page.member_points.add_points")
                            : t("page.member_points.use_points")}
                    </div>
                    <RightArrow />
                    <div
                        className={
                            detail?.type === enumActivityType.GIVEN
                                ? "point-value-num green"
                                : "point-value-num red"
                        }
                    >
                        {detail?.type === enumActivityType.GIVEN ? "+ " : "- "}
                        {detail?.point}
                        {t("page.member_points.points")}
                    </div>
                </div>
                <Divider dashed={true} />
                <div className="form-group">
                    <label>{t("page.member_points.activity_time")}</label>
                    <div className="value">
                        {moment(detail?.updatedAt || "").format(dateFormatHM)}
                    </div>
                </div>
                <div className="form-group">
                    <label>{t("page.member_points.notes")}</label>
                    <div className="value">{detail?.note || "-"}</div>
                </div>
                <div className="form-group">
                    <label>{t("page.member_points.attach_images")}</label>
                    <div className="img-layout">
                        <img src={detail?.imageUrl} />
                        {/* <ScrollContainer horizontal={true} className="image-value">
                            
                                {detail.image_url.map((url) => (
                                    <img src={url} key={url} />
                                ))}
                                
                            </ScrollContainer> */}
                    </div>
                </div>
            </div>
        </StyledModal>
    );
};
const RightArrow = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="white" />
        <circle cx="16" cy="16" r="15.25" stroke="#0263E0" strokeOpacity="0.36" strokeWidth="1.5" />
        <path
            d="M8.53125 15.25C8.11704 15.25 7.78125 15.5858 7.78125 16C7.78125 16.4142 8.11704 16.75 8.53125 16.75L8.53125 15.25ZM25.0616 16.5303C25.3545 16.2374 25.3545 15.7626 25.0616 15.4697L20.2886 10.6967C19.9957 10.4038 19.5208 10.4038 19.2279 10.6967C18.9351 10.9896 18.9351 11.4645 19.2279 11.7574L23.4706 16L19.2279 20.2426C18.9351 20.5355 18.9351 21.0104 19.2279 21.3033C19.5208 21.5962 19.9957 21.5962 20.2886 21.3033L25.0616 16.5303ZM8.53125 16.75L24.5312 16.75L24.5313 15.25L8.53125 15.25L8.53125 16.75Z"
            fill="#0263E0"
        />
    </svg>
);
const StyledModal = styled(Modal)`
    .ant-modal-content {
        .ant-modal-close {
            top: 2px;
        }
        .ant-modal-header {
            padding: 20px 12px !important;
            background-color: #f7f7f8;
        }
        .ant-modal-body {
            display: flex;
            flex-direction: column;
            padding: 32px !important;
            .form-group {
                margin-bottom: 20px;
            }
            p {
                margin: 0;
            }
            .user-info {
                display: flex;
                justify-content: flex-start;
                .avatar {
                    width: 65px;
                    height: 65px;
                    display: flex;
                    justify-content: center;
                    padding: 4px;
                    background: #f0f0f0;
                    min-width: 32px;
                    img {
                        padding: 0px;
                        border-radius: 32px;
                        width: auto;
                        height: auto;
                    }
                }
                img {
                    width: 43px;
                    height: 43px;
                    border-radius: 50%;
                }
                .user-name {
                    padding-left: 10px;

                    p {
                        font-weight: 700;
                        font-size: 16px;
                        line-height: 22px;
                        color: #000000;
                    }
                    .id {
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #646464;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: 102px;
                    }
                }
            }
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
    }
`;
