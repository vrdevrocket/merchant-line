import styled from "styled-components";
import { Avatar, Col, Row, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";
import {
    PAGINATION,
    PATH_CREATE_ACCOUNTS,
    INITIAL_LIST_PARAMS,
    PATH_LOGIN,
    PATH_HOME,
} from "@configs";
import { ComponentEmptyData, SharedButtonDefault } from "@components";
import { merchantAPI } from "@api";
import { chooseLoginMerchant, getCreateToken, selectAuth, setLoading } from "@redux";
import { showErrorMessage, theme, useNotify } from "@utils";
import { useMediaQuery } from "react-responsive";

interface IMerchantAccount {
    _id: string;
    businessName: string;
    businessTel: string;
    clientAmount: number;
    fullName: string;
    merchantId: string;
    planName: string;
    roleName: string;
    userId: string;
}
export const PageAccountList = () => {
    // page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { error, warning, success } = useNotify();
    const history = useHistory();
    //redux states
    // const loading = useSelector(selectApp).loading;
    // page state
    const [totalCount, setTotalCount] = useState<number>(0);
    const [params, setParams] = useState(INITIAL_LIST_PARAMS);
    // redux state
    const userAdminId = useSelector(selectAuth).auth?.userAdminId;
    const x_token = useSelector(selectAuth).auth?.x_token;
    const [merchants, setMerchants] = useState<IMerchantAccount[]>([]);
    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakPoints.breakTablet})` });

    useEffect(() => {
        getListOfMerchant();
    }, []);
    const getListOfMerchant = async () => {
        if (userAdminId && x_token) {
            dispatch(setLoading(true));
            try {
                const res = await merchantAPI.getMerchantListOfSameMerchantAdmin(
                    userAdminId,
                    params.page,
                    x_token
                );
                setMerchants(res.data.docs);
                setParams({ ...params, page: res.data.page });
                setTotalCount(res.data.totalDocs);
                dispatch(setLoading(false));
            } catch (err: any) {
                if (err.response) {
                    dispatch(setLoading(false));
                    error(showErrorMessage(err.response));
                }
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const handlePagination = (page: number) => {
        setParams({ page: page, limit: PAGINATION });
    };

    const handleLogin = async (merchantId) => {
        if (x_token === undefined || userAdminId === undefined) {
            history.push(PATH_LOGIN);
        } else {
            dispatch(setLoading(true));
            try {
                const payload = {
                    x_token: x_token,
                    merchantId: merchantId,
                    userAdminId: userAdminId,
                };
                success(t("page.login_successfully"));
                await dispatch(chooseLoginMerchant(payload));
                dispatch(setLoading(false));
                history.push(PATH_HOME);
            } catch (err: any) {
                if (err.data) {
                    error(showErrorMessage(err.data));
                }
                dispatch(setLoading(false));
            }
        }
    };
    const handleCreateNewMerchant = async () => {
        if (x_token === undefined || userAdminId === undefined) {
            history.push(PATH_LOGIN);
        } else {
            dispatch(setLoading(true));
            try {
                const payload = {
                    x_token: x_token,
                    userAdminId: userAdminId,
                };
                await dispatch(getCreateToken(payload));
                history.push(PATH_CREATE_ACCOUNTS);
                dispatch(setLoading(false));
            } catch (error) {
                warning(t("page.message.you_need_login"));
                dispatch(setLoading(false));
            }
        }
    };
    return (
        <StyledContainer>
            <div className="page-layout">
                <Row className={"page-header"}>
                    <Col xs={{ span: 16 }} md={{ span: 12 }}>
                        <div>
                            <h3>
                                {t("page.manage_account.accounts")} ({merchants.length})
                            </h3>
                            <p className="sub-title visible-md">
                                {t("page.manage_account.select_account")}
                            </p>
                        </div>
                    </Col>
                    <Col xs={{ span: 8 }} md={{ span: 12 }}>
                        <div className={"flex-div justify-end"}>
                            <SharedButtonDefault
                                type={"danger"}
                                icon={"plus"}
                                onClick={handleCreateNewMerchant}
                                text={t("page.manage_account.add_account")}
                                className="add-btn"
                            />
                        </div>
                    </Col>
                </Row>
                <div>
                    <p className="sub-title visible-ms">
                        {t("page.manage_account.select_account")}
                    </p>
                </div>
                {!isMobile && <TableRowHeader />}
                <div className="table-body">
                    <ScrollContainer style={{ width: "100%" }}>
                        {merchants?.length > 0 ? (
                            <div className="data-table">
                                {merchants.map((item, index) => (
                                    <TableRow item={item} key={index} handleLogin={handleLogin} />
                                ))}
                                <div style={{ width: "100%", height: 20 }}></div>
                            </div>
                        ) : (
                            <ComponentEmptyData />
                        )}
                    </ScrollContainer>
                </div>
                <div className="page-bottom">
                    {totalCount > 0 ? (
                        <div className="pagination">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={PAGINATION}
                                total={totalCount}
                                onChange={(page) => handlePagination(page)}
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </StyledContainer>
    );
};
interface Iprops {
    item: IMerchantAccount;
    handleLogin: (params) => void;
}
const TableRow = (props: Iprops) => {
    //page hook
    const { item, handleLogin } = props;
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ query: `(max-width: ${theme.breakPoints.breakTablet})` });
    return (
        <div className="table-row" onClick={() => handleLogin(item.merchantId)}>
            <Row gutter={24} type="flex" align="middle">
                {isMobile ? (
                    <>
                        <Col className="col-item" span={18}>
                            <Avatar src={"/user-avatar.png"} size={57} style={{ minWidth: 57 }} />
                            <div>
                                <p className="user-name">{item.businessName}</p>
                                {/* <p className="business-name">{item.businessName}</p> */}
                                <div className="sub-title">
                                    {t("page.manage_account.our_customer_m")}
                                    <p>{item.clientAmount}</p>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <p>{item.roleName}</p>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col className="col-item" span={9}>
                            <Avatar src={"/user-avatar.png"} size={57} style={{ minWidth: 57 }} />
                            <div className="user-name-layout">
                                <p className="user-name">{item.businessName}</p>
                                {/* <p className="business-name">{item.businessName}</p> */}
                            </div>
                        </Col>
                        <Col className="col-item" span={5}>
                            <p>{item.clientAmount}</p>
                        </Col>
                        <Col className="col-item" span={5}>
                            <p>{item.roleName}</p>
                        </Col>
                        <Col className="col-item" span={5}>
                            <p>{item.planName}</p>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
};
const TableRowHeader = () => {
    //page hook
    const { t } = useTranslation();

    return (
        <div className="table-row-header">
            <Row gutter={24} type="flex" align="middle">
                <Col className="col-item" span={9}>
                    <p>{t("page.manage_account.account_name")}</p>
                    <div className="sort">
                        <UpArrow />
                        <DownArrow />
                    </div>
                </Col>
                <Col className="col-item" span={5}>
                    <p>{t("page.manage_account.our_customer")}</p>
                    <div className="sort">
                        <UpArrow />
                        <DownArrow />
                    </div>
                </Col>
                <Col className="col-item" span={5}>
                    <p>{t("page.manage_account.role")}</p>
                    <div className="sort">
                        <UpArrow />
                        <DownArrow />
                    </div>
                </Col>
                <Col className="col-item plan" span={5}>
                    <p>{t("page.manage_account.plan")}</p>
                    <div className="sort">
                        <UpArrow />
                        <DownArrow />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const UpArrow = () => (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 0.5L7 6.5H0L3.5 0.5Z" fill="#E1E1E1" />
    </svg>
);
const DownArrow = () => (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 6.5L0 0.5L7 0.5L3.5 6.5Z" fill="#E1E1E1" />
    </svg>
);

const StyledContainer = styled.div`
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px);
    overflow: auto;
    .visible-md {
        display: block;
    }
    .visible-ms {
        display: none;
    }
    .sub-title {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        color: #a5a5a5;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 14px;
        .visible-md {
            display: none;
        }
        .visible-ms {
            display: block;
        }
    }
    .page-layout {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 0;
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
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }
    .page-header {
        .add-btn {
            color: white !important;

            &:hover {
                color: white !important;
            }
        }

        margin-bottom: 17px;
        .justify-end {
            justify-content: flex-end;
            @media (max-width: 769px) {
                justify-content: flex-start;
            }
        }
        .flex-div {
            display: flex;
            align-items: center;
            button {
                background-color: ${(props) => props.theme.colors.danger};
                color: white;
                font-size: 16px;
                justify-content: space-around;
                width: 154px;
                height: 42px;
                &:hover {
                    color: white !important;
                }
                @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
                    width: 136px;
                }
            }
        }
        h3 {
            font-weight: 700;
            margin-right: 40px;
            font-size: 35px;
            margin-bottom: 10px;
            @media (max-width: ${(props) => props.theme.breakPoints.breakMobileMedium}) {
                font-size: 20px;
                margin-right: 0.75rem;
            }
        }
        .sub-title {
            color: ${(p) => p.theme.colors.fadedText};
            font-size: 16px;
            margin-bottom: 10px;
        }
        .text-danger {
            color: ${(p) => p.theme.colors.danger};
            font-size: 16px;
            &:hover {
                cursor: pointer;
                opacity: 0.8;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            margin-bottom: 0;
        }
    }
    .table-body {
        flex: 1;
        overflow-y: auto;
        display: flex;

        ::-webkit-scrollbar {
            width: 6px;
            height: 0;
        }

        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px grey;
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        }
        .table-body::after {
            content: "";
            white-space: pre;
            margin: 0px 5px;
            height: 100%;
        }
        .data-table {
            padding: 2px;
            flex: 1;
        }
    }
    .page-bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 14px;
    }
    .table-row,
    .table-header {
        padding: 10px 18px;
        border-radius: 1px;
        margin: 9px 0;
    }
    .table-row {
        /* min-width: 900px; */
        min-width: 680px;
        border-radius: 6px;
        background-color: white;
        margin: 18px 0;
        margin-top: 0;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            min-width: 100%;
            padding: 16px;
        }
        .col-item {
            display: flex;
            align-items: center;
            p {
                margin-bottom: 0;
                font-size: 16px;
                color: #6c7084;
            }
            .user-name {
                font-weight: 600;
                margin-left: 20px;
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
            .business-name {
                margin-left: 20px;
            }
            .sub-title {
                margin-left: 20px;
                display: flex;
                column-gap: 6px;
            }
        }
    }
    .table-row-header {
        min-width: 680px;
        border-radius: 6px;
        background-color: transparent;
        margin: 18px 0%;
        padding: 0 2px;
        .col-item {
            display: flex;
            align-items: center;
            &:hover {
                p {
                    font-style: normal;
                    font-weight: 800;
                    font-size: 12px;
                    line-height: 16px;
                    color: #3e3d3d;
                    margin: 0;
                }
            }
            p {
                font-style: normal;
                font-weight: 800;
                /* font-size: 12px; */
                line-height: 16px;
                color: #a5a5a5;
                margin: 0;
                /* text-transform: uppercase; */
                color: #a5a5a5;
                font-size: 14px;
                /* font-weight: 700; */
                margin-bottom: 0;
                /* margin-right: 10px; */
            }
            .user-name {
                font-weight: 600;
                margin-left: 20px;
            }
            .sort {
                display: flex;
                flex-direction: column;
                width: 10px;
                margin-left: 10px;
                row-gap: 3px;
            }
        }
        .plan {
            padding: 0 !important;
        }
    }
    .table-row:hover {
        /* box-shadow: 0 5px 7px rgba(0, 0, 0, 0.07), 0 5px 7px rgba(0, 0, 0, 0.07); */
        box-shadow: 0px 0px #1e7cf5, 0px 0 5px #1e7cf5;
        cursor: pointer;
    }
    .btn-action {
        border-color: transparent !important;
    }
`;
