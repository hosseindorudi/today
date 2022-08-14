import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";

import {
  customerCreateMobile,
  customerDeleteMobile,
  customerReadMobile,
  customerUpdateMobile,
} from "../../../services/customerService";
import * as fa from "react-icons/fa";
import "./customerMobileModal.css";

import Swal from "sweetalert2";
import {
  Button,
  Form,
  Modal,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const CustomerMobileModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [rowID, setRowId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");
  const [mobiles, setMobiles] = useState([]);
  const [values, setValues] = useState({
    IsPrimary: false,
    Mobile: "",
    Description: "",
    Title: "",
  });

  const setEmpty = () => {
    setEditButtonActivate(false)
    setValues({
      IsPrimary: false,
      Mobile: "",
      Description: "",
      Title: "",
    });
  };

  const readDatas = () => {
    setRequestType("READMOBILES");
    fetchData({
      method: "POST",
      url: customerReadMobile,
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
        case "READMOBILES":
          setMobiles(response.Record);
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
      url: customerDeleteMobile,
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
      url: customerCreateMobile,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        Customer_Id: props.rowValues,
        Mobile: values.Mobile,
        IsPrimary: values.IsPrimary,
        Description: values.Description,
        Title: values.Title,
      },
    });
  };

  const handleQuestionEdit = (record) => {
    setEditButtonActivate(true);
    setValues({
      IsPrimary: record.IsPrimary,
      Mobile: record.Mobile,
      Description: record.Description,
      Title: record.Title,
    });
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
      url: customerUpdateMobile,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: rowID,
        Customer_Id: props.rowValues,
        Mobile: values.Mobile,
        IsPrimary: values.IsPrimary,
        Description: values.Description,
        Title: values.Title,
      },
    });
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeSwitch = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
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
            <div className="Row ">
              <Form.Group className="mb-3" controlId={"switch"}>
                <Form.Label>{t("IsPrimary")}</Form.Label>
                <Form.Check
                  style={{ textAlign: "center" }}
                  type="switch"
                  checked={values.IsPrimary}
                  name="IsPrimary"
                  onChange={handleChangeSwitch}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"Title"}>
                <Form.Label>{t("Title")}</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={values.Title}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"Mobile"}>
                <Form.Label>{t("Mobile")}</Form.Label>
                <Form.Control
                  type="number"
                  name="Mobile"
                  value={values.Mobile}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"Description"}>
                <Form.Label>{t("Description")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={values.Description}
                  onChange={onChangeHandler}
                  name="Description"
                />
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
          <ListGroup as="ol" numbered className="listGroupMobile">
            {mobiles.map((m) => (
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
                  <div className="fw-bold countryTitle">{t("Title")}</div>
                  {m.Title}
                </div>
                <div>
                  <div className="fw-bold countryTitle">{t("Mobile")}</div>
                  {m.Mobile}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(m)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(m.Id)}
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

export default CustomerMobileModal;
