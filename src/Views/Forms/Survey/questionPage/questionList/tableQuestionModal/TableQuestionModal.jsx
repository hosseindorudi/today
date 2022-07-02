import React, { useCallback, useEffect, useState } from "react";
import * as fa from "react-icons/fa";
import { Button, Form, Modal, ListGroup, Container, Row, Col, Accordion } from "react-bootstrap";
import useRequest from "../../../../../../customHooks/useRequest";
import useAxios from "../../../../../../customHooks/useAxios";
import BackDrop from "../../../../../../Components/backDrop/BackDrop";
import { useTranslation } from "react-i18next";
import { QuestionTypeEnum } from "../../../../../../data/QuestionTypeEnum";
import { CustomReactMultiSelect } from "../../../../../../Components/Select/customReactSelect";
import {
  createQuestion,
  readQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../../../../../services/questionService";
import * as bs from "react-icons/bs";
import { handleError } from "../../../../../../validation/functions";
import axios from "axios";
import Swal from "sweetalert2";
import "./tableQuestionModal.css";
const TableQuestionModal = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [enumQuestion, setEnumQuestion] = useState([]);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false)
  const [IdOfQuestion, setIdOfQuestion] = useState()
  const [periodity, setPeriodity] = useState(0)
  const [multiSelectActivation, setMultiSelectActivation] = useState(false)
  const [questionItem, setQuestionItem] = useState([]);
  const [questionTitle, setQuestionTitle] = useState("")
  const [questionDescription, setQuestionDescription] = useState("")
  const [questionColor, setQuestionColor] = useState("#000000")
  const [questionPeriority, setQuestionPeriority] = useState(0)
  const colors = [
    "#470063",
    "#B30089",
    "#F62DAE",
    "#FD96A9",
    "#B846E6",
    "#4560E6",
    "#7784C4",
    "#0BD9E4",
    "#7E0BE3",
    "#0BE34C",
    "#A2E30B",
    "#E3C60B",
    "#E37B0B",
    "#E3410B",
  ];
  const { t } = useTranslation();
  const [questionSelect, setQuestionSelect] = useState("");
  const [color, setColor] = useState("#000000");
  const [questions, setQuestions] = useState([]);
  const [requestType, setRequestType] = useState("");


  const handleAddQuestionItem = (questionItem) => {

    // setQuestionItem((prev) => [...prev, browser]);
  };

  const handleChangeQuestionItem = (event, index) => {
    let newArr = questionItem.map((item, i) => {
      if (index === i) {
        return event.target.value;
      } else {
        return item;
      }
    });
    setQuestionItem(newArr);
  };

  const handleClickRemoveQuestionItem = (index) => {
    let filter = questionItem.filter((item, i) => i !== index);
    setQuestionItem(filter);
  };


  useEffect(() => {
    Object.keys(QuestionTypeEnum).map((key) => {
      return setEnumQuestion((prev) => [
        ...prev,
        {
          value: QuestionTypeEnum[key],
          label: t(key),
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: props.rowValus.Id,
      },
    };
    return params;
  };

  const getDatas = () => {
    const questionTitles = axios.request(createParams(readQuestion));
    axios
      .all([questionTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setQuestions(allData[0].data.Record)
            : handleError(allData[0].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
      setTitle("")
      setDescription("")
      setColor("#000000")
      setQuestionSelect({})
      setPeriodity(0)
      setEditButtonActivate(false)

  };
  useEffect(() => {
    getDatas();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "DELETE":
          handleDeleted();
          break;
        case "SUBMIT":

          getDatas();
          break;
        
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteRecord = (id) => {
    setRequestType("DELETE");
    fetchData({
      method: "POST",
      url: deleteQuestion,
      headers: {
        accept: "*/*",
      },
      data: {
        Id: id,
        Request: request,
      },
      signal: abortController.signal,
    });
  };



  const handleDeleted = () => {
    Swal.fire(
      t("sweetAlert.deleted"),
      t("sweetAlert.recordDeleted"),
      "success"
    );

    getDatas();
  };

  const deleteCalled = (id) => {
    Swal.fire({
      title: t("table.deleteTitle"),
      text: t("table.noReturn"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("sweetAlert.yes"),
      cancelButtonText: t("sweetAlert.cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecord(id);
      }
    });
  };



  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response, requestType)
        : handleError(response.Message);

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT")
    fetchData({
      method: "POST",
      url: createQuestion,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: 0,
        QuestionPage_Id: props.rowValus.Id,
        QuestionType_EId: questionSelect?.value,
        QuestionItem: [] ,
        Title: title,
        Priority:periodity,
        Description: description,
        Color: color.slice(1),
        Request: request,
      },
    });
  };


  const handleQuestionEdit = (question) => {
      console.log(question)
      setTitle(question.Title)
      setDescription(question.Description)
      setQuestionSelect(enumQuestion.find(eq => eq.value === question.QuestionType_EId))
      setIdOfQuestion(question.Id)
      setColor(`#${question.Color}`)
      setPeriodity(question.Priority)
      setEditButtonActivate(true)
  }

  const cancletationOFEdit = () => {
      setTitle("")
      setDescription("")
      setQuestionSelect({})
      setColor("#000000")
      setPeriodity(0)
      setEditButtonActivate(false)
  }

  const SubmitOfEdit =(e) => {
    e.preventDefault();
    setRequestType("SUBMIT")
    fetchData({
      method: "POST",
      url: updateQuestion,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: IdOfQuestion,
        QuestionPage_Id: props.rowValus.Id,
        QuestionType_EId: questionSelect?.value,
        QuestionItem: [] ,
        Title: title,
        Priority:periodity,
        Description: description,
        Color: color.slice(1),
        Request: request,
      },
    });
  }

  return (
    <>
      {loading && <BackDrop open={loading} />}

      <Modal
        show={props.tableModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="tableModal">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{t("questionType")}</Form.Label>

                <CustomReactMultiSelect
                  isMulti={false}
                  options={enumQuestion}
                  value={questionSelect}
                  onchangeHandler={(e) => {setQuestionSelect(e); e.label === "Multiple" ? setMultiSelectActivation(true) : setMultiSelectActivation(false)}}
                  placeholder={t("questionType")}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("QuestionCreateTitle")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={1}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              
                 <Container>
                  <Row>
                    <Col>

                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.periodity"
                    >
                      <Form.Label>{t("periodity")}</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        value={periodity}
                        onChange={(e) => setPeriodity(e.target.value)}
                      />
                    </Form.Group>
                    
                    </Col>
                    <Col>
                    <Form.Group
                        className="mb-1 questionColorPicker colomnDirections"
                        controlId="exampleForm.ControlTextarea1"
                      >
                      <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                      <Form.Control
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        name="favcolor"
                        className="colorPickerInputQuestion"
                      />
                       </Form.Group>
                    </Col>
                  </Row>
                </Container>

                <div className="accordionOperatorGroup" style={{display : multiSelectActivation ? "block": "none"}}>
                  
                        <div className="addBtn">
                          <bs.BsFillPlusCircleFill
                            size={25}
                            style={{ cursor: "pointer" }}
                            onClick={handleAddQuestionItem}
                          />
                          <b>{t("questionMultiple")}</b>
                        </div>
                        {questionItem.map((i, index) => (
                          <div className="browserSelects" key={index}>
                            <fa.FaMinus
                              size={20}
                              style={{ cursor: "pointer" }}
                            />
                            <Container>
                              <Row>
                                  <Col>
                                    <Form.Group className="mb-0.5" controlId="formBasicEmail">
                                      <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={t("QuestionCreateTitle")}
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        required
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group
                                      className="mb-0.5"
                                      controlId="exampleForm.ControlTextarea1"
                                    >
                                      <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        rows={1}
                                        value={questionDescription}
                                        onChange={(e) => setQuestionDescription(e.target.value)}
                                      />
                                    </Form.Group>
                                  </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Form.Group
                                    className="mb-0.5"
                                    controlId="exampleForm.periodity"
                                  >
                                    <Form.Label>{t("periodity")}</Form.Label>
                                    <Form.Control
                                      required
                                      type="number"
                                      value={questionPeriority}
                                      onChange={(e) => setQuestionPeriority(e.target.value)}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col>
                                  <Form.Group
                                      className="mb-0.5 questionColorPicker colomnDirections"
                                      controlId="exampleForm.ControlTextarea1"
                                    >
                                    <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                                    <Form.Control
                                      type="color"
                                      value={questionColor}
                                      onChange={(e) => setQuestionColor(e.target.value)}
                                      name="favcolor"
                                      className="colorPickerInputQuestion"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Container>

                            {/* <Form.Select
                              value={i}
                              onChange={(event) => handleChangeQuestionItem(event, index)}
                            >
                              {browser.map((b, index) => (
                                <option value={b.name} key={index}>
                                  {b.name}
                                </option>
                              ))}
                            </Form.Select> */}
                          </div>
                        ))}
                    
                        
                      
                </div>
               
             

              { !editButtonActivate ? (<Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-2"
              >
                {t("operatorGroupFormSubmit")}
              </Button>)
              :
              (

                <Container>
                  <Row>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={cancletationOFEdit}
                        className="questionFormSubmit mt-2"
                      >
                        {t("cancelationOfForm")}
                      </Button>
                    </Col>
                    <Col>

                    <Button
                        variant="success"
                        onClick={SubmitOfEdit}
                        className="questionFormSubmit mt-2"
                      >
                        {t("operatorGroupFormSubmit")}
                      </Button>

                    </Col>
                  </Row>
                </Container>

              )
            }
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer className="questionModalFooter">
          <ListGroup as="ol" numbered className="questionListGroup">
            {questions.map((question) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center mb-1"
                style={{
                  border: `1px solid #${question.Color}`,
                  borderRadius: 4,
                }}
              >
                <div className="ms-2 questionMain">
                  <div className="fw-bold questionTitle">{question.Title}</div>
                  {question.Description}
                </div>
                <div className="ms-2 questionButtons">
                  <div className="questionEditDiv"
                  onClick={() => handleQuestionEdit(question)}>
                    <fa.FaRegEdit />
                  </div>
                  <div
                    className="questionDeleteDiv"
                    onClick={() => deleteCalled(question.Id)}
                  >
                    <fa.FaTrash />
                  </div>

                  <div className="questionDownDiv">
                    <fa.FaLongArrowAltDown />
                  </div>

                  <div className="questionUpDiv">
                    <fa.FaLongArrowAltUp />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TableQuestionModal;
