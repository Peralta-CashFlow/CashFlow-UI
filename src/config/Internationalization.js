import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locale/en/translation.json";
import ptTranslation from "../locale/pt/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      pt: { translation: ptTranslation },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
  });

export default i18n;