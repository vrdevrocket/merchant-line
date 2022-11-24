import { enumValidation } from "@configs";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const YupSignUpMethodField = () => {
    //page hook
    const { t } = useTranslation();

    return {
        fieldName: Yup.string()
            .trim()
            .required(
                t("validation.required", {
                    name: t("object.field_name"),
                })
            )
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validation.max", {
                    name: t("object.field_name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),

        propertyName: Yup.string()
            .trim()
            .required(
                t("validation.required", {
                    name: t("object.property_name"),
                })
            )
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validation.max", {
                    name: t("object.property_name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),
    };
};
