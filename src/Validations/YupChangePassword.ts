import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const YupChangePassword = () => {
    const { t } = useTranslation();

    return {
        currentPassword: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.current_password"),
                })
            )
            .min(
                6,
                t("validation.min", {
                    returnObjects: true,
                    name: t("page.current_password"),
                    number: 6,
                })
            )
            .max(
                16,
                t("validation.max", {
                    returnObjects: true,
                    name: t("page.current_password"),
                    number: 16,
                })
            ),
        newPassword: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.new_password"),
                })
            )
            .max(
                16,
                t("validation.max", {
                    returnObjects: true,
                    name: t("page.new_password"),
                    number: 16,
                })
            )
            .min(
                6,
                t("validation.min", {
                    returnObjects: true,
                    name: t("page.new_password"),
                    number: 6,
                })
            ),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], t("validation.password_must_match"))
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("page.confirm_new_password"),
                })
            ),
    };
};
