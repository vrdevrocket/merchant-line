import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ScanIcon, SharedButtonDefault, StyledCard, ComponentInfoBox } from "@components";
import ScrollContainer from "react-indiana-drag-scroll";
import { Input } from "antd";
import { ModuelEmptyState } from "./EmptyState";
import { ModuleMemberCard } from "./Card";
import { ModuleModalQRMobile } from "./Modal";
import { setLoading } from "@redux";
import { fireBaseAPI } from "@api";
import { numberFormatter, showErrorMessage, theme, useNotify } from "@utils";
import { INotifications } from "@interfaces";
import { dateFormat, dateFormatHM, enumNotificationAction, enumPlacement } from "@configs";
import { ModuleConfirmModal } from "./ConfirmModal";
import { useMediaQuery } from "react-responsive";
import { ModuleMobilePopup } from "./MobilePopup";
import { ModuleAlertSuccess } from "./AlertSuccess";
import moment from "moment";

const { Search } = Input;
const defaultImage = "/images/newUser/default-reward.png";

export const PageRedeem = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { error, success } = useNotify();
    const [customer, setCustomer] = useState<INotifications>();
    const [searchValue, setSearchValue] = useState("");
    const [isVisibleMobileQr, setVisibleMobileQr] = useState(false);
    const [isVisibleWebQr, setVisibleWebQr] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [confirmType, setConfirmAction] = useState<enumNotificationAction>(
        enumNotificationAction.RESOLVED
    );
    const [confirmModal, setConfirmModal] = useState(false);

    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakPoints.breakTablet})` });

    const handleClickQr = () => {
        setVisibleMobileQr(!isVisibleMobileQr);
        setVisibleWebQr(!isVisibleWebQr);
    };

    const handleSearch = async (value) => {
        if (value) {
            try {
                dispatch(setLoading(true));
                const res = await fireBaseAPI.getHistoryByTicketCode(value);
                setCustomer(res.data);
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.customer_not_found"));
            } finally {
                dispatch(setLoading(false));
            }
        }
    };
    const handleClearCustomer = () => {
        setCustomer(undefined);
        setSearchValue("");
    };
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };
    const handleSearchFromQr = (value) => {
        setSearchValue(value);
        setVisibleMobileQr(false);
        setVisibleWebQr(false);
    };

    const updatePoints = async (e: enumNotificationAction) => {
        if (customer?._id) {
            try {
                await fireBaseAPI.updateStatus(customer?._id, { status: e });
                success(t("message.update.success"));
                setConfirmModal(false);
                setAlertSuccess(true);
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else err("message.error");
            }
        }
    };

    const handleConfirmModal = () => {
        setConfirmModal(false);
    };
    const handleAlertSuccess = () => {
        setAlertSuccess(false);
    };
    const handleConfirmActions = (param: enumNotificationAction) => {
        if (param === enumNotificationAction.RESOLVED) {
            setConfirmAction(enumNotificationAction.RESOLVED);
            setConfirmModal(true);
        } else {
            setConfirmAction(enumNotificationAction.REJECT);
            setConfirmModal(true);
        }
    };

    return (
        <StyledPageWrapper>
            <ModuleAlertSuccess
                isVisible={alertSuccess}
                handleCancel={handleAlertSuccess}
                confirmType={confirmType}
            />
            {isMobile ? (
                <ModuleModalQRMobile
                    handleOk={handleClickQr}
                    isVisible={isVisibleMobileQr}
                    handleSearchFromQr={handleSearchFromQr}
                />
            ) : (
                <ModuleModalQRMobile
                    handleOk={handleClickQr}
                    isVisible={isVisibleWebQr}
                    handleSearchFromQr={handleSearchFromQr}
                />
            )}

            {isMobile ? (
                <ModuleMobilePopup
                    handleOk={updatePoints}
                    confirmType={confirmType}
                    isVisible={confirmModal}
                    customer={customer}
                    handleCancel={handleConfirmModal}
                />
            ) : (
                <ModuleConfirmModal
                    handleOk={updatePoints}
                    confirmType={confirmType}
                    isVisible={confirmModal}
                    customer={customer}
                    handleCancel={handleConfirmModal}
                />
            )}
            <div className="page-layout">
                <div className="page-header">
                    <h3>{t("page.redeem.accept_redeem")}</h3>
                    <ComponentInfoBox
                        videoUrl={"https://www.youtube.com/watch?v=MfG8ZdBT4f8"}
                        title={t("page.box_info.accept_redeem_title")}
                        body={[
                            t("page.box_info.accept_redeem_body"),
                            t("page.box_info.accept_redeem_body_1"),
                            t("page.box_info.accept_redeem_body_2"),
                            t("page.box_info.accept_redeem_body_3"),
                            t("page.box_info.accept_redeem_body_4"),
                            t("page.box_info.accept_redeem_body_5"),
                        ]}
                        placement={enumPlacement.TOP}
                    />
                </div>
                <ScrollContainer vertical={true}>
                    <div className="member-layout">
                        <StyledLayout>
                            <div className="left-col">
                                <div className="card-element">
                                    <StyledCard maxWidth="unset">
                                        <h3>{t("page.redeem.search_redem")}</h3>
                                        <div>
                                            <div className="search-member">
                                                <Search
                                                    className="search-input"
                                                    onSearch={handleSearch}
                                                    onChange={handleSearchChange}
                                                    value={searchValue}
                                                    placeholder={t(
                                                        "page.redeem.search_placeholder"
                                                    )}
                                                />
                                                <SharedButtonDefault
                                                    style={btnStyle}
                                                    text={t("page.member_points.qr_code")}
                                                    type="default"
                                                    size="default"
                                                    className="search-btn"
                                                    onClick={handleClickQr}
                                                    // disable={isSubmitting}
                                                    customIcon={<ScanIcon />}
                                                ></SharedButtonDefault>
                                            </div>
                                            <div className="search-result">
                                                {customer ? (
                                                    <ModuleMemberCard
                                                        customer={customer}
                                                        callBack={handleClearCustomer}
                                                    />
                                                ) : (
                                                    <ModuelEmptyState />
                                                )}
                                            </div>
                                        </div>
                                    </StyledCard>
                                </div>
                                {customer && (
                                    <>
                                        <div className="card-element">
                                            <StyledCard maxWidth="unset">
                                                <h3>{t("page.redeem.details")}</h3>
                                                <StyledDetailLayout>
                                                    <div className="detail-item">
                                                        <div className="detail-info">
                                                            <img
                                                                alt="reward images"
                                                                src={
                                                                    customer.rewardDetail
                                                                        ?.imageUrl[0] ||
                                                                    defaultImage
                                                                }
                                                            />
                                                            <div className="detail-des">
                                                                <div className="detail-title">
                                                                    {t("page.redeem.code")}
                                                                    <span className="code">
                                                                        {customer.ticketCode}
                                                                    </span>
                                                                    <div className="redeem-type">
                                                                        {customer.title}
                                                                    </div>
                                                                </div>
                                                                <h5
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: customer.body,
                                                                    }}
                                                                ></h5>
                                                                <div className="points">
                                                                    {t("page.redeem.points")}
                                                                    <span className="point-value">
                                                                        {numberFormatter(
                                                                            customer.historyDetail
                                                                                ?.points
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="redeem-attributes">
                                                            <div className="item">
                                                                <p>{t("page.redeem.activity")}</p>
                                                                <p>{customer.title}</p>
                                                            </div>
                                                            <div className="item">
                                                                <p>{t("page.redeem.redeem_at")}</p>
                                                                <p>
                                                                    {moment(
                                                                        customer.createdAt
                                                                    ).format(dateFormatHM)}
                                                                </p>
                                                            </div>
                                                            <div className="item">
                                                                <p>{t("page.redeem.status")}</p>
                                                                <p>{customer.status}</p>
                                                            </div>
                                                            <div className="item">
                                                                <p>{t("page.redeem.period")}</p>
                                                                <p>
                                                                    {moment(
                                                                        customer.createdAt || ""
                                                                    ).format(dateFormat)}
                                                                    {" - "}
                                                                    {moment(
                                                                        customer.updatedAt || ""
                                                                    ).format(dateFormat)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="action-layout">
                                                            <SharedButtonDefault
                                                                style={rejectStyle}
                                                                text={t("page.redeem.reject")}
                                                                type="default"
                                                                size="default"
                                                                onClick={() =>
                                                                    handleConfirmActions(
                                                                        enumNotificationAction.REJECT
                                                                    )
                                                                }
                                                                className="action-btn"
                                                            ></SharedButtonDefault>
                                                            <SharedButtonDefault
                                                                style={redeemStyle}
                                                                text={t("page.redeem.redeem")}
                                                                type="default"
                                                                size="default"
                                                                onClick={() =>
                                                                    handleConfirmActions(
                                                                        enumNotificationAction.RESOLVED
                                                                    )
                                                                }
                                                                className="action-btn"
                                                            ></SharedButtonDefault>
                                                        </div>
                                                    </div>
                                                </StyledDetailLayout>
                                            </StyledCard>
                                        </div>
                                    </>
                                )}
                            </div>
                        </StyledLayout>
                    </div>
                </ScrollContainer>
            </div>
        </StyledPageWrapper>
    );
};
const StyledPageWrapper = styled.div`
    padding: 2rem 3.5rem 3.5rem 3.5rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 3.5rem;
    /* height: calc(100vh - ${(p) => p.theme.header.height});
    min-height: calc(100vh - ${(p) => p.theme.header.height}); */
    height: 84vh;
    overflow: auto;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
    }
    .page-header {
        display: flex;
        flex-wrap: wrap;
        padding: 1.5rem 0 14px 0;
        .add-btn {
            background-color: ${(p) => p.theme.colors.danger};
            color: white;
            justify-content: space-evenly;
        }

        h3 {
            margin-right: 10px;
            font-weight: 700;
            font-size: 35px;
            margin-bottom: 0;
            color: black;
        }
        p {
            color: ${(p) => p.theme.colors.fadedText};
            font-size: 16px;
            font-weight: 600;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            /* flex-direction: column; */
            /* align-items: flex-start; */
            align-items: center;
            div {
                justify-content: flex-start;
            }
            div:nth-child(2) {
                margin-top: 12px;
            }
            h3 {
                font-size: 16px;
                margin: 0;
            }
        }
    }
