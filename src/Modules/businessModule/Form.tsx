import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { FormWrapper, SharedInput, StyledSubmitButton } from "@components";
import { useYup } from "@validations";
import {
    BUSINESS_TYPE,
    COMPANY_SIZE,
    enumLanuage,
    LEVEL_EXP,
    // PATH_ACCOUNT_SETTINGS,
    PATH_CHOOSE_PLAN,
    PATH_HOME,
} from "@configs";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, selectAuth, getInfo } from "@redux";
import { useNotify, theme } from "@utils";
import { merchantAPI } from "@api";
import { ICreateMerchant } from "@interfaces";
import { Select } from "antd";
const { Option } = Select;

const INITIAL_VALUE: ICreateMerchant = {
    name: "",
    businessTypeName: "",
    businessTel: "",
    staffAmount: "1TO49",
    expLoyaltyHub: "NEW_LOYALTY",
    logoUrl: "",
    firstAdminName: "",
    businessEmail: "",
    firstAdminEmail: "",
};
export const ModuleBusinessFrom = () => {
    //hook
    const { YupCompany } = useYup();
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, success } = useNotify();
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const merchantFullName = useSelector(selectAuth).userInfo?.fullName;
    const userEmail = useSelector(selectAuth).userInfo?.email;
    const planId = useSelector(selectAuth).plan?._id;
    //page variable
    const createCompanySchema = Yup.object().shape(YupCompany);
    const [merchant, setMerchant] = useState(INITIAL_VALUE);

    useEffect(() => {
        if (planId) {
            history.push(PATH_HOME);
        }
    }, [planId]);

    useEffect(() => {
        getMerchant();
        getProfile();
        setFieldValue("firstAdminEmail", userEmail);
    }, [userEmail]);
    const getProfile = async () => {
        await dispatch(getInfo());
    };
    const getMerchant = async () => {
        if (merchantId) {
            try {
                setLoading(true);
                const response = await merchantAPI.getMerchant(merchantId);
                setFieldValue("name", response?.data.name);
                setFieldValue("businessTypeName", response?.data?.businessTypeName);
                setFieldValue("businessTel", response?.data?.businessTel);
                setFieldValue("staffAmount", response?.data?.staffAmount);
                setFieldValue("expLoyaltyHub", response?.data?.expLoyaltyHub);
                setFieldValue("logoUrl", response?.data?.logoUrl);
                setFieldValue("firstAdminName", merchantFullName);
                setFieldValue("businessEmail", userEmail);
                // setMerchant(response?.data);
                setMerchant({
                    name: response?.data.name,
                    businessTypeName: response?.data?.businessTypeName,
                    businessTel: response?.data?.businessTel,
                    staffAmount: response?.data?.staffAmount,
                    expLoyaltyHub: response?.data?.expLoyaltyHub,
                    logoUrl: response?.data?.logoUrl,
                    firstAdminName: response?.data?.fullName,
                    businessEmail: "",
                    firstAdminEmail: userEmail ? userEmail : "",
                });
            } catch (e) {
                setMerchant({
                    name: "",
                    businessTypeName: "",
                    businessTel: "",
                    staffAmount: "1TO49",
                    expLoyaltyHub: "NEW_LOYALTY",
                    logoUrl: "",
                    firstAdminName: "",
                    businessEmail: "",
                    firstAdminEmail: userEmail ? userEmail : "",
                });
                setFieldValue("businessEmail", userEmail);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleBusinessSubmit = async (values: ICreateMerchant) => {
        dispatch(setLoading(true));
        try {
            await merchantAPI.createMerchant({ ...values, businessEmail: "" });
            success(t("message.create.success"));
            // window.open(WORDPRESS_WEB_URL, "_self");
            history.push(PATH_CHOOSE_PLAN);
            dispatch(setLoading(false));
        } catch (err: any) {
            error(t("message.update.fail"));
            dispatch(setLoading(false));
            // history.push(PATH_ACCOUNT_SETTINGS);
        }
    };

    const { values, handleChange, handleSubmit, isSubmitting, errors, touched, setFieldValue } =
        useFormik({
            initialValues: INITIAL_VALUE,
            validationSchema: createCompanySchema,
            onSubmit: handleBusinessSubmit,
            enableReinitialize: true,
        });
    const handleChangeNumPeople = (value: string) => {
        setFieldValue("staffAmount", value);
    };
    const handleChangeLvlExp = (value: string) => {
        setFieldValue("expLoyaltyHub", value);
    };
    const setBusinessTypeName = (value: string) => {
        setFieldValue("businessTypeName", value);
    };
    const i18nextLng = window.localStorage.i18nextLng;
    return (
        <FormWrapper>
            <div className="form-wrap">
                <form onSubmit={handleSubmit}>
                    <div className="page-body">
                        <div className="form-item">
                            <div className="label">
                                <span className={i18nextLng === enumLanuage.TH ? "color" : ""}>
                                    {t("page.new_account.what_is_your")}
                                </span>
                                <span
                                    className={
                                        i18nextLng === enumLanuage.EN ||
                                        i18nextLng === enumLanuage.EN_GB
                                            ? "color"
                                            : ""
                                    }
                                >
                                    {t("page.new_account.work_email")}
                                </span>
                                {t("page.new_account.question_mark")}
                            </div>
                            <div className="input-field">
                                <SharedInput
                                    className="new-account-input"
                                    name="firstAdminEmail"
                                    onChange={handleChange}
                                    value={values.firstAdminEmail}
                                    errors={errors.firstAdminEmail}
                                    touched={touched.firstAdminEmail}
                                    styleParent={{ flex: 1 }}
                                    disable={!!merchant?.firstAdminEmail}
                                />
                            </div>
                        </div>
                        <div className="form-item two-col">
                            <div className="left">
                                <div className="label">{t("page.new_account.full_name")}</div>
                                <div className="input-field">
                                    <SharedInput
                                        className="new-account-input"
                                        name="firstAdminName"
                                        onChange={handleChange}
                                        value={values.firstAdminName}
                                        errors={errors.firstAdminName}
                                        touched={touched.firstAdminName}
                                        styleParent={{ flex: 1 }}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <div className="label">
                                    <span className={i18nextLng === enumLanuage.TH ? "color" : ""}>
                                        {t("page.new_account.question")}
                                    </span>
                                    <span
                                        className={
                                            i18nextLng === enumLanuage.EN ||
                                            i18nextLng === enumLanuage.EN_GB
                                                ? "color"
                                                : ""
                                        }
                                    >
                                        {t("page.new_account.program")}
                                    </span>
                                    {t("page.new_account.question_mark")}
                                </div>
                                <div className="input-field">
                                    <SharedInput
                                        placeholder=""
                                        className="new-account-input"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name}
                                        errors={errors.name}
                                        touched={touched.name}
                                        styleParent={{ flex: 1 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-item">
                            {/* <div className="label">
                                {t("page.new_account.question")}
                                <span className="color">{t("page.new_account.program")}</span>
                                {t("page.new_account.question_mark")}
                            </div>
                            <div className="input-field">
                                <SharedInput
                                    placeholder=""
                                    className="new-account-input"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                    errors={errors.name}
                                    touched={touched.name}
                                    styleParent={{ flex: 1 }}
                                />
                            </div> */}
                        </div>
                        <div className="form-item">
                            <div className="label">
                                <span className={i18nextLng === enumLanuage.TH ? "color" : ""}>
                                    {t("page.new_account.business_type_question")}
                                </span>
                                <span
                                    className={
                                        i18nextLng === enumLanuage.EN ||
                                        i18nextLng === enumLanuage.EN_GB
                                            ? "color"
                                            : ""
                                    }
                                >
                                    {t("page.new_account.business_industry")}
                                </span>
                                {t("page.new_account.question_mark")}
                            </div>
                            <div className="input-field">
                                <Select
                                    style={{ width: "100%", height: 48 }}
                                    placeholder={t("page.choose_points_expiry")}
                                    onChange={setBusinessTypeName}
                                    defaultActiveFirstOption={true}
                                    value={values.businessTypeName}
                                >
                                    {BUSINESS_TYPE.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.value}>
                                                {t("page.new_account." + item.name)}
                                            </Option>
                                        );
                                    })}
                                </Select>
                                <small className="error">{errors.businessTypeName}</small>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">
                                <span className={i18nextLng === enumLanuage.TH ? "color" : ""}>
                                    {t("page.new_account.telephone_number")}
                                </span>
                                <span
                                    className={
                                        i18nextLng === enumLanuage.EN ||
                                        i18nextLng === enumLanuage.EN_GB
                                            ? "color"
                                            : ""
                                    }
                                >
                                    {t("page.new_account.number")}
                                </span>
                                {t("page.new_account.question_mark")}
                            </div>
                            <div className="input-field">
                                <SharedInput
                                    className="new-account-input"
                                    name="businessTel"
                                    onChange={handleChange}
                                    value={values.businessTel}
                                    errors={errors.businessTel}
                                    touched={touched.businessTel}
                                    styleParent={{ flex: 1 }}
                                />
                                <div className="desc_link">{t("page.new_account.free_setup")}</div>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">
                                {t("page.new_account.number_of_people")}
                                {t("page.new_account.question_mark")}
                            </div>
                            <div className="input-field select-layout">
                                {COMPANY_SIZE.map((item) => (
                                    <StyledSelectBtn
                                        onClick={() => handleChangeNumPeople(item.value)}
                                        key={item.name}
                                        type="button"
                                        className={
                                            item.value === values.staffAmount ? "active" : ""
                                        }
                                    >
                                        {t("page.new_account." + item.name)}
                                    </StyledSelectBtn>
                                ))}
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.new_account.level_experience")}</div>
                            <div className="input-field select-layout">
                                {LEVEL_EXP.map((item, index) => (
                                    <StyledSelectBtn
                                        onClick={() => handleChangeLvlExp(item.value)}
                                        key={index}
                                        type="button"
                                        className={
                                            item.value === values.expLoyaltyHub ? "active" : ""
                                        }
                                    >
                                        {t("page.new_account." + item.name)}
                                    </StyledSelectBtn>
                                ))}
                            </div>
                        </div>

                        <div className="btn-layout">
                            <StyledSubmitButton
                                type="default"
                                text={t("page.continue")}
                                htmlType="submit"
                                disable={isSubmitting}
                                className="btn-continue"
                                // onClick={handleBusinessSubmit}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </FormWrapper>
    );
};
const StyledSelectBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    position: static;
    height: 54px;
    top: 0px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    border-radius: 70px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin-right: 8px;
    @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
        height: auto;
        padding: 12px 20px;
    }
    @media (max-width: ${theme.breakPoints.breakTablet}) {
        width: fit-content;
        margin-bottom: 8px;
    }
    &.active {
        background: #646464;
        color: #fff;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
    }
    &:hover {
        background: #646464;
        color: #fff;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
    }
    &:focus-visible {
        outline-color: #646464;
        /* box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12); */
        /* border: 0px; */
    }
`;
