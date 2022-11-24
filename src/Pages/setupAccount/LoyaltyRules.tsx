import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    SharedInput,
    FormHeader,
    AddPlus,
    StyledSubmitButton,
    StyledCancelButton,
    MinutesFilled,
    LoytalRuleSvg,
    // IconCamera,
} from "@components";
import { IMembershipTier, IMembershipTierRules } from "@interfaces";
import { enumLanuage, new_account_step, PATH_HOME, PATH_USER_SIGNUP_METHOD } from "@configs";
import { useYup } from "@validations";
import { showErrorMessage, theme } from "@utils";
import { useHistory } from "react-router";
import { merchantAPI } from "@api";
import { selectAuth, getInfo, setLoading, setFirstTimeUser } from "@redux";
import { useNotify } from "@utils";
import { useEffect, useState } from "react";

const initMembershipTier: IMembershipTier = {
    membershipName: "",
    bahtSpent: 10,
    points: 1,
    _id: undefined,
    benefits: [],
    status: false,
    color: "#000000",
    icon: "star",
    iconUrl: undefined,
    pointThreshold: 0,
    isDefault: false,
};

const INITVALUES = {
    initPoint: "1000",
    membershipTiers: [],
};
export const LoyaltyRules = () => {
    //page hook
    const { t } = useTranslation();
    const { error, success } = useNotify();
    const dispatch = useDispatch();
    const { YupNewMembershipTier } = useYup();
    const history = useHistory();
    const membershipTierSchema = Yup.object().shape(YupNewMembershipTier);
    const merchantId = useSelector(selectAuth).userInfo?.merchantId;
    // const membershipTiers = useSelector(selectAuth).userInfo?.merchant?.membershipTiers;
    const [membershipTiers, setMemberShipTier] = useState<IMembershipTierRules>(INITVALUES);
    const i18nextLng = window.localStorage.i18nextLng;
    useEffect(() => {
        getMerchant(merchantId);
    }, [merchantId]);

    const getMerchant = async (merchantId) => {
        if (merchantId) {
            try {
                dispatch(setLoading(true));
                const response = await merchantAPI.getMerchant(merchantId);
                setMemberShipTier({
                    initPoint: response ? response.data.initPoint.toString() : "1000",
                    membershipTiers: response ? response.data.membershipTiers : initMembershipTier,
                });
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const handleNext = () => {
        history.push(PATH_USER_SIGNUP_METHOD);
    };
    const sendSubmit = async (values: IMembershipTierRules) => {
        if (merchantId) {
            dispatch(setLoading(true));
            try {
                const data = {
                    ...values,
                    initPoint: values.initPoint.toString(),
                    welcomeImageUrls: [], // default no field
                    status: "ACTIVE", // default no field
                    timeExpires: undefined, // default no field
                    termCondition: "", // default no field
                };
                const response = await merchantAPI.updateLoyaltyRule(merchantId, data);
                setMemberShipTier({
                    initPoint: response ? response.data.initPoint.toString() : "1000",
                    membershipTiers: response ? response.data.membershipTiers : initMembershipTier,
                });
                success(t("message.update.success"));
                history.push(PATH_USER_SIGNUP_METHOD);
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

    const handleGoFullMode = () => {
        dispatch(setFirstTimeUser(true));
        history.push(PATH_HOME);
    };
    return (
        <StyledContainer>
            <div className="flex-layout">
                <div className="left">
                    <FormHeader current={2} stepLen={new_account_step} />
                    <div className="page-header">
                        <h3>{t("page.new_account.loyal_title")}</h3>
                    </div>
                    {membershipTiers.membershipTiers.length > 0 && (
                        <Formik
                            initialValues={membershipTiers}
                            onSubmit={sendSubmit}
                            enableReinitialize={true}
                            validationSchema={membershipTierSchema}
                        >
                            {({ values, touched, handleChange, handleBlur, errors }) => (
                                <Form>
                                    <div className="form-input" style={{ marginBottom: 0 }}>
                                        <p className="label">
                                            <span
                                                className={
                                                    i18nextLng === enumLanuage.TH ? "color" : ""
                                                }
                                            >
                                                {t("page.new_account.loyal_name")}
                                            </span>
                                            {/* มอบ Points ให้กับสมาชิก ทันทีหลังจากสมัครสมาชิก ? */}
                                            <span
                                                className={
                                                    i18nextLng === enumLanuage.EN ||
                                                    i18nextLng === enumLanuage.EN_GB
                                                        ? "color"
                                                        : ""
                                                }
                                            >
                                                {t("page.new_account.loyal_name_concat")}
                                            </span>
                                            {t("page.new_account.additional_q_mark")}
                                        </p>
                                        <SharedInput
                                            className="input-add-contact"
                                            name="initPoint"
                                            type="number"
                                            value={values.initPoint}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            touched={touched.initPoint}
                                            errors={errors.initPoint}
                                        />
                                    </div>
                                    {/* <p className="label">
                                        <span
                                            className={i18nextLng === enumLanuage.TH ? "color" : ""}
                                        >
                                            {t("page.new_account.tier_name")}
                                        </span>
                                        <span
                                            className={
                                                i18nextLng === enumLanuage.EN ||
                                                i18nextLng === enumLanuage.EN_GB
                                                    ? "color"
                                                    : ""
                                            }
                                        >
                                            {t("page.new_account.call_tier")}
                                        </span>
                                        {t("page.new_account.additional_q_mark")}
                                    </p> */}
                                    <div className="tier-input">
                                        <div className="tier-label">
                                            <p className="label">
                                                {t("page.new_account.tier_rule")}
                                            </p>
                                        </div>
                                        <div className="tier-point">
                                            <p className="label">
                                                {t("page.new_account.point_threshold")}
                                            </p>
                                        </div>
                                        <div className="tier-baht">
                                            <p className="label">{t("page.baht_spent")}</p>
                                        </div>
                                        <div className="tier-point">
                                            <p className="label">{t("page.points")}</p>
                                        </div>
                                    </div>
                                    <FieldArray name="membershipTiers">
                                        {({ remove, push }) => (
                                            <div>
                                                {values.membershipTiers.length > 0 &&
                                                    values.membershipTiers.map((rule, index) => (
                                                        <div className="tier-input" key={index}>
                                                            <div className="form-input tier-label">
                                                                <SharedInput
                                                                    className="input-add-contact"
                                                                    name={`membershipTiers.${index}.membershipName`}
                                                                    type="text"
                                                                    value={
                                                                        values.membershipTiers[
                                                                            index
                                                                        ].membershipName
                                                                    }
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                <ErrorMessage
                                                                    name={`membershipTiers.${index}.membershipName`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="form-input tier-point">
                                                                <SharedInput
                                                                    className="input-add-contact eng"
                                                                    name={`membershipTiers.${index}.pointThreshold`}
                                                                    type="number"
                                                                    value={
                                                                        values.membershipTiers[
                                                                            index
                                                                        ].pointThreshold
                                                                    }
                                                                    disable={index === 0} // disable threshold point for defaut user
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                <ErrorMessage
                                                                    name={`membershipTiers.${index}.pointThreshold`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="form-input tier-baht">
                                                                <SharedInput
                                                                    className="input-add-contact eng"
                                                                    name={`membershipTiers.${index}.bahtSpent`}
                                                                    type="number"
                                                                    value={
                                                                        values.membershipTiers[
                                                                            index
                                                                        ].bahtSpent
                                                                    }
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                <ErrorMessage
                                                                    name={`membershipTiers.${index}.bahtSpent`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div className="form-input tier-point">
                                                                <SharedInput
                                                                    className="input-add-contact eng"
                                                                    name={`membershipTiers.${index}.points`}
                                                                    type="number"
                                                                    value={
                                                                        values.membershipTiers[
                                                                            index
                                                                        ].points
                                                                    }
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                                <ErrorMessage
                                                                    name={`membershipTiers.${index}.points`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            {index !== 0 && (
                                                                <button
                                                                    className="remove-btn"
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <MinutesFilled />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className="add-more-rule"
                                                    onClick={() => push(initMembershipTier)}
                                                >
                                                    <AddPlus />
                                                    <span>
                                                        {" "}
                                                        {t("page.new_account.add_more_tier")}
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <div className="btn-layout">
                                        <StyledCancelButton
                                            type="sub"
                                            text={t("page.new_account.full_mode")}
                                            htmlType="button"
                                            className="btn-full-mode"
                                            onClick={handleGoFullMode}
                                        />
                                        <div>
                                            <StyledCancelButton
                                                type="sub"
                                                text={t("page.new_account.do_later")}
                                                htmlType="button"
                                                className="btn-later"
                                                onClick={handleNext}
                                            />
                                            <StyledSubmitButton
                                                type="default"
                                                text={t("page.continue")}
                                                // onClick={handleGoNext}
                                                className="btn-continue"
                                                htmlType="submit"
                                                // disable={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
                <div className="right">
                    <div>
                        <LoytalRuleSvg />
                    </div>
                    <div className="des-layout">
                        <h4>{t("page.new_account.loytal_program")}</h4>
                        <p>{t("page.new_account.loytal_program_des")}</p>
                    </div>
                </div>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    .page-header {
        h3 {
            font-style: normal;
            font-weight: 700;
            font-size: 35px;
            line-height: 48px;
            color: #000000;
            margin-top: 48px;
            margin-bottom: 30px;
        }
    }
    .color {
        color: ${theme.colors.main};
    }
    .label {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
    }
    .flex-layout {
        display: flex;
        /* align-items: center; */
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            flex-direction: column;
            align-items: unset;
        }
        .left {
            flex: 3;
            margin-right: 40px;
            a {
                text-decoration: none;
                color: ${theme.colors.main};
                align-items: center;
            }
            .tier-input {
                display: flex;
                align-items: center;
                position: relative;
                .remove-btn {
                    position: absolute;
                    right: -44px;
                    bottom: 28px;
                    border: 0;
                    background: transparent;
                }
                .tier-label {
                    flex: 3;
                }
                .form-input {
                    .field-error {
                        text-align: left;
                        color: #f43f3f;
                        visibility: visible;
                        font-size: 11px;
                        font-weight: 700;
                        position: absolute;
                        bottom: -2px;
                    }
                }
                .tier-baht {
                    flex: 2;
                    margin-left: 16px;
                }
                .tier-point {
                    flex: 2;
                    margin-left: 16px;
                }
            }
            .add-more-rule {
                background: #fff;
                border: 0;
                display: flex;
                align-items: center;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: ${theme.colors.main};
                cursor: pointer;
                padding: 0;
                span {
                    margin-left: 10px;
                }
            }
        }
        .right {
            flex: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 40px;
            text-align: center;
            .des-layout {
                padding: 0 68px;
            }
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 35px;
                line-height: 48px;
                color: #23262f;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #777e91;
            }
            img {
                width: 335px;
                height: 356px;
            }
        }
    }
    .btn-layout {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
            flex-direction: column;
            align-items: unset;
        }
        .btn-later {
            margin-right: 16px;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
            border: 0;
            @media (max-width: ${theme.breakPoints.breakOnlyMobile}) {
                font-size: inherit;
            }
        }
        .btn-full-mode {
            border: 0;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: black;
            padding: 0;
        }
        .btn-continue {
            font-weight: bold;
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            border: 1px solid #0263e0;
            margin-right: 0;
        }
    }
`;
