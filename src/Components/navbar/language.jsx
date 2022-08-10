
import i18next from 'i18next'
import React, {  useContext, useEffect, useRef, useState } from 'react'
import { languages } from '../../assets/languages/languages'
import AppContext from '../../contexts/AppContext'


import images from '../../assets/flags'

const Language = () => {
    const [open, setopen] = useState(false)
    const {setApp} = useContext(AppContext)
    const language=localStorage.getItem("i18nextLng")
    const ref=useRef()

    const chooseImage = (title) => {
        let a ;
        switch (title) {
            case 'iran':
                a= <img src={images.iran} alt={`${title}`}/>
                break;
            case 'arab':
                a= <img src={images.arab} alt={`${title}`}/> 
                break;
            case 'english':
                a= <img src={images.english} alt={`${title}`}/> 
                break;
            case 'germany':
                a= <img src={images.germany} alt={`${title}`}/> 
                break;
            case 'france':
                a= <img src={images.france} alt={`${title}`}/> 
                break;
            case 'russia':
                a= <img src={images.russia} alt={`${title}`}/> 
                break;
            case 'chinese':
                a= <img src={images.chinese} alt={`${title}`}/> 
                break;
        
            default:
                break;
        }
        return a; 

    }


    const click=()=>{
       setopen(!open)
    }
    const handleClickOutside=(event)=>{
        if (
            ref.current &&
            !ref.current.contains(event.target)
          ) {
            setopen(false)
          }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
        
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleChangeLanguage=(code,dir,no)=>{
        i18next.changeLanguage(code);
        setApp((prev) => ({ ...prev, lang: code,langCode:no }));
        document.body.dir = dir || "ltr";
        document.documentElement.setAttribute("lang",code);
    }
  return (
  
    <div className="forthIcon" ref={ref}  onClick={click} >
    <div className='flagReletive'>
        <i className="fa fa-flag" aria-hidden="true"></i>
            <div className="dropdown-content-flag" style={{display : open ? 'flex' : 'none'}}>
            {languages.map((lang,i)=>(
                <>
                <div className='languageBtn' key={i}>
                    <button className='dropDownFlagLink' onClick={()=>handleChangeLanguage(lang.code,lang.dir,lang.no)} disabled={language===lang.code?true:false}>
                    {chooseImage(lang.country_image)}
                        {lang.name} 
                    </button>
                    
                </div>
                </>
            ))}
        </div>
    </div>
</div>

  )
}

export default Language