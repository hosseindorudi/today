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
import { countryReadTitle } from "../../../../../services/countryService";
import { deviceReadTitle } from "../../../../../services/deviceService";
import { modelCreate } from "../../../../../services/modelService";
import {
  createSelectOptions,
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import Model from "../Model";
import "./modelDefine.css";
const ModelDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [device, setDevice] = useState(undefined);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState(undefined);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    Activated: false,
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
        Component: ModelDefine,
        path: "/Definition/Model/Write",
        title: "/Definition/Model/Write",
        access: enums.Definition_Model_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Model/Read",
        path: "/Definition/Model/Read",
        access: enums.Definition_Model_Read_r,
        Component: Model,
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
  const getDatas = () => {
    const deviceTitles = axios.request(createParams(deviceReadTitle));
    const countryTitles = axios.request(createParams(countryReadTitle));
    axios
      .all([deviceTitles, countryTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setDeviceOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setCountryOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
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
        url: modelCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
          Device_Id: device?.value,
          Country_Id: country?.value,
          RamMemory: values.RamMemory,
          RomMemory: values.RomMemory,
          BodyColor: values.BodyColor,
          Activated: values.Activated,
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
  const handleChangeSwich = (e) => {
    setValues({ ...values, Activated: e.target.checked });
  };
  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/Model/Write")}</b>
        <div className="modelDefineRow">
          <Form.Group className="mb-3" controlId={"device"}>
            <Form.Label>{t("device")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={deviceOptions}
              value={device}
              onchangeHandler={(e) => setDevice(e)}
              placeholder={t("device")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"country"}>
            <Form.Label>{t("country")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={countryOptions}
              value={country}
              onchangeHandler={(e) => setCountry(e)}
              placeholder={t("country")}
            />
          </Form.Group>
        </div>
        {defintionInputs(values, t("model"), t("model_errorMSG")).map(
          (input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          )
        )}
        <div className="modelDefineRow">
          <Form.Group className="mb-3" controlId={"Rom"}>
            <Form.Label>{t("model.Rom")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="RomMemory"
              onChange={onChangeHandler}
              value={values.RomMemory}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"Ram"}>
            <Form.Label>{t("model.Ram")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="RamMemory"
              value={values.RamMemory}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        <div className="modelDefineRow">
          <Form.Group className="mb-3" controlId={"BodyColor"}>
            <Form.Label>{t("model.BodyColor")}</Form.Label>
            <Form.Control
              type="text"
              name="BodyColor"
              value={values.BodyColor}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"model.activated"}>
            <Form.Label>{t("model.activated")}</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={values.Activated}
              onChange={handleChangeSwich}
              style={{ textAlign: "center" }}
            />
          </Form.Group>
        </div>
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default ModelDefine;
