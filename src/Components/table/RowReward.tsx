import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Col, Modal, Row, Avatar, Menu, Dropdown, Button, Switch } from "antd";
import { MoreHorizontal } from "react-feather";

import { IRewardData } from "@interfaces";
import { rewardAPI } from "@api";
import { BLANK_IMAGE_URL, enumStatus, enumTypeFetchList, PATH_REWARDS } from "@configs";
import { numberFormatter, showErrorMessage, useNotify } from "@utils";
import styled from "styled-components";
import { DeleteBigIcon } from "../icon";

interface IProps {
    data: IRewardData;
    callbackGetList: (type: enumTypeFetchList) => void;
}

export const ComponentRowReward = (props: IProps) => {
    //hooks
    const { t } = useTranslation();
    const { success, error } = useNotify();
    const [confirmModal, setConfirmModal] = useState(false);
    //props
    const { data, callbackGetList } = props;

    const handleDelete = async () => {
        if (data._id) {
            try {
                await rewardAPI.delete(data._id);
                callbackGetList(enumTypeFetchList.delete);
                success(t("message.delete.success"));
                setConfirmModal(false);
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                    setConfirmModal(false);
                } else error(t("message.delete.fail"));
            }
        } else {
            error(t("message.update.fail"));
        }
    };

    const handleDuplicate = async () => {
        if (data._id) {
            try {
                await rewardAPI.duplicate(data._id);
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
                await rewardAPI.updateStatus(data._id, {
                    status: e ? enumStatus.ACTIVE : enumStatus.INACTIVE,
                });
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

    const showModal = () => {
        setConfirmModal(!confirmModal);
        // Modal.confirm({
        //     title: t("message.delete_title"),
        //     icon: <ExclamationCircleOutlined />,
        //     content: t("message.delete_confirm", {
        //         returnObjects: true,
        //         name: t("object._reward"),
        //     }),
        //     style: {},
        //     okText: t("page.delete"),
        //     cancelText: t("page.cancel"),
        //     centered: true,
        //     onOk: handleDelete,
        // });
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
            <StyledModal
                visible={confirmModal}
                onOk={handleDelete}
                onCancel={showModal}
                width="392px"
                footer={[
                    <Button className="btn-cancel" type="default" onClick={showModal}>
                        {t("page.cancel")}
                    </Button>,
                    <Button className="btn-done" type="primary" onClick={handleDelete}>
                        {t("page.delete")}
                    </Button>,
                ]}
            >
                <div className="delete-icon">
                    <DeleteBigIcon />
                </div>
                <h4 className="title">{t("message.do_you_want_to_delete")}</h4>
                <p className="sub_title">{t("message.please_confirm_to_delete")}</p>
            </StyledModal>
            <Row style={{ height: "100%" }} gutter={24} type="flex" align="middle">
                <Col className="col-item" lg={7} md={7} sm={18} xs={18}>
                    <Avatar
                        shape="square"
                        src={data?.imageUrl[0] || BLANK_IMAGE_URL}
                        className="avatar"
                    />
                    <Link className="visible-md" to={`${PATH_REWARDS}/${data._id}`}>
                        <p className="user-name">{data.name}</p>
                    </Link>
                    <div className="item-info visible-ms">
                        <Link to={`${PATH_REWARDS}/${data._id}`}>
                            <p className="user-name">{data.name}</p>
                        </Link>
                        <p
                            className="item-desc"
                            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
                        />
                    </div>
                </Col>
                <Col className="col-item point" lg={5} md={5} sm={6} xs={6}>
                    <p className="eng point-number">{numberFormatter(data.point)}</p>
                    <p className="visible-ms point-label">{t("page.points")}</p>
                </Col>
                <Col className="col-item visible-md" lg={5} md={5}>
                    <p className="eng">
                        {t("format.date", {
                            date: new Date(data?.createdAt || ""),
                        })}
                    </p>
                </Col>
                <Col className="col-item visible-md" lg={5} md={5}>
                    <Switch
                        onChange={(e) => handleUpdateStatus(e)}
                        checked={data.status === enumStatus.ACTIVE ? true : false}
                    />
                </Col>

                <Col className="option-dropdown visible-md" lg={2} md={2}>
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
// style modal
const StyledModal = styled(Modal)`
    .ant-modal-close {
        display: none;
    }
    .ant-modal-content {
        padding: 32px 30px;
        .ant-modal-body {
            padding: 0 !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            .delete-icon {
                margin-bottom: 16px;
            }
            .title {
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #000000;
            }
            .sub_title {
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                text-align: center;
                color: #646464;
                margin: 0;
            }
            margin-bottom: 50px;
        }
        .ant-modal-footer {
            padding: 0 !important;
            .btn-cancel {
                padding: 16px 54px;
                /* width: 160px; */
                height: 49px;
                background: #ffffff;
                border: 0.5px solid #646464;
                border-radius: 4px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 16px 64px;
            }
            .btn-done {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding: 16px 54px;

                height: 49px;
                border-radius: 4px;
            }
        }
    }
`;
