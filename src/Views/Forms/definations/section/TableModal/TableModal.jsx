import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { sectionUpdate } from "../../../../../services/sectionService";
import { cityReadTitle } from "../../../../../services/cityService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";

const TableModal = (props) => {
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const abortController = new AbortController();
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState(undefined);
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  useEffect(() => {
    const prop = props.rowValus;
    setValues({
      ...values,
      title: prop.Title,
      color: `#${prop.Color}`,
      periority: prop.Priority,
      desc: prop.Description,
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submitted=()=>{
    props.updated()
  }
  useEffect(() => {
    setCity(cityOptions.find(i=>i.value===props.rowValus.City_Id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityOptions]);
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setCityOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        submitted();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: cityReadTitle,
      headers: request,
      
      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response&&handleResponse(response, type)
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
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: sectionUpdate,
        headers:request,
        data: {
          
          Id: props.rowValus.Id,
          City_Id: city?.value,
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
        <Form.Group className="mb-3" controlId={"city"}>
            <Form.Label>{t("city")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={cityOptions}
              value={city}
              onchangeHandler={(e) => setCity(e)}
              placeholder={t("city")}
            />
          </Form.Group>
      
        {defintionInputs(values).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}


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
