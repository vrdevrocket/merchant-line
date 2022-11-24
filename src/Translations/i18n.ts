import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";

import { TRANSLATIONS_TH, TRANSLATIONS_EN } from ".";
// import { DEFAULT_LANGUAGE } from "@configs";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: {
            format: function (value, format) {
                if (value instanceof Date) return moment(value).format(format);
                return value;
            },
        },
        resources: {
            en: {
                translation: TRANSLATIONS_EN,
            },
            th: {
                translation: TRANSLATIONS_TH,
            },
        },
    });

// i18n.changeLanguage(DEFAULT_LANGUAGE);
