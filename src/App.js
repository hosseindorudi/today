import React, { useEffect, useState } from 'react'
import { languages } from './assets/languages/languages';
import './App.css';
import Sidebar from './Components/sidebar/sidebar';
import MainTabPage from './Components/Tabs/MainTabPage';
import FormTabsContext from './contexts/FormTabsContex';
import i18next from 'i18next'
function App() {
  const [selectedForms, setSelectedForms] = useState([{name:'پروفایل',key:"profile"}]);
  // const currentLanguageCode = localStorage.getItem('i18nextLng') || 'fa'
  // const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
 

  const handleChangeLanguage=(lang)=>{
    i18next.changeLanguage(lang.code)
    document.body.dir = lang.dir || 'ltr'
    document. documentElement. setAttribute("lang", lang.code)
  }
  

 

  return (
    <FormTabsContext.Provider value={{selectedForms,setSelectedForms}}>
    <div className="App">
      {languages.map((lang)=>(
        <button onClick={()=> handleChangeLanguage(lang)}>{lang.name}</button>
      ))}
      {/* <MainTabPage /> */}
      <Sidebar />
    </div>
    </FormTabsContext.Provider>
  );
}

export default App;
