import React, { useCallback, useEffect, useState } from "react";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";

import {
  customerCreateBankAccount,
  customerDeleteBankAccount,
  customerReadBankAccount,
  customerUpdateBankAccount,
} from "../../../services/customerService";
import * as fa from "react-icons/fa";
import "./customerAccountModal.css";

import { useTranslation } from "react-i18next";

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

const CustomerAccountModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();

  const abortController = new AbortController();
  const [editButtonActivate, setEditButtonActivate] = useState(false);
  const [rowID, setRowId] = useState("");
  const { t } = useTranslation();
  const [requestType, setRequestType] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [values, setValues] = useState({
    IsPrimary: false,
    FirstName: "",
    LastName: "",
    BankName: "",
    BranchName: "",
    BranchCode: "",
    AccountType: "",
    AccountNumber: "",
    ShabaNumber: "",
    CardNumber: "",
    Description: "",
    CustomerNumber:"",
    Title: "",
  });

  const setEmpty = () => {
    setEditButtonActivate(false)
    setValues({
      IsPrimary: false,
      FirstName: "",
      LastName: "",
      BankName: "",
      BranchName: "",
      BranchCode: "",
      AccountType: "",
      AccountNumber: "",
      ShabaNumber: "",
      CardNumber: "",
      Description: "",
      CustomerNumber:"",
      Title: "",
    });
  };

  const readDatas = () => {
    setRequestType("READACCOUNTS");
    fetchData({
      method: "POST",
      url: customerReadBankAccount,
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
        case "READACCOUNTS":
          setAccounts(response.Record);
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
      url: customerDeleteBankAccount,
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
      url: customerCreateBankAccount,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: 0,
        Customer_Id: props.rowValues,
        IsPrimary: values.IsPrimary,
        FirstName: values.FirstName,
        LastName: values.LastName,
        BankName: values.BankName,
        BranchName: values.BranchName,
        BranchCode: values.BranchCode,
        AccountType: values.AccountType,
        AccountNumber: values.AccountNumber,
        ShabaNumber: values.ShabaNumber,
        CardNumber: values.CardNumber,
        Description: values.Description,
        CustomerNumber: values.CustomerNumber,
        Title: values.Title,
      },
    });
  };

  const handleQuestionEdit = (record) => {
    setEditButtonActivate(true);
    console.log(record)
    setValues({
      IsPrimary: record.IsPrimary,
      FirstName: record.FirstName,
      LastName: record.LastName,
      BankName: record.BankName,
      BranchName: record.BranchName,
      BranchCode: record.BranchCode,
      AccountType: record.AccountType,
      AccountNumber: record.AccountNumber,
      ShabaNumber: record.ShabaNumber,
      CardNumber: record.CardNumber,
      Description: record.Description,
      CustomerNumber: record.CustomerNumber,
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
      url: customerUpdateBankAccount,
      headers: request,
      signal: abortController.signal,
      data: {
        Id: rowID,
        Customer_Id: props.rowValues,
        IsPrimary: values.IsPrimary,
        FirstName: values.FirstName,
        LastName: values.LastName,
        BankName: values.BankName,
        BranchName: values.BranchName,
        BranchCode: values.BranchCode,
        AccountType: values.AccountType,
        AccountNumber: values.AccountNumber,
        ShabaNumber: values.ShabaNumber,
        CardNumber: values.CardNumber,
        Description: values.Description,
        CustomerNumber: values.CustomerNumber,
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
              <Form.Group className="mb-3" controlId={"FirstName"}>
                <Form.Label>{t("FirstName")}</Form.Label>
                <Form.Control
                  type="text"
                  name="FirstName"
                  value={values.FirstName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"LastName"}>
                <Form.Label>{t("LastName")}</Form.Label>
                <Form.Control
                  type="text"
                  name="LastName"
                  value={values.LastName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"BankName"}>
                <Form.Label>{t("BankName")}</Form.Label>
                <Form.Control
                  type="text"
                  name="BankName"
                  value={values.BankName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"BranchName"}>
                <Form.Label>{t("BranchName")}</Form.Label>
                <Form.Control
                  type="text"
                  name="BranchName"
                  value={values.BranchName}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"BranchCode"}>
                <Form.Label>{t("BranchCode")}</Form.Label>
                <Form.Control
                  type="text"
                  name="BranchCode"
                  value={values.BranchCode}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"AccountType"}>
                <Form.Label>{t("AccountType")}</Form.Label>
                <Form.Control
                  type="text"
                  name="AccountType"
                  value={values.AccountType}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"AccountNumber"}>
                <Form.Label>{t("AccountNumber")}</Form.Label>
                <Form.Control
                  type="text"
                  name="AccountNumber"
                  value={values.AccountNumber}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"ShabaNumber"}>
                <Form.Label>{t("ShabaNumber")}</Form.Label>
                <Form.Control
                  type="text"
                  name="ShabaNumber"
                  value={values.ShabaNumber}
                  onChange={onChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="Row">
              <Form.Group className="mb-3" controlId={"CardNumber"}>
                <Form.Label>{t("CardNumber")}</Form.Label>
                <Form.Control
                  type="text"
                  name="CardNumber"
                  value={values.CardNumber}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId={"CustomerNumber"}>
                <Form.Label>{t("CustomerNumber")}</Form.Label>
                <Form.Control
                  type="text"
                  name="CustomerNumber"
                  value={values.CustomerNumber}
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
          <ListGroup as="ol" numbered className="listGroupAccount">
            {accounts.map((a) => (
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
                  <div className="fw-bold countryTitle">{t("FirstName")}</div>
                  {a.FirstName}
                </div>
                <div>
                  <div className="fw-bold countryTitle">{t("LastName")}</div>
                  {a.LastName}
                </div>
                <div>
                  <div className="fw-bold countryTitle">{t("BankName")}</div>
                  {a.BankName}
                </div>
                <div>
                  <div className="fw-bold countryTitle">
                    {t("AccountNumber")}
                  </div>
                  {a.AccountNumber}
                </div>
                <div>
                  <div className="fw-bold countryTitle">{t("ShabaNumber")}</div>
                  {a.ShabaNumber}
                </div>
                <div>
                  <div className="fw-bold countryTitle">{t("CardNumber")}</div>
                  {a.CardNumber}
                </div>
                <div className="d-flex btns ">
                  <div
                    className="actionBtns"
                    onClick={() => handleQuestionEdit(a)}
                  >
                    <fa.FaRegEdit color="green" />
                  </div>
                  <div
                    className="actionBtns"
                    onClick={() => deleteCalled(a.Id)}
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

export default CustomerAccountModal;
