import "./tableModal.css";
import { Button, Form, Modal } from "react-bootstrap";
import useAxios from "../../../../../../customHooks/useAxios";
import useRequest from "../../../../../../customHooks/useRequest";
import { CustomReactMultiSelect } from "../../../../../../Components/Select/customReactSelect";
import { questionUpdate } from "../../../../../../services/questionService";
import { useEffect, useState } from "react";
import axios from "axios";
import { questionnaireTypeReadTitle } from "../../../../../../services/questionnaireType";
import { useTranslation } from "react-i18next";
import {
  createSelectOptions,
  handleError,
} from "../../../../../../validation/functions";
import BackDrop from "../../../../../../Components/backDrop/BackDrop";

const TableModal = (props) => {

  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [enumQuestion, setEnumQuestion] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [questionSelect, setQuestionSelect] = useState("");
  const [activation, setActivation] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTitle(props.rowValus.Title);
    setDescription(props.rowValus.Description);
    setId(props.rowValus.Id);
    setActivation(props.rowValus.IsActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: request,
    };
    return params;
  };

  const getDatas = () => {
    const questionReadTitle = axios.request(
      createParams(questionnaireTypeReadTitle)
    );
    axios
      .all([questionReadTitle])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setEnumQuestion(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };

  useEffect(() => {
    console.log(enumQuestion);
    setQuestionSelect(
      enumQuestion.find((m) => m.value === props.rowValus.QuestionnaireType_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumQuestion]);

  useEffect(() => {
    let loaded = false;
    if (!loaded) {
      getDatas();

    }
    return () => {
      loaded = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      response.Result ? props.updated() : handleError(response.Message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchData({
      method: "POST",
      url: questionUpdate,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: id,
        IsActive:activation,
        QuestionnaireType_Id: questionSelect?.value,
        Title: title,
        Description: description,
        Request: request,
      },
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
        onHide={props.onHide}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="tableModal">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <div class="switch">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label={t("OperatorGroup.switch")}
                    onChange={() => setActivation((prev) => !prev)}
                    checked={activation}
                  />
                </div>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{t("questionType")}</Form.Label>

                <CustomReactMultiSelect
                  isMulti={false}
                  options={enumQuestion}
                  value={questionSelect}
                  onchangeHandler={(e) => setQuestionSelect(e)}
                  placeholder={t("questionType")}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{t("operatorGroupFormTitle")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("questionTitlePlace")}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Form.Text className="text-muted">
                  {t("questionTitleDesc")}
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>{t("operatorGroupFormDesc")}</Form.Label>
                <Form.Control
                  
                  as="textarea"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-5"
              >
                {t("operatorGroupFormSubmit")}
              </Button>

            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TableModal;
