import { Col, Pagination, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentEmptyData,
    ComponentRowFreePoint,
    RowLoadingLarge,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import { freePointAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { IFreePoint, IPagination } from "@interfaces";
import {
    enumTypeFetchList,
    INITIAL_LIST_PARAMS,
    PAGINATION,
    PATH_FREE_POINT_CREATE,
} from "@configs";

export const PageFreePointList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    // redux states
    const loading = useSelector(selectApp).loading;
    //page state
    const [listData, setListData] = useState<IFreePoint[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [params, setParams] = useState<IPagination>(INITIAL_LIST_PARAMS);
    //page variable
    const freePoint = "page.";

    useEffect(() => {
        getFreePoint();
    }, []);

    // FETCH LIST API
    const getFreePoint = async () => {
        dispatch(setLoading(true));
        await fetchFreePoint(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const fetchFreePoint = async (fParams: IPagination) => {
        const response = await freePointAPI.getListFreePoint(fParams);
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
        fetchFreePoint(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1)
            fetchFreePoint({ ...params, page: params.page - 1 });
        else fetchFreePoint(params);
    };

    //ACTION MODULE
    const convertTranslation = (value: string) => {
        return t(freePoint + value);
    };

    const handleAddFreePoint = () => {
        history.push(PATH_FREE_POINT_CREATE);
    };

    return (
        <StyledTable>
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{convertTranslation("free_points")}</h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalCount} {t("page.total")}
                        </p>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={convertTranslation("add_free_points")}
                            icon="plus"
                            onClick={handleAddFreePoint}
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
                                        <Col className="col-item" span={9}>
                                            <p>{t("page.name")}</p>
                                        </Col>
                                        <Col className="col-item" span={9}>
                                            <p>{t("page.VALIDITY_PERIOD")}</p>
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
                                                <ComponentRowFreePoint
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
