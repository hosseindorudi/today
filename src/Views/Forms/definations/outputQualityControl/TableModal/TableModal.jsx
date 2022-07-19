import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { modelReadTitle } from "../../../../../services/modelService";
import { outputQualityControlUpdate } from "../../../../../services/outPutQualityControlService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";

const TableModal = (props) => {
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [type, setType] = useState("");
  const [modelOptions,setModelOptions]=useState([])
  const [model, setModel] = useState(undefined);
  const abortController = new AbortController();
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
  
  const submitted=(response)=>{
    props.updated()
  }
  const handleResponse=(response,type)=>{
    switch (type) {
      case "READTITLE":
        setModelOptions(createSelectOptions(response.Title))
        break;
      case "SUBMIT":
        submitted()
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    setModel(modelOptions.find(i=>i.value===props.rowValus.Model_Id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelOptions])
    useEffect(() => {
      setType("READTITLE")
      fetchData({
        method: "POST",
        url: modelReadTitle,
        headers:request,
        signal: abortController.signal,
      });
      return () => abortController.abort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
      response&&handleResponse(response,type)
    
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
        setType("SUBMIT")
        fetchData({
          method: "POST",
          url: outputQualityControlUpdate,
          headers: request,
          data: {
            
            Id: props.rowValus.Id,
            Model_Id:model?.value,
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
       
        <Form.Group className="mb-3" controlId={"model"}>
        <Form.Label>{t("model")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={modelOptions}
            value={model}
            onchangeHandler={(e) => setModel(e)}
            placeholder={t("model")}
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
