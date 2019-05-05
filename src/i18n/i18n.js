import i18next from 'i18next';
import {
  reactI18nextModule
} from 'react-i18next';
import { en, es } from './locales';

i18next
  .use(reactI18nextModule)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      // React already does escaping
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
  })

export default i18next;
