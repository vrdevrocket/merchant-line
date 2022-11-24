import { Form, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";

import { AuthButton, IconLoadingPage, SharedInput, StyledForgotPassword } from "@components";
import { PATH_LOGIN, PATH_VERIFY_EMAIL } from "@configs";
import { authApi } from "@api";
import { resetTimeResendEmail } from "@redux";
import { IEmail } from "@interfaces";
import { showErrorMessage, useNotify } from "@utils";
// import { IMessageError } from "@interfaces";
import styled from "styled-components";
export const PageForgotPassword = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { success, error } = useNotify();
    //page states
    const [loading, setToggleLoading] = useState<boolean>(false);
    //page variable
    const initialValue: IEmail = {
        email: "",
    };
    const emailSchema = Yup.object().shape({
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

    const routeLogin = () => {
        history.push(PATH_LOGIN);
    };

    const handleSendLink = async (values: IEmail, { setSubmitting }: FormikHelpers<IEmail>) => {
        //
        try {
            setToggleLoading(true);
            //WHAT:Call api reset password
            const res = await authApi.sendResetPassword(values.email);
            if (res.data.success) {
                success(res.data.message);
                dispatch(resetTimeResendEmail());
                const emailParam = values.email;
                history.push(`${PATH_VERIFY_EMAIL}/${emailParam}`);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.error"));
        } finally {
            setToggleLoading(false);
            setSubmitting(false);
        }
    };

    //formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: initialValue,
            validationSchema: emailSchema,
            onSubmit: handleSendLink,
        });
    return (
        <Spin spinning={loading} size="large" indicator={<IconLoadingPage />}>
            <StyledLayout>
                <StyledForgotPassword>
                    <div className="recover_password main-color">{t("page.recover_password")}</div>

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
                        <AuthButton
                            type="primary"
                            size="large"
                            text={t("page.email_recover_link")}
                            // className="custom_btn"
                            htmlType="submit"
                            disable={isSubmitting}
                        />
                        <div onClick={routeLogin} className="return_login">
                            {t("page.return_login")}
                        </div>
                    </form>
                </StyledForgotPassword>
            </StyledLayout>
        </Spin>
    );
};
const StyledLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
