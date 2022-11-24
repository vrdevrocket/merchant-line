import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Icon } from "antd";

import { SharedButtonDefault, SharedInput, IconTrash } from "@components";
import { AddSegmentItem } from "@modules";
import { enumSegmentOpts, enumValidation } from "@configs";
import { useEffect } from "react";
import { ISegmentConditionItem } from "@interfaces";

interface IProps {
    gotoStep: (
        index: number,
        isInclude: enumSegmentOpts,
        subIndex: number,
        conditionItem?: ISegmentConditionItem
    ) => void;
    includeOpts: never[][];
    excludeOpts: never[][];
    handleNewItemOpts: (isInclude: enumSegmentOpts) => void;
    handleSendSubmit: (name: string) => void;
    nameInit?: string;
    setName: (name: string) => void;
    handleCancel: () => void;
    handleDelete: (indexOpts: number, indexItem: number, isInclude: number) => void;
    isSubmitting: boolean;
}
// formik

export const AddSegmentStepOne = (props: IProps) => {
    // hook
    const { t } = useTranslation();
    // props
    const {
        gotoStep,
        includeOpts,
        handleNewItemOpts,
        excludeOpts,
        handleSendSubmit,
        setName,
        handleCancel,
        nameInit,
        handleDelete,
        isSubmitting,
    } = props;
    // console.log(includeOpts);
    const initFormikVal = () => {
        if (nameInit === undefined) return { name: t("page.empty_text") };
        else return { name: nameInit };
    };
    //formik
    const segmentSchema = Yup.object().shape({
        name: Yup.string()
            .required(t("validation.required", { returnObjects: true, name: t("object.name") }))
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validate.max", {
                    returnObjects: true,
                    name: t("object.name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),
    });

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initFormikVal(),
        validationSchema: segmentSchema,
        enableReinitialize: true,
        onSubmit: (values) => handleSendSubmit(values.name),
    });

    useEffect(() => setName(values.name), [values.name]);

    return (
        <>
            <div className="form-field">
                <div className="step-1">
                    <div className="form-input">
                        {nameInit !== undefined && (
                            <>
                                <p>{t("page.segment_name")}</p>
                                <SharedInput
                                    name="name"
                                    placeholder={t("page.segment_name")}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    errors={errors.name}
                                    touched={touched.name}
                                />
                            </>
                        )}
                    </div>

                    <div className="form-input">
                        <p>{t("page.include")}</p>
                        <div>
                            {includeOpts.map((item, index) => {
                                if (index === includeOpts.length - 1) {
                                    return (
                                        <div key={index}>
                                            <div className="data-field">
                                                {item.map((item2, index2) => {
                                                    if (item2 !== undefined)
                                                        return (
                                                            <div key={index2} className="item-show">
                                                                <AddSegmentItem
                                                                    handleClick={(conditionItem) =>
                                                                        gotoStep(
                                                                            index,
                                                                            enumSegmentOpts.includeOpts,
                                                                            index2,
                                                                            conditionItem
                                                                        )
                                                                    }
                                                                    data={item2}
                                                                />
                                                                <div
                                                                    className="btn-delete"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index,
                                                                            index2,
                                                                            enumSegmentOpts.includeOpts
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={18}
                                                                        color="#646464"
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                })}

                                                <div
                                                    className="icon-add"
                                                    onClick={() =>
                                                        gotoStep(
                                                            index,
                                                            enumSegmentOpts.includeOpts,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Icon type="plus-circle" />
                                                </div>
                                            </div>
                                            <SharedButtonDefault
                                                className="or-btn"
                                                text={t("page.or")}
                                                type="primary"
                                                onClick={() =>
                                                    handleNewItemOpts(enumSegmentOpts.includeOpts)
                                                }
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index}>
                                            <div className="data-field">
                                                {item.map((item2, index2) => {
                                                    if (item2 !== undefined)
                                                        return (
                                                            <div key={index2} className="item-show">
                                                                <AddSegmentItem
                                                                    handleClick={(conditionItem) =>
                                                                        gotoStep(
                                                                            index,
                                                                            enumSegmentOpts.includeOpts,
                                                                            index2,
                                                                            conditionItem
                                                                        )
                                                                    }
                                                                    data={item2}
                                                                />
                                                                <div
                                                                    className="btn-delete"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index,
                                                                            index2,
                                                                            enumSegmentOpts.includeOpts
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={18}
                                                                        color="#646464"
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                })}
                                                <div
                                                    className="icon-add"
                                                    onClick={() =>
                                                        gotoStep(
                                                            index,
                                                            enumSegmentOpts.includeOpts,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Icon type="plus-circle" />
                                                </div>
                                            </div>
                                            <div className="or-label">{t("page.or")}</div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="space"></div>
                    <div className="form-input">
                        <p>{t("page.exclude")}</p>
                        <div>
                            {excludeOpts.map((item, index) => {
                                if (index === excludeOpts.length - 1) {
                                    return (
                                        <div key={index}>
                                            <div className="data-field">
                                                {item.map((item2, index2) => {
                                                    if (item2 !== undefined)
                                                        return (
                                                            <div key={index2} className="item-show">
                                                                <AddSegmentItem
                                                                    handleClick={(conditionItem) =>
                                                                        gotoStep(
                                                                            index,
                                                                            enumSegmentOpts.includeOpts,
                                                                            index2,
                                                                            conditionItem
                                                                        )
                                                                    }
                                                                    data={item2}
                                                                />
                                                                <div
                                                                    className="btn-delete"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index,
                                                                            index2,
                                                                            enumSegmentOpts.excludeOpts
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={18}
                                                                        color="#646464"
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                })}

                                                <div
                                                    className="icon-add"
                                                    onClick={() =>
                                                        gotoStep(
                                                            index,
                                                            enumSegmentOpts.excludeOpts,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Icon type="plus-circle" />
                                                </div>
                                            </div>
                                            <SharedButtonDefault
                                                className="or-btn"
                                                text={t("page.or")}
                                                type="primary"
                                                onClick={() =>
                                                    handleNewItemOpts(enumSegmentOpts.excludeOpts)
                                                }
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index}>
                                            <div className="data-field">
                                                {item.map((item2, index2) => {
                                                    if (item2 !== undefined)
                                                        return (
                                                            <div key={index2} className="item-show">
                                                                <AddSegmentItem
                                                                    handleClick={(conditionItem) =>
                                                                        gotoStep(
                                                                            index,
                                                                            enumSegmentOpts.includeOpts,
                                                                            index2,
                                                                            conditionItem
                                                                        )
                                                                    }
                                                                    data={item2}
                                                                />
                                                                <div
                                                                    className="btn-delete"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            index,
                                                                            index2,
                                                                            enumSegmentOpts.excludeOpts
                                                                        )
                                                                    }
                                                                >
                                                                    <IconTrash
                                                                        size={18}
                                                                        color="#646464"
                                                                    />
                                                                </div>
                                                            </div>
                                                        );
                                                })}
                                                <div
                                                    className="icon-add"
                                                    onClick={() =>
                                                        gotoStep(
                                                            index,
                                                            enumSegmentOpts.excludeOpts,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    <Icon type="plus-circle" />
                                                </div>
                                            </div>
                                            <div className="or-label">{t("page.or")}</div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-field">
                <SharedButtonDefault
                    text={t("page.create")}
                    type="default"
                    size="default"
                    className="btn-save btn-action"
                    onClick={handleSubmit}
                    disable={isSubmitting}
                />
                <SharedButtonDefault
                    text={t("page.cancel")}
                    type="default"
                    size="default"
                    className="btn-back btn-action"
                    onClick={handleCancel}
                />
            </div>
        </>
    );
};
