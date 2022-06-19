import React, { useContext, useEffect, useState } from "react";
import {  Button,  Form, Modal } from "react-bootstrap";
import "./tableModal.css";

import AppContext from "../../../../../../contexts/AppContext";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import AdapterJalali from "@date-io/date-fns-jalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  idCodeValidation,
  phoneNumberValidation,
} from "../../../../../../validation/validation";
import useAxios from "../../../../../../customHooks/useAxios";
import {
  customerGroupReadTitle
} from "../../../../../../services/groupService";
import { setDatePickerDate } from "../../../../../../validation/functions";
import { customerUpdate } from "../../../../../../services/customerService";

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
    setOperatorDateExp(new Date(values.ExpireDate));
    setfax(values.Fax);
    setGroupTitleId(values.Group_Id);
    setGender(values.Gender);
    setIdCode(values.IdCardNumber);
    setIsActive(values.IsActive);
    setLastName(values.LastName);
    setPhoneNumber1(values.Mobile1);
    setPhoneNumber2(values.Mobile2);
    setHousePhone(values.Phone);
    setFirstName(values.FirstName);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
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
    }
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
      {
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
            IsActive: isActive,
            CustomerName: name,
            Password: "string",
            IdCardNumber: idCode,
            FirstName:firstname,
            LastName: lastName,
            Gender: gender==="true"?true:false,
            Mobile1: phoneNumber1,
            Mobile2: phoneNumber2,
            Phone: housephone,
            Fax: fax,
            Email: email,
            ExpireDate: setDatePickerDate(operatorDateExp),
            Description: description,
            SourceType: 0,
            Registrar: 0,
            DateSet: "2022-06-19T05:33:37.911Z",
            Group_Title: "string",
            Request: request,
          },
          signal: abortController.signal,
        });
      }
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
        <div>
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
            <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("IdCardNumber")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("IdCardNumber")}
                value={idCode}
                onChange={(e) => setIdCode(e.target.value)}
              />
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
            <Form.Group controlId="formGridfax" className="FormGroupUpdateModal">
              <Form.Label>{t("Fax")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Fax")}
                value={fax}
                onChange={(e) => setfax(e.target.value)}
              />
            </Form.Group>
          </div>
         
          <div className="updateModalRow" >
            <Form.Group controlId="formGridUserName" className="FormGroupUpdateModal">
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t("Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
            <Form.Group
              className="textAreaUpdate"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t("Description")}</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)}
                value={description}/>
            </Form.Group>
          </div>
           
          <div className="updateModalRow">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>{t("operatorDatePick")}</Form.Label>
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
