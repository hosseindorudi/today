import React from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { QuestionTypeEnum } from "../../../../../data/QuestionTypeEnum";
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./answerModal.css";
import { Rating, TextField } from "@mui/material";
const AnswerModal = (props) => {
  const { t } = useTranslation();
  const questions = props.questions;
  const textFields = [
    "FirstName",
    "LastName",
    "FathersName",
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
  const checkAnswerOptions = (e) => {
    let key = "";
    Object.keys(QuestionTypeEnum).map((i) =>
      QuestionTypeEnum[i] === e ? (key = i) : ""
    );
    if (textFields.includes(key)) {
      return <Form.Control type="text" placeholder={t(key)} />;
    }
    if (numbers.includes(key)) {
      return <Form.Control type="number" placeholder={t(key)} />;
    }
    if (rating.includes(key)) {
      return (
        <Rating
          name="simple-controlled"
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        />
      );
    }
    if (time.includes(key)) {
      return <Form.Control type="time" />;
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
          />
          <Form.Check
            inline
            label="No"
            name="group1"
            type="radio"
            id={`inline-radio-2`}
          />
        </div>
      );
    }
    if (date.includes(key)) {
      return (
        <div style={{ direction: "ltr" }}>
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
              label="-"
              mask="____/__/__"
              // value={operatorDateExp}
              // onChange={(newValue) => {
              //   setOperatorDateExp(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
      );
    }
  };
  const handleSubmit = () => {};
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
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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
          <Button type="submit"> {t("submit")}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AnswerModal;
