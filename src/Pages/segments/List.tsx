import { Col, Row, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentEmptyData,
    ComponentRowSegment,
    ComponentSegmentSortIcon,
    RowLoadingSegment,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import {
    enumSegmentSortFields,
    enumSortBy,
    enumTypeFetchList,
    INITIAL_LIST_PARAMS,
    PAGINATION,
} from "@configs";
import { ModuleSegmentAdd } from "@modules";
import { segmentAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { ISegmentData, ISegmentListParam } from "@interfaces";

export const PageSegmentList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // redux states
    const loading = useSelector(selectApp).loading;
    //page state
    const [showAddSegment, setShowAddSegment] = useState(false);
    const [params, setParams] = useState<ISegmentListParam>(INITIAL_LIST_PARAMS);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [listData, setListData] = useState<ISegmentData[]>([]);

    useEffect(() => {
        getSegment();
    }, []);

    // FETCH LIST API
    const getSegment = async () => {
        dispatch(setLoading(true));
        await fetchSegments(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const fetchSegments = async (params: ISegmentListParam) => {
        const response = await segmentAPI.getList(params);
        if (response?.data?.docs) {
            setListData(response.data.docs);
            setTotalCount(response.data?.totalDocs);
            setParams({ ...params, page: response.data.page });
        } else {
            setListData([]);
        }
    };

    const handlePagination = (page: number) => {
        const newPageParams = { ...params, page };
        setParams(newPageParams);
        fetchSegments(newPageParams);
    };

    const handleSort = (sortField: enumSegmentSortFields, sortBy: enumSortBy) => {
        const newSortParams = { ...params, sortField, sortBy };
        setParams(newSortParams);
        fetchSegments(newSortParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1) {
            fetchSegments({ ...params, page: params.page - 1 });
        } else fetchSegments(params);
    };

    // ACTION MODULE
    const addSegment = () => {
        setShowAddSegment(true);
    };

    return (
        <StyledTable>
            <ModuleSegmentAdd
                visible={showAddSegment}
                handleClose={() => setShowAddSegment(false)}
                callbackGetList={() => fetchSegments(params)}
            />
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{t("page.segment_list")}</h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalCount} {t("page.total")}
                        </p>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={t("page.add_segment")}
                            icon="user-add"
                            onClick={addSegment}
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
                                        align="middle"
                                        type="flex"
                                        className="header-row"
                                    >
                                        <Col className="col-item" span={8}>
                                            <p>{t("page.segment_name")}</p>
                                        </Col>
                                        <Col className="col-item" span={4}>
                                            <p>{t("page.volume")}</p>
                                            <div className="filter-button">
                                                <ComponentSegmentSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumSegmentSortFields.VOLUME}
                                                    searchParams={params}
                                                />
                                                <ComponentSegmentSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumSegmentSortFields.VOLUME}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={4}>
                                            <p>{t("page.create_date")}</p>
                                        </Col>
                                        <Col className="col-item" span={4}>
                                            <p>{t("page.status")}</p>
                                        </Col>
                                        <Col span={4}></Col>
                                    </Row>
                                </div>
                                {!loading ? (
                                    listData?.length > 0 ? (
                                        <div className="data-table">
                                            {listData.map((item, index) => (
                                                <ComponentRowSegment
                                                    key={index}
                                                    data={item}
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
                                    <RowLoadingSegment />
                                )}
                            </div>
                        </div>
                    </ScrollContainer>
                </div>
                <div className="page-bottom">
                    {totalCount > 0 && (
                        <div className="pagination">
                            <Pagination
                                current={params.page}
                                defaultCurrent={1}
                                pageSize={PAGINATION}
                                total={totalCount}
                                onChange={(page) => handlePagination(page)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </StyledTable>
    );
};
