
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { HashRouter} from 'react-router-dom';
import BackDrop from './Components/backDrop/BackDrop';
import ErrorBoundary from './Components/errorBoundary/ErrorBoundary'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
const root = ReactDOM.createRoot(document.getElementById('root'));


i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fa','de','fr','zh','ru'],
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
root.render(
  
  <ErrorBoundary>
  
  <Suspense fallback={ <BackDrop open={true}/>}>
  <HashRouter>
  <DndProvider backend={HTML5Backend}>

    <App />
    </DndProvider>
  </HashRouter>
  </Suspense>
  </ErrorBoundary>
 
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// serviceWorkerRegistration.register();