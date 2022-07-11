import React, { useContext, useEffect, useState } from "react";
import {  Button,  Form, Modal } from "react-bootstrap";
import "./tableModal.css";

import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import {
  idCodeValidation,
  phoneNumberValidation,
} from "../../../../../../validation/validation";
import useAxios from "../../../../../../customHooks/useAxios";
import {
  customerGroupReadTitle
} from "../../../../../../services/customerGroupService";
import { handleError, setDatePickerDate } from "../../../../../../validation/functions";
import { customerUpdate } from "../../../../../../services/customerService";
import { toast } from "react-toastify";

const TableModal = (props) => {
  const values = props.rowValus;
  const currentLang = useContext(AppContext);
  const [type, setType] = useState("");
  const [operatorDateExp, setOperatorDateExp] = useState(new Date());
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [groupTitles, setGroupTitles] = useState([]);
  const [groupTitleId, setGroupTitleId] = useState();
  const [isActive, setIsActive] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [idCode, setIdCode] = useState("");
  const [gender, setGender] = useState(true);
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [housephone, setHousePhone] = useState("");
  const [fax, setfax] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("")
  const [idCardNumber, setIdCardNumber] = useState("")
  const [idCardSerialNumber, setIdCardSerialNumber] = useState("")
  const [serialLocation, setSerialLocation] = useState("")
  const [webSite, setWebSite] = useState("")
  const [job, setjob] = useState("")
  const [acquaintedWithCompany, setAcquaintedWithCompany] = useState("")
  const [fromDate, setFromDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeDate, setActiveDate] = useState(false)
  const {app} = useContext(AppContext)
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfSerial, setDateOfSerial] = useState(null);
  const [housephone2, setHousePhone2] = useState("");


  const getCustomerGroupTitle = () => {
    setType("GROUPTITLE");
    fetchData({
      method: "POST",
      url: customerGroupReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal: abortController.signal,
    });
  };
  useEffect(() => {
   
    getCustomerGroupTitle();
    setName(values.CustomerName);
    setDescription(values.Description);
    setEmail(values.Email);
    setfax(values.Fax);
    setGroupTitleId(values.Group_Id);
    setGender(values.Gender);
    setIdCode(values.NationalCode);
    setIsActive(values.IsActive);
    setLastName(values.LastName);
    setPhoneNumber1(values.Mobile1);
    setPhoneNumber2(values.Mobile2);
    setHousePhone(values.Phone1);
    setHousePhone2(values.Phone2);
    setFirstName(values.FirstName);
    setFatherName(values.FathersName);
    setIdCardNumber(values.IdCardNumber);
    setIdCardSerialNumber(values.IdCardSerialNumber);
    setSerialLocation(values.PlaceOfIssuanceIdCard);
    setjob(values.Job);
    setWebSite(values.Website);
    setAcquaintedWithCompany(values.AcquaintedWithCompany);
    setFromDate(new Date(values.LimitFrom));
    setEndDate(new Date(values.LimitTo));
    setActiveDate(values.IsLimited);
    setDateOfBirth(new Date(values.DateOfBirth));
    setDateOfSerial(new Date(values.DateOfIssuanceIdCard));

    

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleResponse = (response, type) => {
    switch (type) {
      case "GROUPTITLE":
        setGroupTitles(response.Title);
        break;
      case "UPDATE":
          props.updated()
        break;
      default:
        break;
    }
  };

  useEffect(() => {
 
    if (response) {
      response.Result
        ? handleResponse(response, type)
        : handleError(response.Message);
        setResponse(undefined)
    }
    return ()=>setResponse(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!firstname) {
      handleError("نام نمیتواند خالی باشد");
      return;
    } else if (!lastName) {
      handleError("نام خانوادگی نمیتواند خالی باشد");
      return;
    } else if (!name) {
      handleError("حساب کاربری نمیتواند خالی باشد");
      return;
    }else if (!idCode) {
      handleError("شماره ملی نمیتواند خالی باشد");
      return;
    } else if (!phoneNumber1) {
      handleError("شماره همراه نمیتواند خالی باشد");
      return;
    } else if (!idCodeValidation(idCode)) {
      handleError("شماره ملی وارد شده صحیح نمیباشد");
      return;
    } else if (!phoneNumber1.match(phoneNumberValidation)) {
      handleError("شماره همراه وارد شده صحیح نمیباشد");
      return;
    } else {
      
      setType("UPDATE")
        fetchData({
          method: "POST",
          url: customerUpdate,
          headers: {
            accept: "*/*",
          },
          data: {
            Id: values.Id,
            Group_Id: Number(groupTitleId),
            Language_EId: 1,
            Password:"",
            IsActive: isActive,
            CustomerName: name,
            NationalCode: idCode,
            FirstName: firstname,
            LastName: lastName,
            FathersName: fatherName,
            IdCardNumber: idCardNumber,
            IdCardSerialNumber: idCardSerialNumber,
            Gender: gender,
            DateOfBirth: dateOfBirth,
            DateOfIssuanceIdCard: dateOfSerial,
            PlaceOfIssuanceIdCard: serialLocation,
            Mobile1: phoneNumber1,
            Mobile2: phoneNumber2,
            Phone1: housephone,
            Phone2: housephone2,
            Fax: fax,
            Email: email,
            Job: job,
            AcquaintedWithCompany: acquaintedWithCompany,
            IsLimited: activeDate,
            LimitFrom: fromDate,
            LimitTo: endDate,
            Description: description,
            Website:webSite,
            Request: request,
          },
          signal: abortController.signal,
        });
      
    }
  };
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="updateCustomerModal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="customerModalTableMainDiv">
          <div class="updateModalRow">
          <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("username")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("username")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="FormGroupUpdateModal">
            <Form.Check
              type="switch"
              id="custom-switch"
              label={t("OperatorGroup.switch")}
              checked={isActive}
              onChange={(e) => setIsActive(!isActive)}
            />
            </Form.Group>
          </div>
           <div className="updateModalRow">
            <Form.Group controlId="formGridFirstName" className="FormGroupUpdateModal">
              <Form.Label>{t("FirstName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("FirstName")}
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridLastName" className="FormGroupUpdateModal">
              <Form.Label>{t("LastName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("LastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
          </div>
           <div className="updateModalRow">
            

            <Form.Group controlId="formGridIdcode" className="FormGroupUpdateModal">
              <Form.Label>{t("idcode")}</Form.Label>
              <Form.Control type="text" placeholder={t("idcode")}  value={idCode}
                     onChange={(e) => setIdCode(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridFathersName" className="FormGroupUpdateModal">
              <Form.Label>{t("FathersName")}</Form.Label>
              <Form.Control type="text" placeholder={t("FathersName")}  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)} />
            </Form.Group>
          </div>
          <div className="updateModalRow">
            <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("IdCardNumber")}</Form.Label>
              <Form.Control type="number" placeholder={t("IdCardNumber")}  value={idCardNumber}
                  onChange={(e) => setIdCardNumber(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGridGender" className="FormGroupUpdateModal">
            <Form.Label >{t("Gender")}</Form.Label>
            <Form.Select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option disabled>{t("Gender")}</option>
              <option value={true}>{t("male")}</option>
              <option value={false}>{t("female")}</option>
            </Form.Select>
            </Form.Group>
          </div>
           <div className="updateModalRow">
            

            <Form.Group controlId="formGridIdCardNumber" className="FormGroupUpdateModal">
              <Form.Label>{t("IdCardSerialNumber")}</Form.Label>
              <Form.Control type="text" placeholder={t("IdCardSerialNumber")}  value={idCardSerialNumber}
                    onChange={(e) => setIdCardSerialNumber(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridFathersName" className="FormGroupUpdateModal">
              <Form.Label>{t("DateOfBirth")}</Form.Label>
              <DatePicker
                      containerClassName="custom-container"
                      onChange={(newValue) => {
                        setDateOfBirth(newValue);
                      }}
                      name='LimitTo'
                      placeholder={t("DateOfBirth")}
                      calendar={app.lang === "fa" ? persian : gregorian}
                      locale={app.lang === "fa" ? persian_fa : gregorian_en}
                      calendarPosition="bottom-right"
                      value={dateOfBirth}
                    />
            </Form.Group>
          </div>
           <div className="updateModalRow">
            

            <Form.Group controlId="formGridIdCardNumber" className="FormGroupUpdateModal">
              <Form.Label>{t("serialLocation")}</Form.Label>
              <Form.Control type="text" placeholder={t("serialLocation")}  value={serialLocation}
                    onChange={(e) => setSerialLocation(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridFathersName" className="FormGroupUpdateModal">
              <Form.Label>{t("serialDate")}</Form.Label>
              <DatePicker
                    containerClassName="custom-container"
                    placeholder={t("serialDate")}
                    onChange={(newValue) => {
                      setDateOfSerial(newValue);
                    }}
                    name='LimitTo'
                    calendar={app.lang === "fa" ? persian : gregorian}
                    locale={app.lang === "fa" ? persian_fa : gregorian_en}
                    calendarPosition="bottom-right"
                    value={dateOfSerial}
                  />
            </Form.Group>
          </div>
         
          
          
          
          <div className="updateModalRow">
            <Form.Group controlId="formGridMobile1" className="FormGroupUpdateModal">
              <Form.Label>{t("Mobile1")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("Mobile1")}
                value={phoneNumber1}
                onChange={(e) => setPhoneNumber1(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridMobile2" className="FormGroupUpdateModal">
              <Form.Label>{t("Mobile1")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("Mobile2")}
                value={phoneNumber2}
                onChange={(e) => setPhoneNumber2(e.target.value)}
              />
            </Form.Group>
          </div>
          
          <div className="updateModalRow">
            <Form.Group controlId="formGridPhone" className="FormGroupUpdateModal">
              <Form.Label>{t("Phone")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("Phone")}
                value={housephone}
                onChange={(e) => setHousePhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridhomeNumber2" className="FormGroupUpdateModal">
              <Form.Label>{t("homeNumber2")}</Form.Label>
              <Form.Control type="number" placeholder={t("homeNumber2")}  value={housephone2}
                     onChange={(e) => setHousePhone2(e.target.value)} />
            </Form.Group>
            
          </div>
          <div className="updateModalRow">
          <Form.Group controlId="formGridfax" className="FormGroupUpdateModal">
              <Form.Label>{t("Fax")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Fax")}
                value={fax}
                onChange={(e) => setfax(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            
          </div>
          <div className="updateModalRow">
          <Form.Group controlId="formGridjob" className="FormGroupUpdateModal">
              <Form.Label>{t("job")}</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder={t("job")}  value={job} onChange={(e) => setjob(e.target.value)}/>

            </Form.Group>
            <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("website")}</Form.Label>
              <Form.Control type="text" placeholder={t("website")}  value={webSite}
                    onChange={(e) => setWebSite(e.target.value)} />
            </Form.Group>
            
          </div>
          <div className="updateModalRowJob">
            <Form.Group controlId="formGridjob" className="FormGroupUpdateModal1">
              <Form.Label>{t("AcquaintedWithCompany")}</Form.Label>
              <Form.Control className="jobTextErea" as="textarea" rows={2} placeholder={t("AcquaintedWithCompany")}  value={acquaintedWithCompany} onChange={(e) => setAcquaintedWithCompany(e.target.value)}/>
            </Form.Group>
          </div>
         
          <div className="updateModalRow" >
              <Form.Group className="FormGroupUpdateModal" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t("customerDesc")}</Form.Label>
                <Form.Control as="textarea" rows={2} placeholder={t("customerDesc")}  value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group>

            
            <Form.Group className="FormGroupUpdateModal">
            <Form.Label >{t("customer.group")}</Form.Label>
            <Form.Select
              value={groupTitleId}
              onChange={(e) => setGroupTitleId(e.target.value)}
            >
              <option disabled>{t("customer.group")}</option>
              {groupTitles.map((gt, i) => (
                <option value={gt.Id} key={gt.Id}>
                  {gt.Value}
                </option>
              ))}
            </Form.Select>
            </Form.Group>
          </div>
           
           
          <div className="updateModalRow">
              <Form.Group className="mb-3" controlId={"startDate"}>
                <Form.Label>{t("startDate")}</Form.Label>
                    <DatePicker
                      containerClassName="custom-container"
                      placeholder={t("startDate")}
                      onChange={(newValue) => {
                        setFromDate(newValue);
                        if (endDate !== null && newValue > endDate) {
                          toast.error("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد", {
                            position: toast.POSITION.BOTTOM_CENTER,
                          });
                          
                          setEndDate(null);
                        }
                      }}
                      name='LimitTo'
                      calendar={app.lang === "fa" ? persian : gregorian}
                      locale={app.lang === "fa" ? persian_fa : gregorian_en}
                      calendarPosition="bottom-right"
                      value={fromDate}
                      disabled={!activeDate}
                    />
                  </Form.Group>
                  <div class="switchDate">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          onChange={()=> setActiveDate(prev => !prev)}
                          checked ={activeDate}
                        />
                      </div>
                      <Form.Group className="mb-3" controlId={"endDate"}>
                        <Form.Label>{t("endDate")}</Form.Label>  
                        <DatePicker
                          containerClassName="custom-container"
                          placeholder={t("endDate")}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                            if (fromDate !== null && newValue < fromDate) {
                              toast.error("تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد", {
                                position: toast.POSITION.BOTTOM_CENTER,
                              });
                              
                              setEndDate(null);
                            }
                          }}
                          name='LimitTo'
                          calendar={app.lang === "fa" ? persian : gregorian}
                          locale={app.lang === "fa" ? persian_fa : gregorian_en}
                          calendarPosition="bottom-right"
                          value={endDate}
                          disabled={!activeDate}
                        />
                      </Form.Group>
            
          </div> 
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} onClick={handleSubmitForm}> {t("operatorGroupFormSubmit")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TableModal;
