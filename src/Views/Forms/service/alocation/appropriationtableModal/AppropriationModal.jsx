import { useState } from 'react'
import './appropriationModal.css'

const tech = [
    'فرشید اسکندری',
    'الهه عبدلی',
    'نوید  معصومی راد',
    'رضا اسکندری',
    'منصور ناظمی',
    'بهزاد کوشکی',
    'سپهر عزی',
    'عاطفه زعیمی',
    'امیر علی علی زاده'
]

const AppropriationModal = ({setIsAppropriationModal,rowValus, setTechSelected}) => {
    
  return (
    <div className="tableModalParebtDelete" >
        <div className="tableModalContainerDelete">
            <div className="tableModalHeaderDelete">
              <h1 className="tableModalHeadingDelete">انتخاب تکنسین</h1>
            </div>
            <button className="closeBtnDelete" onClick={()=>{setIsAppropriationModal(false);setTechSelected([])}}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className="tableModalContentDelete">
            
              <form action="" className='tableModalFormDelete'>
                <div className="divForInputs">
                    {tech.map((t,i) => (
                        <div className='finalDivinput'>
                            <label htmlFor={`html_${i}`}>{tech[i]}</label>
                            <input type="radio" id={`html_${i}`} name="fav_tech" key={i} value={tech[i]} onChange={()=> setTechSelected([rowValus.id, tech[i]])}/>
                        </div>
                    ))}
                </div>
                <div className="submitBTNDivDelete">
                  <input type="submit" value="ارسال" className='tableModalSumitBtnModalSubmit'/>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default AppropriationModal