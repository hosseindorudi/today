import React, { useEffect, useState } from "react";
import { languages } from "./assets/languages/languages";
import "./assets/css/App.css";
import Admin from "./layouts/Admin";
import { Route, Routes } from "react-router-dom";
import AppContext from "./contexts/AppContext";
import Auth from "./layouts/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagenotfound from "./Components/404/Pagenotfound";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import TabContextProvider from "./contexts/TabContextProvider";

function App() {
  const [app, setApp] = useState({
    forms: [],
    activeTab: "",
    lang: "",
    langCode: "",
    sidebarOpen: false,
    langOpen:false,
    logOutOpen:false
  });
  const currentLanguageCode = localStorage.getItem("i18nextLng") || "fa";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.documentElement.setAttribute("lang", currentLanguage.code);
    setApp((prev) => ({
      ...prev,
      lang: currentLanguage.code,
      langCode: currentLanguage.no,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assignFont = () => {
    return currentLanguage.dir ? "fontFa" : "fontEn";
  };

  return (
    <div className={"App " + assignFont()}>
      <AppContext.Provider value={{ app, setApp }}>
        <TabContextProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Admin />} />
          </Route>
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        <ToastContainer rtl={currentLanguage.dir ? true : false} />
        </TabContextProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
