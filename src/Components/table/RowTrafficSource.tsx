import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Modal, Row, Avatar, Menu, Dropdown, Button, Switch, Tooltip } from "antd";
import { MoreHorizontal } from "react-feather";
import { useCallback, useState } from "react";

import { ITrafficSource } from "@interfaces";
import { trafficSourceAPI } from "@api";
import { enumStatus, enumTypeFetchList, PATH_TRAFFIC_SOURCE } from "@configs";
import { copyText, numberFormatter, showErrorMessage, useNotify } from "@utils";
import { IconCopy } from "@components";

interface IProps {
    data: ITrafficSource;
    callbackGetList: (type: enumTypeFetchList) => void;
}

export const ComponentRowTrafficSource = (props: IProps) => {
    //hooks
    const { t } = useTranslation();
    const { success, error } = useNotify();
    //props
    const { data, callbackGetList } = props;
    // state
    const [isCopy, setIsCopy] = useState<boolean>(false);
    // variables
    const trafficSourceUrl = `${process.env.REACT_APP_CLIENT_URL}/traffic-source/${data.qrToken}`;

    const handleDelete = async () => {
        if (data._id) {
            try {
                await trafficSourceAPI.delete(data._id);
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
                await trafficSourceAPI.duplicate(data._id);
                callbackGetList(enumTypeFetchList.duplicate);
                success(t("message.duplicate.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.duplicate.fail"));
            }
        } else {
            success(t("message.update.fail"));
        }
    };

    const handleUpdateStatus = async (e: boolean) => {
        if (data._id) {
            try {
                await trafficSourceAPI.toggleStatus(
                    data._id,
                    e ? enumStatus.ACTIVE : enumStatus.INACTIVE
                );
                callbackGetList(enumTypeFetchList.duplicate);
                success(t("message.update.success"));
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            }
        } else {
            error(t("message.update.fail"));
        }
    };

    const handleCopyText = useCallback(() => {
        copyText(trafficSourceUrl, () => {
            setIsCopy(true);
            setTimeout(() => setIsCopy(false), 5000);
        });
    }, []);

    const showModal = () => {
        Modal.confirm({
            title: t("message.delete_title"),
            icon: <ExclamationCircleOutlined />,
            content: t("message.delete_confirm", {
                returnObjects: true,
                name: t("object._traffic_source"),
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
        <div className="table-row table-row-large ">
            <Row style={{ height: "100%" }} gutter={24} type="flex" align="middle">
                <Col className="col-item" lg={7} md={7} sm={18} xs={18}>
                    <Avatar
                        src={data.qrImageLink || "/user-avatar.png"}
                        shape="square"
                        className="avatar"
                    />
                    <Link className="visible-md" to={`${PATH_TRAFFIC_SOURCE}/${data._id}`}>
                        <p className="user-name">{data.name}</p>
                    </Link>
                    <div className="item-info visible-ms">
                        <p className="source-name">{data.name}</p>
                        <Link to={`${PATH_TRAFFIC_SOURCE}/${data._id}`}>
                            <p className="item-desc">{data.url}</p>
                        </Link>
                    </div>
                </Col>
                <Col className="col-item copy-action" lg={7} md={7} sm={6} xs={6}>
                    <div className="short-text visible-md">
                        <p>{trafficSourceUrl}</p>
                    </div>
                    <Tooltip title={isCopy ? t("message.copied") : t("message.copy")}>
                        <div className="copy" onClick={handleCopyText}>
                            <IconCopy />
                        </div>
                    </Tooltip>
                </Col>
                <Col className="col-item visible-md" lg={4} md={4}>
                    <div className="short-text">
                        <p>{numberFormatter(data.totalClick)}</p>
                    </div>
                </Col>
                <Col className="col-item visible-md" lg={4} md={4}>
                    <Switch
                        checked={data.status === enumStatus.ACTIVE ? true : false}
                        onChange={handleUpdateStatus}
                    />
                </Col>
                <Col lg={2} md={2} className="option-dropdown visible-md">
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
