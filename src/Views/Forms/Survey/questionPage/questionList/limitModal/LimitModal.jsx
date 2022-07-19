import { useCallback, useEffect, useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import BackDrop from "../../../../../../Components/backDrop/BackDrop";
import useAxios from "../../../../../../customHooks/useAxios";
import useRequest from "../../../../../../customHooks/useRequest";
import { operatorTitles } from "../../../../../../services/operatorService";
import {
  createQuestionPageOperator,
  readQuestionPageOperator,
  deleteQuestionPageOperator,
} from "../../../../../../services/questionService";
import * as fa from "react-icons/fa";
const LimitModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [operators, setOperators] = useState([]);
  const [formSubmit, setFormSubmit] = useState([]);
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");
  const [reload, setReload] = useState(false);
  const [questionItems, setQuestionitems] = useState([]);

  useEffect(() => {
    setRequestType("READ");
    fetchData({
      method: "POST",
      url: operatorTitles,
      headers: request,

      signal: abortController.signal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handleREAD = (response) => {
    setOperators(response.Title);
    let form = [];
    response.Title.map((r) =>
      form.push({
        Id: 0,
        Operator_Id: Number(r.Id),
        QuestionPage_Id: Number(props.rowValus),
        Count: 0,
        checked: false,
      })
    );

    setFormSubmit(form);
    setRequestType("READQUESTIONPAGE");
    fetchData({
      method: "POST",
      url: readQuestionPageOperator,
      headers: request,

      data: {
        Id: props.rowValus,
      },

      signal: abortController.signal,
    });
  };

  const handleREADQuestion = (response) => {
    setQuestionitems(response.Record);
  };

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "READ":
          handleREAD(response);
          console.log("eee");
          break;
        case "READQUESTIONPAGE":
          handleREADQuestion(response);
          break;
        case "SUBMIT":
          setReload(!reload);
          break;
        case "DELETE":
          setReload(!reload);
          break;

        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [response]
  );

  useEffect(() => {
    response && handleResponse(response, requestType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e, id) => {
    e.preventDefault();

    const form = formSubmit.find((f) => f.Operator_Id === id);
    console.log(form);
    setRequestType("SUBMIT");
    fetchData({
      method: "POST",
      url: createQuestionPageOperator,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        Operator_Id: id,
        QuestionPage_Id: form.QuestionPage_Id,
        Count: Number(form.Count),
      },
    });
  };

  const checkChangeHandler = (id, checked) => {
    const temp = [...formSubmit];
    let index = temp.findIndex((i) => i.Operator_Id === id);
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        checked: checked,
      };
    }
    setFormSubmit(temp);
  };
  const disableHandler = (id) => {
    const form = formSubmit.find((f) => f.Operator_Id === id);
    return !form.checked;
  };

  const handleCount = (e, id) => {
    const temp = [...formSubmit];
    let index = temp.findIndex((i) => i.Operator_Id === id);
    if (index !== -1) {
      temp[index] = {
        ...temp[index],
        Count: e.target.value,
      };
    }
    setFormSubmit(temp);
  };

  const handleDelete = (id) => {
    setRequestType("DELETE");

    fetchData({
      method: "POST",
      url: deleteQuestionPageOperator,
      headers: request,

      data: {
        Id: id,
      },

      signal: abortController.signal,
    });
  };

  return (
    <>
      {loading && <BackDrop open={loading} />}

      <Modal
        show={props.tableModalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        onHide={props.onHide}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="tableModal">
            {operators &&
              operators.map((operator) => (
                <Form>
                  <Form.Group className="mb-1 d-flex Row">
                    <Form.Check
                      type="checkbox"
                      style={{ flex: 1 }}
                      id={operator.Id}
                      checked={operator.checked}
                      label={operator.Value}
                      onChange={(e) =>
                        checkChangeHandler(operator.Id, e.target.checked)
                      }
                      required
                    />
                    <Form.Control
                      disabled={disableHandler(operator.Id)}
                      onChange={(e) => handleCount(e, operator.Id)}
                      required
                      style={{ flex: 2 }}
                      type="number"
                    />
                    <Button
                      variant="primary"
                      onClick={(e) => handleSubmit(e, operator.Id)}
                      disabled={loading || disableHandler(operator.Id)}
                      style={{ flex: 0.5 }}
                    >
                      {t("submit")}
                    </Button>
                  </Form.Group>
                </Form>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="questionModalFooter">
          <ListGroup as="ol" numbered className="questionListGroup">
            {questionItems.map((question) => (
              <ListGroup.Item
                as="li"
                style={{
                  border: `1px solid lightgray`,
                  borderRadius: 4,
                }}
                className="d-flex justify-content-between align-items-center mb-1 listGroupItemQuestion"
              >
                <div className="ms-2 questionMain">
                  <div className="fw-bold questionTitle">
                    {question.Operator_Title}
                  </div>
                </div>
                <div className="ms-2 questionMain">
                  <div className="fw-bold questionTitle">
                    {question.QuestionPage_Title}
                  </div>
                </div>
                <div className="ms-2 questionButtons">
                  <div
                    className="questionDeleteDiv"
                    onClick={() => handleDelete(question.Id)}
                  >
                    <fa.FaTrash />
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

export default LimitModal;
