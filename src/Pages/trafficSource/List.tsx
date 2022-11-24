import { Col, Pagination, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentEmptyData,
    ComponentRowTrafficSource,
    ComponentTrafficSortIcon,
    RowLoadingLarge,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import { trafficSourceAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { ITrafficParam, ITrafficSource } from "@interfaces";
import {
    enumSortBy,
    enumTrafficSortFields,
    enumTypeFetchList,
    INITIAL_LIST_PARAMS,
    PAGINATION,
    PATH_TRAFFIC_SOURCE_CREATE,
} from "@configs";

export const PageTrafficSourceList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    //redux states
    const loading = useSelector(selectApp).loading;
    //page state
    const [listData, setListData] = useState<ITrafficSource[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [params, setParams] = useState<ITrafficParam>(INITIAL_LIST_PARAMS);

    //page variable

    useEffect(() => {
        getTraffic();
    }, []);

    // FETCH LIST API
    const getTraffic = async () => {
        dispatch(setLoading(true));
        await fetchTraffic(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const fetchTraffic = async (fParams: ITrafficParam) => {
        const response = await trafficSourceAPI.getListTrafficSource(fParams);
        if (response?.data?.docs) {
            setListData(response.data.docs);
            setTotalCount(response.data?.totalDocs);
            setParams({ ...fParams, page: response.data.page });
        } else {
            setListData([]);
        }
    };

    const handlePagination = (page: number) => {
        const newPageParams = { ...params, page };
        setParams(newPageParams);
        fetchTraffic(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1)
            fetchTraffic({ ...params, page: params.page - 1 });
        else fetchTraffic(params);
    };

    const handleSort = async (sortField: "url", sortBy: enumSortBy) => {
        //
        const newSortParams = { ...params, sortField, sortBy };
        setParams(newSortParams);
        dispatch(setLoading(true));
        const response = await trafficSourceAPI.getListTrafficSource(newSortParams);
        const docs = response.data.docs;
        setListData(docs);
        dispatch(setLoading(false));
    };

    //ACTION MODULE
    const handleAddTraffic = () => {
        history.push(PATH_TRAFFIC_SOURCE_CREATE);
    };

    return (
        <StyledTable>
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{t("page.traffic_source")}</h3>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={t("page.add_source")}
                            icon="plus"
                            onClick={handleAddTraffic}
                            className="add-btn"
                        />
                    </div>
                </div>
                <div className="table">
                    <ScrollContainer>
                        <div className="table_ground">
                            <div className="table-body">
                                <div className="table-header">
                                    <Row
                                        gutter={24}
                                        type="flex"
                                        align="middle"
                                        className="header-row"
                                    >
                                        <Col className="col-item" span={7}>
                                            <p>{t("page.name")}</p>
                                        </Col>
                                        <Col className="col-item" span={7}>
                                            <p>{t("page.link")}</p>
                                            <div className="filter-button">
                                                <ComponentTrafficSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumTrafficSortFields.URL}
                                                    searchParams={params}
                                                />
                                                <ComponentTrafficSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumTrafficSortFields.URL}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={4}>
                                            <p>{t("page.total_click")}</p>
                                        </Col>
                                        <Col className="col-item" span={6}>
                                            <p>{t("page.STATUS")}</p>
                                        </Col>
                                    </Row>
                                </div>
                                {!loading ? (
                                    listData?.length > 0 ? (
                                        <div className="data-table">
                                            {listData.map((item, index) => (
                                                <ComponentRowTrafficSource
                                                    key={index}
                                                    data={item}
                                                    callbackGetList={callbackGetList}
                                                />
                                            ))}
                                            <div style={{ width: "100%", height: 10 }}></div>
                                        </div>
                                    ) : (
                                        <ComponentEmptyData />
                                    )
                                ) : (
                                    <RowLoadingLarge />
                                )}
                            </div>
                        </div>
                    </ScrollContainer>
                </div>
                <div className="page-bottom">
                    {totalCount > 0 && (
                        <div className="pagination">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={PAGINATION}
                                total={totalCount}
                                onChange={(page) => handlePagination(page)}
                                current={params.page}
                            />
                        </div>
                    )}
                </div>
            </div>
        </StyledTable>
    );
};
