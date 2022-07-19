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
import { handleError } from "../../../validation/functions";

import Swal from "sweetalert2";
import { osEnums } from "../../../data/osEnums";
const OsPolicyModal = (props) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [os, setOs] = useState(null);
  const [osDatas, setOsDatas] = useState([]);
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [osId, setOsId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");

  const setEmpty = () => {
    setOs("");
  };

  const readDatas = () => {
    setRequestType("READRATE");
    fetchData({
      method: "POST",
      url: props.read,
      headers: request,
      data: {
        Id: props.id,
        
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
        case "READRATE":
          setOsDatas(response.Record);
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
   response&&handleResponse(response,requestType)
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
        Group_Id: props.id,
        Os_EId: os,
        
      },
    });
  };

  const handleQuestionEdit = (o) => {
    setEditButtonActivate(true);
    setOs(o.Os_EId);
    setOsId(o.Id);
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
      url: props.update,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: osId,
        Group_Id: props.id,
        Os_EId: os,
        
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
              <Form.Group className="mb-3" controlId="OS">
                <Form.Label>{t("OS")}</Form.Label>
                <Form.Select value={os} onChange={(e) => setOs(e.target.value)}>
                  <option selected disabled>{t("OS")}</option>
                  {Object.keys(osEnums).map((o, i) => (
                    <option key={i} value={osEnums[o]}>
                      {o}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            {!editButtonActivate ? (
              <Button
                variant="primary"
                type="submit"
                className="questionFormSubmit mt-2"
                disabled={loading ||!os}
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
                      disabled={loading||!os}
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
            {osDatas.map((o,i) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between "
                style={{
                  border: `1px solid black`,
                  borderRadius: 4,
                  alignItems: "center",
                }}
                key={i}
              >
                <div>
                  <div className="fw-bold countryTitle">{t("OS")}</div>
                  {Object.keys(osEnums).find(key => osEnums[key] === o.Os_EId)}
                </div>

                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(o)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(o.Id)}
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

export default OsPolicyModal;
