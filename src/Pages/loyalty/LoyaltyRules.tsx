import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select, Radio, Switch, Input, Skeleton } from "antd";
import { PlusCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as Yup from "yup";

import { ModuleMembershipTier, ModuleUploadImage } from "@modules";
import {
    SharedInputDefault,
    StyledCard,
    IconPen,
    IconTrash,
    StyledSubmitButton,
    StyledCancelButton,
    SharedCKEditor,
    ComponentInfoBox,
} from "@components";
import {
    CYCLE_TIME,
    enumPlacement,
    enumStatus,
    enumValidation,
    MONTH_EXPIRY,
    SPECIFIC_MONTHS,
} from "@configs";
import { merchantAPI } from "@api";
import { selectAuth, getInfo, setLoading, selectTheme } from "@redux";
import {
    IMembershipTier,
    IMerchantData,
    enumPointExpiryType,
    enumDownGradeType,
    enumDownGradeCycle,
} from "@interfaces";
import { showErrorMessage, useNotify } from "@utils";

const { Option } = Select;

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
};
const initFormikVal: IMerchantData = {
    contacts: "",
    createdAt: "",
    updatedAt: "",
    _id: "",
    planId: "",
    planName: "",
    plans: [],
    status: "",
    users: [],
    membershipTiers: [],
    timeExpires: 2,
    initPoint: undefined,
    welcomeImageUrls: [],
    termCondition: "",
    isPointExpire: false,
    pointExpiryType: enumPointExpiryType.FIXED_FREQUENCY_MONTH,
    monthExpires: "January",
    downGradeRule: {
        isDownGrade: false,
        downGradeType: enumDownGradeType.REAL_TIME,
        specificMonth: "January",
        downGradeCycle: enumDownGradeCycle.MONTH_12_CYCLE,
    },
};

