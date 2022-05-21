import React, { useEffect, useState } from "react";
import { languages } from "./assets/languages/languages";
import "./assets/css/App.css";
import Admin from './layouts/Admin'
import { Route, Routes } from "react-router-dom";
import AppContext from "./contexts/AppContext";

function App() {
  const [app, setApp] = useState({
    forms:[],
    activeTab:"",
    lang:''
});
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "fa";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.documentElement.setAttribute("lang", currentLanguage.code);
    setApp((prev) => ({ ...prev, lang: currentLanguage.code }));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignFont = () => {
    return currentLanguage.dir ? "fontFa" : "fontEn";
  };
 

  return (
    <div className={"App " + assignFont()}>
      <AppContext.Provider value={{ app, setApp }}>
          <Routes>
          <Route path="/" element={<Admin />} />
          <Route
            path="*"
            element={
              
                <p>There's nothing here!</p>
              
            }
          />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;



