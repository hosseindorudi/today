import './admitionFirstForm.css'

import { phoneNumberValidation,idCodeValidation } from '../../../../validation/validation'
import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { enums } from '../../../../data/Enums'
import AmitionFinalForm from './AmitionFinalForm'
import { TabContext } from '../../../../contexts/TabContextProvider'
import useAxios from '../../../../customHooks/useAxios'
import useRequest from '../../../../customHooks/useRequest'
import { useTranslation } from 'react-i18next'
import { customerCreate } from '../../../../services/customerService'
const AdmitionFirstForm = () => {
    const [type, setType] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [idCode, setIdCode] = useState("")
    const [phoneValidate, setPhoneValidate] = useState(true)
    const [idCodeValidate, setIdCodeValidate] = useState(true)
    const tabContext = useContext(TabContext);
    const abortController = new AbortController();
    const [response, loading, fetchData, setResponse] = useAxios();
    const request = useRequest();
    const {t} = useTranslation();

    var randomVal = Math.floor(1000 + Math.random() * 9000);

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

      const handleFunctions = (type) => {
        switch (type) {
            case "CreateCustomer":
                setType("CreateCustomer")
                fetchData({
                    method: "POST",
                    url: customerCreate,
                    headers: {
                      accept: "*/*",
                    },
                    data: {
                      Id: 0,
                      Group_Id: 1,
                      Language_EId: 1,
                      IsActive: true,
                      CustomerName: `${randomVal}_${idCode}`,
                      Password: phoneNumber.toString(),
                      IdCardNumber: idCode,
                      FirstName: "Firstname",
                      LastName: "LastName",
                      Gender: true,
                      Mobile1: phoneNumber,
                      Mobile2: "09120000000",
                      Phone: "07137659874",
                      Fax: "Fax",
                      Email: "Email@Email.com",
                      ExpireDate: "2022-06-22T10:30:26.361Z",
                      Description: "Description",
                      SourceType: 0,
                      Registrar: 0,
                      DateSet: "2022-06-22T10:30:26.361Z",
                      Group_Title: "",
                      Request: request},
                    signal:abortController.signal,
                  })
                break;
            
            
            default:
                break;
        }
    }

    const handleSeccess=(message)=>{
    
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }


      useEffect(()=> {
        if (response){
        response.Result?handleResponse(response,type):handleError(response.Message)          
        }
    },[response])


    const handleResponse=(response,type)=>{
      switch (type) {
        
        case "CreateCustomer":
              console.log(response.Title)
              handleSeccess("مشتری جدید ساخته شد")
              setResponse(undefined)
              handleClickMenu();
              
          break;
        default:
          break;
      }
    }

    const handleError = (message) => {
        toast.error(message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        idCodeValidation(idCode) ?  setIdCodeValidate(true) : setIdCodeValidate(false);

        phoneNumber.match(phoneNumberValidation) ? setPhoneValidate(true) : setPhoneValidate(false);
        

        (!phoneNumber.match(phoneNumberValidation) & !idCodeValidation(idCode) ) ? handleError("شماره تماس و شماره ملی نامعتبر است") :  handleFunctions("CreateCustomer") ;

        


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