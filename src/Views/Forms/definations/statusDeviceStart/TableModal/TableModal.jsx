import React, { useEffect, useState } from "react";
import {  Button,  Form, Modal } from "react-bootstrap";

import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { t } from "i18next";

// import { productUpdate } from "../../../../../services/productService";
// import { productGroupReadTitle } from "../../../../../services/productGroup";
import { defintionInputs } from "../../../../../validation/functions";
import { statusDeviceStartUpdate } from "../../../../../services/statusDeviceStart";

const TableModal = (props) => {
  const [validated, setValidated] = useState(false);
  const val=props.rowValus
  const [type,setType]=useState("")
  const [values, setValues] = useState({
    title: val.Title,
    color: `#${val.Color}`,
    periority: val.Priority,
    desc: val.Description,
  });
 
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSuccess=()=>{
    props.updated()
  }
  const handleResponse = (response, type) => {
    switch (type) {
        case "SUBMIT":
        handleSuccess()
        break;
      default:
        break;
    }
    
  };
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response,type)
        : handleError(response.Message);
    }
    setResponse(undefined)
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
      setType("SUBMIT");
    fetchData({
      method: "POST",
      url: statusDeviceStartUpdate,
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
        SourceType: 0,
        Registrar: 0,
        DateSet: "2022-06-19T16:43:29.709Z",
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
    className="updateCustomerModal"
  >
    <Modal.Header closeButton></Modal.Header>
    <Form
        className="periorityFormModal"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
    <Modal.Body>
          {defintionInputs(values).map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={loading} type='submit'> {t("submit")}</Button>
    </Modal.Footer>
    </Form>
  </Modal>
  );
};

export default TableModal;
