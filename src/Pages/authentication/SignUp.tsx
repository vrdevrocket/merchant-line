import { Form, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import {
    SharedSocialLine,
    SharedInput,
    StyledSignUp,
    IconLoadingPage,
    AuthButton,
    SwitchLang,
    // PreviewArrowLeft,
    // MessageRightArrow,
    // MessageQuote,
    CheckIcon,
    LogoRocket,
} from "@components";
import { PATH_LOGIN, PATH_VERIFY_EMAIL } from "@configs";
import { IRegister } from "@interfaces";
import { authApi } from "@api";
import { resetTimeResendEmail, selectAuth } from "@redux";
import { ModuleExternalSignUp } from "@modules";
import { showErrorMessage, theme, useNotify } from "@utils";
import styled from "styled-components";

export const PageSignUp = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    const { id } = useParams<{ id: string }>();
    //redux state
    const { isLoading } = useSelector(selectAuth);

    // validation
    const data: IRegister = {
        email: "",
        inviteId: id,
    };

    const registerSchema = Yup.object().shape({
        email: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.email"),
                })
            )
            .email(t("validation.email_invalid"))
            .max(
                255,
                t("validation.max_length", {
                    returnObjects: true,
                    name: t("page.email"),
                })
            ),
    });

    // const handleSubmit = () => console.log(id);
    const handleSignUp = async (values: IRegister, { setSubmitting }: FormikHelpers<IRegister>) => {
        try {
            //WHAT : call api sign up
            const res = await authApi.register(values);
            if (res.data.success) {
                success(t("page.sign_up_successfully"));
                dispatch(resetTimeResendEmail());
                history.push(`${PATH_VERIFY_EMAIL}/${values.email}`);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.sign_up_fail"));
        } finally {
            setSubmitting(false);
        }
    };

    const handleMoveLogin = () => {
        history.push(PATH_LOGIN);
    };
    //formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: data,
            validationSchema: registerSchema,
            onSubmit: handleSignUp,
        });
    return (
        <>
            <Spin spinning={isLoading} size="large" indicator={<IconLoadingPage />}>
                <StyledSignUp>
                    <StyledLeftLayout>
                        <div className="w-info-layout">
                            <div className="w-info-header">
                                <h4 className="first-title">{t("page.signup.what_does_your")}</h4>
                                <h4 className="color">{t("page.signup.free_account_include")}</h4>
                                <p className="title-des">
                                    <span className="color">
                                        {t("page.signup.for_an_unlimited_time")}
                                    </span>
                                    {t("page.signup.you_get_access")}
                                </p>
                            </div>
                            <div className="w-info-body">
                                <h5>{t("page.signup.access_features_like")}</h5>
                                {/* <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.manage_member")}
                                        </span>
                                        {t("page.signup.points_and_redemptions")}
                                    </p>
                                </div> */}
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.manage_member")}{" "}
                                        </span>
                                        {t("page.signup.points_and_redemptions")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.create")}
                                        <span className="color">
                                            {t("page.signup.member_rewards_benefits")}
                                        </span>
                                        {t("page.signup.and")}
                                        {t("page.signup.coupons")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.customize")}
                                        <span className="color">
                                            {t("page.signup.membership_tier")}
                                        </span>
                                        {t("page.signup.vip_vvip")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>{t("page.signup.set_loyalty_progam")}</p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.customize_loyalty")}
                                        </span>
                                        {t("page.signup.loyalty_program")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.connect_user_signup")}
                                        </span>
                                        {t("page.signup.line_fb_google")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.full_free_support_from_dedicated")}
                                        <span className="color">
                                            {t("page.signup.account_manager")}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="web-footer">
                                <div className="w-footer-layout">
                                    <p className="first-row">
                                        {t("page.signup.crate_your_loyalty_and_membership_program")}
                                    </p>
                                    <p>{t("page.signup.retain_and_delight_your_customers")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="support-image">
                            <img
                                className="supporter-image"
                                src="/images/newUser/asian_woman_1.png"
                                alt="rocket guide supporter"
                            />
                        </div>
                    </StyledLeftLayout>
                    <div className="signup-layout">
                        <div className="lang-layout">
                            <div className="m-logo">
                                <LogoRocket />
                            </div>
                            <SwitchLang />
                        </div>
                        <ModuleExternalSignUp inviteId={data.inviteId} />
                        <SharedSocialLine />
                        <form onSubmit={handleSubmit}>
                            <Form.Item colon={false} label={t("page.email")} className="main-color">
                                <SharedInput
                                    name="email"
                                    style={{ width: "100%" }}
                                    onChange={handleChange}
                                    value={values.email}
                                    onBlur={handleBlur}
                                    errors={errors.email}
                                    touched={touched.email}
                                />
                            </Form.Item>
                            <div className="term_condition">
                                <input
                                    style={{
                                        height: "initial",
                                        position: "relative",
                                        top: "2px",
                                    }}
                                    type="checkbox"
                                    id="remember"
                                />
                                <p>
                                    <a href="">
                                        {t("page.signup.read_accepted")}
                                        <span className="color-blue">
                                            {t("page.signup.terms_of_service")}
                                        </span>
                                        {t("page.signup.and")}
                                        <span className="color-blue">
                                            {t("page.signup.privacy_policy")}
                                        </span>
                                    </a>
                                </p>
                            </div>
                            <AuthButton
                                type="primary"
                                size="large"
                                text={t("page.sign_up")}
                                htmlType="submit"
                                disable={isSubmitting}
                                className=""
                            />
                            <div className="log_in" onClick={handleMoveLogin}>
                                <span className="have-account">
                                    {t("page.already_have_account")}
                                </span>
                                {t("page.login")}
                            </div>
                        </form>
                    </div>
                    <StyledMobileLayout>
                        <div className="m-info-layout">
                            <div className="m-info-header">
                                <h4 className="first-title">{t("page.signup.what_does_your")}</h4>
                                <h4 className="color">{t("page.signup.free_account_include")}</h4>
                                <p className="title-des">
                                    <span className="color">
                                        {t("page.signup.for_an_unlimited_time")}
                                    </span>
                                    {t("page.signup.you_get_access")}
                                </p>
                            </div>
                            <div className="m-info-body">
                                <h5>{t("page.signup.access_features_like")}</h5>
                                {/* <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.manage_member")}
                                        </span>
                                        {t("page.signup.points_and_redemptions")}
                                    </p>
                                </div> */}
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.manage_member")}
                                        </span>
                                        <span>{t("page.signup.points_and_redemptions")}</span>
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.create")}
                                        <span className="color">
                                            {t("page.signup.member_rewards_benefits")}
                                        </span>
                                        {t("page.signup.and")}
                                        {t("page.signup.coupons")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.customize")}
                                        <span className="color">
                                            {t("page.signup.membership_tier")}
                                        </span>
                                        {t("page.signup.vip_vvip")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>{t("page.signup.set_loyalty_progam")}</p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.customize_loyalty")}
                                        </span>
                                        {t("page.signup.loyalty_program")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        <span className="color">
                                            {t("page.signup.connect_user_signup")}
                                        </span>
                                        {t("page.signup.line_fb_google")}
                                    </p>
                                </div>
                                <div className="list-item">
                                    <p className="icon">
                                        <CheckIcon />
                                    </p>
                                    <p>
                                        {t("page.signup.full_free_support_from_dedicated")}
                                        <span className="color">
                                            {t("page.signup.account_manager")}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="mobile-footer">
                                <div className="m-footer-layout">
                                    <p className="first-row">
                                        {t("page.signup.crate_your_loyalty_and_membership_program")}
                                    </p>
                                    <p>{t("page.signup.retain_and_delight_your_customers")}</p>
                                </div>
                                <div className="m-footer-layout">
                                    <img src="/images/newUser/support-woman-mobile.png" />
                                </div>
                            </div>
                        </div>
                    </StyledMobileLayout>
                </StyledSignUp>
            </Spin>
        </>
    );
};
// const StyledWrapper = styled.div`
//     @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
//         height: 100vh;
//         padding: 16px;
//         overflow-y: scroll;
//     }
// `;
const StyledMobileLayout = styled.div`
    display: none;
    background-image: url("images/newUser/signup-bg-mobile.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    p,
    h4,
    h5 {
        margin: 0;
    }
    .m-info-layout {
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0px 14px 32px rgba(33, 43, 97, 0.19);
        backdrop-filter: blur(33px);
        border-radius: 16px;
        padding: 32px;
        position: relative;
    }
    .color {
        color: #f22f46;
    }

    .m-info-header {
        .title-des {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            margin-top: 16px;
        }
        h4 {
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            line-height: 35px;
        }
        .first-title {
            color: #000000;
        }
    }
    .m-info-body {
        padding: 32px 0;
        h5 {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
            margin-bottom: 20px;
        }
        .list-item {
            display: flex;
            margin-bottom: 16px;
            svg {
                width: 20px;
                height: 20px;
            }
            p {
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
            }
            .icon {
                margin-right: 16px;
            }
        }
    }
    .mobile-footer {
        display: flex;
        min-height: 194px;
        .m-footer-layout {
            flex: 1;
        }
        p {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
        }
        p.first-row {
            margin-bottom: 32px;
        }
        img {
            position: absolute;
            bottom: -32px;
            right: -14px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        display: block;
        margin: 0 -16px;
        padding: 16px;
        padding-bottom: 32px;
    }
`;
const StyledLeftLayout = styled.div`
    flex: 3;
    background: ${theme.colors.main};
    height: 100vh;
    position: relative;
    background-image: url("images/newUser/signup-background-circle.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 100px 120px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
        position: unset;
        width: 100%;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        display: none;
    }
    .support-image {
        position: absolute;
        bottom: 0;
        right: -46px;
        @media (max-width: ${(p) => p.theme.breakPoints.break14Laptop}) {
            .supporter-image {
                width: 590px;
                /* right: 0; */
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            .supporter-image {
                width: 590px;
                right: 0;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakLarge}) {
            .supporter-image {
                width: 560px;
                right: 0;
            }
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            height: 700px;
            width: auto;
            position: relative;
            .supporter-image {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
    .submit-arrow {
        position: absolute;
        bottom: -361px;
        left: -61px;
    }
    .support-message {
        position: absolute;
        max-width: 417px;
        left: -319px;
        border-radius: 20px;
        top: -214px;
        box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
        @media (max-width: ${(p) => p.theme.breakPoints.break14Laptop}) {
            position: absolute;
            max-width: 417px;
            left: -158px;
            border-radius: 20px;
            top: -181px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMaxBig}) {
            position: absolute;
            max-width: 417px;
            left: -158px;
            border-radius: 20px;
            top: -181px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
            position: absolute;
            max-width: 360px;
            left: -137px;
            top: -144px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMedium}) {
            position: absolute;
            max-width: 360px;
            left: 220px;
            border-radius: 20px;
            top: 68px;
        }
        p {
            margin: 0;
        }
        .message-body {
            padding: 26px;
            background: #fff;
            border-top-left-radius: 26px;
            border-top-right-radius: 26px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                padding: 18px;
            }
            p {
                font-weight: 800;
                font-size: 20px;
                line-height: 27px;
                color: #000000;
                @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                    font-size: 18px;
                }
            }
            .msg-quote {
                display: flex;
                flex-direction: row-reverse;
            }
        }
        .arrow-layout {
            position: relative;
            .arrow {
                position: absolute;
                right: -30px;
                bottom: 10px;
            }
        }
        .message-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 26px;
            background: #ffd9de;
            border-bottom-right-radius: 18px;
            border-bottom-left-radius: 18px;
            @media (max-width: ${(p) => p.theme.breakPoints.breakBig}) {
                padding: 18px;
            }
            p {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                color: #000000;
                max-width: 137px;
            }
        }
    }
    .w-info-layout {
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0px 14px 32px rgba(33, 43, 97, 0.19);
        backdrop-filter: blur(33px);
        border-radius: 16px;
        padding: 32px;
        position: relative;
        /* margin: 80px; */
    }
    .color {
        color: #f22f46;
    }

    .w-info-header {
        .title-des {
            font-style: normal;
            font-weight: 800;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
            margin-top: 32px;
            margin-bottom: 0;
        }
        h4 {
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            line-height: 35px;
            margin: 0;
        }
        .first-title {
            color: #000000;
        }
    }
    .w-info-body {
        padding: 32px 0;
        h5 {
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
        }
        .list-item {
            display: flex;
            svg {
                width: 20px;
                height: 20px;
            }
            p {
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
            }
            .icon {
                margin-right: 16px;
            }
        }
    }
    .web-footer {
        display: flex;
        min-height: 194px;
        .w-footer-layout {
            flex: 1;
        }
        p {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            max-width: 360px;
        }
        p.first-row {
            margin-bottom: 32px;
        }
        img {
            position: absolute;
            bottom: -32px;
            right: -14px;
        }
    }
`;
