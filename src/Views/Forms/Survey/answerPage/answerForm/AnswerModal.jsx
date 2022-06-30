import React from "react";
import {  Button, Form, ListGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { QuestionTypeEnum } from "../../../../../data/QuestionTypeEnum";
import "./answerModal.css";
const AnswerModal = (props) => {
  const { t } = useTranslation();
  const questions = props.questions;
    const textFields=["FirstName","LastName","FathersName","WebSite","PlaceOfIssuanceIdCard","Country","Province","City","Section","Area","MainStreet","ByStreet","Alley","Plaque","Floor","Unit","Address","Job","String"]
    const numbers=["NationalCode","IdCardNumber","IdCardSerialNumber","Mobile","Phone","Fax","PostalCode","PostalCode","Float",""]
    const checkAnswerOptions = (e) => {
    let key='';
     Object.keys(QuestionTypeEnum).map(
      (i) => QuestionTypeEnum[i] === e ? key=i:''
    );
    if(textFields.includes(key)){
        return <Form.Control type="text" placeholder={t(key)} />
    }
    if(numbers.includes(key)){
        return <Form.Control type="number" placeholder={t(key)} />
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
      className='modalAnswers'
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
