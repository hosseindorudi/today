import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";

import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AppContext from "../../../../contexts/AppContext";

import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";

import BackDrop from "../../../../Components/backDrop/BackDrop";
import { enums } from "../../../../data/Enums";
import { TabContext } from "../../../../contexts/TabContextProvider";

import { customerGroupReadTitle } from "../../../../services/customerGroupService";
import {
  idCodeValidation,
  phoneNumberValidation,
} from "../../../../validation/validation";
import CustomerList from "./list/CustomerList";

// import { setDatePickerDate } from '../../../../validation/functions';
import { customerCreate } from "../../../../services/customerService";
import useWindowSize from "../../../../customHooks/useWindowSize";
import "./customerForm.css";
const CustomerForm = () => {
  const widthOfScreen = useWindowSize().width;
  const [type, setType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfSerial, setDateOfSerial] = useState(null);
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [groupTitles, setGroupTitles] = useState([]);
  const [groupTitleId, setGroupTitleId] = useState();
  const tabContext = useContext(TabContext);
  const [isActive, setIsActive] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [idCode, setIdCode] = useState("");
  const [gender, setGender] = useState(true);
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [housephone, setHousePhone] = useState("");
  const [housephone2, setHousePhone2] = useState("");
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
  const handleClickMenu = () => {
    tabContext.addRemoveTabs(
      {
        title: "routes.customerForm",
        path: "/customerform",
        Component: CustomerForm,
        access: enums.Customer_Customer_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.CustomerList",
        path: "/customerList",
        Component: CustomerList,
        access: enums.Customer_Customer_Read_r,
      },

      "add"
    );
  };

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: customerGroupReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleSeccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setGroupTitles(response.Title);
        response.Title.length && setGroupTitleId(response.Title[0].Id);

        break;
      case "SUBMIT":
        handleSeccess(t("customer.created"));
        handleClickMenu();
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
    }
    setResponse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!firstname) {
      handleError(t("customer1"));
      return;
    } else if (!lastName) {
      handleError(t("customer2"));
      return;
    } else if (!name) {
      handleError(t("customer3"));
      return;
    } else if (!password) {
      handleError(t("customer4"));
      return;
    } else if (!idCode) {
      handleError(t("customer5"));
      return;
    } else if (!phoneNumber1) {
      handleError(t("customer6"));
      return;
    } else if (!idCodeValidation(idCode)) {
      handleError(t("customer7"));
      return;
    } else if (!phoneNumber1.match(phoneNumberValidation)) {
      handleError(t("customer8"));
      return;
    } else {
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: customerCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Id: 0,
          Group_Id: Number(groupTitleId),
          Language_EId: 1,
          IsActive: isActive,
          CustomerName: name,
          Password: password,
          NationalCode: idCode,
          FirstName: firstname,
          LastName: lastName,
          FathersName: fatherName,
          IdCardNumber: idCardNumber,
          IdCardSerialNumber: idCardSerialNumber,
          Gender: gender,
          DateOfBirth:  new Date(dateOfBirth),
          DateOfIssuanceIdCard:  new Date(dateOfSerial),
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
          LimitFrom:  new Date(fromDate),
          LimitTo:  new Date(endDate),
          Description: description,
          Website:webSite,
          ExpireDate: "2022-06-16T05:34:40.867Z",
          DateSet: "2022-06-16T05:34:40.867Z",
          Request: request,
        },
        signal: abortController.signal,
      });
    }
  };

  return (
    <>
      {loading && <BackDrop open={true} />}

      <div className="OperatorForm">
        <h1 className="OperatorFormTitle">{t("customerTitle")}</h1>
        <div className="OperatorFormMainDiv">
          <form className="OperatorFormform" onSubmit={handleSubmitForm}>
            <div class="switch">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={t("OperatorGroup.switch")}
                value={isActive}
                checked={isActive}
                onChange={(e) => setIsActive(!isActive)}
              />
            </div>
            <div className="mainCustomerDiv">
              <div className="customerSecondDiv">

                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="text" placeholder={t("customerUser")}  value={name}
                    onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="password" placeholder={t("password")}  value={password}
                    onChange={(e) => setpassword(e.target.value)} />
                </Form.Group>
                
              </div>
              <div className="customerFirstDiv">
              <Form.Group className="mb-3 customerFirstName" >
                <Form.Control type="text" placeholder={t("Name")}  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3 customerFirstName" >
                <Form.Control type="text" placeholder={t("lastname")}  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
                
              </div>
              <div className="customerFirstDiv">
              <Form.Group className="mb-3 customerFirstName" >
                <Form.Control type="text" placeholder={t("FathersName")}  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3 customerFirstName" >
                <Form.Control type="number" placeholder={t("IdCardNumber")}  value={idCardNumber}
                  onChange={(e) => setIdCardNumber(e.target.value)} />
              </Form.Group>
                
              </div>
              
              <div className="customerThirdDiv">
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="text" placeholder={t("idcode")}  value={idCode}
                     onChange={(e) => setIdCode(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Select aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                    <option disabled>{t("gender")}</option>
                    <option value={true}>{t("male")}</option>
                    <option value={false}>{t("female")}</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="customerFirstDiv">
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="text" placeholder={t("IdCardSerialNumber")}  value={idCardSerialNumber}
                    onChange={(e) => setIdCardSerialNumber(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"DateOfBirth"}>
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
              <div className="customerFirstDiv">
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="text" placeholder={t("serialLocation")}  value={serialLocation}
                    onChange={(e) => setSerialLocation(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId={"serialDate"}>
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
              <div className="customerFourthDiv">
              <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="number" placeholder={t("phoneNumber")}  value={phoneNumber1}
                     onChange={(e) => setPhoneNumber1(e.target.value)} />
                </Form.Group>
              <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="number" placeholder={t("phoneNumber2")}  value={phoneNumber2}
                     onChange={(e) => setPhoneNumber2(e.target.value)} />
                </Form.Group>
                
              </div>
              <div className="customerFivthDiv">
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="number" placeholder={t("homeNumber")}  value={housephone}
                     onChange={(e) => setHousePhone(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="number" placeholder={t("homeNumber2")}  value={housephone2}
                     onChange={(e) => setHousePhone2(e.target.value)} />
                </Form.Group>
                
                
                
                
              </div>
              <div className="customerFivthDiv">
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="email" placeholder={t("customerEmail")}  value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 customerFirstName" >
                  <Form.Control type="text" placeholder={t("fax")}  value={fax}
                    onChange={(e) => setfax(e.target.value)} />
                </Form.Group>
                
              </div>
              <div className="customerFivthDiv">
              <Form.Group className="mb-3 customerFirstName" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} placeholder={t("job")}  value={job} onChange={(e) => setjob(e.target.value)}/>
              </Form.Group>
                <Form.Group className="mb-3 customerFirstName" style={{flex:0.75}}>
                  <Form.Control type="text" placeholder={t("website")}  value={webSite}
                    onChange={(e) => setWebSite(e.target.value)} />
                </Form.Group>
                
              </div>
              <div className="customerFivthDiv">
              <Form.Group className="mb-3 customerFirstName" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} placeholder={t("AcquaintedWithCompany")}  value={acquaintedWithCompany} onChange={(e) => setAcquaintedWithCompany(e.target.value)}/>
              </Form.Group>
                
              </div>



              <div className="customerSixhDiv">

              <Form.Group className="mb-3 customerFirstName" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows={2} placeholder={t("customerDesc")}  value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Select aria-label="Default select example" onChange={(e) => setGroupTitleId(e.target.value)}>
                  <option disabled>{t("customerGroup")}</option>
                    {groupTitles.map((gt, i) => (
                      <option value={gt.Id} key={gt.Id}>
                        {gt.Value}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
              </div>
              <div className="customerSixhDiv">

              <div className="datePickerGroup" >
                
                  
                  
                    <div>
                    <Form.Group className="mb-3" controlId={"startDate"}>
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
                    
                    </div>
                    <div class="switchDate">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          onChange={()=> setActiveDate(prev => !prev)}
                          checked ={activeDate}
                        />
                      </div>
                    <div>
                    <Form.Group className="mb-3" controlId={"endDate"}>
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
                
              </div>
              <div className="customerSevenshDiv">
              {widthOfScreen > 420 && (
                <input
                  type="submit"
                  value={t("operatorSubmitBtn")}
                  className="deleteBtn"
                />
              )}
            </div>
            
            </div>
            
            
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
