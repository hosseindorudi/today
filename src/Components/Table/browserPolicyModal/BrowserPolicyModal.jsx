import React, { useCallback, useEffect, useState } from "react";
import * as fa from "react-icons/fa";
import {
  Button,
  Form,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import useRequest from "../../../customHooks/useRequest";
import useAxios from "../../../customHooks/useAxios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import "./browserPolicyModal.css";
import { browserEnum } from "../../../data/browserEnum";
const BrowserPolicyModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();

  const [browser, setBrowser] = useState("");
  const [browsers, setBrowsers] = useState([]);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [rowID, setRowId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setBrowser("");
  };

  const readDatas = () => {
    setRequestType("READPOLICY");
    fetchData({
      method: "POST",
      url: props.read,
      headers: request,
      data: {
        Id: props.rowValues,
      },
      signal: abortController.signal,
    });
  };
  useEffect(() => {
    readDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "DELETE":
          handleDeleted();

          break;
        case "SUBMIT":
          readDatas();
          setEmpty();
          break;
        case "READPOLICY":
          setBrowsers(response.Record);
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
      url: props.delete,
      headers: request,
      data: {
        Id: id,
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
    setEmpty();
    readDatas();
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
    response && handleResponse(response, requestType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: props.create,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        Group_Id: props.rowValues,
        Browser_EId: Number(browser),
      },
    });
  };

  const handleQuestionEdit = (record) => {
    setEditButtonActivate(true);
    setBrowser(record.Browser_EId);
    setRowId(record.Id);
  };

  const cancletationOFEdit = () => {
    setEditButtonActivate(false);
    setEmpty();
  };

  const SubmitOfEdit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");
    setEditButtonActivate(false);
    fetchData({
      method: "POST",
      url: props.update,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: rowID,
        Browser_EId: Number(browser),
        Group_Id: Number(props.rowValues),
      },
    });
  };

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.onHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="Row">
              <Form.Group className="mb-3" controlId="browser">
                <Form.Label>{t("operatorGroup.browser")}</Form.Label>
                <Form.Select
                  value={browser}
                  placeholder={t("operatorGroup.browser")}
                  onChange={(e) => setBrowser(e.target.value)}
                >
                  <option>{t("selectBrowser")}</option>
                  {Object.keys(browserEnum).map((k, i) => (
                    <option value={browserEnum[k]}>{k}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            {!editButtonActivate ? (
              <Button variant="primary" type="submit" disabled={loading}>
                {t("operatorGroupFormSubmit")}
              </Button>
            ) : (
              <Container>
                <Row>
                  <Col>
                    <Button variant="danger" onClick={cancletationOFEdit}>
                      {t("cancelationOfForm")}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="success"
                      onClick={SubmitOfEdit}
                      disabled={loading}
                    >
                      {t("edit")}
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ListGroup as="ol" numbered className="listGroupBrowser">
            {browsers.map((b) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between "
                style={{
                  border: `1px solid black`,
                  borderRadius: 4,
                  alignItems: "center",
                }}
              >
                <div>
                  <div className="fw-bold countryTitle">
                    {t("operatorGroup.browser")}
                  </div>
                  {Object.keys(browserEnum).find(
                    (key) => browserEnum[key] === b.Browser_EId
                  )}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(b)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(b.Id)}
                  >
                    <fa.FaTrash color="red" />
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

export default BrowserPolicyModal;
