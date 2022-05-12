import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));


i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fa'],
    fallbackLng: 'fa',
    debug: false,
    // Options for language detector
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    react: { useSuspense: false, bindI18n: 'loaded languageChanged',
    bindI18nStore: 'added' },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })
  const loadingMarkup = (
    <div className="py-4 text-center">
      <h3>Loading..</h3>
    </div>
  )
root.render(
  <Suspense fallback={loadingMarkup}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
