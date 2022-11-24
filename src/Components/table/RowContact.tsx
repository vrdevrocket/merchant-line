import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Col, Modal, Row, Avatar, Menu, Dropdown, Button } from "antd";
import { MoreHorizontal } from "react-feather";
import moment from "moment";

import { IContactData } from "@interfaces";
import { contactAPI } from "@api";
import { PATH_CONTACTS, enumTypeFetchList } from "@configs";
import { SharedButtonDefault } from "@components";
import { numberFormatter, showErrorMessage, useNotify } from "@utils";
import { useState } from "react";

interface IProps {
    data: IContactData;
    handleEdit: (userId: string, points: number) => void;
    callbackGetList: (typeGetList: enumTypeFetchList) => void;
    index: number;
}

export const ComponentRowContact = (props: IProps) => {
    //hooks
    const { t } = useTranslation();
    const { success, error } = useNotify();
    //props
    const { data, handleEdit, callbackGetList } = props;
    const [show, setShowModal] = useState(false);
    const handleDelete = async () => {
        try {
            await contactAPI.delete(data._id);
            callbackGetList(enumTypeFetchList.delete);
            setShowModal(false);
            success(t("message.delete.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.delete.fail"));
        }
    };

    const handleDuplicate = async () => {
        try {
            await contactAPI.duplicate(data._id);
            callbackGetList(enumTypeFetchList.duplicate);
            success(t("message.duplicate.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.duplicate.fail"));
        }
    };

    const showModal = () => {
        setShowModal(!show);
        // Modal.confirm({
        //     title: t("message.delete_title"),
        //     icon: <ExclamationCircleOutlined />,
        //     content: t("message.delete_confirm", {
        //         returnObjects: true,
        //         name: t("object._contact"),
        //     }),
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
        <div className="table-row">
            <Modal
                title={
                    <span style={{ display: "flex", alignItems: "center" }}>
                        {t("message.delete_title")}
                    </span>
                }
                visible={show}
                onOk={handleDelete}
                onCancel={showModal}
                footer={[
                    <Button className="btn-done" type="primary" onClick={handleDelete}>
                        {t("page.delete")}
                    </Button>,
                ]}
            >
                <p>{t("message.delete_confirm", { name: t("object._contact") })}</p>
            </Modal>
            <Row
                style={{ height: "100%" }}
                gutter={24}
                type="flex"
                align="middle"
                justify="space-between"
            >
                <Col className="col-item" lg={4} md={4} xs={14} sm={14}>
                    <Avatar
                        src={data?.user?.avatar || "/user-avatar.png"}
                        size={39}
                        style={{ minWidth: 39 }}
                    />
                    <Link className="visible-md" to={`${PATH_CONTACTS}/${data._id}`}>
                        <p className="contact-user">{data.fullName || t("page.empty_text")}</p>
                    </Link>
                    <div className="item-info visible-ms">
                        <Link to={`${PATH_CONTACTS}/${data._id}`}>
                            <p className="contact-user">{data.fullName || t("page.empty_text")}</p>
                        </Link>
                        <p className="member">{data.user?.memberTier?.tierName}</p>
                        <p className="phone">{data.phoneNumber}</p>
                    </div>
                </Col>
                <Col className="col-item visible-md" span={3}>
                    <p>{data.phoneNumber || t("page.empty_text")}</p>
                </Col>
                <Col className="col-item m-member-code" xs={10} sm={10} lg={3} md={3}>
                    <p className="visible-md">{data.user?.memberCode || t("page.empty_text")}</p>
                    <div className="member-code  visible-ms">
                        {t("page.id", {
                            id: data.user?.memberCode,
                        })}
                    </div>
                </Col>
                <Col className="col-item action-col visible-md" span={3}>
                    <p>{numberFormatter(data.user?.points)}</p>
                    {data.user?._id && (
                        <SharedButtonDefault
                            type="primary"
                            size="default"
                            text={t("page.edit")}
                            //@ts-ignore
                            onClick={() => handleEdit(data.user._id, data.user.points)}
                            className="edit-btn"
                        />
                    )}
                </Col>
                <Col className="col-item visible-md" span={3}>
                    <p>{data.user?.saleAmount || t("page.empty_text")}</p>
                </Col>
                <Col className="col-item visible-md" span={3}>
                    <p>{data.user?.memberTier?.tierName || t("page.empty_text")}</p>
                </Col>
                <Col className="col-item visible-md" span={3}>
                    <p>{moment(new Date(data?.createdAt || "")).format("DD MMM YYYY")}</p>
                </Col>
                <Col className="option-dropdown visible-md" span={2}>
                    <Dropdown
                        //@ts-ignore
                        getPopupContainer={(trigger) => trigger.parentNode}
                        overlay={menu}
                        trigger={["click"]}
                        placement="bottomRight"
                    >
                        <Button
                            style={{
                                border: "unset",
                            }}
                        >
                            <MoreHorizontal />
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </div>
    );
};
