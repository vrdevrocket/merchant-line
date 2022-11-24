import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Modal, Row, Menu, Dropdown, Button, Switch } from "antd";
import { MoreHorizontal } from "react-feather";
import moment from "moment";

import { ISegmentData } from "@interfaces";
import { segmentAPI } from "@api";
import { enumStatus, enumTypeFetchList, PATH_SEGMENTS } from "@configs";
import { numberFormatter, showErrorMessage, useNotify } from "@utils";

interface IProps {
    data: ISegmentData;
    callbackGetList: (type: enumTypeFetchList) => void;
    index: number;
}

export const ComponentRowSegment = (props: IProps) => {
    //hooks
    const { t } = useTranslation();
    const { success, error } = useNotify();
    //props
    const { data, callbackGetList } = props;

    const handleDelete = async () => {
        if (data._id) {
            try {
                await segmentAPI.delete(data._id);
                callbackGetList(enumTypeFetchList.delete);
                success(t("message.delete.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.delete.fail"));
            }
        } else {
            error(t("message.update.fail"));
        }
    };

    const handleDuplicate = async () => {
        if (data._id) {
            try {
                await segmentAPI.duplicate(data._id);
                callbackGetList(enumTypeFetchList.duplicate);
                success(t("message.duplicate.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.duplicate.fail"));
            }
        } else {
            error(t("message.update.fail"));
        }
    };

    const handleUpdateStatus = async (status: boolean) => {
        if (data._id) {
            try {
                await segmentAPI.edit(data._id, {
                    status: status ? enumStatus.ACTIVE : enumStatus.INACTIVE,
                });
                success(t("message.update.success"));
                callbackGetList(enumTypeFetchList.duplicate);
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            }
        }
    };

    const showModal = () => {
        Modal.confirm({
            title: t("message.delete_title"),
            icon: <ExclamationCircleOutlined />,
            content: t("message.delete_confirm", {
                returnObjects: true,
                name: t("object._segment"),
            }),
            okText: t("page.delete"),
            cancelText: t("page.cancel"),
            centered: true,
            onOk: handleDelete,
        });
    };

    const menu = (
        <Menu>
            <Menu.Item key={2}>
                <div className="delete-btn" onClick={handleDuplicate}>
                    {t("page.duplicate")}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key={1}>
                <div className="duplicate-btn" onClick={showModal}>
                    {t("page.delete")}
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="table-row ">
            <Row style={{ height: "100%" }} gutter={24} type="flex" align="middle">
                <Col className="col-item" span={8}>
                    <Link to={`${PATH_SEGMENTS}/${data._id}`}>
                        <p className="user-name">{data.name || t("page.empty_text")}</p>
                    </Link>
                </Col>
                <Col className="col-item" span={4}>
                    <p>{numberFormatter(data?.contacts)}</p>
                </Col>
                <Col className="col-item" span={4}>
                    <p>{moment(new Date(data?.createdAt || "")).format("DD/MM/YYYY")}</p>
                </Col>
                <Col className="col-item" span={4}>
                    <Switch
                        checked={data.status === enumStatus.ACTIVE ? true : false}
                        onChange={handleUpdateStatus}
                    />
                </Col>
                <Col span={4} style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Dropdown
                        //@ts-ignore
                        getPopupContainer={(trigger) => trigger.parentNode}
                        overlay={menu}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Button style={{ border: "unset" }}>
                            <MoreHorizontal />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};
