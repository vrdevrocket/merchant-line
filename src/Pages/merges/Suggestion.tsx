import styled from "styled-components";
import { Modal, Checkbox } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Pagination } from "antd";
import ScrollContainer from "react-indiana-drag-scroll";
import { useDispatch, useSelector } from "react-redux";

import {
    StyledTable,
    StyledTableButtonTop,
    ComponentMergeSortIcon,
    ComponentRowMerge,
    ComponentEmptyData,
    SharedButtonDefault,
    RowLoadingMerge,
} from "@components";
import {
    enumSortBy,
    INITIAL_LIST_PARAMS,
    PAGINATION,
    enumMergeSortFields,
    enumTypeMerge,
} from "@configs";
import {
    IMergeListParams,
    IMergeData,
    IMergeSettings,
    IParamsMergeSuggestions,
    ISuggestionsValue,
} from "@interfaces";
import { setCheckboxArray, selectContact, setLoading, selectAuth, selectApp } from "@redux";
import { contactAPI, merchantAPI } from "@api";
import { numberFormatter, showErrorMessage, useNotify } from "@utils";

export const PageMergeSuggestion = () => {
    // page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    //redux state
    const checkedArr = useSelector(selectContact).checkboxArr;
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const loading = useSelector(selectApp).loading;
    // page state
    const [totalMerges, setTotalMerges] = useState<number>(0);
    const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [listData, setListData] = useState<IMergeData[]>([]);
    const [params, setParams] = useState<IMergeListParams>(INITIAL_LIST_PARAMS);
    const [mergeMetrics, setMergeMetrics] = useState<IMergeSettings>();
    const [mergeValue, setMergeValue] = useState<ISuggestionsValue[]>();
    const [mergeMethod, setMergeMethod] = useState<enumTypeMerge>(enumTypeMerge.init);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        checkedArr.map((item) => {
            if (!item) return setIsCheckedAll(false);
        });
    }, [checkedArr]);

    useEffect(() => {
        getMergeList();
    }, []);

    // FETCH LIST API
    const getMergeList = async () => {
        dispatch(setLoading(true));
        await fetchMergeList(INITIAL_LIST_PARAMS);
        if (merchantId) fetchMergeMetrics(merchantId);
        dispatch(setLoading(false));
    };

    const fetchMergeList = async (fParams: IMergeListParams) => {
        const response = await contactAPI.getMergeList(fParams);
        setTotalMerges(response.data?.totalDocs);
        if (response?.data?.docs.length) {
            setListData(response.data.docs);
            dispatch(setCheckboxArray(Array(response.data.docs.length).fill(false)));
        } else {
            if (params.page > 1) {
                setParams({ ...params, page: params.page - 1 });
                fetchMergeList({ page: params.page - 1, limit: PAGINATION });
            } else setListData([]);
        }
    };

    const fetchMergeMetrics = async (merchantId: string) => {
        const response = await merchantAPI.getMerchant(merchantId);
        setMergeMetrics(response.data.mergeSettings);
    };

    const handlePagination = (page: number) => {
        const newPageParams = { ...params, page };
        setParams(newPageParams);
        fetchMergeList(newPageParams);
    };

    const handleSort = (sortField: enumMergeSortFields, sortBy: enumSortBy) => {
        const newSortParams = { ...params, sortField, sortBy };
        setParams(newSortParams);
        fetchMergeList(newSortParams);
    };

    // ACTION MODULE
    const checkCount = () => {
        const arr = checkedArr.filter((item) => item);
        return arr.length;
    };

    const checkAll = (e: boolean) => {
        setIsCheckedAll(e);
        const arr = [...checkedArr.map(() => e)];
        dispatch(setCheckboxArray(arr));
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // check case merge -> single or multi
    const mergeSingle = (value: ISuggestionsValue) => {
        setMergeValue([value]);
        setVisible(true);
        setMergeMethod(enumTypeMerge.single);
    };

    const mergeMulti = () => {
        const multiArr: ISuggestionsValue[] = [];
        checkedArr.forEach((item, index) => {
            if (item)
                multiArr.push({
                    targetId: listData[index]._id,
                    resourceId: listData[index].resourceUser._id,
                });
        });
        setMergeValue(multiArr);
        setVisible(true);
        setMergeMethod(enumTypeMerge.multi);
    };

    const mergeSubmit = async () => {
        let check: boolean;
        if (mergeMethod === enumTypeMerge.multi && !checkCount()) check = false;
        else check = true;

        if (mergeValue && check) {
            setIsSubmitting(true);
            dispatch(setLoading(true));
            const fParams: IParamsMergeSuggestions = { suggestions: [...mergeValue] };
            try {
                await contactAPI.mergeSuggest(fParams);
                success(t("message.merge.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.merge.fail"));
            } finally {
                dispatch(setLoading(false));
                setVisible(false);
                fetchMergeList(params);
                setIsSubmitting(false);
                dispatch(setCheckboxArray([]));
                setIsCheckedAll(false);
            }
        } else {
            setVisible(false);
        }
    };

    return (
        <>
            <Modal
                onCancel={handleCancel}
                closable={true}
                title={false}
                visible={visible}
                footer={null}
                className="Modal-confirm-merge"
                centered={true}
            >
                <StyledModalType>
                    {mergeMethod === enumTypeMerge.multi ? (
                        <h5>
                            {checkCount()
                                ? t("page.confirm_merge_number_contacts", {
                                      number: numberFormatter(checkCount()),
                                  })
                                : t("page.no_contacts_are_selected")}
                        </h5>
                    ) : (
                        <h5>
                            {t("page.confirm_merge_number_contacts", {
                                number: t("object._this"),
                            })}
                        </h5>
                    )}
                    <p>{t("page.this_action_cannot_be_undone")}</p>
                    <SharedButtonDefault
                        className="btn-close"
                        text={t("page.confirm")}
                        type="primary"
                        onClick={mergeSubmit}
                        disable={isSubmitting}
                    />
                </StyledModalType>
            </Modal>
            <StyledTable>
                <div className="page-layout">
                    <div className="page-header">
                        <div>
                            <h3>{t("page.merge_suggestions")}</h3>
                            <p style={{ marginBottom: 0 }}>
                                {totalMerges} {t("page.total")}
                            </p>
                        </div>
                        <div>
                            <div className="space"></div>
                            <StyledTableButtonTop
                                type="danger"
                                size="default"
                                text={t("page.bulk_merge")}
                                className="add-btn"
                                onClick={mergeMulti}
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
                                            <Col style={{ marginTop: 4 }} span={1}>
                                                <Checkbox
                                                    checked={isCheckedAll}
                                                    onChange={(e) => checkAll(e.target.checked)}
                                                />
                                            </Col>
                                            <Col className="col-item" span={4}>
                                                <p>{t("page.name")}</p>
                                                <div className="filter-button">
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.ASC}
                                                        sortField={enumMergeSortFields.FULL_NAME}
                                                        searchParams={params}
                                                    />
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.DESC}
                                                        sortField={enumMergeSortFields.FULL_NAME}
                                                        searchParams={params}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className="col-item" span={4}>
                                                <p>{t("page.merge_into")}</p>
                                                <div className="filter-button">
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.ASC}
                                                        sortField={enumMergeSortFields.MERGE_INTO}
                                                        searchParams={params}
                                                    />
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.DESC}
                                                        sortField={enumMergeSortFields.MERGE_INTO}
                                                        searchParams={params}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className="col-item" span={6}>
                                                <p>{t("page.merge_metrics")}</p>
                                                <div className="filter-button">
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.ASC}
                                                        sortField={
                                                            enumMergeSortFields.MERGE_METRICS
                                                        }
                                                        searchParams={params}
                                                    />
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.DESC}
                                                        sortField={
                                                            enumMergeSortFields.MERGE_METRICS
                                                        }
                                                        searchParams={params}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className="col-item" span={5}>
                                                <p>{t("page.match_date")}</p>
                                                <div className="filter-button">
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.ASC}
                                                        sortField={enumMergeSortFields.MATCH_DATE}
                                                        searchParams={params}
                                                    />
                                                    <ComponentMergeSortIcon
                                                        handleSort={handleSort}
                                                        sortBy={enumSortBy.DESC}
                                                        sortField={enumMergeSortFields.MATCH_DATE}
                                                        searchParams={params}
                                                    />
                                                </div>
                                            </Col>
                                            <Col span={2}></Col>
                                            <Col span={2}></Col>
                                        </Row>
                                    </div>
                                    {!loading ? (
                                        listData?.length > 0 ? (
                                            <div className="data-table">
                                                {listData.map((item, index) => (
                                                    <ComponentRowMerge
                                                        key={index}
                                                        data={item}
                                                        handleSingleMerge={(value) =>
                                                            mergeSingle(value)
                                                        }
                                                        index={index}
                                                        mergeSetting={mergeMetrics}
                                                    />
                                                ))}
                                                <div style={{ width: "100%", height: 10 }}></div>
                                            </div>
                                        ) : (
                                            <ComponentEmptyData />
                                        )
                                    ) : (
                                        <RowLoadingMerge />
                                    )}
                                </div>
                            </div>
                        </ScrollContainer>
                    </div>
                    <div className="page-bottom">
                        {totalMerges > 0 && (
                            <div className="pagination">
                                <Pagination
                                    defaultCurrent={INITIAL_LIST_PARAMS.page || 1}
                                    pageSize={PAGINATION}
                                    total={totalMerges}
                                    onChange={handlePagination}
                                    current={params.page}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </StyledTable>
            );
        </>
    );
};

const StyledModalType = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 280px;
    padding: 40px 0;
    h5 {
        color: black;
        font-weight: 700;
        font-size: 25px;
    }
    p {
        color: #646464;
        font-size: 20px;
        margin: 20px 0;
    }
    .btn-close {
        height: 49px;
        background-color: #0263e0 !important;
        border-color: #0263e0 !important;
    }
`;
