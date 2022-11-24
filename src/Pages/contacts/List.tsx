import { Col, Row, Input, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { Search } from "react-feather";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentContactSortIcon,
    ComponentEmptyData,
    ComponentInfoBox,
    ComponentRowContact,
    RowLoadingContact,
    StyledExportButton,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import {
    PAGINATION,
    enumContactSortFields,
    enumSortBy,
    INITIAL_LIST_PARAMS,
    enumTypeFetchList,
    enumPlacement,
} from "@configs";
import { ModuleAddContact, ModuleEditPoint, ModuleExportImport } from "@modules";
import { contactAPI } from "@api";
import { setLoading, getCurrentPoints, selectContact, selectApp } from "@redux";
import { IContactData, IContactListParams } from "@interfaces";

export const PageContactList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const typingTimeoutRef = useRef(0);
    // redux state
    const search_params = useSelector(selectContact).paramsContact;
    const loading = useSelector(selectApp).loading;
    //page state
    const [showAddContact, setShowAddContact] = useState<boolean>(false);
    const [showEditPoint, setShowEditPoint] = useState<boolean>(false);
    const [showImportExport, setShowImportExport] = useState<boolean>(false);
    const [listData, setListData] = useState<IContactData[]>([]);
    const [userId, setUserId] = useState<string>("");
    const [params, setParams] = useState<IContactListParams>(search_params);
    const [totalContact, setTotalContact] = useState<number>(0);

    useEffect(() => {
        getContacts();
    }, []);

    // FETCH LIST API
    const fetchContacts = async (params: IContactListParams) => {
        const response = await contactAPI.getList(params);
        if (response?.data?.docs) {
            setListData(response.data.docs);
            setTotalContact(response.data?.totalDocs);
            setParams({ ...params, page: response.data.page });
        } else {
            setListData([]);
        }
    };

    const getContacts = async () => {
        dispatch(setLoading(true));
        await fetchContacts(params);
        dispatch(setLoading(false));
    };

    const handlePagination = (page: number) => {
        const newPageParams = { ...params, page };
        setParams(newPageParams);
        fetchContacts(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1) {
            fetchContacts({ ...params, page: params.page - 1 });
        } else fetchContacts(params);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = window.setTimeout(() => {
            const newSearchParams = { ...params, page: 1, search: value };
            setParams(newSearchParams);
            fetchContacts(newSearchParams);
        }, 300);
    };

    const handleSort = (sortField: enumContactSortFields, sortBy: enumSortBy) => {
        const newSortParams = { ...params, sortField, sortBy };
        setParams(newSortParams);
        fetchContacts(newSortParams);
    };

    // ACTION MODULE
    const addContact = () => {
        setShowAddContact(true);
    };

    const editPoint = (userId: string, points: number) => {
        setUserId(userId);
        dispatch(getCurrentPoints(points));
        setShowEditPoint(true);
    };

    const handleCloseEditPoints = (type: enumTypeFetchList) => {
        setShowEditPoint(false);
        callbackGetList(type);
    };

    const importExport = () => {
        setShowImportExport(true);
    };

    const handleCloseImportExport = () => {
        setShowImportExport(false);
    };

    return (
        <StyledTable>
            <ModuleExportImport
                callbackGetList={callbackGetList}
                handleClose={handleCloseImportExport}
                visible={showImportExport}
            />
            <ModuleAddContact
                visible={showAddContact}
                handleClose={() => setShowAddContact(false)}
                callbackGetList={callbackGetList}
            />
            <ModuleEditPoint
                userId={userId}
                visible={showEditPoint}
                handleClose={() => setShowEditPoint(false)}
                callbackGetList={handleCloseEditPoints}
            />

            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>
                            {t("page.contacts")}
                            <ComponentInfoBox
                                title={t("page.box_info.contact_list")}
                                body={[t("page.box_info.contact_list_body")]}
                                placement={enumPlacement.RIGHT}
                            />
                        </h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalContact} {t("page.total")}
                        </p>
                    </div>
                    <div className="flex-header">
                        <div className="space visible-md" />
                        <Input
                            className="search-input visible-md"
                            // style={{ height: 42, maxWidth: 210 }}
                            suffix={<Search style={{ paddingLeft: 4 }} size={20} />}
                            name="search"
                            defaultValue={params.search}
                            placeholder={t("page.search_phone_number")}
                            onChange={handleSearch}
                        />
                        <div className="space visible-md" />
                        <StyledExportButton
                            type="default"
                            size="default"
                            text={t("page.import_export")}
                            onClick={importExport}
                            className="button-import-export visible-md"
                        />
                        <div className="space visible-md" />
                        <StyledTableButtonTop
                            type="default"
                            size="default"
                            text={t("page.add_contact")}
                            icon="user-add"
                            onClick={addContact}
                            className="add-btn"
                        />
                    </div>
                </div>
                <div className="search-layout">
                    <Input
                        className="search-input visible-ms"
                        // style={{ height: 42, maxWidth: 210 }}
                        suffix={<Search style={{ paddingLeft: 4 }} size={20} />}
                        name="search"
                        defaultValue={params.search}
                        placeholder={t("page.search_phone_number")}
                        onChange={handleSearch}
                    />
                </div>
                <div className="table">
                    <ScrollContainer vertical={false}>
                        <div className="table_ground">
                            <div className="table-body">
                                <div className="table-header">
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        justify="space-between"
                                        align="middle"
                                        className="header-row"
                                    >
                                        <Col className="col-item" span={4}>
                                            <p>{t("page.name")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.FULL_NAME}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.FULL_NAME}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.tel")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.TEL}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.TEL}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.member_id")}</p>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.points")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.POINTS}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.POINTS}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.sales_amount_contact")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.SALES}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.SALES}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.tier")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.TIER}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.TIER}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={3}>
                                            <p>{t("page.create_date")}</p>
                                            <div className="filter-button">
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumContactSortFields.CREATED_AT}
                                                    searchParams={params}
                                                />
                                                <ComponentContactSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumContactSortFields.CREATED_AT}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                </div>
                                {!loading ? (
                                    listData?.length > 0 ? (
                                        <div className="data-table">
                                            {listData.map((item, index) => (
                                                <ComponentRowContact
                                                    key={index}
                                                    data={item}
                                                    handleEdit={editPoint}
                                                    callbackGetList={callbackGetList}
                                                    index={index}
                                                />
                                            ))}
                                            <div style={{ width: "100%", height: 10 }}></div>
                                        </div>
                                    ) : (
                                        <ComponentEmptyData />
                                    )
                                ) : (
                                    <RowLoadingContact />
                                )}
                            </div>
                        </div>
                    </ScrollContainer>
                </div>

                <div className="page-bottom">
                    {totalContact > 0 && (
                        <div className="pagination">
                            <Pagination
                                defaultCurrent={INITIAL_LIST_PARAMS.page || 1}
                                pageSize={PAGINATION}
                                total={totalContact}
                                onChange={handlePagination}
                                current={params.page}
                            />
                        </div>
                    )}
                </div>
            </div>
        </StyledTable>
    );
};