export const PageLoyaltyRules = () => {
    //page hook
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, success } = useNotify();
    //redux state
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const plan = useSelector(selectAuth).plan;
    const theme = useSelector(selectTheme);
    // page state
    const [visible, setVisible] = useState(false);
    // const [valueSelect, setValueSelect] = useState(-1);
    const [initMembershipTier, setInitMembershipTier] = useState<IMembershipTier>();
    const [memberShipTier, setMemberShipTier] = useState<IMembershipTier[]>([]);
    const [index, setIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const i18nextLng = window.localStorage.i18nextLng;
    //formik
    const loyaltyRulesSchema = Yup.object().shape({
        timeExpires: Yup.string().required(
            t("validation.required", {
                returnObjects: true,
                name: t("object.time_expiry"),
            })
        ),
        initPoint: Yup.number()
            .nullable()
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
                    number: enumValidation.NUMBER_ONE,
                })
            ),
    });
    const sendSubmit = async () => {
        if (merchantId) {
            dispatch(setLoading(true));
            try {
                // setFieldValue("welcomeImageUrls", welcomeImages);
                if (values.initPoint) values.initPoint = values.initPoint.toString();
                const data = {
                    initPoint: values.initPoint?.toString(),
                    welcomeImageUrls: values.welcomeImageUrls,
                    membershipTiers: values.membershipTiers,
                    status: enumStatus.ACTIVE,
                    timeExpires: values.timeExpires || undefined,
                    termCondition: values.termCondition,
                    isPointExpire: values.isPointExpire,
                    pointExpiryType: values.pointExpiryType,
                    monthExpires: values.monthExpires,
                    downGradeRule: {
                        isDownGrade: values.downGradeRule?.isDownGrade,
                        downGradeType: values.downGradeRule?.downGradeType,
                        specificMonth: values.downGradeRule?.specificMonth,
                        downGradeCycle: values.downGradeRule?.downGradeCycle,
                    },
                };
                const response = await merchantAPI.updateLoyaltyRule(merchantId, data);

                setValues(response.data);
                success(t("message.update.success"));
                dispatch(getInfo());
            } catch (err: any) {
                if (err.response) {
                    error(showErrorMessage(err.response));
                } else error(t("message.update.fail"));
            } finally {
                dispatch(setLoading(false));
            }
        } else {
            error(t("message.update.fail"));
        }
    };
    const {
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues,
        errors,
        touched,
    } = useFormik({
        initialValues: initFormikVal,
        validationSchema: loyaltyRulesSchema,
        enableReinitialize: true,
        validateOnChange: true,
        onSubmit: sendSubmit,
    });
    useEffect(() => {
        getMerchant();
    }, []);

    useEffect(() => {
        const sortArr = memberShipTier.sort(
            (a, b) => (a.pointThreshold > b.pointThreshold && 1) || -1
        );
        const defaultItemIndex = sortArr.findIndex((item) => item.isDefault);
        const defaultItem = sortArr[defaultItemIndex];

        if (defaultItem) {
            sortArr.splice(defaultItemIndex, 1);
            sortArr.splice(0, 0, defaultItem);
        }
        setFieldValue("membershipTiers", sortArr);
    }, [memberShipTier]);

    const getMerchant = async () => {
        if (merchantId) {
            try {
                setIsLoading(true);
                const response = await merchantAPI.getMerchant(merchantId);
                if (response.data.termCondition)
                    setFieldValue("termCondition", response.data.termCondition);
                if (response.data.initPoint) setFieldValue("initPoint", response.data.initPoint);

                if (response.data.timeExpires) {
                    // setValueSelect(response.data.timeExpires);
                    setFieldValue("timeExpires", Math.abs(response.data.timeExpires));
                } else setFieldValue("timeExpires", 1);
                if (response.data.welcomeImageUrls)
                    setFieldValue("welcomeImageUrls", response.data.welcomeImageUrls);
                if (response.data.isPointExpire)
                    setFieldValue("isPointExpire", response.data.isPointExpire);
                if (response.data.pointExpiryType)
                    setFieldValue("pointExpiryType", response.data.pointExpiryType);
                if (response.data.monthExpires) {
                    if (response.data.monthExpires === "No_select") {
                        setFieldValue("monthExpires", initFormikVal.monthExpires);
                    } else {
                        setFieldValue("monthExpires", response.data.monthExpires);
                    }
                }
                if (response.data.downGradeRule?.isDownGrade)
                    setFieldValue(
                        "downGradeRule.isDownGrade",
                        response.data.downGradeRule.isDownGrade
                    );
                if (response.data.downGradeRule?.downGradeType)
                    setFieldValue(
                        "downGradeRule.downGradeType",
                        response.data.downGradeRule.downGradeType
                    );
                if (response.data.downGradeRule?.specificMonth) {
                    setFieldValue(
                        "downGradeRule.specificMonth",
                        response.data.downGradeRule?.specificMonth
                    );
                } else setFieldValue("downGradeRule.specificMonth", "January");

                if (response.data.downGradeRule?.downGradeCycle)
                    setFieldValue(
                        "downGradeRule.downGradeCycle",
                        response.data.downGradeRule?.downGradeCycle
                    );
                setMemberShipTier(response.data.membershipTiers);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCancel = useCallback(() => {
        history.goBack();
    }, []);

    const setTimeExpires = (selectValue: number) => {
        if (selectValue) {
            // setValueSelect(selectValue);
            setFieldValue("timeExpires", selectValue);
        }
    };

    const editMembershipTier = (index: number) => {
        if (values.membershipTiers) {
            setInitMembershipTier(values.membershipTiers[index]);
            setIndex(index);
            setVisible(true);
        }
    };

    const removeMemberShipTier = (index: number) => {
        const reducedArr = [...memberShipTier];
        reducedArr.splice(index, 1);
        setMemberShipTier(reducedArr);
    };

    const addBenefit = (value: IMembershipTier, index: number) => {
        if (index === -1) {
            setMemberShipTier([...memberShipTier, value]);
        } else setMemberShipTier(memberShipTier.map((item, i) => (index === i ? value : item)));
    };

    const changeStatusBenefit = (value: boolean, index: number) => {
        const reducedArr = [...memberShipTier];
        reducedArr[index].status = value;
        setMemberShipTier(reducedArr);
    };

    const addMembershipTier = () => {
        setInitMembershipTier({
            membershipName: "",
            _id: undefined,
            points: 0,
            bahtSpent: 0,
            benefits: [],
            status: true,
            color: "#000000",
            icon: "star",
            iconUrl: undefined,
            pointThreshold: 0,
            isDefault: false,
        });
        setIndex(-1);
        setVisible(true);
    };

    const handleGetImage = (images: string[]) => {
        setFieldValue("welcomeImageUrls", [...images]);
    };

    const handleChangeTermCondition = (event: any, editors: any) => {
        const data = editors.getData();
        setFieldValue("termCondition", data);
    };
    const handleChangePointExpiry = (checked) => {
        setFieldValue("isPointExpire", checked);
    };

    const onChangeSpecificMonth = (value) => {
        setFieldValue("monthExpires", value);
    };
    const handleChangeDowngradeTier = (checked) => {
        setFieldValue("downGradeRule.isDownGrade", checked);
    };
    const onChangeDowngradeSpecificMonth = (value) => {
        setFieldValue("downGradeRule.specificMonth", value);
    };
    const onChangeDowngradeCycle = (value: enumDownGradeCycle) => {
        setFieldValue("downGradeRule.downGradeCycle", value);
    };
    return (
        <StyledContainer>
            <ModuleMembershipTier
                visible={visible}
                handleClose={() => setVisible(false)}
                callbackData={(value, index) => addBenefit(value, index)}
                initMembershipTier={initMembershipTier}
                index={index}
                mainColor={theme.mainColor}
            />
            <div className="body-page">
                <div className="page-header">
                    <h3>{t("page.loyalty_rules")}</h3>
                </div>
                <div className="card">
                    <div className="card-wrap">
                        <Skeleton
                            className="skeleton"
                            loading={isLoading}
                            active
                            paragraph={{ rows: 10 }}
                        >
                            <StyledCard>
                                <h3>{t("page.loyalty_settings")}</h3>
                                <div className="form-input">
                                    <p className="card-title">
                                        {t(
                                            "page.automatically_assign_starting_points_to_new_members"
                                        )}
                                    </p>
                                    <div className="w-70">
                                        <Input
                                            className={
                                                errors.initPoint
                                                    ? "input-init-point err-input eng"
                                                    : "input-init-point eng"
                                            }
                                            type="number"
                                            placeholder={t("page.points")}
                                            name="initPoint"
                                            value={values.initPoint}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <div
                                            className={
                                                errors.initPoint
                                                    ? "err-field"
                                                    : "err-field err-hidden"
                                            }
                                        >
                                            {errors.initPoint || "err"}
                                        </div>
                                    </div>
                                </div>
                                {plan?.memberShipTier && (
                                    <>
                                        <div className="form-input">
                                            <p className="card-title">
                                                {t("page.set_membership_tier")}
                                                <ComponentInfoBox
                                                    videoUrl="abc"
                                                    title={t("page.box_info.loyalty_title")}
                                                    body={[
                                                        t("page.box_info.loyalty_body"),
                                                        t("page.box_info.loyalty_body_2"),
                                                        t("page.box_info.loyalty_body_3"),
                                                        t("page.box_info.loyalty_body_4"),
                                                    ]}
                                                    placement={enumPlacement.RIGHT}
                                                />
                                            </p>
                                            {values?.membershipTiers &&
                                                values?.membershipTiers.map((item, index) => (
                                                    <div className="flex-field mb-12" key={index}>
                                                        <div className="w-70 flex-4">
                                                            <SharedInputDefault
                                                                value={item.membershipName}
                                                                name="points"
                                                                disable={true}
                                                                notErr={true}
                                                                style={{ height: 48 }}
                                                            />
                                                        </div>
                                                        <div className="flex-field flex-3">
                                                            <div
                                                                className="right-icon"
                                                                onClick={() =>
                                                                    editMembershipTier(index)
                                                                }
                                                            >
                                                                <IconPen
                                                                    size={17}
                                                                    color="#646464"
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: item.isDefault
                                                                        ? "none"
                                                                        : "block",
                                                                }}
                                                                className="right-icon"
                                                                onClick={() =>
                                                                    removeMemberShipTier(index)
                                                                }
                                                            >
                                                                <IconTrash
                                                                    size={20}
                                                                    color="#646464"
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: item.isDefault
                                                                        ? "none"
                                                                        : "block",
                                                                }}
                                                                className="switch-btn right-icon"
                                                            >
                                                                <Switch
                                                                    defaultChecked={item.status}
                                                                    onChange={(e) =>
                                                                        changeStatusBenefit(
                                                                            e,
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <div
                                            style={{ cursor: "pointer", width: "fit-content" }}
                                            className="add-membership-tier"
                                            onClick={addMembershipTier}
                                        >
                                            <PlusCircle size={23} strokeWidth={1} color="#6C7084" />
                                        </div>
                                    </>
                                )}
                            </StyledCard>
                        </Skeleton>
                    </div>
                    <div className="card-wrap">
                        <Skeleton className="skeleton" loading={isLoading} paragraph={{ rows: 4 }}>
                            <StyledCardLayout>
                                <div className="card-header">
                                    <div className="title">
                                        {t("page.point_expiry")}
                                        <ComponentInfoBox
                                            videoUrl="abc"
                                            title={t("page.box_info.point_expiry")}
                                            body={[
                                                t("page.box_info.point_expiry_body"),
                                                t("page.box_info.point_expiry_body_1"),
                                                t("page.box_info.point_expiry_body_2"),
                                            ]}
                                            placement={enumPlacement.RIGHT}
                                        />
                                    </div>
                                    <div className="point-expiry flex-layout">
                                        <Switch
                                            onChange={handleChangePointExpiry}
                                            defaultChecked={values.isPointExpire}
                                        />
                                        <p>{t("page.point_expiry_label")}</p>
                                    </div>
                                </div>
                                <div className="option-layout">
                                    {values.isPointExpire && (
                                        <div className="point-option">
                                            <Radio.Group
                                                name="pointExpiryType"
                                                onChange={handleChange}
                                                value={values.pointExpiryType}
                                            >
                                                <Radio
                                                    style={radioStyle}
                                                    value={
                                                        enumPointExpiryType.FIXED_FREQUENCY_MONTH
                                                    }
                                                >
                                                    <span className="label">
                                                        {" "}
                                                        {t("page.fixed_frequency")}
                                                    </span>
                                                </Radio>
                                                <div className="point-option-select">
                                                    {values.pointExpiryType ===
                                                        enumPointExpiryType.FIXED_FREQUENCY_MONTH && (
                                                        <Select
                                                            style={{ width: "100%", height: 48 }}
                                                            placeholder={t(
                                                                "page.choose_points_expiry"
                                                            )}
                                                            onChange={setTimeExpires}
                                                            defaultActiveFirstOption={true}
                                                            value={values.timeExpires}
                                                        >
                                                            {MONTH_EXPIRY.map((item, index) => {
                                                                return (
                                                                    <Option
                                                                        key={index}
                                                                        value={item.value}
                                                                    >
                                                                        {t("page." + item.name)}
                                                                    </Option>
                                                                );
                                                            })}
                                                        </Select>
                                                    )}
                                                </div>
                                                <Radio
                                                    style={radioStyle}
                                                    value={enumPointExpiryType.SPECIFIC_MONTH}
                                                >
                                                    <span className="label">
                                                        {" "}
                                                        {t("page.specific_month")}
                                                    </span>
                                                </Radio>
                                                <div className="specific-month-select">
                                                    {values.pointExpiryType ===
                                                        enumPointExpiryType.SPECIFIC_MONTH && (
                                                        <Select
                                                            style={{ width: "100%", height: 48 }}
                                                            placeholder={t(
                                                                "page.choose_points_expiry"
                                                            )}
                                                            onChange={onChangeSpecificMonth}
                                                            defaultActiveFirstOption={true}
                                                            value={values.monthExpires}
                                                        >
                                                            {SPECIFIC_MONTHS.map((item, index) => {
                                                                return (
                                                                    <Option
                                                                        key={index}
                                                                        value={item.value}
                                                                    >
                                                                        {t("page." + item.name)}
                                                                    </Option>
                                                                );
                                                            })}
                                                        </Select>
                                                    )}
                                                </div>
                                            </Radio.Group>
                                        </div>
                                    )}
                                </div>
                            </StyledCardLayout>
                        </Skeleton>
                    </div>
                    <div className="card-wrap">
                        <Skeleton className="skeleton" loading={isLoading} paragraph={{ rows: 4 }}>
                            <StyledCardLayout>
                                <div className="card-header">
                                    <div className="title">
                                        {t("page.tier_downgrade_rule")}
                                        <ComponentInfoBox
                                            videoUrl="abc"
                                            title={t("page.box_info.down_grade")}
                                            body={[
                                                t("page.box_info.down_grade_body"),
                                                t("page.box_info.down_grade_body_1"),
                                                t("page.box_info.down_grade_body_2"),
                                                t("page.box_info.down_grade_body_3"),
                                            ]}
                                            placement={enumPlacement.RIGHT}
                                        />
                                    </div>
                                    <div className="point-expiry flex-layout">
                                        <Switch
                                            defaultChecked={values.downGradeRule?.isDownGrade}
                                            onChange={handleChangeDowngradeTier}
                                        />
                                        <p>{t("page.downgrade_tier_on_point_balance")}</p>
                                    </div>
                                </div>
                                <div className="downgrade-content">
                                    {values.downGradeRule?.isDownGrade && (
                                        <div className="downgrade-layout">
                                            <h5>{t("page.downgrade_calculation_frequency")}</h5>
                                            <div className="option-group">
                                                <Radio.Group
                                                    name="downGradeRule.downGradeType"
                                                    onChange={handleChange}
                                                    value={values.downGradeRule?.downGradeType}
                                                >
                                                    <Radio
                                                        style={radioStyle}
                                                        value={enumDownGradeType.REAL_TIME}
                                                    >
                                                        {t("page.real_time")}
                                                    </Radio>
                                                    <Radio
                                                        style={radioStyle}
                                                        value={enumDownGradeType.EVERY_MONTH}
                                                    >
                                                        {t("page.end_of_every_month")}
                                                    </Radio>
                                                    <Radio
                                                        style={radioStyle}
                                                        value={enumDownGradeType.SPECIFIC_MONTH}
                                                    >
                                                        {t("page.end_of_specific_month")}
                                                    </Radio>
                                                </Radio.Group>
                                            </div>
                                            <div className="specific-content">
                                                {values.downGradeRule?.downGradeType ===
                                                    enumDownGradeType.SPECIFIC_MONTH && (
                                                    <div className="specific-layout">
                                                        <div className="specific-downgrade">
                                                            <label>{t("page.month")}</label>
                                                            <Select
                                                                style={{
                                                                    width: "100%",
                                                                    height: 48,
                                                                }}
                                                                // placeholder={t("page.choose_points_expiry")}
                                                                onChange={
                                                                    onChangeDowngradeSpecificMonth
                                                                }
                                                                defaultActiveFirstOption={true}
                                                                value={
                                                                    values.downGradeRule
                                                                        ?.specificMonth
                                                                }
                                                            >
                                                                {SPECIFIC_MONTHS.map(
                                                                    (item, index) => {
                                                                        return (
                                                                            <Option
                                                                                key={index}
                                                                                value={item.value}
                                                                            >
                                                                                {t(
                                                                                    "page." +
                                                                                        item.name
                                                                                )}
                                                                                {/* {item.name} */}
                                                                            </Option>
                                                                        );
                                                                    }
                                                                )}
                                                            </Select>
                                                        </div>
                                                        <div className="specific-downgrade">
                                                            <label>{t("page.cycle")}</label>
                                                            <Select
                                                                style={{
                                                                    width: "100%",
                                                                    height: 48,
                                                                }}
                                                                // placeholder={t("page.choose_points_expiry")}
                                                                onChange={onChangeDowngradeCycle}
                                                                defaultActiveFirstOption={true}
                                                                value={
                                                                    values.downGradeRule
                                                                        ?.downGradeCycle
                                                                }
                                                            >
                                                                {CYCLE_TIME.map((item, index) => {
                                                                    return (
                                                                        <Option
                                                                            key={index}
                                                                            value={item.value}
                                                                        >
                                                                            {t("page." + item.name)}
                                                                            {/* {item.name} */}
                                                                        </Option>
                                                                    );
                                                                })}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </StyledCardLayout>
                        </Skeleton>
                    </div>
                    <div className="card-wrap">
                        <Skeleton className="skeleton" loading={isLoading} paragraph={{ rows: 4 }}>
                            <StyledCard>
                                <div className="title">
                                    {t("page.term_condition")}
                                    <span className="eng">{t("page._2_2000_characters")}</span>
                                </div>
                                <SharedCKEditor
                                    name="description"
                                    editor={values.termCondition || ""}
                                    handleChangeEditor={handleChangeTermCondition}
                                    errors={errors.termCondition}
                                    touched={touched.termCondition}
                                />
                            </StyledCard>
                        </Skeleton>
                    </div>
                    <div className="card-wrap">
                        <Skeleton className="skeleton" loading={isLoading} paragraph={{ rows: 4 }}>
                            <StyledCard>
                                <ModuleUploadImage
                                    images={values.welcomeImageUrls || []}
                                    handleGetImage={handleGetImage}
                                />
                            </StyledCard>
                        </Skeleton>
                    </div>
                </div>
                <div className="button-field">
                    <StyledSubmitButton
                        text={t("page.save")}
                        type="default"
                        className="primary-btn"
                        onClick={handleSubmit}
                    />
                    <StyledCancelButton
                        text={t("page.cancel")}
                        type="sub"
                        htmlType="button"
                        className="default-btn"
                        onClick={handleCancel}
                    />
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    padding: 3.5rem;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
        padding: 16px;
    }
    overflow-y: auto;
    /* height: calc(100vh - ${(p) => p.theme.header.height}); */
    height: 86vh;
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
    h3,
    .card-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: anywhere;
    }
    .body-page {
        display: flex;
        flex-direction: column;
    }
    .page-header {
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
            flex-direction: column;
            align-items: flex-start;
            div {
                justify-content: flex-start;
            }
            h3 {
                font-size: 28px;
            }
        }
        h3 {
            margin-right: 44px;
            font-weight: 700;
            font-size: 35px;
            margin-bottom: ${(p) => p.theme.margins.pageHeader};
        }
    }
    .card {
        max-width: ${(p) => p.theme.maxWidths.cardWrap};
        width: 100%;
        flex: 1;
        height: calc(100vh - 300px);
        /* overflow: auto; */
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
        .card-wrap {
            margin-bottom: 28px;
            h3 {
                font-weight: 700;
            }
            .w-70 {
                width: 70%;
            }
            .form-input {
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Firefox */
                input[type="number"] {
                    -moz-appearance: textfield;
                }
                .input-init-point {
                    height: 48px;
                    font-size: 16px;
                }
                .err-input {
                    border-width: 1px;
                    border-color: ${(p) => p.theme.colors.danger}!important;
                    &:focus-within {
                        border-color: ${(p) => p.theme.colors.danger}!important;
                    }
                }
                .err-field {
                    text-align: left;
                    color: ${(props) => props.theme.colors.danger};
                    font-size: 11px;
                    font-weight: 700;
                }
                .err-hidden {
                    visibility: hidden;
                }
                margin-bottom: 30px;
                .card-title {
                    font-weight: 600;
                    font-size: 16px;
                    color: black;
                    margin-bottom: 12px;
                }

                .ant-select-selection,
                .ant-select-selection__rendered {
                    height: ${(p) => p.theme.heights.input};
                    display: flex;
                    align-items: center;
                }
            }
            .mb-12 {
                margin-bottom: 12px;
            }
            .flex-field {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                @media screen and (max-width: ${(p) => p.theme.breakPoints.breakMobileMedium}) {
                    justify-content: space-between;
                    .right-icon {
                        margin-left: 5px;
                    }
                }
                .right-icon {
                    margin-left: 15px;
                    cursor: pointer;
                }
                .flex-1 {
                    flex: 1;
                }
            }
        }
    }

    .button-field {
        display: flex;
        margin-top: 12px;
        /* position: fixed; */
        /* bottom: 5%; */
    }
    .primary-btn {
        :hover,
        :focus {
            color: white !important;
        }
        :hover {
            opacity: 0.85;
        }
    }
    .default-btn {
        :hover,
        :focus {
            border-color: black !important;
            color: black !important;
        }
        :hover {
            opacity: 0.85;
        }
    }
    .skeleton {
        background-color: white;
        padding: 3.5rem;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: calc(100vh - 48px);
        .page-header {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
        }
        .card {
            .card-wrap {
                .form-input {
                    margin-bottom: 0;
                    .w-70 {
                        width: auto;
                    }
                    .err-hidden {
                    }
                    .card-title {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 19px;
                        color: #000000;
                    }
                }
                .mb-12 {
                    margin-bottom: 12px;
                }
                .flex-field {
                    display: flex;
                    .flex-4 {
                        flex: 4;
                    }
                    .flex-2 {
                        flex: 3;
                    }
                }
            }
        }
    }
`;

const StyledCardLayout = styled.div`
    /* background: #fff; */
    border-radius: 8px;
    .card-header {
        background: #fff;
        padding: 3.5rem;
        padding-bottom: 26px;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 4px;
    }
    .title {
        font-weight: bold;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobile}) {
            font-size: 20px;
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
    h3 {
        font-weight: 600;
        font-size: 25px;
        line-height: 1.5em;
        color: #000000;
        margin-bottom: 32px;
    }
    // point expiry
    .flex-layout {
        display: flex;
        align-items: center;
    }
    .point-expiry {
        p {
            margin: 0;
            margin-left: 12px;
            font-size: 16px;
            font-weight: 400;
        }
    }
    .option-layout {
        .point-option {
            font-size: 16px;
            font-weight: 400;
            padding: 3.5rem;
            padding-top: 26px;
            background: #fff;
            border-radius: 4px;
            .ant-select-selection--single {
                height: 100%;
                font-size: 16px;
                font-weight: 400;
            }
            label {
                margin-bottom: 10px;
                font-size: 16px;
                font-weight: 400;
            }
            .ant-select-selection__rendered {
                height: 48px;
                display: flex;
                align-items: center;
            }
            .label {
            }
            .specific-month-select {
                margin-left: 28px;
                margin-bottom: 24px;
                font-size: 16px;
                font-weight: 400;
                /* min-height: 72px; */
            }
            .point-option-select {
                margin-left: 28px;
                margin-bottom: 24px;
                font-size: 16px;
                font-weight: 400;
                /* min-height: 72px; */
            }
        }
    }
    .downgrade-content {
        /* min-height: 330px; */

        .downgrade-layout {
            background: #fff;
            padding: 3.5rem;
            padding-top: 26px;
            border-radius: 4px;
            h5 {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 12px;
            }
            .specific-content {
                /* min-height: 120px; */
            }
            .specific-downgrade {
                width: 40%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                margin-left: 24px;
            }
            .ant-select-selection--single {
                height: 100%;
                font-size: 16px;
                font-weight: 400;
            }
            label {
                flex: 1;
                font-size: 16px;
                font-weight: 400;
            }
            .ant-select {
                flex: 2;
            }
            .ant-select-selection__rendered {
                height: 48px;
                display: flex;
                align-items: center;
            }
            .option-group {
                margin-bottom: 16px;
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
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
