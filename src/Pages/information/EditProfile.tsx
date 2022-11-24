import { useTranslation } from "react-i18next";
import { selectApp, selectAuth, setInfo, setLoading, useAppSelector } from "@redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Form, Modal } from "antd";

import { SharedButtonDefault, SharedButtonSub, SharedInput, StyledCard } from "@components";
import { ModuleChangePassword } from "@modules";
import { ChannelEnum, EventEnum, IChannels } from "@interfaces";
import { merchantAPI } from "@api";
import { useDispatch } from "react-redux";
import { showErrorMessage, useNotify } from "@utils";
import { enumExternalMethod, enumNotiType } from "@configs";

interface IData {
    key: string;
    value: string;
    status: boolean;
}

interface IEvent {
    key: enumNotiType;
    value: string;
    status: boolean;
}

const dataChannels: IData[] = [
    {
        key: enumNotiType.LINE_CHAT,
        value: "line_chat",
        status: false,
    },
    {
        key: enumNotiType.EMAIL,
        value: "email",
        status: false,
    },
    {
        key: enumNotiType.ADMIN_PANE,
        value: "admin_pane",
        status: false,
    },
];
const dataEvents: IEvent[] = [
    {
        key: enumNotiType.REWARD_REDEEM,
        value: "reward_redemption",
        status: false,
    },
    {
        key: enumNotiType.COUPON_USE,
        value: "coupon_usage",
        status: false,
    },
    {
        key: enumNotiType.BENEFIT_REDEEM,
        value: "benefit_redemption",
        status: false,
    },
];