`;
const btnStyle = {
    background: "#0263E0",
    width: 145,
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    height: 49,
};
const rejectStyle = {
    background: "#fff",
    color: "#646464",
    fontSize: 16,
    fontWeight: 600,
    height: 49,
};
const redeemStyle = {
    background: "#0263E0",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    height: 49,
};
const StyledDetailLayout = styled.div`
    display: flex;
    flex-direction: column;
    .detail-info {
        display: flex;
        margin-bottom: 5px;
        padding-bottom: 30px;
        border-bottom: 1px dashed #e1e1e1;
        img {
            /* border: 1px solid #ddd; */
            width: 120px;
            height: 120px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                width: 74px;
                height: 74px;
            }
        }
        .detail-des {
            padding: 4px 10px;
            .detail-title {
                margin-bottom: 12px;
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #a5a5a5;
                .code {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    display: flex;
                    align-items: center;
                    color: #000000;
                    padding-left: 4px;
                }
                .redeem-type {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    padding: 4px 12px;
                    gap: 10px;
                    max-width: 130px;
                    height: 22px;
                    background: #6cd14e;
                    border-radius: 70px;
                    margin-left: 10px;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 10px;
                    line-height: 14px;
                    color: #ffffff;
                }
            }
        }
        h5 {
            height: 44px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            /* display: flex; */
            /* align-items: center; */
            color: #000000;
        }
        .points {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            display: flex;
            align-items: center;
            color: #000000;
            .point-value {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #0263e0;
                padding-left: 8px;
            }
        }
    }

    .redeem-attributes {
        margin-bottom: 30px;
        .item {
            display: flex;
            justify-content: space-between;
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #a5a5a5;
            border-bottom: 0.5px solid #e1e1e1;
            padding: 15px 0;
            p {
                margin: 0;
            }
        }
    }
    .action-layout {
        display: flex;
        justify-content: space-between;
        column-gap: 15px;
        div {
            flex: 1;
            button {
                width: 100%;
            }
        }
    }
