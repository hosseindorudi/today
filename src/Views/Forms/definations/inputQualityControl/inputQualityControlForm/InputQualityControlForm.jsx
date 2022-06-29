
import axios from "axios";
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
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import { modelReadTitle } from "../../../../../services/modelService";
import { InputQualityControlCreate } from "../../../../../services/inputQualityControlService";
import InputQualityControlList from '../InputQualityControlList'
const InputQualityControlForm = () => {
    const [response, loading, fetchData, setResponse] = useAxios();
    const [validated, setValidated] = useState(false);
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
      Activated:false,
      RamMemory: 0,
      RomMemory: 0,
      BodyColor: "",
    });
    const { t } = useTranslation();
    const handleResponse = () => {
      toast.success(t("item.created"), {
        position: toast.POSITION.TOP_CENTER,
      });
      tabContext.addRemoveTabs(
        {
          Component: InputQualityControlForm,
            path: "/Definition/InputQualityControl/Write",
            title: "/Definition/InputQualityControl/Write",
            access: enums.Definition_InputQualityControl_Create_w,
        },
        "remove"
      );
      tabContext.addRemoveTabs(
        {
          title: "/Definition/InputQualityControl/Read",
          path: "/Definition/InputQualityControl/Read",
          access: enums.Definition_InputQualityControl_Read_r,
          Component: InputQualityControlList,
        },
        "add"
      );
    };
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
      const modelTitles = axios.request(
        createParams(modelReadTitle)
      );
      axios
      .all([
        modelTitles,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setModelOptions(createSelectOptions(allData[0].data.Title))
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
      if (response) {
        response.Result
          ? handleResponse(response)
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
          url: InputQualityControlCreate,
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
          <b>{t("/Definition/InputQualityControl/Write")}</b>
          <div className="modelDefineRow">
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
    )
}

export default InputQualityControlForm