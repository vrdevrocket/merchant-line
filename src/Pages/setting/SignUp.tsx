import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Skeleton, Switch } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { enumPlacement, enumSignUpMethods, enumStatus, PATH_CHOOSE_PLAN } from "@configs";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    TouchSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    //@ts-ignore
} from "@dnd-kit/sortable";

import {
    SharedButtonDefault,
    StyledCancelButton,
    StyledCard,
    StyledSubmitButton,
    ComponentInfoBox,
} from "@components";
import { IFieldSignUp, ISignupMethod } from "@interfaces";
import {
    ModuleCreateFields,
    ModuleFieldItem,
    ModuleUpgradePlan,
    ModuleUploadImage,
} from "@modules";
import { getInfo, selectAuth, setLoading } from "@redux";
import { merchantAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";
const initFormikVal: ISignupMethod = {
    fields: [],
    turnOn: false,
    welcomeScreenImages: [],
    welcomeScreenStatus: enumStatus.INACTIVE,
    signUpMethods: [enumSignUpMethods.LINEOA],
};

interface ICustomerMethod {
    LINEOA: boolean;
    FACEBOOK: boolean;
    GOOGLE: boolean;
    EMAIL: boolean;
    TEL: boolean;
}

export const PageSettingSignUp = () => {
    //hooks
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error, warning } = useNotify();
    //redux states
    const plan = useSelector(selectAuth).plan;
    const signUpSettings = useSelector(selectAuth).userInfo?.merchant.signUpSettings;
    const multiSignUp = (plan && plan.multiSignUp) || false;

    // state
    const [visible, setVisible] = useState<boolean>(false);
    const [upgradeVisible, setUpgradeVisible] = useState<boolean>(false);
    const [indexFieldItem, setIndexFieldItem] = useState<number>(-1);
    const [signUpMethodItem, setSignUpMethodItem] = useState<ICustomerMethod>({
        LINEOA: true,
        FACEBOOK: false,
        GOOGLE: false,
        EMAIL: false,
        TEL: false,
    });

    // const itemPhoneEmail = (
    //     <div className="phone-email-field">
    //         <SharedButtonDefault
    //             className={signUpMethodItem.EMAIL ? "item-choose" : ""}
    //             text={t("page.email")}
    //             type="default"
    //             onClick={() => handleSignUPMethod(true, enumSignUpMethods.EMAIL)}
    //         />
    //         <SharedButtonDefault
    //             className={signUpMethodItem.TEL ? "item-choose" : ""}
    //             text={t("page.tel")}
    //             type="default"
    //             onClick={() => handleSignUPMethod(true, enumSignUpMethods.TEL)}
    //         />
    //     </div>
    // );

    const sendSubmit = async () => {
        dispatch(setLoading(true));
        try {
            const arr = [
                ...(Object.keys(signUpMethodItem).filter((key) => {
                    if (signUpMethodItem[key]) return key;
                }) as enumSignUpMethods[]),
            ];
            // return console.log(arr);
            await merchantAPI.updateSignUpMethod({ ...values, signUpMethods: arr });

            dispatch(getInfo());
            success(t("message.update.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const showAddField = () => {
        if (plan?.customSignUp) {
            const index = values.fields.length + 1;
            setIndexFieldItem(index);
            setVisible(true);
        } else {
            setUpgradeVisible(true);
        }
    };

    const EditFieldItem = (index: number) => {
        setIndexFieldItem(index);
        setVisible(true);
    };

    const handleCancel = useCallback(() => {
        history.goBack();
    }, []);

    const handleClose = () => {
        setVisible(false);
    };

    // What: handle switch button opts
    const handleTurnOnForm = (e: boolean) => {
        setFieldValue("turnOn", e);
    };

    const handleAddFormField = (value: IFieldSignUp, index: number) => {
        if (values.fields.length < index || index < 0)
            setFieldValue("fields", [...values.fields, value]);
        else {
            setFieldValue("fields", [
                ...values.fields.map((item, i) => {
                    if (i === index) return value;
                    else return item;
                }),
            ]);
        }
    };

    const handleSignUPMethod = (e: boolean, type: enumSignUpMethods) => {
        switch (type) {
            case enumSignUpMethods.EMAIL: {
                setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: !e }));
                break;
            }
            case enumSignUpMethods.TEL: {
                setSignUpMethodItem((prev) => ({ ...prev, TEL: e, EMAIL: !e }));
                break;
            }
            case enumSignUpMethods.GOOGLE: {
                if (
                    !e &&
                    !signUpMethodItem.TEL &&
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.FACEBOOK &&
                    !signUpMethodItem.LINEOA
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, GOOGLE: e, LINEOA: true }));
                } else setSignUpMethodItem((prev) => ({ ...prev, GOOGLE: e }));
                break;
            }
            case enumSignUpMethods.LINEOA: {
                if (
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.FACEBOOK &&
                    !signUpMethodItem.GOOGLE &&
                    !signUpMethodItem.TEL
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, LINEOA: true }));
                } else {
                    setSignUpMethodItem((prev) => ({ ...prev, LINEOA: e }));
                }
                break;
            }
            case enumSignUpMethods.FACEBOOK: {
                if (
                    !e &&
                    !signUpMethodItem.TEL &&
                    !signUpMethodItem.EMAIL &&
                    !signUpMethodItem.GOOGLE &&
                    !signUpMethodItem.LINEOA
                ) {
                    setSignUpMethodItem((prev) => ({ ...prev, FACEBOOK: e, LINEOA: true }));
                } else setSignUpMethodItem((prev) => ({ ...prev, FACEBOOK: e }));
                break;
            }
            default:
                break;
        }
    };

    const switchPhoneMail = (e: boolean) => {
        if (e) {
            setSignUpMethodItem((prev) => ({ ...prev, TEL: e }));
        } else {
            if (!signUpMethodItem.FACEBOOK && !signUpMethodItem.GOOGLE)
                setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: e, LINEOA: true }));
            else setSignUpMethodItem((prev) => ({ ...prev, EMAIL: e, TEL: e }));
        }
    };

    const handleActivateImg = (e: boolean) => {
        setFieldValue("welcomeScreenStatus", e ? enumStatus.ACTIVE : enumStatus.INACTIVE);
    };

    const handleDeleteFieldItem = (index: number) => {
        setFieldValue("fields", [
            ...values.fields.filter((item, i) => {
                if (i !== index) return item;
            }),
        ]);
    };

    // images upload
    const handleUpdateImg = (images: string[]) => {
        setFieldValue("welcomeScreenImages", [...images]);
    };

    const closeUpgradePlan = () => {
        setUpgradeVisible(false);
    };

    const gotoChoosePlan = useCallback(() => {
        history.push(PATH_CHOOSE_PLAN);
    }, []);

    const checkMultiSignup = () => {
        if (!multiSignUp) warning(t("message.feature_not_available"));
    };

    // formik
    const { values, setFieldValue, handleSubmit, setValues } = useFormik({
        initialValues: initFormikVal,
        onSubmit: sendSubmit,
    });
    useEffect(() => {
        if (signUpSettings) {
            setValues(signUpSettings);
            if (signUpSettings.fields) setIndexFieldItem(signUpSettings.fields.length);
            setSignUpMethodItem((prev) => ({
                ...prev,
                FACEBOOK: signUpSettings.signUpMethods.includes(enumSignUpMethods.FACEBOOK),
                EMAIL: signUpSettings.signUpMethods.includes(enumSignUpMethods.EMAIL),
                TEL: signUpSettings.signUpMethods.includes(enumSignUpMethods.TEL),
                LINEOA: signUpSettings.signUpMethods.includes(enumSignUpMethods.LINEOA),
                GOOGLE: signUpSettings.signUpMethods.includes(enumSignUpMethods.GOOGLE),
            }));
        }
    }, [signUpSettings]);

    // dnd
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
        useSensor(TouchSensor)
    );
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const swapItem = (items: IFieldSignUp[]) => {
                const oldIndex = items.findIndex((item) => JSON.stringify(item) === active.id);
                const newIndex = items.findIndex((item) => JSON.stringify(item) === over.id);
                return arrayMove(items, oldIndex, newIndex);
            };
            setFieldValue("fields", swapItem(values.fields));
        }
    };

    return (
        <>
            <ModuleUpgradePlan
                visible={upgradeVisible}
                onClose={closeUpgradePlan}
                handleUpgrade={gotoChoosePlan}
            />
            <ModuleCreateFields
                initData={values.fields[indexFieldItem]}
                visible={visible}
                handleClose={handleClose}
                index={indexFieldItem}
                callbackData={handleAddFormField}
            />
            <StyledContainer>
                <div className="page">
                    <h3>{t("page.Sign_up_settings")}</h3>
                    <div className="main">
                        <div className="card-wrap">
                            <Skeleton
                                active
                                className="skeleton"
                                loading={false}
                                paragraph={{ rows: 4 }}
                            >
                                <StyledCard>
                                    <h4>
                                        {t("page.edit_form")}
                                        <ComponentInfoBox
                                            videoUrl="abc"
                                            title={t("page.box_info.signup_form")}
                                            body={[t("page.box_info.signup_form_body")]}
                                            placement={enumPlacement.RIGHT}
                                        />
                                    </h4>
                                    <div className=" switch-field label">
                                        <Switch
                                            onChange={handleTurnOnForm}
                                            checked={values.turnOn}
                                        />
                                        <span className="turn-on">{t("page.turn_on_form")}</span>
                                    </div>
                                    <div className="label">
                                        <p className="title">{t("page.created_fields")}</p>
                                        <div className="fields-container">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <SortableContext
                                                    items={values.fields.map((item) =>
                                                        JSON.stringify(item)
                                                    )}
                                                    strategy={rectSortingStrategy}
                                                >
                                                    {values.fields.map((item, index) => (
                                                        <div key={index} className="field-item">
                                                            <ModuleFieldItem
                                                                itemJson={JSON.stringify(item)}
                                                                handleDeleteFieldItem={
                                                                    handleDeleteFieldItem
                                                                }
                                                                EditFieldItem={EditFieldItem}
                                                                index={index}
                                                            />
                                                        </div>
                                                    ))}
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                        <SharedButtonDefault
                                            className="btn-add-field"
                                            text={t("page.add_fields")}
                                            onClick={showAddField}
                                            type="default"
                                            icon="plus"
                                        />
                                    </div>
                                </StyledCard>
                            </Skeleton>
                        </div>

                        <div className="card-wrap">
                            <fieldset disabled={!multiSignUp} onClick={checkMultiSignup}>
                                <Skeleton
                                    active
                                    className="skeleton"
                                    loading={false}
                                    paragraph={{ rows: 4 }}
                                >
                                    <StyledCard>
                                        <h4>
                                            {t("page.customer_sign_up_method")}
                                            <ComponentInfoBox
                                                title={t("page.box_info.signup_method")}
                                                body={[t("page.box_info.signup_method_body")]}
                                                placement={enumPlacement.RIGHT}
                                            />
                                        </h4>
                                        <div className=" switch-field label">
                                            <Switch
                                                disabled={!plan?.multiSignUp}
                                                checked={signUpMethodItem.LINEOA}
                                                onChange={(e) =>
                                                    handleSignUPMethod(e, enumSignUpMethods.LINEOA)
                                                }
                                            />
                                            <span>{t("page.LINEOA_chat")}</span>
                                        </div>
                                        <div className=" switch-field label">
                                            <Switch
                                                disabled={!plan?.multiSignUp}
                                                checked={signUpMethodItem.FACEBOOK}
                                                onChange={(e) =>
                                                    handleSignUPMethod(
                                                        e,
                                                        enumSignUpMethods.FACEBOOK
                                                    )
                                                }
                                            />
                                            <span>{t("page.facebook")}</span>
                                        </div>
                                        <div className=" switch-field label">
                                            <Switch
                                                disabled={!plan?.multiSignUp}
                                                checked={signUpMethodItem.GOOGLE}
                                                onChange={(e) =>
                                                    handleSignUPMethod(e, enumSignUpMethods.GOOGLE)
                                                }
                                            />
                                            <span>{t("page.google")}</span>
                                        </div>
                                        <div className=" switch-field label flex-wrap">
                                            <Switch
                                                disabled={!plan?.multiSignUp}
                                                onChange={switchPhoneMail}
                                                checked={signUpMethodItem.TEL}
                                            />
                                            <span>{t("page.telephone")}</span>
                                            {/* {itemPhoneEmail} */}
                                        </div>
                                    </StyledCard>
                                </Skeleton>
                            </fieldset>
                        </div>
                        {plan?.welcomeScreen && (
                            <div className="card-wrap">
                                <fieldset disabled={!plan?.welcomeScreen}>
                                    <Skeleton
                                        active
                                        className="skeleton"
                                        loading={false}
                                        paragraph={{ rows: 4 }}
                                    >
                                        <StyledCard>
                                            <ModuleUploadImage
                                                images={values.welcomeScreenImages}
                                                handleGetImage={handleUpdateImg}
                                                title={
                                                    <span className="title-header">
                                                        {t("page.welcome_screen_images")}
                                                        <span className="sub-title">
                                                            {t("page.max_8_images")}
                                                        </span>
                                                        <ComponentInfoBox
                                                            title={t("page.box_info.welcome_image")}
                                                            body={[
                                                                t(
                                                                    "page.box_info.welcome_image_body"
                                                                ),
                                                            ]}
                                                            placement={enumPlacement.RIGHT}
                                                        />
                                                    </span>
                                                }
                                            />
                                            <div className="activate-field">
                                                <span>{t("page.activate")}</span>
                                                <Switch
                                                    checked={
                                                        values.welcomeScreenStatus ===
                                                        enumStatus.ACTIVE
                                                            ? true
                                                            : false
                                                    }
                                                    onChange={handleActivateImg}
                                                />
                                            </div>
                                        </StyledCard>
                                    </Skeleton>
                                </fieldset>
                            </div>
                        )}
                    </div>
                    <div className="button-field">
                        <StyledSubmitButton
                            onClick={handleSubmit}
                            text={t("page.save")}
                            type="default"
                        />
                        <StyledCancelButton
                            text={t("page.cancel")}
                            onClick={handleCancel}
                            type="sub"
                        />
                    </div>
                </div>
            </StyledContainer>
        </>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 84vh;
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
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
        background: #807c7c;
        cursor: grab !important;
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .main {
        display: flex;
        flex-direction: column;
        max-width: ${(p) => p.theme.maxWidths.cardWrap};
        width: 100%;
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
    }
    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 28px;
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
        padding: 16px;
    }
    .card-wrap {
        margin-bottom: 28px;
        .btn-add-field {
            color: gray !important;
            margin-top: 12px;
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
        .activate-field {
            display: flex;
            align-items: center;
            margin-top: 2.5rem;
            span {
                font-size: 14;
                font-weight: 500;
                color: black;
                margin-right: 12px;
            }
        }
    }
    .button-field {
        margin-top: 12px;
    }

    .switch-field {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        span {
            margin-left: 15px;
            font-size: 16px;
            color: ${(p) => p.theme.colors.fadedColor};
        }
        .turn-on {
            font-weight: 500;
            color: black;
        }
    }
    .phone-email-field {
        display: flex;
        margin-left: 12px;
        button {
            min-width: 80px;
        }
        span {
            margin-left: 0;
            color: gray !important;
        }
        .item-choose {
            background-color: gray;
            span {
                color: white !important;
            }
        }
    }
    .field-item {
        margin: 25px 0;
        .field-item-title {
            color: ${(p) => p.theme.colors.fadedText};
            margin-bottom: 12px;
        }
        .field-item-input {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            & > div {
                margin-right: 12px;
                max-width: 100%;
            }
            .icon {
                cursor: pointer;
            }

            .ant-select-selection {
                width: 360px;
                max-width: 100%;
                background-color: #ececec;
                height: ${(p) => p.theme.heights.input};
                font-size: 16px;
                .ant-select-selection__rendered {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }
    .flex-wrap {
        flex-wrap: wrap;
    }
    .skeleton {
        background-color: white;
        padding: 3.5rem;
        max-width: 707px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: calc(100vh - 64px);
        .page {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
        }
        .card-header {
            padding: 20px 16px;
            .title {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
        }
    }
`;
