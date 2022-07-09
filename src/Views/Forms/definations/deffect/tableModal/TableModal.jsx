import React, { useEffect, useState } from "react";
import {  Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";


import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { t } from "i18next";
// import { TabContext } from "../../../../../contexts/TabContextProvider";
import { defectUpdate } from "../../../../../services/defectService";
import { createSelectOptions, defintionInputs } from "../../../../../validation/functions";
import { modelReadTitle } from "../../../../../services/modelService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";


const TableModal = (props) => {
  const val=props.rowValus
  const [modelOptions, setModelOptions] = useState([])
  const [model, setmodel] = useState(undefined)
  const [type, setType] = useState("")
  const [values, setValues] = useState({
    title: val.Title,
    color: `#${val.Color}`,
    periority: val.Priority,
    desc: val.Description,
  });
  const [response, loading, fetchData, setResponse] = useAxios();
  // const tabContext = useContext(TabContext);
  const request = useRequest();
  const abortController = new AbortController();

  useEffect(() => {
    setmodel(modelOptions.find(f=>f.value===val.Model_Id))
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelOptions])
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setModelOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        handleSuccess();
        break;
      default:
        break;
    }
  };

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleSuccess = () => {
    props.updated()
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: modelReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setType("SUBMIT")
    fetchData({
      method: "POST",
      url: defectUpdate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: val.Id,
        Model_Id:model?.value,
        Priority: values.periority,
        Title: values.title,
        Description: values.desc,
        Color: values.color.substring(1),
        DateSet: "2022-06-19T16:43:29.709Z",
      },
      signal: abortController.signal,
    });
  
  };
  return (
    <Modal
    show={props.tableModalShow}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={props.onHide}
    className='editModalPeriority'
  >
    <Modal.Header closeButton></Modal.Header>
    <Form onSubmit={handleSubmit}>
    <Modal.Body>
    <div className="periorityFormsEdit">
    <div className="Row">
        <Form.Group  className="mb-3" >
          <Form.Label>{t("model")}</Form.Label>
        <CustomReactMultiSelect
                  isMulti={false}
                  options={modelOptions}
                  value={model}
                  onchangeHandler={(e) => setmodel(e)}
                  placeholder={t("model")}
                />
        </Form.Group>
        </div>
          {defintionInputs(values).map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={loading} type='submit'> {t("submit")}</Button>
    </Modal.Footer>
    </Form>
  </Modal>
  );
};

export default TableModal;
