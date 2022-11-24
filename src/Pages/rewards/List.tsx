import { Col, Row, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    AddReward,
    ComponentDefaultSortIcon,
    ComponentEmptyData,
    ComponentRowReward,
    RowLoadingLarge,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import {
    PAGINATION,
    enumSortBy,
    INITIAL_LIST_PARAMS,
    enumDefaultSortFields,
    PATH_REWARDS,
    enumTypeFetchList,
} from "@configs";

import { rewardAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { IDefaultListParam, IRewardData } from "@interfaces";

export const PageRewardList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    //redux states
    const loading = useSelector(selectApp).loading;
    //page state
    const [listData, setListData] = useState<IRewardData[]>([]);
    const [params, setParams] = useState<IDefaultListParam>(INITIAL_LIST_PARAMS);
    const [totalCount, setTotalCount] = useState<number>(0);

    useEffect(() => {
        getRewards();
    }, []);

    // FETCH LIST API
    const getRewards = async () => {
        dispatch(setLoading(true));
        await fetchRewards(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const fetchRewards = async (fParams: IDefaultListParam) => {
        const response = await rewardAPI.getList(fParams);
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
        fetchRewards(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1)
            fetchRewards({ ...params, page: params.page - 1 });
        else fetchRewards(params);
    };

    const handleSort = (sortField: enumDefaultSortFields, sortBy: enumSortBy) => {
        const newSortParams = { ...params, sortField, sortBy };
        setParams(newSortParams);
        fetchRewards(newSortParams);
    };
    // ACTION MODULE
    const addReward = () => {
        history.push(PATH_REWARDS + "/create");
    };

    return (
        <StyledTable>
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{t("page.rewards")}</h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalCount} {t("page.total")}
                        </p>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={t("page.add_reward")}
                            onClick={addReward}
                            className="add-btn"
                            customIcon={<AddReward />}
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
                                        <Col className="col-item" span={5}>
                                            <p>{t("page.points")}</p>
                                            <div className="filter-button">
                                                <ComponentDefaultSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.ASC}
                                                    sortField={enumDefaultSortFields.POINT}
                                                    searchParams={params}
                                                />
                                                <ComponentDefaultSortIcon
                                                    handleSort={handleSort}
                                                    sortBy={enumSortBy.DESC}
                                                    sortField={enumDefaultSortFields.POINT}
                                                    searchParams={params}
                                                />
                                            </div>
                                        </Col>
                                        <Col className="col-item" span={5}>
                                            <p>{t("page.create_date")}</p>
                                        </Col>
                                        <Col className="col-item" span={5}>
                                            <p>{t("page.status")}</p>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                </div>
                                {!loading ? (
                                    listData?.length > 0 ? (
                                        <div className="data-table">
                                            {listData.map((item, index) => (
                                                <ComponentRowReward
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
                                defaultCurrent={INITIAL_LIST_PARAMS.page || 1}
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
