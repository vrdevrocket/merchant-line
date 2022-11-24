import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import * as Yup from "yup";
import { useHistory } from "react-router";
import {
    ComponentColorPicker,
    FormWrapper,
    SharedInput,
    StyledSubmitButton,
    NewComponentMerchantPreview,
} from "@components";
import { useYup } from "@validations";
import {
    BUSINESS_TYPE,
    COMPANY_SIZE,
    // PATH_CHOOSE_PLAN,
    PATH_HOME,
    // PATH_HOME_NEW,
    shopThemeColors,
} from "@configs";

import { useDispatch, useSelector } from "react-redux";
import { setLoading, selectAuth, getInfo, setMainColor } from "@redux";
import { useNotify, theme } from "@utils";
import { merchantAPI } from "@api";
import { ICreateNewMerchant } from "@interfaces";
import { Checkbox, Select } from "antd";
import { RightTop, TextQuote, TextArrow, LeftBottom } from "@pages";
const { Option } = Select;

const INITIAL_VALUE: ICreateNewMerchant = {
    name: "",
    businessTypeName: "",
    businessTel: "",
    staffAmount: "1TO49",
    expLoyaltyHub: "NEW_LOYALTY",
    logoUrl: "",
    firstAdminName: "",
    businessEmail: "",
    firstAdminEmail: "",
    themeColor: "#000000",
};

