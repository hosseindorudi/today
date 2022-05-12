import React, { useEffect, useState } from 'react'
import { languages } from './assets/languages/languages';
import './assets/css/App.css';
import Sidebar from './Components/sidebar/sidebar';
// import MainTabPage from './Components/Tabs/MainTabPage';
import FormTabsContext from './contexts/FormTabsContex';
import i18next from 'i18next'
function App() {
  const [selectedForms, setSelectedForms] = useState([{name:'پروفایل',key:"profile"}]);
  const[language,setLang]=useState()
  const currentLanguageCode = localStorage.getItem('i18nextLng') || 'fa'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
 

  const handleChangeLanguage=(lang)=>{
    i18next.changeLanguage(lang.code)
    setLang(lang.code)
    document.body.dir = lang.dir || 'ltr'
    document.documentElement.setAttribute("lang", lang.code)
    var element=document.getElementById("sidebarNav")
    element.classList.add(lang.dir?"sidebarNavRTL":"sidebarNavLTR")
    return language
  }

  useEffect(()=>{
    document.body.dir = currentLanguage.dir || 'ltr'
    document.documentElement.setAttribute("lang", currentLanguage.code)
    setLang(currentLanguage.code)
   var element=document.getElementById("sidebarNav")
    element.classList.add(currentLanguage.dir?"sidebarNavRTL":"sidebarNavLTR")
    document.getElementsByTagName("body")[0].style =currentLanguage.dir?'IRANSansFa, serif':'IRANSansEn,serif'
  },[currentLanguage.code,currentLanguage.dir])

  const assignFont=()=>{
  return currentLanguage.dir?"fontFa":"fontEn"
  }

  return (
    <FormTabsContext.Provider value={{selectedForms,setSelectedForms}}>
    <div className={"App "+assignFont()}>
      {languages.map((lang)=>(
        <button key={lang.code} onClick={()=> handleChangeLanguage(lang)}>{lang.name}</button>
      ))}
      
      {/* <MainTabPage /> */}
      <Sidebar />
    </div>
    </FormTabsContext.Provider>
  );
}

export default App;
