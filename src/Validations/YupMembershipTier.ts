import { enumValidation } from "@configs";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const YupMembershipTier = () => {
    const { t } = useTranslation();

    return {
        membershipName: Yup.string()
            .trim()
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("object.membership_name"),
                })
            )
            .max(
                enumValidation.MAX_50,
                t("validation.max", {
                    returnObjects: true,
                    name: t("object.membership_name"),
                    number: enumValidation.MAX_50,
                })
            ),
        bahtSpent: Yup.number()
            .typeError(
                t("validation.must_number", {
                    returnObjects: true,
                    name: t("object.baht_spent"),
                })
            )
            .required(
                t("validation.required", {
                    returnObjects: true,
                    name: t("object.baht_spent"),
                })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: t("object.baht_spent"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: t("object.baht_spent"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
        points: Yup.number()
            .typeError(
                t("validation.must_number", {
                    returnObjects: true,
                    name: t("object.point_threshold"),
                })
            )
            .required(
                t("validation.required", { returnObjects: true, name: t("object.point_threshold") })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: t("object.points"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: t("object.points"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
        pointThreshold: Yup.number()
            .typeError(
                t("validation.must_number", {
                    returnObjects: true,
                    name: t("object.point_threshold"),
                })
            )
            .required(
                t("validation.required", { returnObjects: true, name: t("object.point_threshold") })
            )
            .max(
                enumValidation.MAX_NUMBER,
                t("validation.max_number", {
                    returnObjects: true,
                    name: t("object.point_threshold"),
                    number: enumValidation.MAX_NUMBER,
                })
            )
            .min(
                enumValidation.MIN_NUMBER,
                t("validation.min_number", {
                    returnObjects: true,
                    name: t("object.point_threshold"),
                    number: enumValidation.MIN_NUMBER,
                })
            ),
    };
};
