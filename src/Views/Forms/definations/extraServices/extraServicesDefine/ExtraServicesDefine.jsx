import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import "../../../../../assets/css/periorityForm.css";
import { enums } from "../../../../../data/Enums";
import { toast } from "react-toastify";
import { additionalServiceCreate } from "../../../../../services/additionalServiceService";
import ExtraServices from "../ExtraServices";
import {
  createSelectOptions,
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import {ResultCodeEnum} from "../../../../../data/ResultCodeEnum";
import { Form, Button } from "react-bootstrap";
import { modelReadTitle } from "../../../../../services/modelService";
import axios from "axios";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
const ExtraServicesDefine = () => {
  const [validated, setValidated] = useState(false);
  const [response, loading, fetchData] = useAxios();
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(undefined);
  const tabContext = useContext(TabContext);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: ExtraServicesDefine,
        path: "/Definition/AdditionalService/Write",
        title: "/Definition/AdditionalService/Write",
        access: enums.Definition_AdditionalService_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/AdditionalService/Read",
        path: "/Definition/AdditionalService/Read",
        access: enums.Definition_AdditionalService_Read_r,
        Component: ExtraServices,
      },

      "add"
    );
  };
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: request,
    };
    return params;
  };
  const getDatas = () => {
    const modelTitles = axios.request(createParams(modelReadTitle));
    axios
      .all([modelTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result === ResultCodeEnum.Ok
            ? setModelOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  useEffect(() => {
    getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    response && handleResponse(response);
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
        url: additionalServiceCreate,
        headers: request,
        data: {
          Id: 0,
          Model_Id: model?.value,
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
  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("ExtraServicesDefineHeader")}</b>
        <div className="Row">
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
        {defintionInputs(
          values,
          t("routes.extraServices"),
          t("extraService_errorMSG")
        ).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}

        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default ExtraServicesDefine;
