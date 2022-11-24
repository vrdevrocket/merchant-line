import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";

const coupon = "page.";
const field_card = "page.";

export const YupCoupon = () => {
    //page hook
    const { t } = useTranslation();

    const convertTranslationCoupon = (value: string) => {
        return t(coupon + value);
    };

    const convertTranslation = (value: string) => {
        return t(field_card + value);
    };

    return {
        name: Yup.string()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_name"),
                })
            )
            .max(
                enumValidation.MAX_50,
                t("validation.max", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_name"),
                    number: enumValidation.MAX_50,
                })
            ),
        code: Yup.string()
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: convertTranslationCoupon("coupon_code"),
            //     })
            // )
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validation.max_length", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_code"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),

        benefit: Yup.number()
            .typeError(t("validation.is_Number"))
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_benefit"),
                })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_benefit"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslationCoupon("coupon_benefit"),
                    number: enumValidation.NUMBER_ONE,
                })
            ),

        unit: Yup.string().required(
            t("validation.required", {
                returnObjects: true,
                name: convertTranslationCoupon("unit"),
            })
        ),

        levelIds: Yup.array().min(
            enumValidation.NUMBER_ONE,
            t("validation.required", {
                returnObjects: true,
                name: convertTranslation("membership"),
            })
        ),
        quantity: Yup.number()
            .typeError(t("validation.is_Number"))
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: convertTranslationCoupon("quantity_limit"),
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
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.NUMBER_ONE,
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
                enumValidation.NUMBER_ONE,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslation("quantity_limit"),
                    number: enumValidation.NUMBER_ONE,
                })
            ),
        guideline: Yup.string()
            // .required(
            //     t("validation.required", {
            //         returnObjects: true,
            //         name: convertTranslationCoupon("coupon_guideline"),
            //     })
            // )
            .min(
                enumValidation.MIN_LENGTH_CKEDITOR,
                t("validation.min_number", {
                    returnObjects: true,
                    name: convertTranslation("coupon_guideline"),
                    number: enumValidation.LENGTH_2,
                })
            ),
    };
};
