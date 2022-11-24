import { Modal, Select, Input, Tooltip, Radio } from "antd";
import { Check } from "react-feather";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { enumPermissionRole } from "@configs";
import { SharedButtonDefault } from "@components";
import { IRole } from "@interfaces";
import { permissionAPI } from "@api";
import { setLoading } from "@redux";
import { showErrorMessage, useNotify } from "@utils";
interface IProps {
    visible: boolean;
    typeModal: number;
    handleClose: () => void;
    callbackGetList: () => void;
    permissionTitle: { title: string; type: string }[];
    userId?: string;
    currentRole?: {
        roleId: string;
        name: string;
    };
}

const activeIcon = (
    <Check
        color={"white"}
        size={22}
        style={{ background: "#0263E0", borderRadius: 100, padding: 4 }}
    />
);
export const ModuleRole = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    // page state
    const [valueSelect, setValueSelect] = useState("");
    const [messCopied, setMessCopied] = useState("copy");
    const [linkSignup, setLinkSignup] = useState("");
    const [listRole, setListRole] = useState<IRole[]>([]);
    //page variable
    const {
        permissionTitle,
        currentRole,
        visible,
        typeModal,
        handleClose,
        userId,
        callbackGetList,
    } = props;

    const { Option } = Select;

    useEffect(() => {
        if (visible) getListRole();
    }, [visible]);
    const copyClipBoard = () => {
        navigator.clipboard.writeText(linkSignup);
        setMessCopied(t("message.copied"));
        setTimeout(() => setMessCopied(t("message.copy")), 5000);
    };

    const getListRole = async () => {
        const response = await permissionAPI.getListRole();
        setListRole(response.data);
    };
    const handleSelect = (value: string) => {
        setValueSelect(value);
        getInviteLink(value);
    };
    const showModal = () => {
        Modal.confirm({
            title: t("message.delete_title"),
            icon: <ExclamationCircleOutlined />,
            content: t("message.delete_confirm", {
                returnObjects: true,
                name: t("object._user"),
            }),
            okText: t("page.delete"),
            cancelText: t("page.cancel"),
            centered: true,
            onOk: deleteUser,
        });
    };
    const handleDelete = () => {
        showModal();
    };
    const deleteUser = async () => {
        if (userId) {
            dispatch(setLoading(true));
            try {
                await permissionAPI.delete(userId);
                success(t("message.delete.success"));
                callbackGetList();
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error("message.error");
                handleClose();
            } finally {
                dispatch(setLoading(false));
            }
        }
    };
    const updateRole = async (value: string) => {
        const params = { roleId: value };
        if (userId)
            try {
                await permissionAPI.updateRole(userId, params);
                success(t("message.update.success"));
                callbackGetList();
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            } finally {
                handleClose();
            }
    };
    const getInviteLink = async (value: string) => {
        try {
            const response = await permissionAPI.createInviteLink({ roleId: value });
            if (response.status === 200) {
                // && response.statusText === "OK"
                setLinkSignup(`${window.location.host}/sign-up/${response.data.inviteId}`);
            } else {
                error(t("message.try_again_text"));
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
    };
    const actionField = (type: number) => {
        switch (type) {
            case enumPermissionRole.MODAL_PERMISSION_INFO:
                return (
                    <div
                        className="wrap-btn"
                        style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
                    >
                        <SharedButtonDefault
                            className="submit-btn"
                            type="primary"
                            text={t("page.close")}
                            onClick={props.handleClose}
                        />
                    </div>
                );
            case enumPermissionRole.MODAL_PERMISSION_ADD:
                return (
                    <div
                        className="wrap-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 24,
                            paddingTop: 24,
                            borderTop: "1px #A5A5A5 solid",
                        }}
                    >
                        <p style={{ alignSelf: "start" }}>
                            {t("page.grant_members_permissions_via_direct_URL_links")}
                        </p>
                        <div style={{ width: "100%" }}>
                            <Select
                                style={{ width: "90%", height: 48, margin: "8px 0px" }}
                                placeholder={t("page.choose_permission")}
                                onChange={handleSelect}
                            >
                                {listRole &&
                                    listRole.map((item) => {
                                        return (
                                            <Option key={item._id} value={item._id}>
                                                <Radio
                                                    checked={valueSelect === item._id}
                                                    value={item._id}
                                                >
                                                    {item.name}
                                                </Radio>
                                            </Option>
                                        );
                                    })}
                            </Select>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Input
                                    placeholder={t("page.choose_permission_and_copy_link")}
                                    value={linkSignup}
                                    style={{
                                        height: 48,
                                        backgroundColor: "#F7F7F8",
                                        margin: "8px 12px 8px 0px",
                                        width: "90%",
                                        cursor: "auto",
                                    }}
                                    readOnly
                                    type="text"
                                />
                                <Tooltip placement="topLeft" title={messCopied}>
                                    <div className="clip-path" onClick={copyClipBoard}>
                                        <div
                                            style={{
                                                padding: "0 3px 3px 0",
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: 18,
                                                height: 18,
                                                backgroundColor: "white",
                                                zIndex: 1,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    border: "1px #646464 solid",
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor: "white",
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                border: "1px #646464 solid",
                                                position: "absolute",
                                                bottom: 0,
                                                right: 0,
                                                width: 15,
                                                height: 15,
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div style={{ marginTop: 30 }}>
                            <SharedButtonDefault
                                className="submit-btn"
                                type="primary"
                                text={t("page.save")}
                                onClick={handleClose}
                            />
                        </div>
                    </div>
                );
            case enumPermissionRole.MODAL_PERMISSION_EDIT:
                return (
                    <div
                        className="wrap-btn"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            marginTop: 24,
                            paddingTop: 24,
                            borderTop: "1px #A5A5A5 solid",
                        }}
                    >
                        <p style={{ alignSelf: "start" }}>
                            {t("page.edit_permissions_granted_to_this_account_member")}
                        </p>
                        <div style={{ width: "100%" }}>
                            <Select
                                style={{ width: "80%", height: 48, margin: "8px 0px" }}
                                placeholder={t("page.choose_permission")}
                                defaultValue={currentRole?.name}
                                onChange={handleSelect}
                            >
                                {listRole &&
                                    listRole.map((item) => {
                                        if (item._id !== currentRole?.roleId)
                                            return (
                                                <Option key={item._id} value={item._id}>
                                                    <Radio
                                                        checked={valueSelect === item._id}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </Radio>
                                                </Option>
                                            );
                                    })}
                            </Select>
                        </div>
                        <p className="delete-field" onClick={handleDelete}>
                            {t("page.delete_this_account_member")}
                        </p>
                        <div style={{ marginTop: 30 }}>
                            <SharedButtonDefault
                                className="submit-btn"
                                type="primary"
                                text={t("page.save")}
                                onClick={() => updateRole(valueSelect)}
                            />
                        </div>
                    </div>
                );
        }
    };
    const titleModal = () => {
        switch (typeModal) {
            case enumPermissionRole.MODAL_PERMISSION_ADD:
                return t("page.add_member");
            case enumPermissionRole.MODAL_PERMISSION_EDIT:
                return t("page.manage_permissions");
            case enumPermissionRole.MODAL_PERMISSION_INFO:
                return t("page.permission_types");
        }
    };
    return (
        <Modal centered visible={visible} onCancel={handleClose} footer={null} title={titleModal()}>
            <Container>
                <div>
                    <div className="title flex-row">
                        <div className="flex" style={{ flex: 2 }}></div>
                        {listRole.map((item) => (
                            <div key={item._id} className="flex" style={{ flex: 1 }}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                    {permissionTitle.map((item, index) => (
                        <div
                            key={index}
                            className={
                                !(index % 2) ? "flex-row bg-transparent" : "flex-row bg-gray"
                            }
                        >
                            <div
                                className="flex"
                                style={{
                                    flex: 2,
                                    display: "flex",
                                    justifyContent: "start",
                                    paddingLeft: "22px",
                                }}
                            >
                                <div className="type-permission-text">
                                    {t("page." + item.title)}
                                </div>
                            </div>

                            {listRole.map((roleItem, roleIndex) => (
                                <div
                                    key={roleIndex}
                                    className="flex"
                                    style={{ flex: 1, order: roleIndex }}
                                >
                                    {roleItem.permissions.map((rolePermission) =>
                                        rolePermission === item.type ? activeIcon : <></>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {actionField(typeModal)}
            </Container>
        </Modal>
    );
};

const Container = styled.div`
    .submit-btn {
        background-color: #0263e0;
        &:hover,
        &:focus {
            color: white !important;
        }
    }
    .flex-row {
        display: flex;
        min-height: 66px;
        align-items: center;
    }
    .title {
        font-weight: 700;
        font-size: 16px;
        color: black;
        background-color: #e1e1e1;
    }
    .bg-transparent {
        background-color: transparent;
    }
    .bg-gray {
        background-color: #f7f7f8;
    }
    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .type-permission-text {
        color: #646464;
        font-weight: 16px;
    }
    .wrap-btn {
        button {
            min-width: 118px;
            min-height: 49px;
            font-weight: 600;
            font-size: 16px;
        }
    }
    .ant-select-selection-selected-value {
        margin-top: 8px;
    }
    .ant-select-selection__rendered {
        height: 100%;
    }
    .clip-path {
        width: 21px;
        height: 21px;
        position: relative;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        &:active {
            transform: scale(0.95);
        }
    }
    .ant-select-selection__placeholder,
    .ant-select-search__field__placeholder {
        color: #646464 !important;
    }
    .delete-field {
        align-self: flex-start;
        color: #f22f46;
        cursor: pointer;
        text-decoration: underline;
    }
    .ant-select-selection--single {
        height: 48px;
    }
`;
