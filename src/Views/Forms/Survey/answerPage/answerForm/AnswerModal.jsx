import React, { useState, useEffect, useContext } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { QuestionTypeEnum } from "../../../../../data/QuestionTypeEnum";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./answerModal.css";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { answerPageCreate } from "../../../../../services/answerService";
import { handleError } from "../../../../../validation/functions";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import AnswerForm from "./AnswerForm";
import { enums } from "../../../../../data/Enums";
import AnswerList from "../answerList/AnswerList";
const AnswerModal = (props) => {
  const startTime = new Date();
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const [type, setType] = useState("");
  const [response, loading, fetchData, setResponse] = useAxios();
  const [values, setValues] = useState({
    Description: "",
    Phone: undefined,
    Mobile: undefined,
    LastName: "",
    FirstName: "",
    NationalCode: undefined,
  });
  const [answer, setAnswer] = useState({});
  const questions = props.questions;
  const textFields = [
    "FirstName",
    "LastName",
    "FathersName",
    "Email",
    "WebSite",
    "PlaceOfIssuanceIdCard",
    "Country",
    "Province",
    "City",
    "Section",
    "Area",
    "MainStreet",
    "ByStreet",
    "Alley",
    "Plaque",
    "Floor",
    "Unit",
    "Address",
    "Job",
    "String",
    "Gender",
    "AcquaintedWithCompany",
  ];
  const numbers = [
    "NationalCode",
    "IdCardNumber",
    "IdCardSerialNumber",
    "Mobile",
    "Phone",
    "Fax",
    "PostalCode",
    "PostalCode",
    "Float",
  ];
  const date = ["DateOfBirth", "DateOfIssuanceIdCard", "Date", "DateTime"];
  const time = ["Time"];
  const radio = ["YesOrNo"];
  const checkbox = ["Multiple"];
  const rating = ["FiveStar"];

  const handleChangeValue = (e) => {
    let value = e.target.value;
    let id = e.target.name;
    setAnswer({ ...answer, [id]: value });
  };
  const handlechangeRate = (value, id) => {
    setAnswer({ ...answer, [id]: value.toString() });
  };
  const handleChangeTime = (value, id) => {
    setAnswer({ ...answer, [id]: value });
  };
  const handleChangeDate = (date, id) => {
    let format = "MM/DD/YYYY";
    let object = { date, format };
    let converted = new DateObject(object).format();
    setAnswer({ ...answer, [id]: converted });
  };
  const handleChangeRadio = (value, id) => {
    setAnswer({ ...answer, [id]: value });
  };
  const checkAnswerOptions = (e) => {
    let key = "";
    Object.keys(QuestionTypeEnum).map((i) =>
      QuestionTypeEnum[i] === e ? (key = i) : ""
    );
    if (textFields.includes(key)) {
      return (
        <Form.Control
          type="text"
          placeholder={t(key)}
          name={e}
          onChange={handleChangeValue}
        />
      );
    }
    if (numbers.includes(key)) {
      return (
        <Form.Control
          type="number"
          placeholder={t(key)}
          name={e}
          onChange={handleChangeValue}
        />
      );
    }
    if (rating.includes(key)) {
      return (
        <Rating
          name="simple-controlled"
          onChange={(event, newValue) => {
            handlechangeRate(newValue, e);
          }}
        />
      );
    }
    if (time.includes(key)) {
      return (
        <Form.Control
          type="time"
          onChange={(event) => handleChangeTime(event.target.value, e)}
        />
      );
    }
    if (checkbox.includes(key)) {
      return (
        <div key={`inline-checkbox`} className="mb-3">
          <Form.Check
            inline
            label="Yes"
            name="group1"
            type="checkbox"
            id={`inline-checkbox-1`}
          />
          <Form.Check
            inline
            label="No"
            name="group1"
            type="checkbox"
            id={`inline-checkbox-2`}
          />
        </div>
      );
    }
    if (radio.includes(key)) {
      return (
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="Yes"
            name="group1"
            type="radio"
            id={`inline-radio-1`}
            onChange={() => handleChangeRadio("Yes", e)}
          />
          <Form.Check
            inline
            label="No"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
            onChange={() => handleChangeRadio("No", e)}
          />
        </div>
      );
    }
    if (date.includes(key)) {
      return (
        <DatePicker
          onChange={(value) => handleChangeDate(value, e)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
      );
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const calcualteEndTime = () => {
    const endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    // get seconds
    var seconds = Math.round(timeDiff);
    return seconds;
  };
  const makeQuestionAnswer = () => {
    let answerObject = [];
    Object.keys(answer).map((k) =>
      answerObject.push({ Question_Id: k, Answer: answer[k], AnswerItem: [] })
    );
    return answerObject;
  };
  const handleSuccess = () => {
    tabContext.addRemoveTabs(
      {
        Component: AnswerForm,
        path: "/Survey/Answer/Create",
        title: "routes.answerForm",
        access: enums.Survey_AnswerPage_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.answerList",
        path: "/Survey/AnswerPage/Read",
        Component: AnswerList,
      },
      "add"
    );
  };

  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        handleSuccess();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (!values.Mobile && !values.Phone && !values.NationalCode) {
      return toast.info(t("answer.requiredFieldsEmptyWarning"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const TimeElapsed = calcualteEndTime();
    const answerObj = makeQuestionAnswer();
    setType("SUBMIT");
    fetchData({
      method: "POST",
      url: answerPageCreate,
      headers: {
        accept: "*/*",
      },
      data: {
        Id: 0,
        Request: request,
        QuestionPage_Id: questions[0].QuestionPage_Id,
        AnswerPageFailed_Id: 0,
        NationalCode: values.NationalCode,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Mobile: values.Mobile,
        Phone: values.Phone,
        TimeElapsed: TimeElapsed,
        Description: values.Description,
        Answer: answerObj,
      },
    });
  };
  return (
    <Modal
      show={props.open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      className="modalAnswers"
    >
      <Modal.Header closeButton></Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="rowAnswer">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>{t("FirstName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("FirstName")}
                name="FirstName"
                value={values.FirstName}
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="LastName">
              <Form.Label>{t("LastName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("LastName")}
                name="LastName"
                value={values.LastName}
                required
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="rowAnswer">
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>{t("Phone")}</Form.Label>
              <Form.Control
                type="tel"
                placeholder={t("Phone")}
                name="Phone"
                value={values.Phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>{t("Mobile")}</Form.Label>
              <Form.Control
                type="tel"
                placeholder={t("Mobile")}
                name="Mobile"
                value={values.Mobile}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="rowAnswer">
            <Form.Group className="mb-3" controlId="nationalId">
              <Form.Label>{t("nationalId")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("nationalId")}
                name="NationalCode"
                value={values.NationalCode}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>{t("Description")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("Description")}
                name="Description"
                value={values.Description}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="rowQuestionTitle">
            <b>{t("Questions")}</b>
          </div>
          <ListGroup
            as="ol"
            numbered
            className="listGroupAnswer"
            variant="flush"
          >
            {questions.map((q, i) => (
              <ListGroup.Item
                as="li"
                key={i}
                className="d-flex align-items-start listGroupItemAnswer"
                style={{
                  border: `3px solid #${q.Color}`,
                  borderRadius: "10px",
                }}
              >
                <div className="ms-2">
                  <div className="fw-bold">{q.Title}</div>
                  {q.Description}
                  <div className="answers">
                    {checkAnswerOptions(q.QuestionType_EId)}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type="submit"> {t("submit")}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AnswerModal;