interface Iprops {
    changeColor: () => void;
}
export const ModuleMerchantFrom = (props: Iprops) => {
    //hook
    const { YupCompany } = useYup();
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { error, success } = useNotify();
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    const merchantFullName = useSelector(selectAuth).userInfo?.fullName;
    const userEmail = useSelector(selectAuth).userInfo?.email;
    //page variable
    const createCompanySchema = Yup.object().shape(YupCompany);
    const [merchant, setMerchant] = useState(INITIAL_VALUE);
    const [chooseColor, setChooseColor] = useState<boolean>(false);
    const { changeColor } = props;
    // useEffect(() => {
    //     if (planId) {
    //         history.push(PATH_HOME);
    //     }
    // }, [planId]);

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
                setFieldValue("name", "");
                setFieldValue("businessTypeName", response?.data?.businessTypeName);
                setFieldValue("businessTel", response?.data?.businessTel);
                setFieldValue("staffAmount", response?.data?.staffAmount);
                setFieldValue("expLoyaltyHub", response?.data?.expLoyaltyHub);
                setFieldValue("logoUrl", response?.data?.logoUrl);
                setFieldValue("firstAdminName", "");
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
                    themeColor: "",
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
                    themeColor: "",
                });
                setFieldValue("businessEmail", userEmail);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleBusinessSubmit = async (values: ICreateNewMerchant) => {
        dispatch(setLoading(true));
        try {
            await merchantAPI.createMerchant({ ...values, businessEmail: "" });
            await dispatch(getInfo());
            success(t("message.create.success"));
            history.push(PATH_HOME);
            dispatch(setLoading(false));
        } catch (err: any) {
            error(t("message.update.fail"));
            dispatch(setLoading(false));
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
    const handleChangeThemeColor = (value?: string) => {
        // setChooseColor(false);
        if (value) {
            dispatch(setMainColor(value));
            setFieldValue("themeColor", value);
            changeColor();
        }
    };
    // const handleChangeLvlExp = (value: string) => {
    //     setFieldValue("expLoyaltyHub", value);
    // };
    const setBusinessTypeName = (value: string) => {
        setFieldValue("businessTypeName", value);
    };
    // const i18nextLng = window.localStorage.i18nextLng;
    const checkColor = (color) => {
        const res = shopThemeColors.filter((item) => item === color);
        if (res.length > 0) return true;
        return false;
    };
    return (
        <FormWrapper>
            <div className="form-wrap">
                <form onSubmit={handleSubmit}>
                    <div className="page-body">
                        <div className="form-item ">
                            <div className="label">{t("page.create_merchant.shop_name")}</div>
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
                        <div className="form-item">
                            <div className="label">{t("page.create_merchant.fullname")}</div>
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
                        {/* <div className="form-item">
                            <div className="label">
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
                            </div>
                        </div> */}

                        <div className="form-item">
                            <div className="label">
                                {t("page.create_merchant.business_industries")}
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
                            <div className="label">{t("page.create_merchant.your_work_email")}</div>
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
                        <div className="form-item">
                            <div className="label">
                                {t("page.create_merchant.your_telephone_number")}
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
                                {/* <div className="desc_link">{t("page.new_account.free_setup")}</div> */}
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.create_merchant.how_many_people")}</div>
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
                            <div className="label">{t("page.create_merchant.color_theme")}</div>
                            <div className="input-field select-theme">
                                {shopThemeColors.map((item) => (
                                    <StyledThemeIcon
                                        color={item}
                                        key={item}
                                        onClick={() => handleChangeThemeColor(item)}
                                    >
                                        {values.themeColor === item ? <CheckIcon /> : null}
                                    </StyledThemeIcon>
                                ))}
                                <StyledThemeIPicker
                                    chooseColor={chooseColor}
                                    themeColor={values.themeColor}
                                    onClick={() => setChooseColor(!chooseColor)}
                                >
                                    {!checkColor(values.themeColor) && chooseColor ? (
                                        <CheckIcon />
                                    ) : null}
                                </StyledThemeIPicker>
                                {chooseColor && (
                                    <div className="picker-container">
                                        <ComponentColorPicker
                                            color={values.themeColor || ""}
                                            onClick={handleChangeThemeColor}
                                            className="picker-layout"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="content-left visible-ms">
                                <StyledInfoLayout>
                                    <div className="right-top-icon">
                                        <RightTop />
                                    </div>
                                    <div className="title">
                                        <h4>{t("page.create_merchant.screen_client")}</h4>
                                    </div>
                                    <div className="image-layout">
                                        <div className="image">
                                            <NewComponentMerchantPreview />
                                            <div className="text-quote">
                                                <TextQuote />
                                            </div>
                                            <div className="text-arrow">
                                                <TextArrow />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-bottom-icon">
                                        <LeftBottom />
                                    </div>
                                </StyledInfoLayout>
                            </div>
                            <div className="agree-terms">
                                <Checkbox checked={true}>
                                    <span>
                                        {t("page.create_merchant.terms")}{" "}
                                        <span className="read-more">
                                            {t("page.create_merchant.read_more")}
                                        </span>
                                    </span>
                                </Checkbox>
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
const StyledThemeIPicker = styled.div<{ chooseColor: boolean; themeColor: string }>`
    background: conic-gradient(
        from 0deg at 50% 50%,
        #ffd301 -29.86deg,
        #ffa102 17deg,
        #ff4b42 78.75deg,
        #bc5dd4 148.13deg,
        #099af5 221.25deg,
        #3fc118 287.71deg,
        #ffd301 330.14deg,
        #ffa102 377deg
    );
    /* background: ${(p) => (p.chooseColor ? p.themeColor : "inital")}; */
    width: 46px;
    height: 46px;
    border-radius: 23px;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        width: 32px;
        height: 32px;
        svg {
            width: 11px;
        }
    }
`;
const StyledThemeIcon = styled.div<{ color: string }>`
    background-color: ${(p) => p.color};
    width: 46px;
    height: 46px;
    border-radius: 23px;
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        width: 32px;
        height: 32px;
        svg {
            width: 20px;
        }
    }
`;
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
const CheckIcon = () => (
    <svg width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M2.9375 10.7188L9.40625 18.2656L23.0625 2.09375"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
);

const StyledInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 86vh;
    background: linear-gradient(180deg, #ff5e86 0%, #fa847d 100%);
    position: relative;
    border-radius: 42px;
    position: sticky;
    top: 2rem;
    .right-bottom-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        svg {
            opacity: 0.4;
        }
    }
    .right-top-icon {
        position: absolute;
        top: 0;
        left: 0;
        svg {
            opacity: 0.4;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        height: 100%;
        border-radius: 0;
    }
`;
