import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";

export const YupContact = () => {
    //page hook
    const { t } = useTranslation();

    return {
        fullName: Yup.string()
            .trim()
            .required(t("validation.required", { name: t("object.name") })),
        email: Yup.string()
            .trim()
            // .required(t("validation.required", { name: t("object.email") }))
            .email(t("validation.invalid_type.email")),
        phoneNumber: Yup.string()
            .trim()
            // .required(
            //     t("validation.required", {
            //         name: t("object.phone_number"),
            //     })
            // )
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
    };
};
