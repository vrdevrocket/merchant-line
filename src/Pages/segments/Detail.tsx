import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useFormik } from "formik";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Skeleton, Switch } from "antd";
import * as Yup from "yup";

import { segmentAPI } from "@api";
import { enumStatus, enumValidation, PATH_SEGMENTS } from "@configs";
import { ISegmentData } from "@interfaces";
import {
    SharedButtonDefault,
    SharedInput,
    StyledCard,
    StyledCancelButton,
    StyledSubmitButton,
} from "@components";
import { checkValidURL, numberFormatter, saveFile, showErrorMessage, useNotify } from "@utils";
import { ModuleSegmentUpdate } from "@modules";

const initFormikVal: ISegmentData = {
    _id: undefined,
    name: "",
    hooks: [],
    includeOpts: [[]],
    excludeOpts: [[]],
    status: enumStatus.INACTIVE,
    createdAt: undefined,
    updatedAt: undefined,
    hook: undefined,
};

export const PageSegmentDetail = () => {
    // page hook
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { warning, error, success } = useNotify();
    // page state
    const [data, setData] = useState<ISegmentData>();
    const [showInput, setShowInput] = useState<boolean>(false);
    const [showSegmentConditions, setShowSegmentConditions] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDisable, setIsDisable] = useState<boolean>(false);
    const [indexHook, setIndexHook] = useState<number>();

    useEffect(() => {
        getInitDetail();
    }, []);

    const getInitDetail = async () => {
        setIsLoading(true);
        await getDetail();
        setIsLoading(false);
    };

    const getDetail = async () => {
        try {
            const response = await segmentAPI.detail(id);
            setData(response.data);
            if (!response.data.hooks) setShowInput(true);
        } catch (err: any) {
            if (err.response) {
                warning(showErrorMessage(err.response));
            } else warning(t("message.not_found", { name: t("object._segment") }));
            history.push(PATH_SEGMENTS);
        }
    };

    const updateContact = async () => {
        setIsDisable(true);
        try {
            const response = await segmentAPI.updateContact(id);
            setFieldValue("contacts", response.data);
            success(t("message.update.success"));
            getDetail();
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        }
        setIsDisable(false);
    };

    const sendSubmit = async () => {
        setIsLoading(true);
        try {
            if (!values.hooks?.length) values.hooks = undefined;
            await segmentAPI.edit(id, values);
            success(t("message.update.success"));
            // history.push(PATH_SEGMENTS);
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.update.fail"));
        }
        if (!values.hooks) setShowInput(true);
        setIsLoading(false);
        setIndexHook(undefined);
    };

    // action web hook
    const addInputHook = () => {
        if (indexHook === undefined) {
            setShowInput(true);
        }
    };

    const deleteHook = (index: number) => {
        setFieldValue(
            "hooks",
            values.hooks?.filter((item, i) => {
                if (i !== index) return item;
            })
        );
    };

    const editHook = (value: string, index: number) => {
        if (value) {
            if (!checkValidURL(value)) {
                setFieldError("hook", t("validation.correct_url"));
                return;
            }
            setFieldValue(
                "hooks",
                values.hooks?.map((item, i) => {
                    if (index === i) return value;
                    else return item;
                })
            );
            setIndexHook(undefined);
            setFieldValue("hook", "");
        } else {
            setFieldError(
                "hook",
                t("validation.required", {
                    returnObjects: true,
                    name: t("object.webhook"),
                })
            );
        }
    };

    const addHook = () => {
        if (!errors.hook) {
            if (values.hook) {
                if (values.hooks) setFieldValue("hooks", [...values.hooks, values.hook]);
                else setFieldValue("hooks", [values.hook]);
                setFieldValue("hook", "");
                setShowInput(false);
            } else {
                touched.hook = true;
                setFieldError(
                    "hook",
                    t("validation.required", {
                        returnObjects: true,
                        name: t("object.webhook"),
                    })
                );
            }
        }
    };

    const handleShowSegmentConditions = () => {
        setShowSegmentConditions(true);
    };

    const handleUpdateOpts = (includeOpts: [][], excludeOpts: [][]) => {
        //@ts-ignore //WHY: vague data
        setData((prev) => ({
            ...prev,
            includeOpts: includeOpts || prev?.includeOpts,
            excludeOpts: excludeOpts || prev?.excludeOpts,
        }));
        setShowSegmentConditions(false);
    };

    const handleExport = async () => {
        setIsDisable(true);
        try {
            // page variable
            const fileName = data?.name || t("page.file_segment_export") + ".xlsx";
            const res = await segmentAPI.export(id);
            saveFile({ data: res.data, fileName: fileName }, () =>
                success(t("message.export_segment_success"))
            );
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        }
        setIsDisable(false);
    };

    const handleCancel = () => {
        history.push(PATH_SEGMENTS);
    };

    const handleEdit = (item: string, index: number) => {
        setIndexHook(index);
        setFieldValue("hook", item);
        setShowInput(false);
    };

    const SegmentSchema = Yup.object().shape({
        name: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("object.name"),
                })
            )
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validation.max", {
                    returnObjects: true,
                    name: t("object.name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),
        hook: Yup.string().url(t("validation.correct_url")).nullable(),
    });

    const {
        values,
        touched,
        errors,
        setFieldValue,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldError,
    } = useFormik({
        initialValues: { ...data, hook: undefined } || initFormikVal,
        validationSchema: SegmentSchema,
        enableReinitialize: true,
        onSubmit: sendSubmit,
    });

    return (
        <>
            {data?.includeOpts && data.excludeOpts && (
                <ModuleSegmentUpdate
                    visible={showSegmentConditions}
                    initIncludeOpts={data?.includeOpts}
                    initExcludeOpts={data?.excludeOpts}
                    handleClose={() => setShowSegmentConditions(false)}
                    callBackData={(includeOpts: [][], excludeOpts: [][]) =>
                        handleUpdateOpts(includeOpts, excludeOpts)
                    }
                />
            )}

            <StyledContainer>
                <div className="page">
                    <h3>{t("page.segments_settings")}</h3>
                    <div className="body-card">
                        <StyledSkeleton
                            title={false}
                            loading={isLoading}
                            active
                            paragraph={{ rows: 10 }}
                        >
                            <StyledCard>
                                <div className="label">
                                    <p className="title">Name</p>
                                    <SharedInput
                                        style={{ width: "70%" }}
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        touched={touched.name}
                                        errors={errors.name}
                                    />
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.contacts")}</p>
                                    <div>
                                        <p className="content">
                                            {numberFormatter(data?.contacts || values.contacts)}
                                        </p>
                                        <SharedButtonDefault
                                            disable={isDisable}
                                            onClick={updateContact}
                                            text={t("page.apply")}
                                            type="primary"
                                        />
                                    </div>
                                </div>
                                <div className="label">
                                    {values.hooks?.map((item, index) => (
                                        <>
                                            <p className="title">
                                                {t("page.webhook") + " " + (index + 1)}
                                            </p>

                                            <div key={index} style={{ marginBottom: 16 }}>
                                                {indexHook === index ? (
                                                    <SharedInput
                                                        className="input-hook"
                                                        placeholder={t("page.webhook")}
                                                        name="hook"
                                                        value={values.hook}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errors={errors.hook}
                                                        touched={touched.hook}
                                                    />
                                                ) : (
                                                    <p>{item}</p>
                                                )}

                                                <div className="btn-field">
                                                    {indexHook === index ? (
                                                        <SharedButtonDefault
                                                            text={t("page.verify")}
                                                            type="default"
                                                            className="btn-verify"
                                                            onClick={() =>
                                                                editHook(values.hook || "", index)
                                                            }
                                                        />
                                                    ) : (
                                                        <SharedButtonDefault
                                                            text={t("page.edit")}
                                                            type="default"
                                                            className="btn-verify"
                                                            onClick={() => handleEdit(item, index)}
                                                        />
                                                    )}
                                                    <SharedButtonDefault
                                                        text={t("page.delete")}
                                                        type="default"
                                                        className="btn-edit"
                                                        onClick={() => deleteHook(index)}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    {showInput && (
                                        <div>
                                            <p className="title">{t("page.webhook")}</p>
                                            <SharedInput
                                                className="input-hook"
                                                placeholder={t("page.webhook")}
                                                name="hook"
                                                value={values.hook}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                errors={errors.hook}
                                                touched={touched.hook}
                                            />
                                            <div className="space" style={{ height: 10 }}></div>
                                            <div className="btn-field">
                                                <SharedButtonDefault
                                                    text={t("page.verify")}
                                                    type="default"
                                                    className="btn-verify"
                                                    onClick={addHook}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {!showInput && (
                                        <PlusCircleOutlined
                                            onClick={addInputHook}
                                            style={{ cursor: "pointer" }}
                                        />
                                    )}
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.segment_conditions")}</p>
                                    <SharedButtonDefault
                                        text={t("page.edit")}
                                        type="default"
                                        className="btn-edit"
                                        onClick={handleShowSegmentConditions}
                                    />
                                </div>
                                <div className="label">
                                    <p className="title">{t("page.export")}</p>
                                    <SharedButtonDefault
                                        text={t("page.export_csv")}
                                        type="default"
                                        className="btn-edit"
                                        onClick={handleExport}
                                        disable={isDisable}
                                    />
                                </div>
                            </StyledCard>
                        </StyledSkeleton>
                    </div>
                    <div>
                        <div className="label status-field">
                            <div className="title">{t("page.activate")}</div>{" "}
                            <Switch
                                checked={values.status === enumStatus.ACTIVE ? true : false}
                                onChange={(e) =>
                                    setFieldValue(
                                        "status",
                                        e ? enumStatus.ACTIVE : enumStatus.INACTIVE
                                    )
                                }
                            />
                        </div>
                        <div className="btn-field " style={{ marginTop: 20 }}>
                            <StyledSubmitButton
                                type="default"
                                text={t("page.save")}
                                onClick={handleSubmit}
                                // disable={isSubmitting}
                            />
                            <StyledCancelButton
                                type="sub"
                                text={t("page.cancel")}
                                htmlType="button"
                                onClick={handleCancel}
                            />
                        </div>
                    </div>
                </div>
            </StyledContainer>
        </>
    );
};

const StyledContainer = styled.div`
    padding: 3.5rem;
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
    height: 86vh;
    width: 100%;
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

    h3 {
        font-weight: 700;
        font-size: 35px;
        margin-bottom: ${(p) => p.theme.margins.pageHeader};
        @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            font-size: 28px;
        }
    }
    .body-card {
        flex: 1;
        /* overflow: auto;
        flex: 1;
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
        } */
    }
    .btn-field {
        display: flex;
    }
    .btn-verify {
        background-color: #646464;
        color: white;
        margin-right: 7px;
    }
    .btn-edit {
        color: #646464;
    }
    .btn-action {
        min-width: 100px;
        height: 49px;
        font-weight: 600;
        font-size: 16;
    }
    .btn-save {
        background-color: #0263e0;
        color: white;
        margin-right: 10px;
    }
    .btn-cancel {
        color: black;
        border: 1px solid black !important;
    }
    .input-hook {
        height: 48px;
        font-size: 16px;
        color: black;
    }

    .status-field {
        margin-top: 30px;
        display: flex;
        align-items: center;

        .title {
            font-weight: 600;
            font-size: 16px;
            color: black;
            margin-bottom: 0px;
            padding-right: 22px;
        }
    }
    @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 1.5rem;
    }
`;

const StyledSkeleton = styled(Skeleton)`
    max-width: 707px;
    height: 100%;
    .ant-skeleton-content {
        background-color: white;
        padding: 3.5rem;
    }
`;
