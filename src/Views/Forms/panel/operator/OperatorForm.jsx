import React, {useState, useContext, useEffect} from 'react'
import './operator.css'
import { setDatePickerDate } from '../../../../validation/functions';
import TextField from '@mui/material/TextField';
import AdapterJalali from '@date-io/date-fns-jalali';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../../contexts/AppContext';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form } from 'react-bootstrap';
import useAxios from '../../../../customHooks/useAxios';
import useRequest from '../../../../customHooks/useRequest';
import { groupTitle, createOpt } from '../../../../services/operatorService';
import { toast } from 'react-toastify';
import BackDrop from '../../../../Components/backDrop/BackDrop';
import { enums } from '../../../../data/Enums'
import { TabContext } from '../../../../contexts/TabContextProvider';
import OperatorForm from './List/Operator'
const Operator = () => {
    const currentLang = useContext(AppContext);
    const [operatorDateExp, setOperatorDateExp] = useState(new Date());
    const {t} = useTranslation();
    const abortController = new AbortController();
    const [response, loading, fetchData, setResponse] = useAxios();
    const request = useRequest()
    const [groupTitles, setGroupTitles] = useState([])
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [selectGroup, setSelectGroup] =useState("")
    const [isActiv, setIsActive] = useState(true)
    const [titleG, setTitleG] = useState("")
    const [nameVal, setNameVal] = useState(true)
    const [passVal, setPassVal] = useState(true)
    const [passConfirmVal, setPassConfirmVal] = useState(true)
    const [phoneVal, setPhoneVal] = useState(true)
    const tabContext = useContext(TabContext);
    const namepattern = /^[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]{4,12}/
   

    const handleClickMenu = () => {
      tabContext.addRemoveTabs(
        {
          title: "routes.groupForm",
          path: "/operatorgroupcreate",
          Component:Operator,
          access: enums.Operator_Operator_Create_w,
        }
        , "remove");
      tabContext.addRemoveTabs(
        
        {
          title: "routes.operator",
          path: "/operator",
          Component: OperatorForm,
          access: enums.Operator_Operator_Read_r,
        }
        
        , "add");
    };

    
    
    useEffect(()=> {
      fetchData({
        method: "POST",
        url: groupTitle,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal:abortController.signal,
        
       
      })
      
    },[])

    const handleError = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    };

    const handleSeccess=(message)=>{
  
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    useEffect(()=> {
        if (response){
          (response.Result && response.Title) && setGroupTitles(response.Title) ;
          !response.Result && handleError(response.Message);
          (response.Result && response.Message === "Ok" && !response.Title) && handleSeccess(response.Message);
          (response.Result && response.Message === "Ok" && !response.Title) && handleClickMenu();
          
        }
        
    },[response])

    const handleSubmitForm = (e) => {
      e.preventDefault();
      if (nameVal && passConfirmVal && passVal && phoneVal)
     { fetchData({
        method: "POST",
        url: createOpt,
        headers: {
          accept: "*/*",
        },
        data: {
          
          Id:0,
          Group_Id: Number(selectGroup),
          Language_EId:0,
          IsActive:isActiv,
          OperatorName:name,
          Password:password,
          Mobile:phone,
          ExpireDate:"2022-06-16T05:34:40.867Z",
          Registrar:0,
          DateSet : "2022-06-16T05:34:40.867Z",
          Group_Title: "",
          Request: request,

        },
        signal:abortController.signal,
        
       
      })}

    }


    const handleSetName =(e) => {
        setName(e.target.value)
        
        
    }

    const handleBlureName =() => {
      !name && setNameVal(false)
      name && setNameVal(true)

    }
    
    const handleBlurePass =() => {
      !password && setPassVal(false)
      password && setPassVal(true)
    }
    const handleBlurePassConfirm =() => {
      setPassConfirmVal(password === confirmPassword)
    }
    const handleBlurePhone =() => {
      !phone && setPhoneVal(false)
      phone && setPhoneVal(true)
    }


  return (
    <>{loading && <BackDrop  open={true}/>}
    <div className='OperatorForm'>
    <h1 className='OperatorFormTitle'>{t("operatorTitle")}</h1>
    <div className="OperatorFormMainDiv">
      
      <form action='' className='OperatorFormform' onSubmit={handleSubmitForm}>
      <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
              value={isActiv}
              checked={isActiv}
              onChange={(e)=> setIsActive(!isActiv)}
            />
          </div>
            <div className="inputDiv">
              <label htmlFor="OperatorFormInputTitle1">{t("operatorSelector")}</label>
                <select className="OperatorFormInputTitle" id='OperatorFormInputTitle1' 
                  onChange={(e)=> {setSelectGroup(e.target.value)} }
                >
                
                {groupTitles.map((group, i) => (
                  <option key={i} value={group.Id}>{group.Value}</option>
                ))}

            </select>
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputName1">{t("operatorName")}</label>
                <input type="text" className={ nameVal ? "OperatorFormInputTitle" : "OperatorFormInputTitleFail"}  id='OperatorFormInputName1' value={name} onChange={(e) => handleSetName(e)} onBlur={handleBlureName}/>
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputPass1">{t("operatorPass")}</label>
                <input type="password" className={ passVal ? "OperatorFormInputTitle" : "OperatorFormInputTitleFail"} id='OperatorFormInputPass1' value={password} onChange={(e)=> setPassword(e.target.value)} onBlur={handleBlurePass}/>
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputPassConfirm">{t("operatorPass")}</label>
                <input type="password" className={ passConfirmVal ? "OperatorFormInputTitle" : "OperatorFormInputTitleFail"} id='OperatorFormInputPassConfirm' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} onBlur={handleBlurePassConfirm}/>
            </div>
            <div className="inputDiv">
                <label htmlFor="OperatorFormInputPhone1">{t("operatorPhoneNum")}</label>
                <input type="number" className={ phoneVal ? "OperatorFormInputTitle" : "OperatorFormInputTitleFail"} id='OperatorFormInputPhone1' value={phone} onChange={(e)=> setPhone(e.target.value)} onBlur={handleBlurePhone}/>
            </div>
            <div className="inputDiv">
                <label id="OperatorFormInputExp1">{t("operatorDatePick")}</label>
                {currentLang.app.lang === 'fa' ?(
                  <div style={{direction: "ltr"}}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                        <DatePicker
                        label="-"
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
</>
  )
}

export default Operator