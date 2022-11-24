import { Form, Spin } from "antd";
import { FormikHelpers, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useState } from "react";
import { useHistory, useParams } from "react-router";

import { IconLoadingPage, ShareButton, SharedInput, StyledUpdatePassword } from "@components";
import { ICreatePassword, INitCreatePassword } from "@interfaces";
import { authApi } from "@api";
import { PATH_LOGIN } from "@configs";
import { showErrorMessage, useNotify } from "@utils";

const initialValue: INitCreatePassword = {
    password: "",
    confirmPassword: "",
};

export const PageResetPassword = () => {
    //page Hooks
    const { t } = useTranslation();
    const history = useHistory();
    const { success, error } = useNotify();
    const { resetPasswordId } = useParams<{ resetPasswordId: string }>();
    //page state
    const [loading, setToggleLoading] = useState<boolean>(false);

    // page variable
    const updateSchema = Yup.object().shape({
        password: Yup.string().required(
            t("validation.required", {
                returnObjects: true,
                name: t("page.new_password"),
            })
        ),
        confirmPassword: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.new_confirm_password"),
                })
            )
            .oneOf([Yup.ref("password"), null], t("validation.password_must_match")),
    });

    const href = window.location.href;
    const url = new URL(href);
    const email = url.searchParams.get("email");

    const handleResetPassword = async (
        values: INitCreatePassword,
        { setSubmitting }: FormikHelpers<INitCreatePassword>
    ) => {
        try {
            const valuesCreate: ICreatePassword = {
                resetPasswordId: resetPasswordId,
                password: values.password,
            };
            setToggleLoading(true);
            const res = await authApi.resetPassword(valuesCreate);
            if (res.data.success) {
                success(t("message.auth.reset_password_successfully"));
                history.push(PATH_LOGIN);
            }
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.reset_password_fail"));
        } finally {
            setSubmitting(false);
            setToggleLoading(false);
        }
    };

    //formik
    const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
        useFormik({
            initialValues: initialValue,
            validationSchema: updateSchema,
            onSubmit: handleResetPassword,
        });

    return (
        <Spin spinning={loading} size="large" indicator={<IconLoadingPage />}>
            <StyledUpdatePassword>
                <div className="title_welcome main-color">{t("page.reset_password")}</div>
                <div className="signing">
                    {t("signing")} {email}{" "}
                </div>
                <form onSubmit={handleSubmit}>
                    <Form.Item colon={false} label={t("page.new_password")} className="main-color">
                        <SharedInput
                            name="password"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={values.password}
                            onBlur={handleBlur}
                            type="password"
                            errors={errors.password}
                            touched={touched.password}
                        />
                    </Form.Item>
                    <Form.Item
                        colon={false}
                        label={t("page.new_confirm_password")}
                        className="main-color"
                    >
                        <SharedInput
                            name="confirmPassword"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            type="password"
                            errors={errors.confirmPassword}
                            touched={touched.confirmPassword}
                        />
                    </Form.Item>
                    <ShareButton
                        type="primary"
                        size="large"
                        text={t("page.continue")}
                        htmlType="submit"
                        disable={isSubmitting}
                    />
                </form>
            </StyledUpdatePassword>
        </Spin>
    );
};
