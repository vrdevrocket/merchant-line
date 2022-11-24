import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";

export const YupBenefit = () => {
    //page hook
    const { t } = useTranslation();

    return {
        name: Yup.string()
            .required(
                t("validation.required", {
                    name: t("page.benefit_name"),
                })
            )
            .max(
                enumValidation.MAX_50,
                t("validation.max", {
                    name: t("page.benefit_name"),
                    number: enumValidation.MAX_50,
                })
            ),
        quantity: Yup.number()
            .typeError(t("validation.is_Number"))
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: t("page.quantity_limit"),
            //     })
            // )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    name: t("page.quantity_limit"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    name: t("page.quantity_limit"),
                    number: enumValidation.NUMBER_ONE,
                })
            ),
        limit: Yup.number()
            .typeError(t("validation.is_Number"))
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: t("page.quantity_limit_user_required"),
            //     })
            // )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    name: t("page.quantity_limit_user_required"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    name: t("page.quantity_limit_user_required"),
                    number: enumValidation.NUMBER_ONE,
                })
            ),
    };
};
