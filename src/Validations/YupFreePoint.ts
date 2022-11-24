import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";
const free_point = "page.";
const field_card = "page.";

export const YupFreePoint = () => {
    //page hook
    const { t } = useTranslation();

    const convertTranslationPoint = (value: string) => {
        return t(free_point + value);
    };

    const convertTranslation = (value: string) => {
        return t(field_card + value);
    };

    return {
        name: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: convertTranslationPoint("free_point_name"),
                })
            )
            .max(
                enumValidation.MAX_50,
                t("validation.max_length_number", {
                    returnObjects: true,
                    name: convertTranslationPoint("free_point_name"),
                    number: enumValidation.MAX_50,
                })
            ),
        point: Yup.number()
            .typeError(t("validation.is_Number"))
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: convertTranslationPoint("points"),
                })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: convertTranslationPoint("points"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslationPoint("points"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
        quantity: Yup.number()
            .typeError(t("validation.is_Number"))
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: convertTranslation("quantity_limit"),
            //     })
            // )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
        limit: Yup.number()
            .typeError(t("validation.is_Number"))
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: convertTranslation("quantity_limit_user_required"),
            //     })
            // )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
    };
};
