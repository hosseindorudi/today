
import i18next from 'i18next'
import React, { useContext, useState } from 'react'
import { languages } from '../../assets/languages/languages'
import AppContext from '../../contexts/AppContext';

const Language = () => {
    const [open, setOpen] = useState(false);
    const { setApp } = useContext(AppContext);
    const language=localStorage.getItem("i18nextLng")

    const click=()=>{
        setOpen(!open)
    }
    const handleChangeLanguage=(code,dir)=>{
        i18next.changeLanguage(code);
        setApp((prev) => ({ ...prev, lang: code }));
        document.body.dir = dir || "ltr";
        document.documentElement.setAttribute("lang",code);
    }
  return (
    <div className="forthIcon" onClick={click}>
    <div className='flagReletive'>
        <i className="fa fa-flag" aria-hidden="true"></i>
            <div className="dropdown-content-flag" style={{display : open ? 'flex' : 'none'}}>
            {languages.map((lang,i)=>(
                <div className='languageBtn' key={i}>
                    <button className='dropDownFlagLink' onClick={()=>handleChangeLanguage(lang.code,lang.dir)} disabled={language===lang.code?true:false}>{lang.name}</button>
                </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default Language