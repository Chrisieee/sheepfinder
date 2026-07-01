import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./app/languages/en/translation.json";
import nl from "./app/languages/nl/translation.json";
import jp from "./app/languages/jp/translation.json";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "nl",
        debug: true,

        resources: {
            en: {translation: en},
            nl: {translation: nl},
            jp: {translation: jp}
        },

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;