`;
const StyledLayout = styled.div`
    display: flex;
    max-width: 727px;
    width: 100%;
    flex: 1;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        display: initial;
    }
    .left-col {
        flex: 4;
        .card-element {
            margin-bottom: 19px;
            .add-point-field {
                p {
                    margin: 0;
                }
                display: flex;
                align-items: center;
                justify-content: space-between;
                .input-col {
                    flex: 4;
                    position: relative;
                    .float-label {
                        position: absolute;
                        top: 15px;
                        right: 14px;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #646464;
                    }
                }
                input {
                    height: 48px;
                }
                .middle-or {
                    margin: 0 12px 14px 12px;
                    text-align: center;
                    /* margin-bottom: 14px; */
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                }
            }
            .use-point-field {
                width: 50%;

                .w-90 {
                    width: 100%;
                }
                .point-input {
                    position: relative;
                    .float-label {
                        position: absolute;
                        top: 56px;
                        right: 14px;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #646464;
                    }
                }
            }
            .ant-tabs-bar.ant-tabs-top-bar {
                border-bottom: 0;
            }
            .ant-tabs-nav .ant-tabs-tab-active {
                font-weight: 700;
                color: #f22f46;
            }
            .ant-tabs-nav .ant-tabs-tab {
                padding: 0;
                padding-bottom: 6px;
            }
            .ant-tabs-nav .ant-tabs-tab:hover {
                color: #f22f46;
            }
            .ant-tabs-nav .ant-tabs-tab:focus-visible {
                outline: 0;
            }
            .ant-tabs-ink-bar {
                background-color: #f22f46;
                width: 72px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                h3 {
                    font-size: 14px;
                }
                .search-input {
                    input::placeholder {
                        width: 170px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .right-col {
        flex: 3;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            display: none;
        }
    }
    .search-result {
        background: #f7f7f8;
        /* padding: 8px; */
    }
    .search-member {
        display: flex;
        column-gap: 16px;
        margin-bottom: 28px;
        .search-input {
            height: 48px;
            background: #ffffff;
            border: 0.5px solid #a5a5a5;
            border-radius: 5px;
            &:hover {
                border: 0;
            }
        }
        .ant-input-suffix {
            i {
                font-size: 24px;
            }
        }
        .search-btn {
            border-radius: 4px;
            padding: 0;
            .btn-text {
                margin-left: 5px;
            }
            @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                width: 49px !important;
                .btn-text {
                    display: none;
                }
            }
        }
    }
`;
