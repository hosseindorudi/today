import './admitionFirstForm.css'

import { phoneNumberValidation,idCodeValidation } from '../../../../validation/validation'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { enums } from '../../../../data/Enums'
import AmitionFinalForm from './AmitionFinalForm'
import { TabContext } from '../../../../contexts/TabContextProvider'

const AdmitionFirstForm = () => {

    const [phoneNumber, setphoneNumber] = useState("")
    const [idCode, setIdCode] = useState("")
    const [phoneValidate, setPhoneValidate] = useState(true)
    const [idCodeValidate, setIdCodeValidate] = useState(true)
    const tabContext = useContext(TabContext);


    const handleClickMenu = () => {
        tabContext.addRemoveTabs(
          {
            title: "routes.admitionFirstForm",
            path: "/admissionForm",
            Component:AdmitionFirstForm,
            access: enums.AfterSales_New_Admission_Create_w,
          }
          , "remove");
        tabContext.addRemoveTabs(
          
          {
            title: "routes.admissionForm",
            path: "/admissionFinal",
            Component: AmitionFinalForm,
          }
          
          , "add");
      };



    const handleError = (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        idCodeValidation(idCode) ?  setIdCodeValidate(true) : setIdCodeValidate(false);

        phoneNumber.match(phoneNumberValidation) ? setPhoneValidate(true) : setPhoneValidate(false);
        

        (!phoneNumber.match(phoneNumberValidation) & !idCodeValidation(idCode) ) ? handleError("شماره تماس و شماره ملی نامعتبر است") :  handleClickMenu() ;


    }

    
    
  return (
    <div className="admitionFirstFormMainDiv">
        <h1 className="mainFormTitle">
            ورود به فرم پذیرش
        </h1>
        <div className="imeimainDiv">
            <lable className="imeiLabel">شماره تماس را وارد کنید</lable>
            <input type="number" className="imeiInput" value={phoneNumber}  onChange={(e)=> setphoneNumber(e.target.value)}/>
        </div>
        <div className="idCodeMainDiv">
            <lable className="idCodeLabel">شماره ملی را وارد کنید</lable>
            <input type="number" className="idCodeInput" value={idCode}  onChange={(e)=> setIdCode(e.target.value)}/>
        </div>
        <div className="firstFormButtons">
          <button className='admitionFirstFormSubmit' onClick={handleSubmit}>ارسال</button>
          <button className="admitionFirstFormCreate" >ثبت نام</button>
        </div>
    </div>
  )
}

export default AdmitionFirstForm