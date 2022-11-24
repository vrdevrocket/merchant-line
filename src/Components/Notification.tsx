import styled from "styled-components";
import { Button, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { INotifications, INotificationsUserInfo } from "@interfaces";
import { enumNotificationAction, enumNotificationActionText, enumNotiType } from "@configs";
import { fireBaseAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";

export const ComponentNotificationItem = (props: INotifications) => {
    // hooks
    const { error, success } = useNotify();
    const { t } = useTranslation();
    //props
    const { title, body, notiStatus, type, _id, updatedAt, client_user, ticketCode } = props;
    const [styleSelect, setStyleSelect] = useState<{
        background: string;
        color: string;
        borderColor: string;
    }>({
        background: "white",
        color: "#646464",
        borderColor: "#d9d9d9",
    });
    const [status, setStatus] = useState<enumNotificationAction>(notiStatus);
    const [view, setView] = useState<boolean>(false);
    const handleChange = async (e: enumNotificationAction) => {
        // if (notiStatus === enumNotificationAction.PENDING) {
        if (notiStatus !== e) {
            if (_id) {
                try {
                    await fireBaseAPI.updateStatus(_id, { status: e });
                    success(t("message.update.success"));
                    setStatus(e);
                } catch (err: any) {
                    if (err.response) {
                        error(showErrorMessage(err.response));
                    } else err("message.error");
                }
            }
        }
        // }
    };

    useEffect(() => {
        switch (status) {
            case enumNotificationAction.RESOLVED:
                setStyleSelect({ background: "#0263e0", color: "white", borderColor: "#0263e0" });
                break;
            case enumNotificationAction.REJECT:
                setStyleSelect({ background: "#F22F46", color: "white", borderColor: "#d9d9d9" });
                break;
            case enumNotificationAction.PENDING:
                setStyleSelect({
                    background: "white",
                    color: "#646464",
                    borderColor: "#d9d9d9",
                });
                break;
        }
    }, [status]);
    const handleViewDetail = () => {
        setView(!view);
    };
    const getenumNotificationText = (params) => {
        switch (params) {
            case enumNotificationAction.RESOLVED:
                return enumNotificationActionText.USED;
                break;
            case enumNotificationAction.PENDING:
                return enumNotificationActionText.PENDING;
                break;
            case enumNotificationAction.REJECT:
                return enumNotificationActionText.CANCEL;
                break;
            default:
                break;
        }
    };
    const getNameCombineText = (client_user: INotificationsUserInfo) => {
        if (client_user === undefined) {
            return _id;
        }
        return `${client_user?.fullName}(ID: ${client_user?.memberCode})`;
    };
    return (
        <StyledNotiItem>
            <Modal
                visible={view}
                title="Confirmation slip"
                onOk={handleViewDetail}
                onCancel={handleViewDetail}
                footer={[
                    <StyledButton>
                        <Button className="btn-done" type="primary" onClick={handleViewDetail}>
                            Done
                        </Button>
                    </StyledButton>,
                ]}
            >
                <StyledModalContainer>
                    <div className="text">
                        <h5 className="title">Name</h5>
                        <p className="content">{getNameCombineText(client_user)}</p>
                    </div>
                    <div className="text">
                        <h5 className="title">Type</h5>
                        <p className="content">{title}</p>
                    </div>
                    <div className="text">
                        <h5 className="title">Transaction</h5>
                        <p className="content" dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                    {updatedAt && (
                        <div className="text">
                            <h5 className="title">Date / time:</h5>
                            <p className="content eng">
                                {/* {updatedAt || "-"} */}
                                {t("format.date", {
                                    date: new Date(updatedAt || ""),
                                })}
                            </p>
                        </div>
                    )}

                    <div className="text">
                        <h5 className="title">Ticket</h5>
                        <p className="content">{ticketCode || "-"}</p>
                    </div>
                    {notiStatus &&
                        (type === enumNotiType.REWARD_REDEEM ||
                            type === enumNotiType.BENEFIT_REDEEM ||
                            type === enumNotiType.COUPON_COLLECT ||
                            type === enumNotiType.COUPON_UPDATE ||
                            type === enumNotiType.COUPON_USE) && (
                            <StyledModalBtnLayout styleSelect={styleSelect}>
                                <div className="text">
                                    <h5 className="title select-label">Status</h5>
                                    <div className="select">
                                        {notiStatus &&
                                            (type === enumNotiType.REWARD_REDEEM ||
                                                type === enumNotiType.BENEFIT_REDEEM ||
                                                type === enumNotiType.COUPON_COLLECT ||
                                                type === enumNotiType.COUPON_UPDATE ||
                                                type === enumNotiType.COUPON_USE) && (
                                                <Select
                                                    value={status}
                                                    onChange={handleChange}
                                                    disabled={
                                                        status !== enumNotificationAction.PENDING
                                                    }
                                                >
                                                    <Select.Option
                                                        value={enumNotificationAction.RESOLVED}
                                                    >
                                                        {getenumNotificationText(
                                                            enumNotificationAction.RESOLVED
                                                        )}
                                                    </Select.Option>
                                                    <Select.Option
                                                        value={enumNotificationAction.PENDING}
                                                    >
                                                        {getenumNotificationText(
                                                            enumNotificationAction.PENDING
                                                        )}
                                                    </Select.Option>
                                                    <Select.Option
                                                        value={enumNotificationAction.REJECT}
                                                    >
                                                        {getenumNotificationText(
                                                            enumNotificationAction.REJECT
                                                        )}
                                                    </Select.Option>
                                                </Select>
                                            )}
                                    </div>
                                </div>
                            </StyledModalBtnLayout>
                        )}
                </StyledModalContainer>
            </Modal>

            <StyledContainer styleSelect={styleSelect}>
                <div className="text" onClick={handleViewDetail}>
                    <h5 className="title">{title}</h5>
                    <p className="content">
                        <div dangerouslySetInnerHTML={{ __html: body }} />
                    </p>
                </div>
                <div className="select">
                    {notiStatus &&
                        (type === enumNotiType.REWARD_REDEEM ||
                            type === enumNotiType.BENEFIT_REDEEM ||
                            type === enumNotiType.COUPON_COLLECT ||
                            type === enumNotiType.COUPON_UPDATE ||
                            type === enumNotiType.COUPON_USE) && (
                            <Select
                                value={status}
                                onChange={handleChange}
                                className="body-text"
                                disabled={status !== enumNotificationAction.PENDING}
                            >
                                <Select.Option value={enumNotificationAction.RESOLVED}>
                                    {getenumNotificationText(enumNotificationAction.RESOLVED)}
                                </Select.Option>
                                <Select.Option value={enumNotificationAction.PENDING}>
                                    {getenumNotificationText(enumNotificationAction.PENDING)}
                                </Select.Option>
                                <Select.Option value={enumNotificationAction.REJECT}>
                                    {getenumNotificationText(enumNotificationAction.REJECT)}
                                </Select.Option>
                            </Select>
                        )}
                </div>
            </StyledContainer>
        </StyledNotiItem>
    );
};
const StyledNotiItem = styled.div``;
const StyledButton = styled.div`
    .ant-btn-primary {
        background-color: #0263e0;
        border-color: #0263e0;
        min-width: 100px;
        height: 40px;
    }
`;
const StyledModalContainer = styled.div`
    .text {
        .title {
            font-size: 16px;
            font-weight: 500;
            color: black;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: normal;
            margin-bottom: 4px;
            &.select-label {
                margin-bottom: 6px;
            }
        }
        .content {
            font-size: 14px;
            color: ${(p) => p.theme.colors.fadedText};
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 14px;
        }
    }
`;
const StyledModalBtnLayout = styled.div<{
    styleSelect: { background: string; color: string; borderColor: string };
}>`
    .ant-select-selection--single {
        background-color: ${(p) => p.styleSelect.background};
        color: ${(p) => p.styleSelect.color};
        border-color: ${(p) => p.styleSelect.borderColor};
    }
    .ant-select-arrow {
        svg {
            color: ${(p) => (p.styleSelect.color === "white" ? "white" : "black")};
        }
    }
`;
const StyledContainer = styled.div<{
    styleSelect: { background: string; color: string; borderColor: string };
}>`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid #d9d9d9; */
    border-radius: 6px;
    margin: 14px 0;
    background-color: white;
    &:hover {
        box-shadow: 0px 0px #1e7cf5, 0px 0 5px #1e7cf5;
    }
    .text {
        .title {
            font-size: 16px;
            font-weight: 500;
            color: black;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: normal;
        }
        .content {
            font-size: 14px;
            color: ${(p) => p.theme.colors.fadedText};
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .ant-select-selection--single {
        background-color: ${(p) => p.styleSelect.background};
        color: ${(p) => p.styleSelect.color};
        border-color: ${(p) => p.styleSelect.borderColor};
    }
    .ant-select-arrow {
        svg {
            color: ${(p) => (p.styleSelect.color === "white" ? "white" : "black")};
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .text {
            .title {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
            .content {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 19px;
                color: #646464;
            }
        }
    }
`;
