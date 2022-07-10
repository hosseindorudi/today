import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { t } from "i18next";
import { AllowedIpCustomerUpdate } from "../../../../../services/allowedIPCustomer";

const TableModal = (props) => {
  const val = props.rowValus;
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    IsActive: val.IsActive,
    Title: val.Title,
    IP_From: val.IP_From,
    IP_To: val.IP_To,
    Description: val.Description,
  });
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleResponse = () => {
    props.updated();
  };
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeSwitch=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.checked });
  }
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response)
        : handleError(response.Message);
    }
    setResponse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
    fetchData({
      method: "POST",
      url: AllowedIpCustomerUpdate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: val.Id,
        IsActive: values.IsActive,
        Title: values.Title,
        IP_From: values.IP_From,
        IP_To: values.IP_To,
        Description: values.Description,
      },
      signal: abortController.signal,
    });
  }
  };
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="editModalPeriority"
    >
      <Modal.Header closeButton></Modal.Header>
      <Form
        className="periorityFormModal"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Modal.Body>
        <div className="Row ">
        <Form.Group className="mb-3" controlId={"switch"}>
            <Form.Label>{t("IsActive")}</Form.Label>
              <Form.Check style={{textAlign:'center'}} type='switch' checked={values.IsActive} name='IsActive'  onChange={handleChangeSwitch}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"title"}>
            <Form.Label>{t("title")}</Form.Label>
              <Form.Control required type='text' value={values.Title} placeholder={t("title")} name='Title' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"from"}>
            <Form.Label>{t("IP_From")}</Form.Label>
              <Form.Control required style={{textAlign:"center"}} maxLength={15} type='text' value={values.IP_From} placeholder={t("IP_From")} name='IP_From' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"to"}>
            <Form.Label>{t("IP_To")}</Form.Label>
              <Form.Control required style={{textAlign:"center"}} maxLength={15} type='text' value={values.IP_To} placeholder={t("IP_To")} name='IP_To' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"description"}>
            <Form.Label>{t("Description")}</Form.Label>
              <Form.Control as="textarea" rows={2}  type='text' value={values.Description} placeholder={t("Description")} name='Description' onChange={onChangeHandler}/>
          </Form.Group>
        </div>
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

export default TableModal;
