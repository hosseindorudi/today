import { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { phoneNumberValidation,idCodeValidation } from '../../../../validation/validation'
import { enums } from '../../../../data/Enums'
import AmitionFinalForm from './AmitionFinalForm'
import { TabContext } from '../../../../contexts/TabContextProvider'
import useAxios from '../../../../customHooks/useAxios'
import useRequest from '../../../../customHooks/useRequest'
import { customerCreate } from '../../../../services/customerService'
import BackDrop from '../../../../Components/backDrop/BackDrop'

import { t } from 'i18next'
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
    // const {t} = useTranslation();

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
                      Group_Id: 5,
                      Language_EId: 1,
                      IsActive: true,
                      CustomerName: `${idCode}_${randomVal}`,
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
        response&&handleResponse(response,type)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[response])


    const handleResponse=(response,type)=>{
      switch (type) {
        
        case "CreateCustomer":
              console.log(response.Title)
              handleSeccess(t("admissionFirstForm1"))
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
        

        (!phoneNumber.match(phoneNumberValidation) & !idCodeValidation(idCode) ) ? handleError("admissionFirstForm2") :  handleFunctions("CreateCustomer") ;

        


    }

    
    
  return (
    <>
          {loading && <BackDrop open={true} />}


    <div className="admitionFirstFormMainDiv">
        <h1 className="mainFormTitle">
            {t("admissionFirstForm3")}
        </h1>
        <div className="imeimainDiv">
            <lable className="imeiLabel">{t("admissionFirstForm4")}</lable>
            <input type="number"  className={phoneValidate ? "imeiInput" : "imeiInput"} value={phoneNumber}   onChange={(e)=> setphoneNumber(e.target.value)}/>
        </div>
        <div className="idCodeMainDiv">
            <lable className="idCodeLabel">{t("admissionFirstForm5")}</lable>
            <input type="number" className={idCodeValidate ? "idCodeInput" : "idCodeInput"} value={idCode}  onChange={(e)=> setIdCode(e.target.value)}/>
        </div>
        <div className="firstFormButtons">
          <button className='admitionFirstFormSubmit' onClick={handleSubmit}>{t("operatorGroupFormSubmit")}</button>
          <button className="admitionFirstFormCreate" >{t("btn.signUp")}</button>
        </div>
    </div>

    </>
  )
}

export default AdmitionFirstForm