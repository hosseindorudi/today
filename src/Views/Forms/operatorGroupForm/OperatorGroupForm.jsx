import React from 'react'
import './operatorGroupForm.css'
import { useTranslation } from 'react-i18next';

const switchToggleBtn = {
    
}
const OperatorGroupForm = () => {
    const {t}=useTranslation()

  return (
      <div className='OperatorGroupForm'>
          <h1 className='OperatorGroupFormTitle'>{t("operatorGroupFormHeader")}</h1>
          <div className="OperatorGroupFormMainDiv">
            
            <form action='' className='OperatorGroupFormform' >
                <div class="switch-holder">
                    
                    <div class="switch-toggle">
                        <input type="checkbox" id="bluetooth"/>
                        <label for="bluetooth"></label>
                    </div>
                </div>
                <div className="inputDiv">
                    <label htmlFor="OperatorGroupFormInputTitle1">{t("operatorGroupFormTitle")}:</label>
                    <input type="text" className="OperatorGroupFormInputTitle" id='OperatorGroupFormInputTitle1' />
                </div>
                <div className="inputDivDesc">
                    <label htmlFor="OperatorGroupFormInputDesc">{t("operatorGroupFormDesc")}:</label>
                    <textarea type="text" className="OperatorGroupFormInputDesc" id='OperatorGroupFormInputDesc' />
                </div>

                <input type="submit" value={t("operatorGroupFormSubmit")} className='deleteBtn'></input>

            </form>
        </div>
    </div>
  )
}

export default OperatorGroupForm