export const PageEditProfile = () => {
    //page Hooks
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    const history = useHistory();
    //redux states
    const app = useAppSelector(selectApp);
    const profileUser = useAppSelector(selectAuth).userInfo;
    const externalLogin = useAppSelector(selectAuth).externalLogin;

    //page state
    const [drawer, setDrawer] = useState(false);
    const [dataChannelsUser, setDataChannelsUser] = useState<IData[]>([]);
    const [dataEventsUser, setDataEventsUser] = useState<IData[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    //page variable
    const data = {
        name: profileUser?.fullName || "",
    };
    useEffect(() => {
        if (profileUser?.notifSetting?.channels) {
            const dataFake: IData[] = dataChannels.map((channel: IData) => {
                const key = channel.key as ChannelEnum;
                return {
                    ...channel,
                    status: !!profileUser.notifSetting.channels[key],
                };
            });

            setDataChannelsUser([...dataFake]);
        } else {
            setDataChannelsUser([...dataChannels]);
        }
        if (profileUser?.notifSetting?.events) {
            const initEvent = profileUser?.notifSetting?.events;
            const dataFake: IData[] = dataEvents.map((event: IData) => {
                const key = event.key as enumNotiType;
                return {
                    ...event,
                    status: initEvent.includes(key),
                };
            });
            setDataEventsUser([...dataFake]);
        } else {
            setDataEventsUser([...dataEvents]);
        }
    }, [profileUser]);

    const upGradeSettingSchema = Yup.object().shape({
        name: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.name"),
                })
            )
            .max(
                255,
                t("validation.max_length", {
                    returnObjects: true,
                    name: t("page.name"),
                })
            ),
    });
    const handleSave = async (values: { name: string }) => {
        //
        try {
            dispatch(setLoading(true));

            const valueChannels: IChannels = {
                adminPanel: false,
                email: false,
                lineChat: false,
            };
            dataChannelsUser.forEach((data) => {
                const key: ChannelEnum = data.key as ChannelEnum;
                valueChannels[key] = data.status;
            });

            const valueEvents = {
                couponAddOrDel: false,
                couponCollection: false,
                couponUsage: false,
                membershipUpgradeOrDowngrade: false,
                newUserSignUp: false,
                pointsCollection: false,
                reward: false,
                rewardAddOrDel: false,
                rewardRedemption: false,
                sales: false,
            };

            dataEventsUser.forEach((data) => {
                const key: EventEnum = data.key as EventEnum;
                valueEvents[key] = data.status;
            });
            const eventArr = Object.keys(valueEvents).filter(
                (key) => valueEvents[key]
            ) as enumNotiType[];
            const res = await merchantAPI.updateUserProfile({
                fullName: values.name,
                notifSetting: {
                    channels: { ...valueChannels },
                    events: eventArr,
                },
            });
            if (res.data) {
                dispatch(setInfo(res.data));
                success(t("page.update_profile_successfully"));
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update_profile_fail"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const gotoBack = () => {
        history.goBack();
    };

    // const handleChangeChannels = (
    //     key: enumNotiType | string,
    //     value: string,
    //     checked: boolean,
    //     index: number
    // ) => {
    //     if (key === enumNotiType.EMAIL && !profileUser?.email) {
    //         setShowModal(true);
    //         return;
    //     } else if (key === enumNotiType.LINE_CHAT && !profileUser?.lineUserId) {
    //         setShowModal(true);
    //         return;
    //     }
    //     const dataChecked: IData = {
    //         key: key,
    //         status: checked,
    //         value: value,
    //     };
    //     dataChannelsUser.splice(index, 1, dataChecked);
    //     setDataChannelsUser([...dataChannelsUser]);
    // };

    const handleChangeDrawer = () => {
        setDrawer(!drawer);
    };
    //formik
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: data,
        validationSchema: upGradeSettingSchema,
        enableReinitialize: true,
        onSubmit: handleSave,
    });
    return (
        <StyledContainer onSubmit={handleSubmit}>
            <Modal
                visible={showModal}
                onCancel={() => setShowModal(false)}
                title={false}
                footer={false}
                width={360}
                centered={true}
                className="not-ready-modal"
            >
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 16,
                        padding: "40px 0",
                        fontWeight: 600,
                    }}
                >
                    {t("page.merchant_can_not_use_this_channel_notify")}
                </div>
            </Modal>
            <div className="page-layout">
                <h3>{t("page.sidebar.edit_profile")}</h3>
                <div className="main">
                    <div className="card-wrap">
                        <StyledCard>
                            <div className="title">
                                {t("page.edit_profile.personal_information")}
                            </div>
                            <Form.Item className="label" style={{ marginBottom: 0 }}>
                                <p className="title">{t("page.edit_profile.fullname")}</p>
                                <SharedInput
                                    name="name"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                    onChange={handleChange}
                                    value={values.name}
                                    onBlur={handleBlur}
                                    errors={errors.name}
                                    touched={touched.name}
                                />
                            </Form.Item>
                            <Form.Item className="label">
                                <p className="title">{t("page.edit_profile.email")}</p>
                                <SharedInput
                                    name="email"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                    className="height_48"
                                    onChange={handleChange}
                                    value={profileUser?.email}
                                    onBlur={handleBlur}
                                    disable={true}
                                />
                                {/* <div className="change-password" onClick={handleChangeDrawer}>
                                    {t("page.change_password")}
                                </div> */}
                            </Form.Item>
                            <Form.Item className="label">
                                <p className="title">{t("page.edit_profile.password")}</p>
                                <div className="change-password-layout">
                                    <div className="input-layout">
                                        <SharedInput
                                            name="password"
                                            style={{ width: "100%", borderRadius: "4px" }}
                                            className="height_48"
                                            onChange={handleChange}
                                            value={"......"}
                                            type="password"
                                            onBlur={handleBlur}
                                            disable={true}
                                        />
                                    </div>
                                    <div className="change-btn-layout">
                                        <SharedButtonDefault
                                            text={
                                                app.mobile
                                                    ? t("page.edit_profile.change")
                                                    : t("page.change_password")
                                            }
                                            type="default"
                                            size="default"
                                            className="change-btn"
                                            onClick={handleChangeDrawer}
                                            disable={
                                                externalLogin === enumExternalMethod.FACEBOOK ||
                                                externalLogin === enumExternalMethod.GOOGLE ||
                                                externalLogin === enumExternalMethod.LINE
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div className="change-password" onClick={handleChangeDrawer}>
                                    {t("page.change_password")}
                                </div> */}
                            </Form.Item>

                            <Form.Item className="label">
                                <p className="title">{t("page.edit_profile.contact_phone")}</p>
                                <SharedInput
                                    name="businessTel"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                    className="height_48"
                                    onChange={handleChange}
                                    value={profileUser?.merchant?.businessTel}
                                    onBlur={handleBlur}
                                    disable={true}
                                />
                            </Form.Item>
                            <Form.Item className="label">
                                <p className="title">{t("page.role")}</p>
                                <SharedInput
                                    name="role"
                                    style={{ width: "100%", borderRadius: "4px" }}
                                    className="height_48"
                                    onChange={handleChange}
                                    value={profileUser?.role?.name}
                                    onBlur={handleBlur}
                                    disable={true}
                                />
                            </Form.Item>
                        </StyledCard>
                    </div>
                </div>
                <div className="button-field">
                    <SharedButtonSub
                        type="default"
                        style={{ fontSize: "16px", marginRight: "12px" }}
                        text={t("page.save")}
                        htmlType="submit"
                    />
                    <SharedButtonSub
                        type="sub"
                        style={{ fontSize: "16px" }}
                        text={t("page.cancel")}
                        htmlType="button"
                        onClick={gotoBack}
                    />
                </div>
                <ModuleChangePassword
                    onClose={handleChangeDrawer}
                    drawer={drawer}
                    placement="right"
                    width={!app.mobile ? 538 : "100vw"}
                />
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.form`
    overflow: auto;
    height: 86vh;
    display: flex;
    flex-direction: column;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        cursor: grab;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .main {
        width: 100%;
        max-width: ${(p) => p.theme.maxWidths.cardWrap};
        flex: 1;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            display: none;
        }

        ::-webkit-scrollbar-thumb {
            background: ${(p) => p.theme.colors.fadedText};
            border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
            cursor: grab;
        }
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .button-field {
        display: flex;
        .btn-back {
            margin-right: 12px;
        }
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: 37px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
    h4 {
        font-weight: 700;
        font-size: 25px;
        color: black;
        margin-bottom: 22px;
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 20px;
            margin-bottom: 18px;
        }
    }
    padding: 3.5rem;
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 1.5rem;
    }
    .card-wrap {
        margin-bottom: 28px;
        .main-title {
            margin-bottom: 8px;
        }
        .sub-title {
            font-size: 14px;
            color: gray;
            margin-bottom: 24px;
        }
        .input-field {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .input-w-70 {
            width: 90%;
            .ant-input-disabled {
                cursor: inherit;
            }
        }
        .clip-path {
            margin-bottom: 10px;
            margin-left: 12px;
        }
        .text-err {
            text-align: left;
            color: #f43f3f;
            visibility: visible;
            font-size: 11px;
            font-weight: 700;
        }
        .err-hide {
            visibility: hidden;
        }
        .input-invalid {
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
    .button-field {
        margin-top: 12px;
        button {
            min-width: 118px;
            height: ${(p) => p.theme.heights.button};
            font-size: 16px;
            font-weight: 500;
        }
    }
    .switch-field {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        span {
            margin-left: 14px;
            font-size: 16px;
            color: black;
        }
    }

    .current-plan {
        margin-right: 12px;
        span {
            cursor: inherit;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
        }
    }
    .btn-action {
        background-color: #0263e0;
    }
    .change-password {
        font-size: 16px;
        text-decoration: underline;
        color: ${(p) => p.theme.colors.danger};
        cursor: pointer;
    }
    .label {
        .title {
            margin-bottom: 11px;
        }
        .change-password-layout {
            display: flex;
            column-gap: 16px;
            .input-layout {
                flex: 4;
            }
            .change-btn-layout {
                flex: 1;
                .change-btn {
                    border: 0.5px solid #646464;
                    border-radius: 4px;
                    background: white;
                    font-size: 16px;
                    padding: 14px;
                    font-weight: 600;
                    height: 49px;
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #646464;
                    &:disabled {
                        border-color: #d9d9d9 !important;
                    }
                }
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .button-field {
            button {
                flex: 1;
                min-width: initial;
                max-width: initial;
            }
        }
    }
`;
