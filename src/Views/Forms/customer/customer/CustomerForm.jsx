import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
  const currentLang = useContext(AppContext);
  const [operatorDateExp, setOperatorDateExp] = useState(new Date());
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
  const [fax, setfax] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

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
          IdCardNumber: idCode,
          FirstName: firstname,
          LastName: lastName,
          Gender: gender,
          Mobile1: phoneNumber1,
          Mobile2: phoneNumber2,
          Phone: housephone,
          Fax: fax,
          Email: email,
          Description: description,
          SourceType: 0,
          ExpireDate: "2022-06-16T05:34:40.867Z",
          Registrar: 0,
          DateSet: "2022-06-16T05:34:40.867Z",
          Group_Title: "",
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
              <div className="customerFirstDiv">
                <input
                  type="text"
                  className="customerFirstName"
                  placeholder={t("Name")}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="customerFirstName"
                  placeholder={t("lastname")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="customerSecondDiv">
                <input
                  type="text"
                  className="customerFirstName"
                  placeholder={t("customerUser")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="password"
                  id="customerpassWord"
                  placeholder={t("password")}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="customerThirdDiv">
                <input
                  type="number"
                  className="customerFirstName"
                  placeholder={t("idcode")}
                  value={idCode}
                  onChange={(e) => setIdCode(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  className="customerGender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled>{t("gender")}</option>
                  <option value={true}>{t("male")}</option>
                  <option value={false}>{t("female")}</option>
                </select>
              </div>
              <div className="customerFourthDiv">
                <input
                  type="number"
                  className="customerFirstName"
                  placeholder={t("phoneNumber")}
                  value={phoneNumber1}
                  onChange={(e) => setPhoneNumber1(e.target.value)}
                />
                <input
                  type="number"
                  className="customerFirstName"
                  placeholder={t("phoneNumber2")}
                  value={phoneNumber2}
                  onChange={(e) => setPhoneNumber2(e.target.value)}
                />
              </div>
              <div className="customerFivthDiv">
                <input
                  type="number"
                  className="customerFirstName"
                  placeholder={t("homeNumber")}
                  value={housephone}
                  onChange={(e) => setHousePhone(e.target.value)}
                />
                <input
                  type="text"
                  className="customerFirstName"
                  placeholder={t("fax")}
                  value={fax}
                  onChange={(e) => setfax(e.target.value)}
                />
              </div>
              <div className="customerFivthDiv">
                <input
                  type="text"
                  className="customerFirstName"
                  placeholder={t("customerEmail")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  name=""
                  id=""
                  className="customerGender"
                  onChange={(e) => setGroupTitleId(e.target.value)}
                >
                  <option disabled>{t("customerGroup")}</option>
                  {groupTitles.map((gt, i) => (
                    <option value={gt.Id} key={gt.Id}>
                      {gt.Value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="customerSixhDiv">
                <textarea
                  className="customerFormTextArea"
                  placeholder={t("customerDesc")}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div className="customerSevenshDiv">
                <label id="OperatorFormInputExp1">
                  {t("operatorDatePick")}
                </label>
                {currentLang.app.lang === "fa" ? (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        label="-"
                        mask="____/__/__"
                        value={operatorDateExp}
                        onChange={(newValue) => {
                          setOperatorDateExp(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                ) : (
                  <div style={{ direction: "ltr" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={operatorDateExp}
                        onChange={(newValue) => {
                          setOperatorDateExp(newValue);
                          console.log(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                )}
                {widthOfScreen < 420 && (
                  <input
                    type="submit"
                    value={t("operatorSubmitBtn")}
                    className="deleteBtn"
                  />
                )}
              </div>
            </div>

            {widthOfScreen > 420 && (
              <input
                type="submit"
                value={t("operatorSubmitBtn")}
                className="deleteBtn"
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
