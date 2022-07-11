import React, { useState, useEffect, useContext } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { QuestionTypeEnum } from "../../../../../data/QuestionTypeEnum";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "./answerModal.css";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import { answerPageCreate } from "../../../../../services/answerService";
import {
  createSelectOptions,
  handleError,
  setDatePickerDate,
} from "../../../../../validation/functions";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import AnswerForm from "./AnswerForm";
import { enums } from "../../../../../data/Enums";
import AnswerList from "../answerList/AnswerList";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { AnswerPageFailedReadTitle } from "../../../../../services/answerPageFailedService";
import MapModal from "../../../../../Components/map/MapModal";
import { defaultCoordinates } from "../../../../../data/constants";
const AnswerModal = (props) => {
  const startTime = new Date();
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  const request = useRequest();
  const [answerPageFailedOptions, setAnswerPageFailedOptions] = useState([]);
  const [answerPageFailed, setAnswerPageFailed] = useState({
    value: 0,
    label: t("nothing"),
    color: "#0000FF",
  });
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
  const [answer, setAnswer] = useState([]);
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
  const radio = ["YesOrNo", "Gender"];
  const multiple = ["Multiple"];
  const rating = ["FiveStar"];
  const map = ["Geolocation"];

  const handleChangeValue = (value,id) => {
    const temp = [...answer];
    let index = temp.findIndex((i) => i.Question_Id === Number(id));
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        Answer: value.toString(),
      };
    }
    setAnswer(temp);
  };
  const handleChangeDescription=(value,id)=>{
    const temp = [...answer];
    let index = temp.findIndex((i) => i.Question_Id === Number(id));
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        Description: value.toString(),
      };
    }
    setAnswer(temp);
  }
  const handleChangeDate = (date, id) => {
    const dateObj = date.toDate();
    handleChangeValue(setDatePickerDate(dateObj),id)
  };
  const handleCheckBox=(questionId,itemId,title)=>{
    let item=[ {
        Id: 0,
        QuestionItem_Id: itemId,
        Answer: title,
        Description: ""
      }]
      const temp = [...answer];
      let index = temp.findIndex((i) => i.Question_Id === Number(questionId));
      if (index !== -1) {
        temp[index] = {
          ...temp[index],
          AnswerItem:item
        };
      }
      setAnswer(temp);
  }
