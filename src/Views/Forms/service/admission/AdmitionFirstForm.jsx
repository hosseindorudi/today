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
            path: "/addmitionFirstForm",
            Component:AdmitionFirstForm,
            access: enums.admitionfirstForm,
          }
          , "remove");
        tabContext.addRemoveTabs(
          
          {
            title: "routes.admissionForm",
            path: "/admissionForm",
            Component: AmitionFinalForm,
            access: enums.Definition_AccessoriesInAdmission_Read_r,
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
        
        (!phoneValidate & idCodeValidate)  ? handleError("شماره تماس نامعتبر است") : (phoneValidate & !idCodeValidate) ? handleError("شماره ملی نامعتبر است")
        : (!phoneValidate & !idCodeValidate) ? handleError("شماره تماس و شماره ملی نامعتبر است") : handleClickMenu();


    }

    
    
  return (
    <div className="admitionFirstFormMainDiv">
        <h1 className="mainFormTitle">
            ورود به فرم پذیرش
        </h1>
        <div className="imeimainDiv">
            <lable className="imeiLabel">شماره تماس را وارد کنید</lable>
            <input type="number" className="imeiInput"   onChange={(e)=> setphoneNumber(e.target.value)}/>
        </div>
        <div className="idCodeMainDiv">
            <lable className="idCodeLabel">شماره ملی را وارد کنید</lable>
            <input type="number" className="idCodeInput"  onChange={(e)=> setIdCode(e.target.value)}/>
        </div>
        <button className='admitionFirstFormSubmit' onClick={handleSubmit}>ارسال</button>
    </div>
  )
}

export default AdmitionFirstForm