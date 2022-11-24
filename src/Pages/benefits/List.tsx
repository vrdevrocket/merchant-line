import { Col, Row, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";

import {
    ComponentEmptyData,
    ComponentRowBenefit,
    RowLoadingLarge,
    StyledTable,
    StyledTableButtonTop,
} from "@components";
import { PAGINATION, INITIAL_LIST_PARAMS, PATH_BENEFITS_CREATE, enumTypeFetchList } from "@configs";

import { benefitAPI } from "@api";
import { selectApp, setLoading } from "@redux";
import { IDefaultListParam, IBenefitData } from "@interfaces";

export const PageBenefitList = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    //redux statues
    const loading = useSelector(selectApp).loading;
    //page state
    const [listData, setListData] = useState<IBenefitData[]>([]);
    const [params, setParams] = useState<IDefaultListParam>(INITIAL_LIST_PARAMS);
    const [totalBenefit, setTotalBenefit] = useState<number>(0);

    useEffect(() => {
        getBenefit();
    }, []);

    // FETCH LIST API
    const fetchBenefits = async (fParams: IDefaultListParam) => {
        const response = await benefitAPI.getList(fParams);
        if (response?.data?.docs) {
            setListData(response.data.docs);
            setTotalBenefit(response.data?.totalDocs);
            setParams({ ...fParams, page: response.data.page });
        } else {
            setListData([]);
        }
    };

    const getBenefit = async () => {
        dispatch(setLoading(true));
        await fetchBenefits(INITIAL_LIST_PARAMS);
        dispatch(setLoading(false));
    };

    const handlePagination = (page: number) => {
        const newPageParams = { ...params, page };
        setParams(newPageParams);
        fetchBenefits(newPageParams);
    };

    const callbackGetList = (type: enumTypeFetchList) => {
        if (type === enumTypeFetchList.delete && listData.length <= 1 && params.page > 1)
            fetchBenefits({ ...params, page: params.page - 1 });
        else fetchBenefits(params);
    };

    // ACTION MODULE
    const addReward = () => {
        history.push(PATH_BENEFITS_CREATE);
    };

    return (
        <StyledTable>
            <div className="page-layout">
                <div className="page-header">
                    <div>
                        <h3>{t("page.benefits")}</h3>
                        <p style={{ marginBottom: 0 }}>
                            {totalBenefit} {t("page.total")}
                        </p>
                    </div>
                    <div>
                        <StyledTableButtonTop
                            type="danger"
                            size="default"
                            text={t("page.add_benefit")}
                            icon="plus"
                            onClick={addReward}
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
                                        <Col className="col-item" span={10}>
                                            <p>{t("page.validity_period")}</p>
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
                                                <ComponentRowBenefit
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
                    {totalBenefit > 0 && (
                        <div className="pagination">
                            <Pagination
                                defaultCurrent={INITIAL_LIST_PARAMS.page || 1}
                                pageSize={PAGINATION}
                                total={totalBenefit}
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
