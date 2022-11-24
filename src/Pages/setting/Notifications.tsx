import styled from "styled-components";
import {
    DatePicker,
    Switch,
    // Tabs
} from "antd";
// import moment from "moment";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { NotiSearch } from "@components";
import { Skeleton } from "@mui/material";

import { INotifications, IParamsNotify } from "@interfaces";
import { enumNotificationAction, PAGINATION } from "@configs";
import { showErrorMessage, useNotify } from "@utils";
import { fireBaseAPI } from "@api";
import { ModuleNotificationItem } from "@modules";

const x2Pagination = PAGINATION * 2;

interface IData {
    data: INotifications[];
    page: number;
    nextPage: boolean;
}

export const PageSettingNotifications = () => {
    //hooks
    const { t } = useTranslation();
    const { error } = useNotify();
    // states
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [isResolvedAll, setIsResolvedAll] = useState<boolean>(false);
    const [isResolved, setIsResolved] = useState<boolean>(false);
    // const [tabValue, changeTabValue] = useState<string>("1"); // initial tab value
    const [dateFilter, setDateFilter] = useState<string>("");
    const [searchText, setSearchText] = useState<string>("");
    // const [allData, setAllData] = useState<IData>({
    //     data: [],
    //     page: 0,
    //     nextPage: true,
    // });
    const [rewardData, setRewardData] = useState<IData>({
        data: [],
        page: 0,
        nextPage: true,
    });

    useEffect(() => {
        getInitData(isResolved, dateFilter, searchText);
    }, [isResolved, dateFilter, searchText]);
    const handleDateChange = (date, dateString) => {
        setDateFilter(dateString);
    };
    const handleTypeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    };
    // const handleChangeResolvedAll = (checked: boolean) => {
    //     setIsResolvedAll(checked);
    // };
    const handleChangeResolved = (checked: boolean) => {
        setIsResolved(checked);
    };
    // const handleChangeTabs = (value) => {
    //     changeTabValue(value);
    //     setIsResolved(false); // set default state like older version
    //     setIsResolvedAll(false); // set default state like older version
    // };
    // get data when scroll
    // const handleGetAll = async (page: number) => {
    //     const params: IParamsNotify = {
    //         page: page,
    //         limit: x2Pagination,
    //         status: isResolvedAll ? enumNotificationAction.RESOLVED : undefined,
    //         dateFilter: dateFilter,
    //         searchText: searchText,
    //     };
    //     try {
    //         const res = await fireBaseAPI.listNotify(params);

    //         if (res.data) {
    //             const filtered = isResolvedAll
    //                 ? res.data.docs.filter(
    //                       (item) => item.notiStatus === enumNotificationAction.RESOLVED
    //                   )
    //                 : res.data.docs;
    //             setAllData({
    //                 data: [...allData.data, ...filtered],
    //                 page: res.data.page,
    //                 nextPage: res.data.nextPage ? true : false,
    //             });
    //         }
    //     } catch (err: any) {
    //         if (err.response) {
    //             const mess = Array.isArray(err.response.data.errors)
    //                 ? err.response.data.errors[0]
    //                 : err.response.data.errors;
    //             error(mess);
    //         } else error(t("message.error"));
    //     }
    // };

    const handleGetReward = async (page: number) => {
        const params: IParamsNotify = {
            page: page,
            limit: x2Pagination,
            type: "REWARDS",
            status: isResolved ? enumNotificationAction.RESOLVED : undefined,
            dateFilter: dateFilter,
            searchText: searchText,
        };
        try {
            const res = await fireBaseAPI.listNotify(params);
            if (res.data) {
                setRewardData({
                    data: [...rewardData.data, ...res.data.docs],
                    page: res.data.page,
                    nextPage: res.data.nextPage ? true : false,
                });
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };

    // fetch initData
    const getInitData = async (isResolved, date, textSearch) => {
        setIsLoading(true);
        await fetchInitReward(isResolved, date, textSearch);
        setIsLoading(false);
    };
    // const getFetchInitAll = async () => {
    //     setIsLoading(true);
    //     await fetchInitAll();
    //     setIsLoading(false);
    // };
    // const getFetchInitReward = async () => {
    //     setIsLoading(true);
    //     await fetchInitReward();
    //     setIsLoading(false);
    // };

    const fetchInitReward = async (isResolved, date, textSearch) => {
        const fetchParams: IParamsNotify = {
            page: 1,
            limit: x2Pagination,
            type: "REWARDS",
            status: isResolved ? enumNotificationAction.RESOLVED : undefined,
            dateFilter: date,
            searchText: textSearch,
        };
        try {
            const res = await fireBaseAPI.listNotify(fetchParams);
            if (res.data) {
                setRewardData({
                    data: res.data.docs,
                    page: res.data.page,
                    nextPage: res.data.nextPage ? true : false,
                });
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };

    // const fetchInitAll = async () => {
    //     const fetchParams: IParamsNotify = {
    //         page: 1,
    //         limit: x2Pagination,
    //         status: isResolvedAll ? enumNotificationAction.RESOLVED : undefined,
    //         dateFilter: dateFilter,
    //         searchText: searchText,
    //     };
    //     try {
    //         const res = await fireBaseAPI.listNotify(fetchParams);
    //         if (res.data) {
    //             setAllData({
    //                 data: res.data.docs,
    //                 page: res.data.page,
    //                 nextPage: res.data.nextPage ? true : false,
    //             });
    //         }
    //     } catch (err: any) {
    //         if (err.response) {
    //             const mess = Array.isArray(err.response.data.errors)
    //                 ? err.response.data.errors[0]
    //                 : err.response.data.errors;
    //             error(mess);
    //         } else error(t("message.error"));
    //     }
    // };

    const loadingComponent = (
        <div className="loading-component">
            <div className="loading-item">
                <Skeleton width="20%" height={30} />
                <Skeleton width="100%" height={40} />
            </div>
            <div className="loading-item">
                <Skeleton width="20%" height={30} />
                <Skeleton width="100%" height={40} />
            </div>
            <div className="loading-item">
                <Skeleton width="20%" height={30} />
                <Skeleton width="100%" height={40} />
            </div>
            <div className="loading-item">
                <Skeleton width="20%" height={30} />
                <Skeleton width="100%" height={40} />
            </div>
        </div>
    );

    return (
        <StyledFilterLayout>
            <StyledContainer>
                <h3>{t("page.notifications")}</h3>
                <div className="main">
                    {/* <Tabs
                    className="main"
                    tabBarStyle={{ backgroundColor: "transparent" }}
                    onChange={(activeKey) => handleChangeTabs(activeKey)}
                > */}
                    {/* <Tabs.TabPane tab={t("page.all_notifications")} key="1">
                        <div className="flex-field">
                            <StyledResolvedLayout>
                                <div className="switch-field">
                                    <Switch
                                        checked={isResolvedAll}
                                        onChange={handleChangeResolvedAll}
                                    />
                                    <span>{t("page.show_used")}</span>
                                </div>
                            </StyledResolvedLayout>
                            <StyledDateLayout>
                                <DatePicker
                                    placeholder={moment().format("DD MMM YYYY")}
                                    className="eng"
                                    onChange={handleDateChange}
                                />
                                <NotiSearch onChange={handleTypeSearch} />
                            </StyledDateLayout>
                        </div>
                        <div className="tab-inner">
                            <div className="field-items scrollableDiv1" id="scrollableDiv1">
                                {isLoading ? (
                                    loadingComponent
                                ) : (
                                    <ModuleNotificationItem
                                        typeNoti="ALL"
                                        handleGetInfinity={handleGetAll}
                                        {...allData}
                                    />
                                )}

                                {allData?.data?.length > 0 && <div className="space"></div>}
                            </div>
                        </div>
                    </Tabs.TabPane> */}

                    {/* <Tabs.TabPane tab={t("page.redemptions")} key="1"> */}
                    <div className="flex-field">
                        <StyledResolvedLayout>
                            {/* <Tooltip title={t("page.refresh_loading")}>
                                    <div className="icon-refresh" onClick={getInitData}>
                                        <IconRefresh />
                                    </div>
                                </Tooltip> */}
                            <div className="switch-field">
                                <Switch checked={isResolved} onChange={handleChangeResolved} />
                                <span className="switch-label">{t("page.show_used")}</span>
                            </div>
                        </StyledResolvedLayout>
                        <StyledDateLayout>
                            <DatePicker
                                placeholder={"select date"}
                                className="eng"
                                onChange={handleDateChange}
                            />
                            <NotiSearch onChange={handleTypeSearch} />
                        </StyledDateLayout>
                    </div>
                    <div className="tab-inner">
                        <div className="field-items scrollableDiv2" id="scrollableDiv2">
                            {isLoading ? (
                                loadingComponent
                            ) : (
                                <ModuleNotificationItem
                                    typeNoti="REWARDS"
                                    handleGetInfinity={handleGetReward}
                                    {...rewardData}
                                />
                            )}
                            {rewardData?.data?.length > 0 && <div className="space"></div>}
                        </div>
                    </div>
                </div>
                {/* </Tabs.TabPane> */}
                {/* </Tabs> */}
            </StyledContainer>
            {/* <StyledDateLayout>
                <DatePicker onChange={onChangeDate} />
            </StyledDateLayout> */}
        </StyledFilterLayout>
    );
};

const StyledFilterLayout = styled.div`
    /* position: relative;     */
`;
const StyledResolvedLayout = styled.div`
    display: flex;
`;
const StyledDateLayout = styled.div`
    margin-top: -80px;
    position: absolute;
    right: 19px;
    display: flex;
    .ant-calendar-picker {
        max-width: 200px;
        margin-right: 12px;
        input {
            padding-left: 45px;
            height: 47px;
            font-size: 16px;
        }
        .ant-calendar-picker-icon {
            left: 12px;
            font-size: 20px;
            top: 40%;
        }
    }
    input {
        height: 47px;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        margin-top: 0;
        position: unset;
    }
`;
const StyledContainer = styled.form`
    /* flex: 3; */
    overflow: hidden;
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
    height: 84vh;
    display: flex;
    flex-direction: column;
    padding: 3.5rem;
    .ant-tabs-tab {
        padding: 16px 0 12px 0 !important;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 16px;
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 37px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    .flex-field {
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            display: block;
        }
    }
    .main {
        /* max-width: 1266px; */
        width: 100%;
        flex: 1;
        overflow: hidden;
        .text {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 20px;
        }
        .ant-tabs-bar {
            margin: 0;
            border: 0;
            .ant-tabs-ink-bar {
                border-radius: 8px 8px 0 0;
                background-color: ${(p) => p.theme.colors.danger};

                height: 3px;
                bottom: 1px;
            }
            .ant-tabs-tab {
                background-color: transparent;
                margin-right: 18px;
                color: inherit;
                font-size: 16px;
                border-radius: 8px 8px 0 0;
                padding-bottom: 14px;
                padding: 16px 16px 12px 14px;
                font-weight: bold;
                /* border: 1px solid green; */
            }
            .ant-tabs-tab-active {
                background-color: transparent;
                color: ${(p) => p.theme.colors.danger}!important;
                border-radius: 8px 8px 0 0;
                /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
            }
        }
        .ant-tabs-content {
            height: 100%;
        }
        .ant-tabs-tabpane {
            background-color: transparent;
            padding: 30px 0;
            margin-bottom: 50px;
            overflow: hidden;
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                    display: none;
                }
            }
            ::-webkit-scrollbar-track {
                display: none;
            }

            ::-webkit-scrollbar-thumb {
                background: ${(p) => p.theme.colors.fadedText};
                border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb:hover {
                cursor: grab;
            }
        }
        .switch-field {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            /* margin-left: 20px; */
            span {
                margin-left: 10px;
                font-size: 16px;
                color: ${(p) => p.theme.colors.fadedColor};
                font-weight: 500;
            }
        }
    }
    .main::after {
        content: "";
        width: 10px;
        height: 100%;
        white-space: pre;
    }
    .tab-inner {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        .field-items {
            flex: 1;
            margin-bottom: 36px;
            overflow: auto;
            display: flex;
            justify-content: center;
            .space {
                width: 10px;
            }
            .infinite-scroll-component__outerdiv {
                width: 100%;
            }
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                    display: none;
                }
            }
            ::-webkit-scrollbar-track {
                display: none;
            }

            ::-webkit-scrollbar-thumb {
                background: ${(p) => p.theme.colors.fadedText};
                border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb:hover {
                cursor: grab;
            }
        }
    }
    .icon-refresh {
        width: fit-content;
        margin-bottom: 20px;

        svg {
            cursor: pointer;
            width: 40px;
            height: 30px;
            :active {
                transform: scale(0.9);
            }
        }
    }

    .card-layout {
        background-color: red;
    }
    .skeleton {
        background-color: white;
    }
    .skeleton-infinity {
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        padding: 20px;
    }
    .ant-tabs-top .ant-tabs-ink-bar-animated,
    .ant-tabs-bottom .ant-tabs-ink-bar-animated {
        transition: none !important;
    }
    .loading-component {
        width: 100%;
        .loading-item {
            margin: 10px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 6px;
        }
    }
`;
