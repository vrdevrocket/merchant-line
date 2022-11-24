import { REGEX_URL } from "@configs";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const YupIntegration = () => {
    //page hook
    const { t } = useTranslation();

    return {
        lineMessaging: Yup.object({
            accessToken: Yup.string().trim(),
        }),
        lineLoginApi: Yup.object({
            channelID: Yup.string(),
            liffUrl: Yup.string().trim().matches(REGEX_URL, t("validation.correct_url")),
        }),
    };
};
