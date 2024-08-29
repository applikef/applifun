import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTrans from "./../assets/i18n/en.json";
import heTrans from "./../assets/i18n/he.json";

const resources = {
  en: {
    translation: enTrans
  },
  he: {
    translation: heTrans
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "he", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
});

export default i18n;