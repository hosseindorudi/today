import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { companyReadTitle } from "../../../../../services/companyService";
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { DeviceUpdate } from "../../../../../services/deviceService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
const TableModal = (props) => {
const [validated, setValidated] = useState(false);
  const [companyOptions,setCompanyOptions]=useState([])
  const [company, setCompany] = useState(undefined);
  const { t } = useTranslation();
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

  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: request,
    };
    return params;
  };

  const getDatas=()=>{
    const companyTitles = axios.request(
      createParams(companyReadTitle)
    );
    axios
    .all([
      companyTitles,
    ])
    .then(
      axios.spread((...allData) => {
        allData[0].data?.Result
          ? setCompanyOptions(createSelectOptions(allData[0].data.Title))
          : handleError(allData[0].data.Message);
          })
    )
    .catch((error) => {
      handleError(error.message);
    });
  }
  useEffect(() => {
      getDatas();
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(companyOptions)
    setCompany(companyOptions.find((m) => m.value === props.rowValus.Company_Id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[companyOptions])
  
  const handleResponse=(response)=>{
    props.updated()
  }
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse()
        : handleError(response.Message);
      setResponse(undefined);
    }
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
        url: DeviceUpdate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Company_Id:company?.value,
          Id: props.rowValus.Id,
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

        <div className="Row">
        <Form.Group className="mb-3" controlId={"company"}>
        <Form.Label>{t("company")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={companyOptions}
            value={company}
            onchangeHandler={(e) => setCompany(e)}
            placeholder={t("company")}
          />
         </Form.Group>

        </div>
        {defintionInputs(values).map((input) => (
              <FormInput
                key={input.id}
                {...input}
                onChange={onChangeHandler}
              />
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
