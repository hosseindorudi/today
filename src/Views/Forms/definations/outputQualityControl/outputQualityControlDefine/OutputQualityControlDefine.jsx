import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import {  modelReadTitle } from "../../../../../services/modelService";
import { outputQualityControlCreate } from "../../../../../services/outPutQualityControlService";
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import OutputQualityControl from "../OutputQualityControl";
import "./outputQualityControl.css";
const OutputQualityControlDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [modelOptions,setModelOptions]=useState([])
  const [model, setModel] = useState(undefined);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const { t } = useTranslation();
  const submitted = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: OutputQualityControlDefine,
          path: "/Definition/OutputQualityControl/Write",
          title: "/Definition/OutputQualityControl/Write",
          access: enums.Definition_OutputQualityControl_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/OutputQualityControl/Read",
        path: "/Definition/OutputQualityControl/Read",
        access: enums.Definition_OutputQualityControl_Read_r,
        Component: OutputQualityControl,
      },
      "add"
    );
  };
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
    setType("READTITLE")
    fetchData({
      method: "POST",
      url: modelReadTitle,
      headers: {
        accept: "*/*",
      },
      data:  request,
      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response,type)
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
      setType("SUBMIT")
      fetchData({
        method: "POST",
        url: outputQualityControlCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
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
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/OutputQualityControl/Write")}</b>
        <div className="modelRow">
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
        </div>
        {defintionInputs(values).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default OutputQualityControlDefine;
