import { useEffect, useState } from "react";
import { Button, Select, Spin } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ModuelSteps } from "./Steps";
import { useFormik } from "formik";
import { useYup } from "@validations";
import {
    BUSINESS_TYPE,
    COMPANY_SIZE,
    enumExpLoyaltyHub,
    enumStaffAmount,
    PATH_ACCOUNTS,
    PATH_LOGIN,
} from "@configs";
import { SharedButtonDefault, SharedInput } from "@components";
import { useNotify, theme } from "@utils";
import { INewAccount } from "@interfaces";
import { logout, setLoading } from "@redux";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { merchantAPI } from "@api";
import * as Yup from "yup";
import { IconLoadingPage } from "@components";
import { useSelector } from "react-redux";
import { selectApp, selectAuth } from "@redux";

const { Option } = Select;
const INITIAL_VALUE: INewAccount = {
    firstAdminName: "",
    name: "",
    businessName: "",
    businessTypeName: "",
    businessTel: "",
    staffAmount: enumStaffAmount.ONETO49,
    expLoyaltyHub: enumExpLoyaltyHub.NEW_LOYALTY,
};

export const PageAccountCreate = () => {
    const { t } = useTranslation();
    const { YupNewMerchant } = useYup();
    const history = useHistory();
    const dispatch = useDispatch();
    const { error, success } = useNotify();
    const [steps, addSteps] = useState<number>(0);
    const createNewMerchantSchema = Yup.object().shape(YupNewMerchant);
    const loading = useSelector(selectApp).loading;
    const [newMerchant, addNewMerchant] = useState<INewAccount>();
    const userAdminId = useSelector(selectAuth).auth?.userAdminId;
    const x_token = useSelector(selectAuth).auth?.x_token;
    const create_token = useSelector(selectAuth).auth?.create_token;
    const email = useSelector(selectAuth).auth?.email;
    useEffect(() => {
        dispatch(setLoading(false));
    }, []);

    const handleChangeNumPeople = (value: string) => {
        setFieldValue("staffAmount", value);
    };
    const handleFinalSubmit = async () => {
        dispatch(setLoading(true));
        const data = {
            create_token: create_token,
            userAdminId: userAdminId,
            x_token: x_token,
            payload: newMerchant,
        };
        try {
            // await console.log("abcd");
            await merchantAPI.createNewMerchant(data);
            success(t("message.create.success"));
            addSteps(steps + 1);
            dispatch(setLoading(false));
        } catch (err: any) {
            error(t("message.update.fail"));
            dispatch(setLoading(false));
        }
    };
    const handleBusinessSubmit = (values: INewAccount) => {
        addNewMerchant(values);
        handleNext();
        // dispatch(setLoading(true));
        // try {
        //     addNewMerchant(values);
        //     await merchantAPI.createNewMerchant(values);
        //     success(t("message.create.success"));
        //     history.push(PATH_CHOOSE_PLAN);
        //     dispatch(setLoading(false));
        // } catch (err: any) {
        //     error(t("message.update.fail"));
        //     dispatch(setLoading(false));
        // }
    };
    const handleBack = () => {
        if (steps > 0) {
            dispatch(setLoading(true));
            addSteps(steps - 1);
            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
        } else {
            history.goBack();
        }
    };
    const handleNext = () => {
        if (steps === 1) {
            handleFinalSubmit();
        } else {
            if (steps < 2) {
                dispatch(setLoading(true));
                addSteps(steps + 1);
                setTimeout(() => {
                    dispatch(setLoading(false));
                }, 1000);
            }
        }
    };
    const handleBackMain = () => {
        dispatch(setLoading(true));
        history.push(PATH_ACCOUNTS);
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);
    };
    const setBusinessTypeName = (value: string) => {
        setFieldValue("businessTypeName", value);
    };
    const handleLogout = () => {
        dispatch(logout());
        setTimeout(() => {
            history.push(PATH_LOGIN);
        }, 1000);
    };
    const { values, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: INITIAL_VALUE,
        validationSchema: createNewMerchantSchema,
        onSubmit: handleBusinessSubmit,
        enableReinitialize: true,
    });
    const getStaffAmountText = (params: enumStaffAmount | string) => {
        if (params === "") return "-";
        const text = COMPANY_SIZE.filter((item) => item.value === params)[0].name;
        return t("page.new_account." + text);
    };
    return (
        <Spin
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
            spinning={loading}
            size="large"
            indicator={<IconLoadingPage />}
        >
            <StyledWrapperLayout>
                <StyledLayout>
                    <form onSubmit={handleSubmit}>
                        <div className="step-layout">
                            <ModuelSteps step={steps} />
                        </div>
                        {steps === 2 && (
                            <div className="page-layout success-account">
                                <div className="title">
                                    <CheckIcon />
                                    <h3>{t("page.manage_account.success_create_account")}</h3>
                                </div>
                                <StyledCard>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.account_name")}
                                        </p>
                                        <p className="value">
                                            <p className="value">{newMerchant?.name || "-"}</p>
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.account_owner")}
                                        </p>
                                        <p className="value">
                                            {newMerchant?.firstAdminName || "-"}
                                        </p>
                                    </div>
                                </StyledCard>
                                <div className="success-layout">
                                    <img src="/images/newUser/create_account_success.png" />
                                    <h4>{t("page.manage_account.congratulations")}</h4>
                                    <h4>{t("page.manage_account.your_program")}</h4>
                                </div>
                            </div>
                        )}
                        {steps === 1 && (
                            <div className="page-layout">
                                <h3>{t("page.manage_account.confirm_info")}</h3>
                                <StyledCard>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.account_name")}
                                        </p>
                                        <p className="value">{newMerchant?.name || "-"}</p>
                                    </div>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.account_owner")}
                                        </p>
                                        <p className="value">
                                            {newMerchant?.firstAdminName || "-"}
                                        </p>
                                    </div>
                                </StyledCard>
                                <StyledCard>
                                    <h4>{t("page.manage_account.business_info")}</h4>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.company_name")}
                                        </p>
                                        <p className="value">{newMerchant?.businessName || "-"}</p>
                                    </div>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.business_industries")}
                                        </p>
                                        <p className="value">
                                            {newMerchant?.businessTypeName || "-"}
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.fullname_contact")}
                                        </p>
                                        <p className="value">
                                            {newMerchant?.firstAdminName || "-"}
                                        </p>
                                    </div>
                                    <div className="info-item">
                                        <p className="label">
                                            {t("page.manage_account.people_your_company")}
                                        </p>
                                        <p className="value">
                                            {getStaffAmountText(newMerchant?.staffAmount || "")}
                                        </p>
                                    </div>
                                </StyledCard>
                            </div>
                        )}
                        {steps === 0 && (
                            <div className="page-layout">
                                <h3>{t("page.manage_account.create_business_account")}</h3>
                                <div className="elem-group">
                                    <StyledCard>
                                        <div className="group-input">
                                            <SharedInput
                                                label={t("page.manage_account.account_name")}
                                                className="new-account-input"
                                                name="name"
                                                onChange={handleChange}
                                                value={values.name}
                                                errors={errors.name}
                                                touched={touched.name}
                                                styleParent={{ flex: 1 }}
                                            />
                                            <small>
                                                {t("page.manage_account.appear_on_storefront")}
                                            </small>
                                        </div>
                                        <div className="owner-account">
                                            <div className="input-layout">
                                                <SharedInput
                                                    disable={true}
                                                    value={email}
                                                    label={t("page.manage_account.owner_account")}
                                                />
                                            </div>
                                            <Button htmlType="button" onClick={handleLogout}>
                                                {t("page.manage_account.logout")}
                                            </Button>
                                        </div>
                                    </StyledCard>
                                </div>
                                <div className="elem-group">
                                    <StyledCard>
                                        <h4>{t("page.manage_account.business_info")}</h4>
                                        <div className="group-input">
                                            <SharedInput
                                                label={t("page.manage_account.company_name")}
                                                name="businessName"
                                                onChange={handleChange}
                                                value={values.businessName}
                                                errors={errors.businessName}
                                                touched={touched.businessName}
                                            />
                                        </div>
                                        <div className="group-input">
                                            <div className="label">
                                                {t("page.manage_account.types_business_industries")}
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
                                                <div className="error">
                                                    {errors.businessTypeName}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group-input">
                                            <div className="label">
                                                {t("page.manage_account.full_name")}
                                            </div>
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
                                                <div className="desc_link">
                                                    {t("page.new_account.free_setup")}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="group-input">
                                            <div className="label">
                                                {t("page.manage_account.telephone_number")}
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
                                            </div>
                                        </div>
                                        <div className="group-input">
                                            <div className="label">
                                                {t("page.manage_account.how_many_people")}
                                            </div>
                                            <div className="input-field select-layout">
                                                {COMPANY_SIZE.map((item) => (
                                                    <StyledSelectBtn
                                                        onClick={() =>
                                                            handleChangeNumPeople(item.value)
                                                        }
                                                        key={item.name}
                                                        type="button"
                                                        className={
                                                            item.value === values.staffAmount
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        {t("page.new_account." + item.name)}
                                                    </StyledSelectBtn>
                                                ))}
                                            </div>
                                        </div>
                                    </StyledCard>
                                </div>
                            </div>
                        )}
                        <StyledActionLayout>
                            {steps === 2 ? (
                                <div className="success-action-layout">
                                    <SharedButtonDefault
                                        style={{
                                            width: 200,
                                            fontSize: 16,
                                            padding: 14,
                                            fontWeight: 600,
                                            height: 49,
                                            backgroundColor: "#0263E0",
                                            color: "#fff",
                                            marginBottom: 20,
                                        }}
                                        text={t("page.manage_account.back_main_page")}
                                        type="default"
                                        size="default"
                                        className="default-btn"
                                        onClick={handleBackMain}
                                    />
                                    {/* <p>{t("page.manage_account.faq_note")}</p> */}
                                </div>
                            ) : (
                                <>
                                    <SharedButtonDefault
                                        style={{
                                            width: 163,
                                            background: "white",
                                            fontSize: 16,
                                            padding: 14,
                                            fontWeight: 600,
                                            height: 49,
                                        }}
                                        text={t("page.manage_account.back")}
                                        type="default"
                                        size="default"
                                        className="default-btn"
                                        onClick={handleBack}
                                    />
                                    <SharedButtonDefault
                                        style={{
                                            width: 163,
                                            background: "white",
                                            fontSize: 16,
                                            padding: 14,
                                            fontWeight: 600,
                                            height: 49,
                                            backgroundColor: "#0263E0",
                                            color: "#fff",
                                        }}
                                        text={t("page.manage_account.next")}
                                        type="default"
                                        size="default"
                                        className="default-btn"
                                        htmlType={steps === 0 ? "submit" : "button"}
                                        onClick={steps === 0 ? handleSubmit : handleNext}
                                    />
                                </>
                            )}
                        </StyledActionLayout>
                    </form>
                </StyledLayout>
            </StyledWrapperLayout>
        </Spin>
    );
};
const StyledActionLayout = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledWrapperLayout = styled.div`
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 70px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 20px 16px;
        padding-bottom: 70px;
    }
`;
const StyledCard = styled.div`
    padding: 36px 60px;
    background-color: #fff;
    margin-bottom: 20px;
    border-radius: 8px;
    h4 {
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 34px;
        color: #000000;
        margin-bottom: 76px;
    }
    .group-input {
        margin-bottom: 32px;
        position: relative;
        .label {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            margin-bottom: 16px;
        }
        .ant-select-selection--single {
            height: 48px;
        }
        .select-layout {
            display: flex;
            @media (max-width: ${theme.breakPoints.breakTablet}) {
                max-width: 411px;
                overflow-x: scroll;
                padding: 10px 0;
            }
        }
        small {
            position: absolute;
            bottom: -3px;
        }
        .desc_link {
            position: absolute;
            bottom: -24px;
        }
        .error {
            position: absolute;
            bottom: -20px;
            color: #f43f3f;
        }
        .ant-select-selection__rendered {
            height: 100%;
            .ant-select-selection-selected-value {
                height: 100%;
                display: flex !important;
                align-items: center;
                color: black;
            }
        }
    }
    .owner-account {
        display: flex;
        align-items: center;
        column-gap: 6px;
        .input-layout {
            flex: 9;
        }
        button {
            height: 48px;
            background: #0263e0;
            border-radius: 4px;
            margin-top: 14px;
            color: #fff;
            font-weight: bold;
        }
    }
    .info-item {
        display: flex;
        margin-bottom: 32px;
        p {
            margin: 0;
        }
        .label {
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            flex: 4;
        }
        .value {
            flex: 8;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        padding: 20px 16px;
    }
`;
const StyledLayout = styled.div`
    max-width: 876px;
    margin: auto;
    margin-bottom: 30px;
    .step-layout {
        padding: 60px 160px;
    }
    .page-layout {
        h3 {
            font-style: normal;
            font-weight: 700;
            font-size: 35px;
            line-height: 48px;
            text-align: center;
            color: #000000;
            margin-bottom: 32px;
        }
    }
    .success-account {
        .title {
            display: flex;
            align-items: center;
            margin-bottom: 32px;
            justify-content: center;
            h3 {
                margin: 0 0 0 12px;
            }
        }
        .success-layout {
            padding: 36px 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background-color: #fff;
            border-radius: 8px;
            margin-bottom: 42px;
            img {
                margin-bottom: 32px;
            }
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #000000;
                margin: 0;
            }
        }
    }
    .success-action-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #a5a5a5;
            padding: 0 60px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .step-layout {
            padding: 0;
            margin: 0 16px;
            margin-bottom: 32px;
            padding: 0 16px 48px 16px;
        }
        .page-layout {
            h3 {
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 27px;
                text-align: center;
                color: #000000;
                margin-bottom: 20px;
            }
        }
        .success-account {
        }
        .success-action-layout {
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
    }
`;
const CheckIcon = () => (
    <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15.5" cy="15" r="15" fill="#6CD14E" />
        <path
            d="M12.4296 21.6006L6.94296 16.1132C6.8824 16.0526 6.83437 15.9808 6.80159 15.9016C6.76882 15.8225 6.75195 15.7377 6.75195 15.6521C6.75195 15.5665 6.76882 15.4817 6.80159 15.4026C6.83437 15.3234 6.8824 15.2516 6.94296 15.191L7.86515 14.2688C7.9257 14.2082 7.99759 14.1602 8.0767 14.1274C8.15582 14.0947 8.24062 14.0778 8.32625 14.0778C8.41188 14.0778 8.49668 14.0947 8.5758 14.1274C8.65491 14.1602 8.7268 14.2082 8.78735 14.2688L12.8915 18.3732L22.2136 9.05105C22.2741 8.99049 22.346 8.94246 22.4251 8.90969C22.5042 8.87691 22.589 8.86005 22.6747 8.86005C22.7603 8.86005 22.8451 8.87691 22.9242 8.90969C23.0033 8.94246 23.0752 8.99049 23.1358 9.05105L24.058 9.97325C24.1185 10.0338 24.1665 10.1057 24.1993 10.1848C24.2321 10.2639 24.249 10.3487 24.249 10.4343C24.249 10.52 24.2321 10.6048 24.1993 10.6839C24.1665 10.763 24.1185 10.8349 24.058 10.8954L13.353 21.6004C13.2925 21.6611 13.2205 21.7093 13.1413 21.7422C13.0621 21.7751 12.9772 21.7921 12.8914 21.7921C12.8056 21.7921 12.7207 21.7752 12.6414 21.7423C12.5622 21.7095 12.4902 21.6613 12.4296 21.6006Z"
            fill="white"
        />
    </svg>
);