useEffect(() => {
  questions.map(q=>{
    const newElement= {
        Question_Id: q.Id,
        Answer: "",
        Description: "",
        AnswerItem: []
      }
   return setAnswer(oldArray => [...oldArray, newElement]);
  })
  return () => {
    setAnswer([])
}
}, [questions])

  const checkAnswerOptions = (question) => {
    let key = "";
    Object.keys(QuestionTypeEnum).map((i) =>
      QuestionTypeEnum[i] === question.QuestionType_EId ? (key = i) : ""
    );
    if (textFields.includes(key)) {
      return (
        <Form.Control
          type="text"
          placeholder={t(key)}
          name={question.Id}
          onChange={(e)=>handleChangeValue(e.target.value,question.Id)}
        
        />
      );
    }
    if (numbers.includes(key)) {
      return (
        <Form.Control
          type="number"
          placeholder={t(key)}
          name={question.Id}
          onChange={(e)=>handleChangeValue(e.target.value,question.Id)}
        />
      );
    }
    if (rating.includes(key)) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
        <Rating
          name="simple-controlled"
          onChange={(event, newValue) => {
            handleChangeValue(newValue, question.Id);
          }}
        />
        <Form.Control type="text"  placeholder={t("description")}  onChange={(e)=> handleChangeDescription(e.target.value,question.Id)} />
        </div>
      );
    }
    if (time.includes(key)) {
      return (
        <Form.Control
          type="time"
          onChange={(event) => handleChangeValue(event.target.value, question.Id)}
        />
      );
    }
    if (multiple.includes(key)) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {question.QuestionItem.map((item, i) => (
            <Form.Check
              label={item.Title}
              key={i}
              type="radio"
              name={question.Id}
              id={`inline-radio-${item.Id}`}
              onChange={() => handleCheckBox(question.Id,item.Id,item.Title)}
            />
          ))}
         <Form.Control type="text"  placeholder={t("description")}  onChange={(e)=> handleChangeDescription(e.target.value,question.Id)} />
        </div>
      );
    }
    if (radio.includes(key)) {
      return (
        <div className="mb-3">
          {key === "Gender" ? (
            <>
              <Form.Check
                label={t("Male")}
                name={question.Id}
                type="radio"
                id={`inline-radio-${question.Id}`}
                onChange={() => handleChangeValue(t("Male"), question.Id)}
              />
              <Form.Check
                label={t("Female")}
                name={question.Id}
                type="radio"
                id={`inline-radio-${question.Id}-1`}
                onChange={() => handleChangeValue(t("Female"), question.Id)}
              />
            </>
          ) : (
            <>
              <Form.Check
                label={t("Yes")}
                name={question.Id}
                type="radio"
                id={`inline-radio-${question.Id}`}
                onChange={() => handleChangeValue(t("Yes"), question.Id)}
              />
              <Form.Check
                label={t("No")}
                name={question.Id}
                type="radio"
                id={`inline-radio-${question.Id}-1`}
                onChange={() => handleChangeValue(t("No"), question.Id)}
              />
              <Form.Control type="text" placeholder={t("description")} onChange={(e)=>handleChangeDescription(e.target.value,question.Id)}/>
            </>
          )}
        </div>
      );
    }
    if (date.includes(key)) {
      return (
        <DatePicker
          onChange={(value) => handleChangeDate(value, question.Id)}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
        />
      );
    }
    if (map.includes(key)) {
      return <MapModal qId={question.Id} submited={submitMap} coordinats={defaultCoordinates} saveDisabled={false} />;
    }
  };
  const submitMap = (id, coordinates) => {
    const coString = coordinates[0] + "," + coordinates[1];
    handleChangeValue(coString,id)
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
      case "READTITLEANSWERFAILED":
        let titles = response.Title;
        titles.unshift({ Id: 0, Value: t("nothing") });
        setAnswerPageFailedOptions(createSelectOptions(titles));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setType("READTITLEANSWERFAILED");
    fetchData({
      method: "POST",
      url: AnswerPageFailedReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    if (!values.Mobile && !values.Phone && !values.NationalCode) {
      return toast.info(t("answer.requiredFieldsEmptyWarning"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    const TimeElapsed = calcualteEndTime();
    const filteredAnwer=answer.filter(f=>f.Answer.length>0||f.AnswerItem.length>0)
    
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
        AnswerPageFailed_Id: answerPageFailed.value,
        NationalCode: values.NationalCode,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Mobile: values.Mobile,
        Phone: values.Phone,
        TimeElapsed: TimeElapsed,
        Description: values.Description,
        Answer: filteredAnwer,
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
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="Row">
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>{t("FirstName")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("FirstName")}
                name="FirstName"
                value={values.FirstName}
                
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
                
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="Row">
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>{t("Phone")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("Phone")}
                name="Phone"
                value={values.Phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="mobile">
              <Form.Label>{t("Mobile")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("Mobile")}
                name="Mobile"
                value={values.Mobile}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <div className="Row">
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
          <div className="Row">
            <Form.Group
              className="mb-3"
              controlId={"/Definition/AnswerPageFailed/Write"}
            >
              <Form.Label>{t("/Definition/AnswerPageFailed/Write")}</Form.Label>
              <CustomReactMultiSelect
                isMulti={false}
                options={answerPageFailedOptions}
                value={answerPageFailed}
                onchangeHandler={(e) => setAnswerPageFailed(e)}
                placeholder={t("/Definition/AnswerPageFailed/Write")}
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
                    {checkAnswerOptions(q)}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type="submit">
            {" "}
            {t("submit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AnswerModal;
