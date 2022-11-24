import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { PlusCircle } from "react-feather";
import { useRef, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";

import { ComponentDrawer, IconTrash, IconPen, SharedInput, SharedButtonDefault } from "@components";
import { IFieldSignUp } from "@interfaces";
import { Input } from "antd";
import { enumValidation } from "@configs";
import { useYup } from "@validations";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackData: (value: IFieldSignUp, index: number) => void;
    initData: IFieldSignUp;
    index: number;
}

interface IErr {
    error?: string;
    touched: boolean;
}

const initFormikVal: IFieldSignUp = {
    fieldName: "",
    propertyName: "",
    options: [],
    multiple: false,
};
export const ModuleCreateFields = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const tagInputRef = useRef<any | null>();
    const { YupSignUpMethodField } = useYup();
    //page state
    const [showInput, setShowInput] = useState<boolean>(true);
    const [optionErr, setOptionErr] = useState<IErr>({
        touched: false,
    });
    const [tagErr, setTagErr] = useState<IErr>({
        touched: false,
    });
    const [optionName, setOptionName] = useState<string>("");
    const [tag, setTag] = useState("");
    const [validateOpt, setValidateOpt] = useState<boolean>(false);
    const [editableInput, setEditableInput] = useState<{ index?: number; status: boolean }>({
        status: false,
    });
    // page props
    const { visible, handleClose, initData, callbackData, index } = props;
    // formik
    const createFieldSchema = Yup.object().shape(YupSignUpMethodField);
    const sendSubmit = () => {
        if (!values.options.length) {
            return setValidateOpt(true);
        }
        if (!optionErr.error && !tagErr.error) {
            callbackData(values, index);
            setOptionErr({ error: undefined, touched: false });
            setTagErr({ error: undefined, touched: false });
            setShowInput(true);
            setTag("");
            setOptionName("");
            handleClose();
            setValidateOpt(false);
            resetForm();
        }
    };

    // handle input option and tags
    const handleShowInput = () => {
        setShowInput(true);
    };

    // enter event
    const handleEnterOption = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!optionErr.error) {
                tagInputRef.current.focus();
            }
        }
    };

    const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!tagErr.error && !optionErr.error && tagInputRef.current?.state.value) {
                if (editableInput.status) {
                    const arr = values.options.map((item, index) => {
                        if (index === editableInput.index)
                            return { optionName: optionName, tag: tag };
                        else return item;
                    });
                    setFieldValue("options", arr);
                } else
                    setFieldValue("options", [
                        ...values.options,
                        { optionName: optionName, tag: tag },
                    ]);
                setTag("");
                setOptionName("");
                setShowInput(false);
                setEditableInput({ index: undefined, status: false });
            }
        } else {
            setTagErr({
                error: t("validation.required", { name: t("object.tag") }),
                touched: true,
            });
        }
    };

    // onchange
    const handleChangeOptionName = (e: React.FormEvent<HTMLInputElement>) => {
        if (validateOpt) setValidateOpt(false);
        handleBlurOptionName(e);
        const value = e.currentTarget.value;
        setOptionName(value);
    };

    const handleBlurOptionName = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (!value.replace(/\s/g, "").length) {
            setOptionErr((prev) => ({
                ...prev,
                touched: true,
                error: t("validation.required", { name: t("object.option_name") }),
            }));
        } else if (value.length > enumValidation.MAX_LENGTH_INPUT) {
            setOptionErr((prev) => ({
                ...prev,
                touched: true,
                error: t("validation.max", {
                    name: t("object.option_name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                }),
            }));
        } else {
            setOptionErr({ touched: false, error: undefined });
        }
    };

    const handleBlurTag = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if (!value.replace(/\s/g, "").length) {
            setTagErr((prev) => ({
                ...prev,
                touched: true,
                error: t("validation.required", { name: t("object.tag") }),
            }));
        } else if (value.length > enumValidation.MAX_LENGTH_INPUT) {
            setTagErr((prev) => ({
                ...prev,
                touched: true,
                error: t("validation.max", {
                    name: t("object.tag"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                }),
            }));
        } else {
            setTagErr({ touched: false, error: undefined });
        }
    };

    const handleChangeTag = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        handleBlurTag(e);
        setTag(value);
    };

    const editOption = (index: number) => {
        setEditableInput({ status: true, index: index });
        setOptionName(values.options[index].optionName);
        setTag(values.options[index].tag);
    };
    const deleteOption = (index: number) => {
        setFieldValue("options", [
            ...values.options.filter((item, i) => {
                if (i !== index) return item;
            }),
        ]);
        setEditableInput((prev) => ({ ...prev, status: false }));
    };

    const {
        values,
        errors,
        touched,
        handleSubmit,
        resetForm,
        setFieldValue,
        handleBlur,
        handleChange,
    } = useFormik({
        initialValues: initData || initFormikVal,
        enableReinitialize: true,
        validationSchema: createFieldSchema,
        onSubmit: sendSubmit,
    });

    const inputOption = (
        <>
            <div className="option-show-item">
                <div className="input-item" style={{ flex: 1 }}>
                    <Input
                        placeholder={t("page.option_name")}
                        className={
                            optionErr.touched && optionErr.error
                                ? "input-option input-invalid"
                                : "input-option"
                        }
                        onKeyDown={handleEnterOption}
                        value={optionName}
                        onChange={handleChangeOptionName}
                        // onBlur={() => setOptionErr((prev) => ({ ...prev, touched: true }))}
                        onBlur={handleBlurOptionName}
                    />
                    <div
                        className={
                            optionErr.touched && optionErr.error
                                ? "text-err"
                                : "text-err text-hidden"
                        }
                    >
                        {optionErr.error || t("page.empty_text")}
                    </div>
                </div>
                <div className="input-item" style={{ flex: 1 }}>
                    <Input
                        // @ts-ignore
                        ref={tagInputRef}
                        className={
                            tagErr.touched && tagErr.error
                                ? "input-option input-invalid"
                                : "input-option"
                        }
                        placeholder={t("page.tag")}
                        value={tag}
                        onChange={handleChangeTag}
                        onKeyDown={handleEnterTag}
                        onBlur={handleBlurTag}
                    />
                    <div
                        className={
                            tagErr.touched && tagErr.error ? "text-err" : "text-err text-hidden"
                        }
                    >
                        {tagErr.error || t("page.empty_text")}
                    </div>
                </div>
                {/* <div className="icon text-hidden">
                    <IconPen size={21} />
                </div>
                <div className="icon text-hidden">
                    <IconTrash size={21} />
                </div> */}
            </div>
        </>
    );

    const closeModule = () => {
        resetForm();
        handleClose();
    };

    return (
        <ComponentDrawer
            title={t("page.create_form_field")}
            visible={visible}
            handleClose={closeModule}
            handleSubmit={handleSubmit}
        >
            <StyledContainer>
                <div className="form-input" style={{ marginBottom: 0 }}>
                    <p>{t("page.field_name_question")}</p>
                    <SharedInput
                        className="input-add-contact"
                        name="fieldName"
                        type="text"
                        value={values.fieldName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.fieldName}
                        touched={touched.fieldName}
                    />
                </div>
                <div className="form-input" style={{ marginBottom: 0 }}>
                    <p>{t("page.property_name")}</p>
                    <SharedInput
                        className="input-add-contact"
                        name="propertyName"
                        type="text"
                        value={values.propertyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={errors.propertyName}
                        touched={touched.propertyName}
                    />
                </div>
                <div className="add-option-item">
                    {values.options?.map((item, index) => {
                        if (index === editableInput.index) {
                            return inputOption;
                            // <div className="option-show-item" key={index}>
                            //     <div className="input-item">
                            //         <SharedInput
                            //             placeholder={t("page.option_name")}
                            //             className="input-add-contact"
                            //             value={item.optionName}
                            //         />
                            //     </div>
                            //     <div className="input-item">
                            //         <SharedInput
                            //             placeholder={t("page.tag")}
                            //             className="input-add-contact"
                            //             value={item.tag}
                            //         />
                            //     </div>
                            //     <div className="icon" onClick={() => editOption(index)}>
                            //         <IconPen size={21} />
                            //     </div>
                            //     <div className="icon" onClick={() => deleteOption(index)}>
                            //         <IconTrash size={21} />
                            //     </div>
                            // </div>
                        } else
                            return (
                                <div className="option-show-item" key={index}>
                                    <div className="input-item">
                                        <SharedInput
                                            placeholder={t("page.option_name")}
                                            className="input-add-contact"
                                            disable={true}
                                            value={item.optionName}
                                        />
                                    </div>
                                    <div className="input-item">
                                        <SharedInput
                                            placeholder={t("page.tag")}
                                            className="input-add-contact"
                                            disable={true}
                                            value={item.tag}
                                        />
                                    </div>
                                    <div className="icon" onClick={() => editOption(index)}>
                                        <IconPen size={21} />
                                    </div>
                                    <div className="icon" onClick={() => deleteOption(index)}>
                                        <IconTrash size={21} />
                                    </div>
                                </div>
                            );
                    })}
                    <div
                        className={validateOpt ? "validate-option" : "validate-option text-hidden"}
                    >
                        {t("page.at_least_one_select_option")}
                    </div>
                    {showInput && !editableInput.status && inputOption}
                </div>
                <div
                    className="center-icon"
                    style={{ cursor: "pointer" }}
                    onClick={handleShowInput}
                >
                    {!showInput && <PlusCircle size={23} color="#6C7084" strokeWidth={1} />}
                </div>

                <div className="select-type-field form-input">
                    <p>{t("page.choose_selection_type")}</p>
                    <div className="button-field">
                        <SharedButtonDefault
                            className={!values.multiple ? "selected" : ""}
                            text={t("page.single")}
                            type="default"
                            onClick={() => setFieldValue("multiple", false)}
                        />
                        <SharedButtonDefault
                            className={values.multiple ? "selected" : ""}
                            text={t("page.multiple")}
                            type="default"
                            onClick={() => setFieldValue("multiple", true)}
                        />
                    </div>
                </div>
            </StyledContainer>
        </ComponentDrawer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: calc(100% - 10px);
    .add-option-item {
        margin-top: 12px;
    }
    .select-type-field {
        margin-top: 40px;

        button {
            margin-right: 6px;
            min-width: 80px;
            color: ${(p) => p.theme.colors.fadedText} !important;
        }
        .selected {
            background-color: ${(p) => p.theme.colors.fadedText};
            color: white !important;
        }
    }
    .center-icon {
        margin: 0 auto 16px auto;
        width: fit-content;
    }
    .input-option {
        height: ${(p) => p.theme.heights.input};
        font-size: 16px;
    }
    .form-input {
        margin-bottom: 0;
    }
    .input-invalid {
        border-color: ${(p) => p.theme.colors.danger}!important;
    }
    .text-err {
        text-align: left;
        color: #f43f3f;
        visibility: visible;
        font-size: 11px;
        font-weight: 700;
    }

    .option-show-item {
        display: flex;
        align-items: center;
        .icon {
            margin-bottom: 16px;
        }
        .input-item {
            margin-right: 8px;
            input {
                cursor: inherit;
            }
        }
        .icon {
            margin-left: 8px;
            cursor: pointer;
        }
    }
    .validate-option {
        text-align: left;
        color: #f43f3f;
        visibility: visible;
        font-size: 11px;
        font-weight: 700;
        margin-bottom: 4px;
    }
    .text-hidden {
        visibility: hidden;
    }
`;
