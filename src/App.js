import React, { useEffect, useState } from "react";
import { languages } from "./assets/languages/languages";
import "./assets/css/App.css";
import "./assets/css/periorityForm.css";
import "./assets/css/admission.css";
import Admin from "./layouts/Admin";
import { Route, Routes, useLocation } from "react-router-dom";
import AppContext from "./contexts/AppContext";
import Auth from "./layouts/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagenotfound from "./Components/404/Pagenotfound";

import TabContextProvider from "./contexts/TabContextProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import RequireAuth from "./Components/RequireAuth";
import OsInformationProvider from "./contexts/OsInformationProvider";
import QuestionPage from "./questionPage/QuestionPage";
import { checkBoolean } from "./validation/validation";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {

  const search = useLocation().search;
  const typeOfUser = new URLSearchParams(search).get("type");
  const [app, setApp] = useState({
    forms: [],
    activeTab: "/dashboard",
    title: "dashboard",
    lang: "",
    langCode: "",
    sidebarOpen: false,
    SafeMode: localStorage.getItem("SafeMode")
      ? checkBoolean(localStorage.getItem("SafeMode"))
      : false,
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
      type: typeOfUser ? typeOfUser : undefined,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const assignFont = () => {
    return currentLanguage.dir ? "fontFa" : "fontEn";
  };
  const theme = createTheme({
    typography: {
      "fontFamily": currentLanguage.dir? `'IRANSansFa',serif` : `'IRANSansEn',serif `
     }
  });
  return (
    <div className={"App " + assignFont()}>
      <ThemeProvider theme={theme}>
      <OsInformationProvider>
        <AuthProvider>
          <AppContext.Provider value={{ app, setApp }}>
            <TabContextProvider>
              <Routes>
                <Route exact path="/poll" element={<QuestionPage />} />

                <Route path="/auth" element={<Auth />} />

                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Admin />} />
                </Route>

                <Route path="*" element={<Pagenotfound />} />
              </Routes>

              <ToastContainer rtl={currentLanguage.dir ? true : false} />
            </TabContextProvider>
          </AppContext.Provider>
        </AuthProvider>
      </OsInformationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
