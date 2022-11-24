// import { ErrorMessage } from "formik";
import { Input, Select, DatePicker, TimePicker } from "antd";
import { CSSProperties } from "styled-components";
import { ReactElement, KeyboardEvent } from "react";
import styled from "styled-components";
import moment from "moment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { IHandleBlur, IHandleChange, ILimitDate, ISelect } from "@interfaces";
import { StyledError } from "@components";

const { Option } = Select;
interface IProps {
    name?: string;
    label?: string | JSX.Element;
    descLabel?: string;
    value?: string | number;
    className?: string;
    style?: CSSProperties | undefined;
    styleParent?: CSSProperties | undefined;
    onChange?: IHandleChange;
    onBlur?: IHandleBlur;
    onClick?: () => void;
    type?: string;
    prefixIcon?: ReactElement;
    suffixIcon?: ReactElement;
    notFormik?: boolean;
    placeholder?: string;
    notErr?: boolean;
    disable?: boolean;
    errors?: string | undefined;
    touched?: boolean | undefined;
    defaultValue?: string | number;
    parentClassName?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    ref?: any;
}

export const SharedInput = (props: IProps) => {
    //page props
    const {
        name,
        style,
        onChange,
        onBlur,
        onClick,
        value,
        type,
        prefixIcon,
        suffixIcon,
        // notFormik,
        placeholder,
        className,
        notErr,
        disable,
        errors,
        touched,
        label,
        descLabel,
        styleParent,
        defaultValue,
        parentClassName,
        onKeyDown,
        ref,
    } = props;

    return (
        <StyledContainer className={parentClassName} style={styleParent}>
            {label && (
                <label htmlFor={name} className="label">
                    <span className="label-name">{label}</span>
                    <span>{descLabel}</span>
                </label>
            )}
            <Input
                ref={ref}
                onKeyDown={onKeyDown}
                id={name}
                className={errors && touched ? `${className} input-invalid` : className}
                type={type}
                name={name}
                value={value}
                style={{ ...style }}
                onChange={onChange}
                onBlur={onBlur}
                onClick={onClick}
                prefix={prefixIcon}
                suffix={suffixIcon}
                placeholder={placeholder}
                disabled={disable}
                defaultValue={defaultValue}
            />
            {!notErr && (
                <StyledError visible={!!(errors && touched)}>{errors || "errors"}</StyledError>
            )}
            {/* <ErrorMessage name={name} component={StyledError} /> */}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    // input form add contact module
    /* margin-bottom: 22px; */
    .input-add-contact {
        height: 48px;
        input {
            font-size: 16px;
        }
    }
    input {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
        height: 48px;
    }
    /* .ant-input {
        height: ${(p) => p.theme.heights.input};
        line-height: 27px;
        color: #000;
        padding: 15px;
        font-size: 16px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            height: 52px;
        }
    } */
    input {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
        height: 48px;
        font-size: 16px;
        color: black;
    }
    // hide arrow type number
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
    .input-invalid {
        input {
            border-width: 1px;
            border-color: ${(p) => p.theme.colors.danger}!important;
            &:focus-within {
                border-color: ${(p) => p.theme.colors.danger}!important;
            }
        }
        .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled),
        .ant-input:focus,
        .ant-input:hover,
        .ant-select-selection:hover,
        .ant-select-selection:focus,
        .ant-select-selection:focus-within {
            border-width: 1px;
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
    .height_48 {
        .ant-input {
            height: 48px;
        }
    }
    .label {
        font-style: normal;
        font-weight: 600;
        font-size: 15px;
        line-height: 21px;
        color: #000000;
        margin-bottom: 8px;
        display: inline-block;
        .label-name {
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 21px;
            color: #000000;
            display: inline-block;
            margin: 0;
            span {
                margin: 0;
                font-style: normal;
                font-weight: 600;
                font-size: 15px;
                line-height: 21px;
                color: #000000;
                display: inline-block;
                max-width: 80px;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            .label {
                font-size: 14px;
                margin-bottom: 6px;
            }
        }
        span {
            font-weight: normal;
            font-size: 12px;
            line-height: 16px;
            color: #6c7084;
            display: inline-block;
            margin-left: 12px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .label {
            display: flex;
            align-items: center;
            .label-name {
                span {
                    margin: 0;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 21px;
                    color: #000000;
                    display: inline-block;
                    max-width: initial;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
`;

interface IPropsDefault {
    name?: string;
    className?: string;
    style?: CSSProperties;
    onChange?: IHandleChange;
    value?: string | number;
    onBlur?: IHandleBlur;
    onClick?: () => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    type?: string;
    prefixIcon?: ReactElement;
    suffixIcon?: ReactElement;
    placeholder?: string;
    err?: string;
    notErr?: boolean;
    disable?: boolean;
    defaultValue?: string | number;
}

export const SharedInputDefault = (props: IPropsDefault) => {
    const {
        name,
        style,
        onChange,
        onBlur,
        value,
        type,
        prefixIcon,
        suffixIcon,
        placeholder,
        err,
        className,
        notErr,
        disable,
        defaultValue,
        onClick,
        onKeyDown,
    } = props;
    return (
        <StyledInputContainer>
            <Input
                className={err ? `${className} input-invalid` : className}
                type={type}
                name={name}
                style={{ height: 48, ...style }}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                prefix={prefixIcon}
                suffix={suffixIcon}
                placeholder={placeholder}
                disabled={disable}
                defaultValue={defaultValue}
                onClick={onClick}
                onKeyDown={onKeyDown}
            />
            {!notErr && (
                <StyledError style={err ? { visibility: "visible" } : { visibility: "hidden" }}>
                    {err || "err"}
                </StyledError>
            )}
        </StyledInputContainer>
    );
};
const StyledInputContainer = styled.div`
    // input form add contact module
    .ant-input-affix-wrapper {
        height: unset !important;
    }
    .input-add-contact {
        height: 48px;
        input {
            font-size: 16px;
        }
    }
    input {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
        height: 48px;
        font-size: 16px;
        color: black;
    }
    // hide arrow type number
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type="number"] {
        -moz-appearance: textfield;
    }
    .input-invalid {
        input {
            border-width: 1px;
            border-color: ${(p) => p.theme.colors.danger}!important;
            &:focus-within {
                border-color: ${(p) => p.theme.colors.danger}!important;
            }
        }
        .ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled),
        .ant-input:focus,
        .ant-input:hover,
        .ant-select-selection:hover,
        .ant-select-selection:focus,
        .ant-select-selection:focus-within {
            border-width: 1px;
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
`;
interface IPropsSelectUnit {
    name?: string;
    className?: string;
    label?: string;
    style?: CSSProperties;
    styleParent?: CSSProperties;
    data: Array<ISelect | string | undefined> | Array<{ name: string; value: string }>;
    onChange: (
        value: string,
        option?:
            | ReactElement<any, string | React.JSXElementConstructor<any>>
            | ReactElement<any, string | React.JSXElementConstructor<any>>[]
    ) => void;
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    type?: "multiple" | "tags" | undefined;
    errors?: string | undefined;
    touched?: boolean | undefined;
    maxTagTexLength?: number;
}
interface IPropsSelect {
    name?: string;
    className?: string;
    label?: string | JSX.Element;
    style?: CSSProperties;
    styleParent?: CSSProperties;
    data: Array<ISelect | string | undefined> | Array<{ name: string; value: string }>;
    onChange: (
        value: Array<string>,
        option?:
            | ReactElement<any, string | React.JSXElementConstructor<any>>
            | ReactElement<any, string | React.JSXElementConstructor<any>>[]
    ) => void;
    defaultValue?: Array<string>;
    value?: Array<string>;
    placeholder?: string;
    type?: "multiple" | "tags" | undefined;
    errors?: string | undefined;
    touched?: boolean | undefined;
    maxTagTexLength?: number;
}

export const SharedSelect = (props: IPropsSelect) => {
    const {
        label,
        className,
        style,
        name,
        styleParent,
        data,
        onChange,
        value,
        placeholder,
        type = "multiple",
        errors,
        touched,
        maxTagTexLength,
    } = props;

    return (
        <StyledSelect style={styleParent} isError={!!(errors && touched)}>
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <fieldset name={name} key={name}>
                <Select
                    //@ts-ignore
                    getPopupContainer={(trigger) => trigger.parentNode}
                    showSearch
                    mode={type}
                    placeholder={placeholder || label}
                    onChange={onChange}
                    className={className}
                    value={value}
                    style={{ ...style }}
                    maxTagCount={3}
                    maxTagTextLength={maxTagTexLength || 10}
                >
                    {data?.map((item, index) => {
                        if (typeof item !== "string") {
                            return (
                                <Option key={item.id} value={item.id}>
                                    {item.label}
                                </Option>
                            );
                        } else {
                            return (
                                <Option key={index.toString()} value={item}>
                                    {item}
                                </Option>
                            );
                        }
                    })}
                </Select>
                {errors && touched && (
                    <StyledError visible={true}>{errors || "errors"}</StyledError>
                )}
            </fieldset>
        </StyledSelect>
    );
};

export const SharedSelectBirthMonth = (props: IPropsSelect) => {
    const { label, className, style, name, styleParent, data, onChange, value } = props;

    return (
        <StyledSelect style={styleParent}>
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <Select
                //@ts-ignore
                getPopupContainer={(trigger) => trigger.parentNode}
                mode="multiple"
                placeholder={label}
                onChange={onChange}
                className={className}
                value={value}
                style={{ ...style }}
                maxTagCount={3}
            >
                {data?.map((item, index) => {
                    return (
                        <Option key={index} value={item.value}>
                            {item.name}
                        </Option>
                    );
                })}
            </Select>
        </StyledSelect>
    );
};
export const SharedSelectTimeUnit = (props: IPropsSelectUnit) => {
    const { label, className, style, styleParent, name, data, onChange, value } = props;
    return (
        <StyledSelect style={styleParent}>
            {label && (
                <label htmlFor={name} className="hidden-label label">
                    {label}
                </label>
            )}
            <Select
                //@ts-ignore
                getPopupContainer={(trigger) => trigger.parentNode}
                placeholder={label}
                onChange={onChange}
                className={className}
                value={value}
                style={{ ...style }}
            >
                {data?.map((item, index) => {
                    return (
                        <Option key={index} value={item.value}>
                            {item.name}
                        </Option>
                    );
                })}
            </Select>
        </StyledSelect>
    );
};
const StyledSelect = styled.div<{ isError?: boolean }>`
    .label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #000000;
        margin-bottom: 8px;
        display: block;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            font-size: 14px;
            margin-bottom: 6px;
        }
    }
    .hidden-label {
        visibility: hidden;
    }
    .ant-select-selection {
        border-color: #d9d9d9 !important;
        box-shadow: none !important;
        height: 48px;
        font-size: 16px;
        color: black;
        display: flex;
        align-items: center;
    }
    .ant-select {
        width: 100%;
    }
    .ant-select-selection__rendered {
        max-width: 100%;
    }
    ${(p) => {
        if (p.isError)
            return `
        .ant-select-selection {
                border-width: 1px;
                border-color: ${p.theme.colors.danger}!important;
                &:focus-within {
                    border-color: ${p.theme.colors.danger}!important;
                }
            }
        `;
    }}
`;

interface IPropDate {
    onChange?: (date: moment.Moment, dateString?: string) => void;
    error?: string;
    value?: string | Date;
    limitDate?: ILimitDate;
    disableDateAfter?: Date;
    disableDateBefore?: Date;
}

export const SharedDate = (props: IPropDate) => {
    const { onChange, value, disableDateAfter, disableDateBefore, error } = props;

    // const disableDate = (date: moment.Moment | undefined) => {
    //     if (!date) return true;
    //     const minDate = moment(limitDate?.minDate);
    //     if (minDate.isValid() && limitDate?.minDate) {
    //         return date.isBefore(minDate);
    //     }
    //     const maxDate = moment(limitDate?.maxDate);
    //     if (maxDate.isValid() && limitDate?.maxDate) {
    //         return date.isAfter(maxDate);
    //     }
    //     return false;
    // };
    const disableDate = (current: moment.Moment | undefined) => {
        if (!current) return true;
        if (disableDateAfter) {
            const limit = moment(disableDateAfter);
            if (limit.isValid()) {
                return current && current > limit;
            }
        }
        if (disableDateBefore) {
            const limit = moment(disableDateBefore).add(-1, "days");
            if (limit.isValid()) {
                return current && current <= limit;
            }
        }

        return false;
    };

    return (
        <StyledDate>
            <DatePicker
                className={error ? "input-invalid eng" : "eng"}
                value={value ? moment(value) : undefined}
                onChange={onChange}
                disabledDate={disableDate}
            />
            <StyledError visible={!!error}>{error || "errors"}</StyledError>
        </StyledDate>
    );
};

const StyledDate = styled.div`
    display: inline-block;
    margin-right: 24px;
    width: 100%;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        /* margin-bottom: 12px; */
        margin-right: 0px;
    }
    .ant-calendar-picker-input {
        height: ${(p) => p.theme.heights.input};
        font-size: 16px;
    }
    .input-invalid {
        input {
            border-color: ${(p) => p.theme.colors.danger}!important;
        }
    }
`;
interface IPropTime {
    onChange?: (time: moment.Moment, timeString?: string) => void;
    time: string;
    className?: string;
}
const format = "HH:mm";
export const SharedTime = (props: IPropTime) => {
    const { onChange, time, className } = props;
    return (
        <StyledTimeContainer>
            <TimePicker
                className={className}
                value={time ? moment(time, format) : undefined}
                format={format}
                onChange={onChange}
            />
            <StyledError visible={false}>{"errors"}</StyledError>
        </StyledTimeContainer>
    );
};

const StyledTimeContainer = styled.div`
    display: inline-block;
    width: 100%;
    .ant-time-picker-icon,
    .ant-time-picker-clear {
        right: 12px !important;
    }
    .ant-time-picker-input {
        height: ${(p) => p.theme.heights.input};
        font-size: 16px;
    }
    .ant-time-picker-input:hover {
        border-color: #d9d9d9 !important;
    }
    .anticon.anticon-close-circle.ant-time-picker-clear {
        display: none !important;
    }
`;

interface IPropsCKEditor {
    editor: string;
    handleChangeEditor: (event: string, editor: string) => void;
    name: string;
    errors?: string | undefined;
    touched?: boolean | undefined;
}

export const SharedCKEditor = (props: IPropsCKEditor) => {
    const { editor, handleChangeEditor, name, errors, touched } = props;

    return (
        <StyledCKEditor isError={!!(errors && touched)}>
            <CKEditor
                name={name}
                editor={ClassicEditor}
                data={editor}
                onChange={handleChangeEditor}
            />
            {errors && touched && <StyledError visible={true}>{errors || "errors"}</StyledError>}
        </StyledCKEditor>
    );
};

const StyledCKEditor = styled.div<{ isError?: boolean }>`
    ${(p) => {
        if (p.isError)
            return `
            .ck.ck-editor__main > .ck-editor__editable {
                border-width: 1px;
                border-color: ${p.theme.colors.danger}!important;
                &:focus-within {
                    border-color: ${p.theme.colors.danger}!important;
        }
    }
        `;
    }}
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .ck-editor__editable_inline {
            min-height: 164px;
        }
    }
`;
