import styled from "styled-components";
import { Avatar, Col, Row, Button, Pagination, Dropdown, Menu, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "react-feather";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";

import { enumPermissionRole, PERMISSION_TITLE, PAGINATION, PATH_CHOOSE_PLAN } from "@configs";
import { ComponentEmptyData, RowLoadingContact, SharedButtonDefault } from "@components";
import { ModuleInviteMerchant, ModuleRole, ModuleUpgradePlan } from "@modules";
import { permissionAPI } from "@api";
import { IStaffData } from "@interfaces";
import { selectApp, selectAuth, setLoading, useAppSelector } from "@redux";
import { showErrorMessage, useNotify } from "@utils";

export const PagePermissionList = () => {
    // page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { error } = useNotify();
    const history = useHistory();
    //redux states
    const loading = useSelector(selectApp).loading;
    const app = useAppSelector(selectApp);
    // page state
    const [visible, setVisible] = useState(false);
    const [upgradeVisible, setUpgradeVisible] = useState(false);
    const [typeModal, setTypeModal] = useState(0);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [params, setParams] = useState({ page: 1, limit: PAGINATION });
    const [staffList, setStaffList] = useState<IStaffData[]>([]);
    const [userId, setUserId] = useState("");
    const [userRoleId, setUserRoleId] = useState("");
    const [userRoleName, setUserRoleName] = useState("");
    // redux state
    const { userInfo, plan } = useSelector(selectAuth);

    useEffect(() => {
        getListStaff();
    }, [params]);
    const showModalInfo = () => {
        setTypeModal(enumPermissionRole.MODAL_PERMISSION_INFO);
        setVisible(true);
    };
    const showModalAdd = () => {
        if (plan?.multiRole.status) {
            setTypeModal(enumPermissionRole.MODAL_PERMISSION_ADD);
            setVisible(true);
        } else {
            setUpgradeVisible(true);
        }
    };
    const showModalEdit = (id: string, roleId: string, roleName: string) => {
        setTypeModal(enumPermissionRole.MODAL_PERMISSION_EDIT);
        setVisible(true);
        setUserId(id);
        setUserRoleId(roleId);
        setUserRoleName(roleName);
    };
    const closeModal = () => {
        setVisible(false);
    };
    const callbackGetList = () => {
        setVisible(false);
        getListStaff();
    };
    const handlePagination = (page: number) => {
        setParams({ page: page, limit: PAGINATION });
    };
    const getListStaff = async () => {
        dispatch(setLoading(true));
        try {
            const response = await permissionAPI.getList(params);
            setStaffList(response.data.docs);
            setTotalCount(response.data.totalDocs);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const gotoChoosePlan = useCallback(() => {
        history.push(PATH_CHOOSE_PLAN);
    }, []);

    return (
        <StyledContainer>
            <ModuleUpgradePlan
                visible={upgradeVisible}
                onClose={() => setUpgradeVisible(false)}
                handleUpgrade={gotoChoosePlan}
            />

            {app.mobile ? (
                <ModuleInviteMerchant
                    permissionTitle={PERMISSION_TITLE}
                    visible={visible}
                    typeModal={typeModal}
                    handleClose={closeModal}
                    callbackGetList={callbackGetList}
                    userId={userId}
                    currentRole={{ roleId: userRoleId, name: userRoleName }}
                />
            ) : (
                <ModuleRole
                    permissionTitle={PERMISSION_TITLE}
                    visible={visible}
                    typeModal={typeModal}
                    handleClose={closeModal}
                    callbackGetList={callbackGetList}
                    userId={userId}
                    currentRole={{ roleId: userRoleId, name: userRoleName }}
                />
            )}

            <div className="page-layout">
                <Row className={"page-header"}>
                    <Col lg={10} md={10} sm={14} xs={14}>
                        <div>
                            <h3>{t("page.manage_permissions")}</h3>
                            <p className="sub-title visible-md">
                                {t("page.text_permission_sub_title")}
                            </p>
                            <p className="text-danger visible-md" onClick={() => showModalInfo()}>
                                {t("page.permission_types")}
                            </p>
                        </div>
                    </Col>
                    <Col lg={6} md={6} sm={0} xs={0}></Col>
                    <Col lg={8} md={8} sm={10} xs={10}>
                        <div className="flex-div justify-end">
                            <SharedButtonDefault
                                type={"danger"}
                                icon={"plus"}
                                onClick={() => showModalAdd()}
                                text={t("page.invite")}
                                className="add-btn"
                            />
                        </div>
                    </Col>
                </Row>
                <div>
                    <p className="sub-title visible-ms">{t("page.text_permission_sub_title")}</p>
                </div>
                <div className="table-body">
                    <ScrollContainer style={{ width: "100%" }}>
                        {!loading ? (
                            staffList?.length > 0 ? (
                                <div className="data-table">
                                    {staffList.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            data={item}
                                            handleEdit={(_id, roleId, roleName) =>
                                                showModalEdit(_id, roleId, roleName)
                                            }
                                            callbackGetList={() => getListStaff()}
                                            currentId={userInfo?._id}
                                        />
                                    ))}
                                    <div style={{ width: "100%", height: 20 }}></div>
                                </div>
                            ) : (
                                <ComponentEmptyData />
                            )
                        ) : (
                            <RowLoadingContact />
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

interface IData {
    data: IStaffData;
    handleEdit: (_id: string, roleId: string, roleName: string) => void;
    callbackGetList: () => void;
    currentId?: string;
}

const TableRow = (props: IData) => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    const app = useAppSelector(selectApp);
    //page variable
    const { data, handleEdit, callbackGetList, currentId } = props;
    const handleDelete = async () => {
        dispatch(setLoading(true));
        try {
            await permissionAPI.delete(data._id);
            callbackGetList();
            success(t("message.delete.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.delete.fail"));
        } finally {
            dispatch(setLoading(false));
        }
    };
    const showModal = () => {
        Modal.confirm({
            title: t("message.delete_title"),
            icon: <ExclamationCircleOutlined />,
            content: t("message.delete_confirm", {
                returnObjects: true,
                name: t("object._user"),
            }),
            okText: t("page.delete"),
            cancelText: t("page.cancel"),
            centered: true,
            onOk: handleDelete,
        });
    };
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <div
                    onClick={showModal}
                    style={{ color: "red", fontWeight: 600, textAlign: "center" }}
                >
                    {t("page.delete")}
                </div>
            </Menu.Item>
        </Menu>
    );
    const handleClickMobile = () => {
        if (app.mobile && currentId !== data._id) {
            handleEdit(data._id, data.roleId, data.roleName);
        }
    };
    return (
        <div className="table-row" onClick={handleClickMobile}>
            <Row gutter={20} type="flex" align="middle">
                <Col className="col-item" lg={12} md={12} sm={18} xs={18}>
                    <Avatar
                        className="avatar"
                        src={data?.avatar || "/user-avatar.png"}
                        size={57}
                        style={{ minWidth: 57 }}
                    />
                    <p className="w-user-name visible-md">{data.fullName}</p>
                    <div className="item-info visible-ms">
                        <p className="user-name">{data.fullName}</p>
                        <p className="item-desc">{data.email}</p>
                    </div>
                </Col>
                <Col className="col-item role-col" lg={6} md={6} sm={6} xs={6}>
                    <p className="role-name">{data.roleName || t("page.empty_text")}</p>
                </Col>
                <Col className="col-item visible-md" lg={4} md={4} sm={0} xs={0}>
                    {currentId !== data._id ? (
                        <SharedButtonDefault
                            type="default"
                            style={{
                                padding: "4px 13px",
                                height: 32,
                                marginLeft: 17,
                            }}
                            size="default"
                            text={t("page.edit")}
                            onClick={() => handleEdit(data._id, data.roleId, data.roleName)}
                        />
                    ) : (
                        ""
                    )}
                </Col>
                <Col className="option-dropdown visible-md" lg={2} md={2} sm={0} xs={0}>
                    {currentId !== data._id && (
                        <Dropdown
                            //@ts-ignore
                            getPopupContainer={(trigger) => trigger.parentNode}
                            overlay={menu}
                            trigger={["click"]}
                            placement="bottomRight"
                        >
                            <Button className="btn-action">
                                <MoreHorizontal />
                            </Button>
                        </Dropdown>
                    )}
                </Col>
            </Row>
        </div>
    );
};

const StyledContainer = styled.div`
    padding: 3.5rem;
    display: flex;
    flex-direction: column;
    /* height: calc(100vh - 64px); */
    height: 86vh;
    overflow: auto;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 16px;
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
            width: auto !important;
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
            justify-content: end;
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
            padding: 4px;
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
        margin: 18px 0%;
        .col-item {
            display: flex;
            align-items: center;
            .w-user-name {
                margin-bottom: 0;
                font-size: 16px;
                color: #6c7084;
                font-weight: 600;
                margin-left: 20px;
            }
            .role-name {
                margin: 0;
            }
        }
    }
    .table-row:hover {
        /* box-shadow: 0 5px 7px rgba(0, 0, 0, 0.07), 0 5px 7px rgba(0, 0, 0, 0.07); */
        box-shadow: 0px 0px #1e7cf5, 0px 0 5px #1e7cf5;
    }
    .btn-action {
        border-color: transparent !important;
    }
    .visible-ms {
        display: none;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .table-row {
            min-width: initial;
            .visible-md {
                display: none;
            }
            .visible-ms {
                display: block;
            }
        }
        .page-layout {
            .visible-md {
                display: none;
            }
            .visible-ms {
                display: block;
            }
        }
        .item-info {
            margin-left: 8px;
        }
        p {
            margin: 0;
        }
        .user-name {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
        }
        .item-desc {
            height: 19px;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 19px;
            display: flex;
            align-items: center;
            color: #646464;
        }
        .avatar {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
        }
        .role-col {
            justify-content: end;
        }
        .page-header {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
        }
        .sub-title {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #a5a5a5;
        }
    }
`;
