import i18next from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './translation/en.json';
import ruJSON from './translation/ru.json';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug:true,
        lng: 'ru',          
        resources: {
            ru: {...ruJSON},
            en: {...enJSON}
        }   
    })