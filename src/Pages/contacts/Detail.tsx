import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Avatar, Icon, Input, Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import moment from "moment";

import { SharedButtonDefault, StyledCard } from "@components";
import { ModuleEditMembershipTier, ModuleEdit, ModuleEditPoint } from "@modules";
import { getCurrentId, getCurrentPoints, selectAuth } from "@redux";
import { IContactDetail } from "@interfaces";
import { contactAPI } from "@api";
import { enumContactEditType, PATH_CONTACTS } from "@configs";
import { numberFormatter, showErrorMessage, useNotify } from "@utils";

export const PageContactDetail = () => {
    // page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { warning } = useNotify();
    // redux states
    const membershipTiers = useSelector(selectAuth).userInfo?.merchant?.membershipTiers;
    //page state
    const [showEditPoint, setShowEditPoint] = useState(false);
    const [editType, setEditType] = useState<enumContactEditType | null>();
    const [showMembership, setShowMembership] = useState(false);
    const [userData, setUserData] = useState<IContactDetail>();
    const [visible, setVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getDetail();
    }, []);

    //FETCH DETAIL API
    const getDetail = async () => {
        // dispatch(setLoading(true));
        setIsLoading(true);
        try {
            const response = await contactAPI.detail(id);
            if (response.data) {
                setUserData(response.data);
                dispatch(getCurrentPoints(response.data.user?.points.totalPoints));
                dispatch(getCurrentId(response.data.user?._id));
            }
        } catch (err: any) {
            if (err.response) {
                warning(showErrorMessage(err.response));
            } else warning(t("message.not_found", { name: t("object._contact") }));
            history.push(PATH_CONTACTS);
        } finally {
            // dispatch(setLoading(false));
            setIsLoading(false);
        }
    };

    const handleGetDetail = useCallback(() => {
        getDetail();
        setVisible(false);
        setTimeout(() => {
            setEditType(null);
        }, 300);
    }, []);

    // ACTION MODULE
    // const handleEditPhone = useCallback(() => {
    //     setEditType(enumContactEditType.TEL);
    //     setVisible(true);
    // }, []);

    const handleEditName = useCallback(() => {
        setEditType(enumContactEditType.NAME);
        setVisible(true);
    }, []);

    // const handleEditEmail = useCallback(() => {
    //     setEditType(enumContactEditType.EMAIL);
    //     setVisible(true);
    // }, []);

    const handleEditDOB = useCallback(() => {
        setEditType(enumContactEditType.DOB);
        setVisible(true);
    }, []);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            setEditType(null);
        }, 300);
    }, []);

    const editPoint = () => {
        if (userData?.user?.points) {
            dispatch(getCurrentPoints(userData?.user?.points.totalPoints));
            setShowEditPoint(true);
        }
    };

    const closeEditPoint = () => {
        getDetail();
        setShowEditPoint(false);
    };

    const editMemberShip = () => {
        setShowMembership(true);
    };

    const submitMembership = () => {
        getDetail();
        setShowMembership(false);
    };

    const calcPointToNextTier = () => {
        if (userData?.user?.memberTier?.accumulativePoints && membershipTiers) {
            const accumulativePoints = userData.user.memberTier.accumulativePoints;
            const arr = membershipTiers.map((item) => {
                if (item.status && !item.isDefault) {
                    return item.pointThreshold;
                } else return 0;
            });
            const pointToNext = arr.filter((item) => item > accumulativePoints);
            if (pointToNext.length) return pointToNext[0] - accumulativePoints;
            else return 0;
        } else return 0;
    };
    calcPointToNextTier();

    return (
        <StyledContainer>
            {editType && userData && (
                <ModuleEdit
                    callbackGetDetail={handleGetDetail}
                    visible={visible}
                    handleClose={handleClose}
                    editType={editType}
                    editValues={userData}
                />
            )}

            <ModuleEditPoint
                userId={userData?._id}
                callbackGetList={closeEditPoint}
                visible={showEditPoint}
                handleClose={() => setShowEditPoint(false)}
            />
            {userData?.user?._id && (
                <ModuleEditMembershipTier
                    handleCallbackData={submitMembership}
                    userId={userData.user._id}
                    visible={showMembership}
                    handleClose={() => setShowMembership(false)}
                    currentMemberTier={userData.user?.memberTier}
                />
            )}
            <div className="top-field">
                <Skeleton
                    loading={isLoading}
                    avatar={{ size: "large" }}
                    paragraph={{ rows: 1, width: "100px" }}
                    className="skeleton-user-name"
                >
                    <Avatar
                        style={{ minWidth: 86 }}
                        size={86}
                        src={userData?.user?.avatar || "/user-avatar.png"}
                    />
                    <div className="user-name">
                        <h5>{userData?.fullName}</h5>
                        <div className="button-field">
                            <SharedButtonDefault
                                size="default"
                                type="default"
                                text={`${numberFormatter(userData?.user?.points.totalPoints)} ${t(
                                    "page._points"
                                )}`}
                                disable={true}
                                style={{
                                    color: "#646464",
                                    background: "#E1E1E1",
                                    marginRight: 11,
                                    cursor: "inherit",
                                    height: "53px",
                                    fontSize: "20px",
                                    padding: "0 22px",
                                }}
                                className="responsive-btn btn-show-point eng"
                            />
                            {userData?.user?._id && (
                                <SharedButtonDefault
                                    size="default"
                                    type="primary"
                                    text={`${t("page.edit")} ${t("page._points")}`}
                                    style={{
                                        background: "#0263E0",
                                        height: "53px",
                                        fontSize: "20px",
                                        padding: "0 22px",
                                    }}
                                    onClick={editPoint}
                                    className="edit-btn responsive-btn btn-edit-point"
                                />
                            )}
                        </div>
                    </div>
                </Skeleton>
            </div>
            {isLoading ? (
                <div className="card-field">
                    <div className="card-wrap">
                        <StyledCard>
                            <Skeleton active />
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <Skeleton active />
                        </StyledCard>
                    </div>
                    <div className="card-wrap">
                        <StyledCard>
                            <Skeleton active />
                        </StyledCard>
                    </div>
                </div>
            ) : (
                <div className="card-field">
                    <div className="card-wrap">
                        {userData && (
                            <StyledCard>
                                <h3>{t("page.basic_info")}</h3>
                                <div className="label fit-content">
                                    <p className="title">{t("page.name")}</p>
                                    <Input
                                        value={userData?.fullName}
                                        type="text"
                                        className="content input-change-name eng"
                                        style={{ paddingRight: 10 }}
                                        suffix={
                                            <Icon
                                                onClick={handleEditName}
                                                className="icon-edit-name"
                                                type="edit"
                                                theme="filled"
                                            />
                                        }
                                        readOnly={true}
                                        onClick={handleEditName}
                                    />
                                    <div className="line"></div>
                                </div>
                                {/* <div className="label fit-content">
                                    <p className="title">{t("page.tel")}</p>
                                    <Input
                                        value={userData?.phoneNumber}
                                        type="text"
                                        className="content input-change-name"
                                        style={{ paddingRight: 10 }}
                                        suffix={
                                            <Icon
                                                onClick={handleEditPhone}
                                                className="icon-edit-name"
                                                type="edit"
                                                theme="filled"
                                            />
                                        }
                                        readOnly={true}
                                        onClick={handleEditPhone}
                                    />
                                    <div className="line"></div>
                                </div> */}
                                <div className="label">
                                    <p className="title">{t("page.tel")}</p>
                                    <p className="content eng">
                                        {userData.phoneNumber || t("page.empty_text")}
                                    </p>
                                </div>
                                <div className="label fit-content">
                                    <p className="title">{t("page.date_of_birth")}</p>
                                    <Input
                                        value={
                                            userData?.dateOfBirth
                                                ? t("format.date", {
                                                      date: new Date(userData?.dateOfBirth),
                                                  }).toString()
                                                : "---"
                                        }
                                        type="text"
                                        className="content input-change-name eng"
                                        style={{ paddingRight: 10 }}
                                        suffix={
                                            <Icon
                                                onClick={handleEditDOB}
                                                className="icon-edit-name"
                                                type="edit"
                                                theme="filled"
                                            />
                                        }
                                        readOnly={true}
                                        onClick={handleEditDOB}
                                    />
                                    <div className="line"></div>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.email")}</p>
                                    <p className="content eng">
                                        {userData.email || t("page.empty_text")}
                                    </p>
                                </div>
                                {/* <div className="label fit-content">
                                    <p className="title">{t("page.email")}</p>
                                    <Input
                                        value={userData?.email}
                                        type="text"
                                        className="content input-change-name"
                                        style={{ paddingRight: 10 }}
                                        suffix={
                                            <Icon
                                                onClick={handleEditEmail}
                                                className="icon-edit-name"
                                                type="edit"
                                                theme="filled"
                                            />
                                        }
                                        readOnly={true}
                                        onClick={handleEditEmail}
                                    />
                                    <div className="line"></div>
                                </div> */}
                                <div className="label">
                                    <p className="title">{t("page.contact_add_date")}</p>
                                    <p className="content eng">
                                        {(userData?.createdAt &&
                                            t("format.date", {
                                                date: new Date(userData?.createdAt),
                                            })) ??
                                            t("page.empty_text")}
                                    </p>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.member_registration_date")}</p>
                                    <p className="content eng">
                                        {(userData?.user?.createdAt &&
                                            t("format.date", {
                                                date: new Date(userData?.user?.createdAt),
                                            })) ??
                                            t("page.empty_text")}
                                    </p>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.traffic_source")}</p>
                                    {userData?.trafficSources?.length ? (
                                        <div className="flex-field-wrap">
                                            {userData?.trafficSources?.map((item, index) => (
                                                <SharedButtonDefault
                                                    key={index}
                                                    size="default"
                                                    type="default"
                                                    text={item.name}
                                                    disable={true}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="content">---</p>
                                    )}
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.last_activity_date")}</p>
                                    <p className="content eng">
                                        {(userData?.user?.lastActive &&
                                            t("format.date", {
                                                date: new Date(userData?.user?.lastActive),
                                            })) ??
                                            t("page.empty_text")}
                                    </p>
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.user_id")}</p>
                                    <p className="content eng">
                                        {userData?.user?.memberCode || t("page.empty_text")}
                                    </p>
                                </div>
                            </StyledCard>
                        )}
                    </div>
                    {userData?.user?._id && (
                        <>
                            <div className="card-wrap">
                                <StyledCard>
                                    <h3>{t("page.membership")}</h3>
                                    <div className="label">
                                        <p className="title">{t("page.membership_tier")}</p>
                                        <div className="button-field">
                                            <SharedButtonDefault
                                                size="default"
                                                type="default"
                                                text={
                                                    userData.user.memberTier?.tierName ||
                                                    t("page.empty_text")
                                                }
                                                style={{ fontSize: "16px", fontWeight: 300 }}
                                                disable={true}
                                            />
                                            <SharedButtonDefault
                                                size="default"
                                                type="primary"
                                                text={t("page.edit")}
                                                onClick={editMemberShip}
                                                className="edit-btn edit-tier"
                                            />
                                        </div>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.points_to_next_tier")}</p>
                                        <p className="content eng">
                                            {numberFormatter(calcPointToNextTier())}
                                        </p>
                                    </div>
                                </StyledCard>
                            </div>
                            {/* <div className="card-wrap">
                                <StyledCard>
                                    <h3>{t("page.LINE")}</h3>
                                    <div className="label">
                                        <p className="title">{t("page.LINE_ID")}</p>
                                        <p className="content"></p>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.LINE_User_ID")}</p>
                                        <p className="content">
                                            {userData?.user?.lineUserId || t("page.empty_text")}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.LINE_chat_tags")}</p>
                                        <div className="current-tags">
                                            <SharedButtonDefault
                                                size="default"
                                                type="default"
                                                text="Green"
                                                disable={true}
                                                style={{
                                                    width: 110,
                                                    padding: "9px",
                                                    fontSize: 16,
                                                    color: "#646464",
                                                    background: "#E1E1E1",
                                                    marginBottom: 10,
                                                    cursor: "inherit",
                                                }}
                                            />
                                            <SharedButtonDefault
                                                size="default"
                                                type="default"
                                                text="Blue"
                                                disable={true}
                                                style={{
                                                    width: 110,
                                                    padding: "9px",
                                                    fontSize: 16,
                                                    color: "#646464",
                                                    background: "#E1E1E1",
                                                    marginBottom: 10,
                                                    cursor: "inherit",
                                                }}
                                            />
                                            <SharedButtonDefault
                                                size="default"
                                                type="default"
                                                text={t("page.add")}
                                                icon="plus"
                                                style={{
                                                    width: 110,
                                                    padding: "9px",
                                                    fontSize: 16,
                                                    color: "#646464",
                                                    marginBottom: 10,
                                                    background: "white",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </StyledCard>
                            </div> */}
                            <div className="card-wrap">
                                <StyledCard>
                                    <h3>{t("page.points")}</h3>
                                    <div className="label">
                                        <p className="title">{t("page.points_balance")}</p>
                                        <p className="content eng">
                                            {numberFormatter(userData.user.points.totalPoints)}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">
                                            {t("page.points_to_expire_in_1_month")}
                                        </p>
                                        <p className="content eng">
                                            {numberFormatter(
                                                userData.user.points?.expiredPointsOneMonth
                                            )}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">
                                            {t("page.last_points_collection_date")}
                                        </p>
                                        <p className="content eng">
                                            {userData.user.points?.lastCollectionDate
                                                ? moment(
                                                      new Date(
                                                          userData.user.points?.lastCollectionDate
                                                      )
                                                  ).format("DD/MM/YYYY")
                                                : t("page.empty_text")}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">
                                            {t("page.last_points_redemption_date")}
                                        </p>
                                        <p className="content eng">
                                            {userData.user.points.lastRedemptionDate
                                                ? moment(
                                                      new Date(
                                                          userData.user.points.lastRedemptionDate
                                                      )
                                                  ).format("DD/MM/YYYY")
                                                : t("page.empty_text")}
                                        </p>
                                    </div>
                                </StyledCard>
                            </div>
                            <div className="card-wrap">
                                <StyledCard>
                                    <h3>{t("page.coupons")}</h3>
                                    <div className="label">
                                        <p className="title">{t("page.coupon_balance")}</p>
                                        <p className="content eng">
                                            {numberFormatter(userData.user.coupons.balance)}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.coupon_used")}</p>
                                        <p className="content eng">
                                            {numberFormatter(userData.user.coupons.used)}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">
                                            {t("page.coupons_to_expire_in_1_month")}
                                        </p>
                                        <p className="content eng">
                                            {numberFormatter(
                                                userData.user.coupons.expiredCouponsOneMonth
                                            )}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">
                                            {t("page.last_coupon_collection_date")}
                                        </p>
                                        <p className="content eng">
                                            {userData.user.coupons.lastCollectionDate
                                                ? moment(
                                                      new Date(
                                                          userData.user.coupons.lastCollectionDate
                                                      )
                                                  ).format("DD/MM/YYYY")
                                                : t("page.empty_text")}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.last_coupon_used_date")}</p>
                                        <p className="content eng">
                                            {userData.user.coupons.lastRedemptionDate
                                                ? moment(
                                                      new Date(
                                                          userData.user.coupons.lastRedemptionDate
                                                      )
                                                  ).format("DD/MM/YYYY")
                                                : t("page.empty_text")}
                                        </p>
                                    </div>
                                </StyledCard>
                            </div>
                            <div className="card-wrap">
                                <StyledCard>
                                    <h3>{t("page.sales")}</h3>
                                    <div className="label">
                                        <p className="title">{t("page.sales_amount")}</p>
                                        <p className="content eng">
                                            {numberFormatter(userData?.user.sales.totalSales)}
                                        </p>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.sales_last_date")}</p>
                                        <p className="content eng">
                                            {userData.user.sales.salesLastDate
                                                ? moment(
                                                      new Date(userData.user.sales.salesLastDate)
                                                  ).format("DD/MM/YYYY")
                                                : t("page.empty_text")}
                                        </p>
                                    </div>
                                </StyledCard>
                            </div>
                            {userData.user.surveyQuestions?.length >= 1 && (
                                <div className="card-wrap">
                                    <StyledCard>
                                        <h3>{t("page.form")}</h3>
                                        {Array.isArray(userData.user.surveyQuestions) &&
                                            userData.user.surveyQuestions.map((item, index) => (
                                                <div key={index} className="label">
                                                    <p className="title">{item.propertyName}</p>
                                                    <div className="button-field">
                                                        {item?.answers.map((item, index) => (
                                                            <SharedButtonDefault
                                                                key={index}
                                                                size="default"
                                                                type="default"
                                                                text={item}
                                                                disable={true}
                                                                className="button-tag-field"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                    </StyledCard>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    h5,
    p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }
    padding: 3.5rem;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 54px);
    .edit-btn:hover {
        color: white !important;
    }
    .responsive-btn {
        height: auto;
        margin-bottom: 4px;
        padding: 4px 8px;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 12px;
            padding: 6px 12px;
            margin-bottom: 10px;
        }
    }
    .button-field {
        display: flex;
        flex-wrap: wrap;
        .button-tag-field {
            margin-top: 10px;
            margin-right: 10px;
            width: 92;
            padding: 9px;
            font-size: 16px;
            color: #646464;
            background: #e1e1e1;
            margin-right: 10;
            margin-top: 10;
            cursor: inherit;
        }
        button {
            height: 32px;
        }
    }
    .top-field {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .user-name {
            line-height: normal;
            margin-left: 23px;
            h5 {
                line-height: 35px;
                font-size: 25px;
                font-weight: bold;
                color: black;
            }
        }
    }
    .card-field {
        overflow-y: scroll;
        max-width: 727px;
        width: 100%;
        height: calc(100vh - 64px);
        flex: 1;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            display: none;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #807c7c;
            cursor: grab !important;
        }
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            ::-webkit-scrollbar {
                display: none;
            }
        }
        .card-wrap {
            margin-bottom: 28px;
        }
    }
    .btn-show-point {
        margin-right: 11px;
        background: rgb(225, 225, 225);
        cursor: inherit;
        span {
            font-family: "Nunito" !important;
        }
    }
    .edit-tier {
        margin-left: 11px;
        background-color: ${(p) => p.theme.colors.primary}!important;
    }
    .flex-field-wrap {
        display: flex;
        flex-wrap: wrap;
        > div {
            margin-right: 10px;
            margin-top: 10px;
        }
    }

    /* loading  */
    .skeleton-user-name {
        max-width: 500px;
        width: 100%;
        background-color: white;
        padding: 1rem 3.5rem;
        border-radius: 4px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 16px;
        .ant-avatar {
            width: 64px !important;
            height: 64px !important;
            min-width: 64px !important;
        }
        .top-field {
            .user-name {
                margin-left: 16px;
                h5 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                }
                button {
                    height: 32px !important;
                    padding: 4px 8px !important;
                    margin-bottom: 0 !important;
                    font-weight: 700 !important;
                    font-size: 12px !important;
                    line-height: 16px !important;
                    display: flex;
                    align-items: center;
                    color: #646464;
                }
            }
        }
    }
`;
