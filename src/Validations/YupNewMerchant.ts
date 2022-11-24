import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation } from "@configs";

export const YupNewMerchant = () => {
    //page hook
    const { t } = useTranslation();
    // firstAdminName: "",
    // name: "",
    // businessName: "",
    // businessTypeName: "",
    // businessTel: "",
    // staffAmount: enumStaffAmount.ONETO49,
    // expLoyaltyHub: enumExpLoyaltyHub.NEW_LOYALTY,
    return {
        name: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.program"),
            })
        ),
        businessName: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.full_name"),
            })
        ),
        firstAdminName: Yup.string().required(
            t("validation.required", {
                name: t("page.new_account.full_name"),
            })
        ),
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
