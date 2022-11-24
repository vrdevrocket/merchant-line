import { useTranslation } from "react-i18next";
import * as Yup from "yup";

import { enumValidation, REGEX_URL } from "@configs";

export const YupTrafficSource = () => {
    //page hook
    const { t } = useTranslation();

    return {
        name: Yup.string()
            .required(
                t("validation.required", {
                    name: t("page.reward_name"),
                })
            )
            .max(
                enumValidation.MAX_LENGTH_INPUT,
                t("validation.max", {
                    name: t("page.reward_name"),
                    number: enumValidation.MAX_LENGTH_INPUT,
                })
            ),
        url: Yup.string().matches(REGEX_URL, t("validation.must_be_a_valid_data_URL")),
        // .required(t("validation.lease_enter_website")),
    };
};
