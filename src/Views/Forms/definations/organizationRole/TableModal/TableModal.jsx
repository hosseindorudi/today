import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { defintionInputs, handleError } from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { organizationalRoleUpdate } from "../../../../../services/organizationRoleService";

const TableModal = (props) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    group:"",
    percentage: 0,
   
  });
  const { t } = useTranslation();
  const handleResponse = (response) => {
    props.updated();
  };
  useEffect(() => {
    const prop=props.rowValus
    setValues({
      ...values,
      title: prop.Title,
      color: `#${prop.Color}`,
      periority: prop.Priority,
      desc: prop.Description,
      group: prop.Group,
      percentage: prop.Percentage
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    response&&handleResponse(response)
    return () => abortController.abort();
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
        url: organizationalRoleUpdate,
        headers:request,
        data: {
          
          Id: props.rowValus.Id,
          Group:values.group,
          Percentage:values.percentage,
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

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}
        <div className="Row">
          <Form.Group className="mb-3" controlId={"group"}>
            <Form.Label>{t("organization.group")}</Form.Label>
            <Form.Control
              type="text"
              name="group"
              onChange={onChangeHandler}
              value={values.group}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"Percent"}>
            <Form.Label>{t("organization.percent")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="percentage"
              value={values.percentage}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>


        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type='submit' >
            {" "}
            {t("operatorGroupFormSubmit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TableModal;
