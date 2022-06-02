import React, {useState, useContext} from 'react'
import './operator.css'

import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../contexts/AppContext';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form } from 'react-bootstrap';


const Operator = () => {
    const currentLang = useContext(AppContext);
    const [operatorDateExp, setOperatorDateExp] = useState(new Date());
    const {t} = useTranslation();
  return (
    <div className='OperatorForm'>
    <h1 className='OperatorFormTitle'>{t("operatorTitle")}</h1>
    <div className="OperatorFormMainDiv">
      
      <form action='' className='OperatorFormform' >
      <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
            />
          </div>
            <div className="inputDiv">
              <label htmlFor="OperatorFormInputTitle1">{t("operatorSelector")}</label>
                <select className="OperatorFormInputTitle" id='OperatorFormInputTitle1'>
                <option value="0">گروه1</option>
                <option value="1">گروه2</option>
                <option value="2">گروه3</option>
            </select>
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputName1">{t("operatorName")}</label>
                <input type="text" className="OperatorFormInputTitle" id='OperatorFormInputName1' />
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputPass1">{t("operatorPass")}</label>
                <input type="password" className="OperatorFormInputTitle" id='OperatorFormInputPass1' />
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputPhone1">{t("operatorPhoneNum")}</label>
                <input type="number" className="OperatorFormInputTitle" id='OperatorFormInputPhone1' />
            </div>
            <div className="inputDiv">
                <label id="OperatorFormInputExp1">{t("operatorDatePick")}</label>
                {currentLang.app.lang === 'fa' ?(
                  <div style={{direction: "ltr"}}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                        label="تاریخ شروع"
                        mask="____/__/__"
                        value={operatorDateExp}
                        onChange={(newValue) => {setOperatorDateExp(newValue)}}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>  

                    </div>
                ) : 
                (<div style={{direction: "ltr"}}>
                
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                          
                          inputFormat="MM/dd/yyyy"
                          value={operatorDateExp}
                          onChange={(newValue) => {setOperatorDateExp(newValue); console.log(newValue)}}
                          renderInput={(params) => <TextField {...params} />}
                        />
                  </LocalizationProvider>
                      </div>
                  )}
                           
              </div>
          

          <input type="submit" value={t("operatorSubmitBtn")} className='deleteBtn'></input>

      </form>
  </div>
</div>
  )
}

export default Operator