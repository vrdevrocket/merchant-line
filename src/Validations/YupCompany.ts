import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";

export const YupCompany = () => {
    //page hook
    const { t } = useTranslation();

    return {
        name: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.program"),
            })
        ),
        firstAdminName: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.full_name"),
            })
        ),
        // firstAdminEmail
        firstAdminEmail: Yup.string()
            .required(t("validation.required", { name: t("object.email") }))
            .email(t("validation.invalid_type.email")),
        businessTypeName: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.business_name"),
            })
        ),
        businessTel: Yup.string()
            .required(
                t("validation.required", {
                    name: t("page.telephone"),
                })
            )
            .trim()
            .matches(/^[0-9]*$/, "phone number is not valid")
            .min(
                enumValidation.MIN_PHONE_NUMBER,
                t("validation.min_number", {
                    name: t("object.phoneNumber"),
                    number: enumValidation.MIN_PHONE_NUMBER,
                })
            )
            .max(
                enumValidation.MAX_PHONE_NUMBER,
                t("validation.max_number", {
                    name: t("object.phoneNumber"),
                    number: enumValidation.MAX_PHONE_NUMBER,
                })
            ),
        staffAmount: Yup.string().required(
            t("validation.required", {
                name: t("page.benefit_name"),
            })
        ),
        expLoyaltyHub: Yup.string().required(
            t("validation.required", {
                name: t("page.benefit_name"),
            })
        ),
    };
};
