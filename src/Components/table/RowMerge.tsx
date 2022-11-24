import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Avatar, Checkbox } from "antd";

import { IMergeData, IMergeSettings, ISuggestionsValue } from "@interfaces";
import { setCheckedContact, selectContact } from "@redux";
import { enumMergeMetrics } from "@configs";
import { SharedButtonDefault } from "@components";
import moment from "moment";

interface IProps {
    data: IMergeData;
    handleSingleMerge: (value: ISuggestionsValue) => void;
    index: number;
    mergeSetting?: IMergeSettings;
}

export const ComponentRowMerge = (props: IProps) => {
    //hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    //props
    const { data, handleSingleMerge, index, mergeSetting } = props;
    // redux state
    const isChecked = useSelector(selectContact).checkboxArr[index];

    const handleChecked = (e: boolean) => {
        dispatch(setCheckedContact({ isChecked: e, index: index }));
    };

    // convert object to string line
    const displayMergeMetrics = () => {
        const arr: enumMergeMetrics[] = [];
        if (mergeSetting?.isTel) arr.push(enumMergeMetrics.isTel);
        if (mergeSetting?.isEmail) arr.push(enumMergeMetrics.isEmail);
        if (mergeSetting?.isLineId) arr.push(enumMergeMetrics.isLineId);
        return (
            <>
                {arr.map((item, index) => {
                    if (index > 0)
                        return (
                            <span key={index}>
                                <span>{" " + t("page." + mergeSetting?.match)}</span>
                                <span className="text-bolder">{" " + t("page." + item)}</span>
                            </span>
                        );
                    else
                        return (
                            <span className="text-bolder" key={index}>
                                {t("page." + item)}
                            </span>
                        );
                })}
            </>
        );
    };
    return (
        <div className="table-row">
            <Row style={{ height: "100%" }} gutter={24} type="flex" align="middle">
                <Col span={1}>
                    <Checkbox
                        checked={isChecked}
                        onChange={(e) => handleChecked(e.target.checked)}
                    />
                </Col>

                <Col className="col-item" span={4}>
                    <Avatar
                        src={data?.resourceUser.avatar || "/user-avatar.png"}
                        size={39}
                        style={{ minWidth: 39 }}
                    />
                    <p className="user-name">
                        {data.resourceUser.fullName || t("page.empty_text")}
                    </p>
                </Col>
                <Col className="col-item" span={4}>
                    <Avatar
                        src={data?.avatar || "/user-avatar.png"}
                        size={39}
                        style={{ minWidth: 39 }}
                    />
                    <p className="user-name">{data.fullName || t("page.empty_text")}</p>
                </Col>
                <Col className="col-item" span={6}>
                    <p className="col-merge-metrics">
                        {(mergeSetting && displayMergeMetrics()) || t("page.empty_text")}
                    </p>
                </Col>

                <Col className="col-item" span={5}>
                    <p>{moment(new Date()).format("DD/MM/YYYY")}</p>
                </Col>
                <Col span={2} className="col-item">
                    <SharedButtonDefault
                        type="primary"
                        size="default"
                        text={t("page.merge")}
                        //@ts-ignore
                        onClick={() =>
                            handleSingleMerge({
                                resourceId: data.resourceUser._id,
                                targetId: data._id,
                            })
                        }
                        className="edit-btn"
                    />{" "}
                </Col>
                <Col span={2} style={{ display: "flex", justifyContent: "flex-end" }}></Col>
            </Row>
        </div>
    );
};
