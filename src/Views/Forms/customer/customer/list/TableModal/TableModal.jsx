import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import * as bs from "react-icons/bs";
import * as fa from "react-icons/fa";
import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
import MapModal from "../../../../../../Components/GoogleMap/MapModal";
import { TextField } from "@mui/material";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { idCodeValidation, onlyNumberAndDot, phoneNumberValidation } from "../../../../../../validation/validation";
import { browser, radius } from "../../../../../../data/constants";
import useAxios from "../../../../../../customHooks/useAxios";
import { customerGroupReadTitle, groupUpdate } from "../../../../../../services/groupService";
import { setDatePickerDate } from "../../../../../../validation/functions";
import { customerUpdate } from "../../../../../../services/customerService";

const TableModal = (props) => {
  const values=props.rowValus
  const currentLang = useContext(AppContext);
  const [type, setType] = useState("");
  const [operatorDateExp, setOperatorDateExp] = useState(new Date());
  const {t} = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest()
  const [groupTitles, setGroupTitles] = useState([])
  const [groupTitleId, setGroupTitleId] = useState()
  const [isActive, setIsActive] = useState(true)
  const  [firstname, setFirstName] = useState("");
  const  [lastName, setLastName] = useState("");
  const  [name, setName] = useState("");
  const  [password, setpassword] = useState("");
  const  [idCode, setIdCode] = useState("");
  const  [gender, setGender] = useState(true);
  const  [phoneNumber1, setPhoneNumber1] = useState("");
  const  [phoneNumber2, setPhoneNumber2] = useState("");
  const  [housephone, setHousePhone] = useState("");
  const  [fax, setfax] = useState("");
  const  [description, setDescription] = useState("");
  const  [email, setEmail] = useState("");


  const getCustomerGroupTitle=()=>{
    setType("GROUPTITLE")
    fetchData({
      method: "POST",
      url: customerGroupReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal:abortController.signal,
      
     
    })
  }
  useEffect(() => {
     getCustomerGroupTitle()
     setName(values.CustomerName)
     setDescription(values.Description)
     setEmail(values.Email)
     setOperatorDateExp(new Date(values.ExpireDate))
     setfax(values.Fax)
     setGroupTitleId(values.Group_Id)
     setGender(values.Gender)
     setIdCode(values.IdCardNumber)
     setIsActive(values.IsActive)
     setLastName(values.LastName)
     setPhoneNumber1(values.Mobile1)
     setPhoneNumber2(values.Mobile2)
     setHousePhone(values.Phone)
     setFirstName(values.FirstName)


      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
    const handleError = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    };
    const handleResponse=(response,type)=>{
      switch (type) {
        case "GROUPTITLE":
        setGroupTitles(response.Title)
          break;
      
        default:
          break;
      }

    }

    useEffect(()=> {
      if (response){
        response.Result?handleResponse(response,type):handleError(response.Message)
        // (response.Result && response.Title) && setGroupTitles(response.Title) ;
        // (response.Result && response.Title) && setGroupTitleId(response.Title[0].Id) ;
        // !response.Result && handleError(response.Message);
        // (response.Result && response.Message === "Ok" && !response.Title) && handleSeccess(response.Message);
        // (response.Result && response.Message === "Ok" && !response.Title) && handleClickMenu();
        
      }
      
  },[response])

  const handleSubmitForm = (e) => {
      e.preventDefault();
      if(!firstname) {handleError("نام نمیتواند خالی باشد"); return}
      else if(!lastName) {handleError("نام خانوادگی نمیتواند خالی باشد"); return}
      else if(!name) {handleError("حساب کاربری نمیتواند خالی باشد"); return}
      else if(!password) {handleError("رمزعبور نمیتواند خالی باشد"); return}
      else if(!idCode) {handleError("شماره ملی نمیتواند خالی باشد"); return}
      else if(!phoneNumber1) {handleError("شماره همراه نمیتواند خالی باشد"); return}
      else if (!idCodeValidation(idCode)){
              handleError("شماره ملی وارد شده صحیح نمیباشد")
              return;
      }
      else if(!phoneNumber1.match(phoneNumberValidation)) {
          handleError("شماره همراه وارد شده صحیح نمیباشد")
          return
      }
      else {
          { fetchData({
              method: "POST",
              url:customerUpdate,
              headers: {
                accept: "*/*",
              },
              data: {
                
                Id:0,
                Group_Id: Number(groupTitleId),
                Language_EId:1,
                IsActive:isActive,
                CustomerName:name,
                Password:password,
                IdCardNumber:idCode,
                FirstName:firstname,
                LastName: lastName,
                Gender:gender,
                Mobile1:phoneNumber1,
                Mobile2:phoneNumber2,
                Phone:housephone,
                Fax: fax,
                Email:email,
                Description:description,
                SourceType:0,
                ExpireDate:"2022-06-16T05:34:40.867Z",
                Registrar:0,
                DateSet : "2022-06-16T05:34:40.867Z",
                Group_Title: "",
                Request: request,
      
              },
              signal:abortController.signal,
              
             
            })}
      }
  }
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
      <div >
      
      <div class="switch">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
              checked={isActive}
              onChange={(e)=> setIsActive(!isActive)}
            />
          </div>
          <div className="mainCustomerDiv">
                <div className="customerFirstDiv">
                    <input type="text" className="customerFirstName" placeholder={t("FirstName")} value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
                    <input type="text" className="customerFirstName" placeholder={t("LastName")} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div className="customerSecondDiv">
                    <input type="text" className="customerFirstName" placeholder={t("username")} value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="password" id="customerpassWord" placeholder={t("password")} value={password} onChange={(e) => setpassword(e.target.value)}/>
                </div>
                <div className="customerThirdDiv">
                    <input type="number" className="customerFirstName" placeholder={t("IdCardNumber")} value={idCode} onChange={(e) => setIdCode(e.target.value)}/>
                    <select name="" id="" className="customerGender" onChange={(e) => setGender(e.target.value)}>
                        <option disabled>{t("Gender")}</option>
                        <option value={true}>{t("male")}</option>
                        <option value={false}>{t("female")}</option>
                    </select>
                </div>
                <div className="customerFourthDiv">
                    <input type="number" className="customerFirstName" placeholder={t("Mobile1")} value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)}/>
                    <input type="number" className="customerFirstName" placeholder={t("Mobile2")} value={phoneNumber2} onChange={(e) => setPhoneNumber2(e.target.value)}/>
                </div>
                <div className="customerFivthDiv">
                    <input type="number" className="customerFirstName" placeholder='شماره ثابت (اختیاری)' value={housephone} onChange={(e) => setHousePhone(e.target.value)}/>
                    <input type="text" className="customerFirstName" placeholder='فکس (اختیاری)'
                    value={fax} onChange={(e) => setfax(e.target.value)}/>
                </div>
                <div className="customerFivthDiv">
                    <input type="text" className="customerFirstName" placeholder='ایمیل (اختیاری)'value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <select name="" id="" className="customerGender" value={groupTitleId} onChange={(e) =>setGroupTitleId(e.target.value)}>
                        <option disabled>گروه مشتری</option>
                        {groupTitles.map((gt, i) => (
                            <option value={gt.Id} key={gt.Id}>{gt.Value}</option>
                        ))}
                    </select>
                </div>
                <div className="customerSixhDiv">
                    
                    <textarea  className='customerFormTextArea' placeholder='توضیحات (اختیاری)' onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>
                <div className="customerSevenshDiv">
                    
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
          </div>
            
          

         

 
  </div>
      </Modal.Body>
      <Modal.Footer>
              <Button  disabled={loading}>
                {" "}
                {t("operatorGroupFormSubmit")}
              </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TableModal;
