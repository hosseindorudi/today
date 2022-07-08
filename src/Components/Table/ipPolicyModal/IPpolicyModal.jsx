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
import {
  handleError
} from "../../../validation/functions";
import './IPpolicyModal.css'
import Swal from "sweetalert2";
import { groupCreatePolicyIP, groupDeletePolicyIP, groupReadPolicyIP, groupUpdatePolicyIP } from "../../../services/groupService";
const IPpolicyModal = (props) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [IP_From, setIP_From] = useState("");
  const [IP_To, setIP_To] = useState("");
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [IPs, setIps] = useState([]);
const [ipId, setIpId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setIP_From("");
    setIP_To("");
  };
  const readDatas = () => {
    setRequestType("Read");
    fetchData({
      method: "POST",
      url: groupReadPolicyIP,
      headers: {
        accept: "*/*",
      },
      data: {
        Id: props.id,
        Request: request,
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
          setEditButtonActivate(false)
          break;
        case "Read":
          setIps(response.Record);
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
      url: groupDeletePolicyIP,
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
    if (response) {
      response.Result
        ? handleResponse(response, requestType)
        : handleError(response.Message);

      setResponse(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: groupCreatePolicyIP,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: 0,
        Group_Id: props.id,
        IP_From: IP_From,
        IP_To: IP_To,
        Request: request,
      },
    });
  };

  const handleQuestionEdit = (ip) => {
    setEditButtonActivate(true);
    setIP_From(ip.IP_From);
    setIP_To(ip.IP_To)
    setIpId(ip.Id);
  };

  const cancletationOFEdit = () => {
    setEditButtonActivate(false);
    setEmpty();
  };

  const SubmitOfEdit = (e) => {
    e.preventDefault();
    setRequestType("SUBMIT");

    fetchData({
      method: "POST",
      url: groupUpdatePolicyIP,
      headers: {
        accept: "*/*",
      },
      signal: abortController.signal,
      data: {
        Id: ipId,
        Group_Id: props.id,
        IP_From: IP_From,
        IP_To: IP_To,
        Request: request,
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
              <Form.Group className="mb-3" controlId="IP_From">
                <Form.Label>{t("IP_From")}</Form.Label>
                <Form.Control maxLength={15}  value={IP_From} onChange={(e)=>setIP_From(e.target.value)} placeholder={t("IP_From")}/>
              </Form.Group>
            </div>
            <div className="Row">
            <Form.Group className="mb-3" controlId="IP_To">
                <Form.Label>{t("IP_To")}</Form.Label>
                <Form.Control maxLength={15}  value={IP_To} onChange={(e)=>setIP_To(e.target.value)} placeholder={t("IP_To")}/>
              </Form.Group>
            </div>
            {!editButtonActivate ? (
              <Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-2"
                disabled={loading}
              >
                {t("operatorGroupFormSubmit")}
              </Button>
            ) : (
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
          <ListGroup as="ol" numbered className="listGroupCurrencyModal">
            {IPs.map((ip) => (
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
                  <div className="fw-bold countryTitle">{t("IP_From")}</div>
                  {ip.IP_From}
                </div>
                <div>
                  <div className="fw-bold currencyTitle">
                    {t("IP_To")}
                  </div>
                  {ip.IP_To}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(ip)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(ip.Id)}
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

export default IPpolicyModal;
