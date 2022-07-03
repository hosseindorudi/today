import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { t } from "i18next";
import { defintionInputs } from "../../../../../validation/functions";
import { currencyUpdate } from "../../../../../services/currencyService";

const TableModal = (props) => {
  const val = props.rowValus;
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    title: val.Title,
    color: `#${val.Color}`,
    periority: val.Priority,
    desc: val.Description,
    IsReference: val.IsReference,
    Rate: val.Rate,
  });
  const [response, loading, fetchData, setResponse] = useAxios();
  // const tabContext = useContext(TabContext);
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
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response)
        : handleError(response.Message);
      setResponse(undefined);
    }
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSwich=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.checked });
  }
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
        url: currencyUpdate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: val.Id,
          Priority: values.periority,
          Title: values.title,
          Description: values.desc,
          Color: values.color.substring(1),
          IsReference: values.IsReference,
          Rate: values.Rate,
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
      <Form onSubmit={handleSubmit}       noValidate
        validated={validated}
        >
        <Modal.Body>
          <div className="Row">
            <Form.Group className="mb-3" controlId={"Rate"}>
              <Form.Label>{t("Rate")}</Form.Label>
              <Form.Control
                type="number"
                required
                name="Rate"
                value={values.Rate}
                placeholder={t("Rate")}
                onChange={onChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId={"IsReference"}>
              <Form.Label>{t("IsReference")}</Form.Label>
              <Form.Check
                type="switch"
                checked={values.IsReference}
                name="IsReference"
                onChange={handleSwich}
              />
            </Form.Group>
          </div>
          {defintionInputs(
            values,
            t("/Definition/Currency/Read"),
            t("currency_errorMSG")
          ).map((input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          ))}
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
