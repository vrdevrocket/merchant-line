import { useFormik } from "formik";
import * as Yup from "yup";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";

import { ComponentDrawer, SharedInput } from "@components";
import { selectContact, useAppSelector, selectApp } from "@redux";
import {
    enumDisableInput,
    enumDrawerPlacement,
    enumTypeFetchList,
    enumTypePoints,
    enumValidation,
} from "@configs";
import { contactAPI } from "@api";
import { showErrorMessage, useNotify } from "@utils";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackGetList: (type: enumTypeFetchList) => void;
    initPoints?: number;
    userId?: string;
}
interface IData {
    pointsChange?: number;
    add?: {
        points?: number;
        sales?: number;
    };
    use?: {
        points?: number;
        sales?: number;
    };
}
export const ModuleEditPoint = (props: IProps) => {
    // page variable
    const { visible, handleClose, userId, callbackGetList } = props;
    // redux state
    const currentPoints = useSelector(selectContact).currentPoints;
    const id = useSelector(selectContact).currentUserId;
    //page state
    const [disableInput, setDisableInput] = useState(1);
    const app = useAppSelector(selectApp);
    //page hook
    const { t } = useTranslation();
    const { success, error } = useNotify();
    // variable
    const { TabPane } = Tabs;
    // formik
    const initFormikVal = {
        pointsChange: undefined,
        add: {
            points: undefined,
            sales: undefined,
        },
        use: {
            points: undefined,
            sales: undefined,
        },
    };
    const editPointSchema = Yup.object().shape({
        pointsChange: Yup.number()
            .typeError(
                t("validation.must_number", {
                    returnObjects: true,
                    name: t("object.points"),
                })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: t("object.points"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: t("object.points"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
        add: Yup.object().shape({
            points: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .max(
                    enumValidation.MAX_NUMBER,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MAX_NUMBER,
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
            sales: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.sales"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
        }),
        use: Yup.object().shape({
            points: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .max(
                    currentPoints,
                    t("validation.max_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: currentPoints,
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.points"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
            sales: Yup.number()
                .typeError(
                    t("validation.must_number", {
                        returnObjects: true,
                        name: t("object.points"),
                    })
                )
                .min(
                    enumValidation.MIN_NUMBER,
                    t("validation.min_number", {
                        returnObjects: true,
                        name: t("object.sales"),
                        number: enumValidation.MIN_NUMBER,
                    })
                ),
        }),
    });
    const sendSubmit = async (values: IData) => {
        if (
            !values.pointsChange &&
            !values.add?.points &&
            !values.add?.sales &&
            !values.use?.points &&
            !values.use?.sales
        ) {
            switch (disableInput) {
                case enumDisableInput.CHANGE_POINTS: {
                    setFieldError(
                        "pointsChange",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.points"),
                        })
                    );
                    break;
                }
                case enumDisableInput.ADD_POINTS: {
                    setFieldError(
                        "add.points",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.points"),
                        })
                    );
                    break;
                }
                case enumDisableInput.ADD_SALES: {
                    setFieldError(
                        "add.sales",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.sales"),
                        })
                    );
                    break;
                }
                case enumDisableInput.USE_POINTS: {
                    setFieldError(
                        "use.points",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.points"),
                        })
                    );
                    break;
                }
                case enumDisableInput.USE_SALES: {
                    setFieldError(
                        "use.sales",
                        t("validation.required", {
                            returnObjects: true,
                            name: t("object.sales"),
                        })
                    );
                    break;
                }
                default:
                    break;
            }
        } else {
            let params;
            switch (disableInput) {
                case enumDisableInput.CHANGE_POINTS: {
                    if (values.pointsChange) {
                        const amount = values.pointsChange - currentPoints;
                        params = {
                            userId: id || userId,
                            amount: Math.abs(amount),
                            isAdd: amount > 0,
                            type: enumTypePoints.POINT,
                        };
                    }
                    break;
                }
                case enumDisableInput.ADD_POINTS: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.POINT,
                        isAdd: true,
                        amount: values.add?.points,
                    };
                    break;
                }
                case enumDisableInput.ADD_SALES: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.SALES,
                        isAdd: true,
                        amount: values.add?.sales,
                    };
                    break;
                }
                case enumDisableInput.USE_POINTS: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.POINT,
                        isAdd: false,
                        amount: values.use?.points,
                    };
                    break;
                }
                case enumDisableInput.USE_SALES: {
                    params = {
                        userId: id || userId,
                        type: enumTypePoints.SALES,
                        isAdd: false,
                        amount: values.use?.sales,
                    };
                    break;
                }
                default:
                    break;
            }
            await updatePoints(
                params as { userId: string; amount: number; isAdd?: boolean; type: string }
            );
            callbackGetList(enumTypeFetchList.duplicate);
            resetForm();
        }
    };
    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldError,
        resetForm,
    } = useFormik({
        initialValues: initFormikVal,
        validationSchema: editPointSchema,
        onSubmit: sendSubmit,
    });

    const updatePoints = async (params: {
        userId: string;
        amount: number;
        isAdd?: boolean;
        type: string;
    }) => {
        try {
            await contactAPI.updatePoint(params);
            success(t("message.update.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        }
    };

    return (
        <ComponentDrawer
            title={t("page.points_edit")}
            visible={visible}
            placement={app.mobile ? enumDrawerPlacement.BOTTOM : enumDrawerPlacement.RIGHT}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            spinning={isSubmitting}
        >
            <StyledContainer>
                <div className="form-input current-point">
                    <p>{t("page.current_points")}</p>
                    <h4>{currentPoints}</h4>
                </div>
                <div className="form-input input-change-point">
                    <p>{t("page.change_points_to")}</p>
                    <div onClick={() => setDisableInput(enumDisableInput.CHANGE_POINTS)}>
                        <SharedInput
                            disable={!(disableInput === enumDisableInput.CHANGE_POINTS)}
                            className="input-add-contact eng"
                            name="pointsChange"
                            type="number"
                            value={values.pointsChange}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            touched={touched.pointsChange}
                            errors={errors.pointsChange}
                            onClick={resetForm}
                        />
                    </div>
                </div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={t("page.add")} key="1">
                            <div className="add-point-field">
                                <div onClick={() => setDisableInput(enumDisableInput.ADD_POINTS)}>
                                    <SharedInput
                                        disable={!(disableInput === enumDisableInput.ADD_POINTS)}
                                        value={values.add?.points}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        touched={touched.add?.points}
                                        errors={errors.add?.points}
                                        type="number"
                                        name="add.points"
                                        onClick={resetForm}
                                        placeholder={t("page.points")}
                                    />
                                </div>
                                <p>{t("page.or")}</p>
                                <div onClick={() => setDisableInput(enumDisableInput.ADD_SALES)}>
                                    <SharedInput
                                        disable={!(disableInput === enumDisableInput.ADD_SALES)}
                                        value={values.add.sales}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="number"
                                        placeholder={t("page.sales")}
                                        name="add.sales"
                                        onClick={resetForm}
                                        touched={touched.add?.sales}
                                        errors={errors.add?.sales}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab={t("page.use")} key="2">
                            <div className="add-point-field">
                                <div
                                    className="w-90"
                                    onClick={() => setDisableInput(enumDisableInput.USE_POINTS)}
                                >
                                    <SharedInput
                                        disable={!(disableInput === enumDisableInput.USE_POINTS)}
                                        value={values.use.points}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="number"
                                        placeholder={t("page.points")}
                                        name="use.points"
                                        onClick={resetForm}
                                        touched={touched.use?.points}
                                        errors={errors.use?.points}
                                    />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </StyledContainer>
        </ComponentDrawer>
    );
};

const StyledContainer = styled.div`
    .add-point-field {
        display: flex;
        align-items: center;
        input {
            height: 48px;
            font-size: 16px;
        }
        p {
            margin: 0 12px 10px 12px;
            color: ${(p) => p.theme.colors.fadedText};
            font-size: 16px;
        }
    }
    .ant-tabs-bar {
        border-bottom: none;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
        color: black;
        font-weight: 600;
        font-size: 14px;
    }
    .ant-tabs-tab:hover {
        color: black;
    }
    .ant-tabs-ink-bar {
        border-radius: 2px;
        width: 10px !important;
        background-color: black;
        margin-left: 6px;
    }
    .w-90 {
        width: 100%;
    }
    .current-point {
        margin-bottom: 36px !important;
    }
    .input-change-point {
        margin-bottom: 12px !important;
    }
    .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding: 12px 18px 12px 0;
    }
`;
