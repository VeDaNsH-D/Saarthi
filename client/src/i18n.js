import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en.json';
import ml from './translations/ml.json';
import hi from './translations/hi.json';
import bn from './translations/bn.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      ml: { translation: ml },
      hi: { translation: hi },
      bn: { translation: bn }
    }
  });

export default i18n;
