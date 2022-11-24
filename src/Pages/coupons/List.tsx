import { Col, Pagination, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentEmptyData,
    ComponentRowCoupon,
    RowLoadingLarge,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import { couponAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { ICoupon, IPagination } from "@interfaces";
import { enumTypeFetchList, INITIAL_LIST_PARAMS, PAGINATION, PATH_COUPON_CREATE } from "@configs";

export const PageCouponList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    //redux states
    const loading = useSelector(selectApp).loading;
    //page state
    const [listData, setListData] = useState<ICoupon[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [params, setParams] = useState<IPagination>(INITIAL_LIST_PARAMS);
    //page variable
    const coupon = "page.";

    useEffect(() => {
        getCoupon();
    }, []);

    // FETCH LIST API
    const getCoupon = async () => {
        dispatch(setLoading(true));
        await fetchCoupon(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const fetchCoupon = async (fParams: IPagination) => {
        const response = await couponAPI.getListCoupon(fParams);
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
        fetchCoupon(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1)
            fetchCoupon({ ...params, page: params.page - 1 });
        else fetchCoupon(params);
    };

    // ACTION MODULE
    const convertTranslation = (value: string) => {
        return t(coupon + value);
    };

    const handleAddCoupon = () => {
        history.push(PATH_COUPON_CREATE);
    };

    return (
        <StyledTable>
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{convertTranslation("coupons")}</h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalCount} {t("page.total")}
                        </p>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={convertTranslation("add_coupon")}
                            icon="plus"
                            onClick={handleAddCoupon}
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
                                                <ComponentRowCoupon
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
