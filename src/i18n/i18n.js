import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./eng.json";
import Vietnamese from "./vie.json";

const resources = {
    eng: {
        translation: English,
    },
    vie: {
        translation: Vietnamese,
    },
};
const language = JSON.parse(localStorage.getItem("language"));
i18n.use(initReactI18next).init({
    resources,
    lng: language,
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
