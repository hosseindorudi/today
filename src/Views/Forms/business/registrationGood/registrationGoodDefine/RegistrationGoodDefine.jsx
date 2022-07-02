import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import { companyReadTitle } from "../../../../../services/companyService";
import { deviceReadTitle } from "../../../../../services/deviceService";
import { ImportingCompanyReadTitle } from "../../../../../services/importingCompanyService";
import { modelReadTitle } from "../../../../../services/modelService";
import { registrationGoodCreate } from "../../../../../services/registrationGoodService";
import {
  createSelectOptions,
  handleError,
  setDatePickerDate,
} from "../../../../../validation/functions";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import AppContext from "../../../../../contexts/AppContext";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import RegistrationGood from "../RegistrationGood";

const RegistrationGoodDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const appContext = useContext(AppContext);
  const abortController = new AbortController();
  const [company, setCompany] = useState(undefined);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [device, setDevice] = useState(undefined);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [model, setModel] = useState(undefined);
  const [modelOptions, setModelOptions] = useState([]);
  const [importingCompany, setImportingCompany] = useState(undefined);
  const [importingCompanyOptions, setImportingCompanyOptions] = useState([]);
  const [warrantyDate, setWarrantyDate] = useState(new Date());
  const [expirationDate, setExpirationdate] = useState(new Date());
  const [values, setValues] = useState({
    ModelNumber: "",
    SerialNumber: "",
    CodeNumber: "",
    IMEI1: "",
    IMEI2: false,
    Cottage: 0,
    CommodityID: 0,
    ActivationCode: 0,
    InternalCode: 0,
  });
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: RegistrationGoodDefine,
        path: "/Business/RegistrationGood/Create",
        title: "/Business/RegistrationGood/Create",
        access: enums.Business_RegistrationGood_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Business/RegistrationGood/Read",
        path: "/Business/RegistrationGood/Read",
        access: enums.Business_RegistrationGood_Read_r,
        Component: RegistrationGood,
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
    const companyTitles = axios.request(createParams(companyReadTitle));
    const deviceTitles = axios.request(createParams(deviceReadTitle));
    const modelTitles = axios.request(createParams(modelReadTitle));
    const importingCompanyTitles = axios.request(
      createParams(ImportingCompanyReadTitle)
    );
    axios
      .all([companyTitles, deviceTitles, modelTitles, importingCompanyTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setCompanyOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setDeviceOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
          allData[2].data?.Result
            ? setModelOptions(createSelectOptions(allData[2].data.Title))
            : handleError(allData[2].data.Message);
          allData[3].data?.Result
            ? setDeviceOptions(createSelectOptions(allData[3].data.Title))
            : handleError(allData[3].data.Message);
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
        url: registrationGoodCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
          Company_Id: company?.value,
          Device_Id: device?.value,
          Model_Id: model?.value,
          ImportingCompany_Id: importingCompany?.value,
          ModelNumber: values.ModelNumber,
          SerialNumber: values.SerialNumber,
          CodeNumber: values.CodeNumber,
          IMEI1: values.IMEI1,
          IMEI2: values.IMEI2,
          Cottage: values.Cottage,
          CommodityID: values.CommodityID,
          WarrantyDate: setDatePickerDate(values.WarrantyDate),
          ExpirationDate: setDatePickerDate(values.ExpirationDate),
          ActivationCode: values.ActivationCode,
          InternalCode: values.InternalCode,
        },
        signal: abortController.signal,
      });
    }
  };

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="businessFormDefine">
      <Form
        className="businessForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Business/RegistrationGood/Create")}</b>
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
        <div className="Row">
          <Form.Group className="mb-3" controlId={"importingCompany"}>
            <Form.Label>{t("ImportingCompanyHeader")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={importingCompanyOptions}
              value={importingCompany}
              onchangeHandler={(e) => setImportingCompany(e)}
              placeholder={t("ImportingCompanyHeader")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"modelNumber"}>
            <Form.Label>{t("ModelNumber")}</Form.Label>
            <Form.Control
              type="string"
              name="ModelNumber"
              value={values.ModelNumber}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"SerialNumber"}>
            <Form.Label>{t("SerialNumber")}</Form.Label>
            <Form.Control
              type="string"
              name="SerialNumber"
              value={values.SerialNumber}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"CodeNumber"}>
            <Form.Label>{t("CodeNumber")}</Form.Label>
            <Form.Control
              type="text"
              name="CodeNumber"
              value={values.CodeNumber}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"IMEI1"}>
            <Form.Label>{t("IMEI1")}</Form.Label>
            <Form.Control
              type="text"
              name="IMEI1"
              value={values.IMEI1}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"IMEI2"}>
            <Form.Label>{t("IMEI2")}</Form.Label>
            <Form.Control
              type="text"
              name="IMEI2"
              value={values.IMEI2}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"Cottage"}>
            <Form.Label>{t("Cottage")}</Form.Label>
            <Form.Control
              type="number"
              name="Cottage"
              value={values.Cottage}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"CommodityID"}>
            <Form.Label>{t("CommodityID")}</Form.Label>
            <Form.Control
              type="text"
              name="CommodityID"
              value={values.CommodityID}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"WarrantyDate"}>
            <Form.Label>{t("WarrantyDate")}</Form.Label>
            <DatePicker
              onChange={setWarrantyDate}
              calendar={lang === "fa" ? persian : gregorian}
              locale={lang === "fa" ? persian_fa : gregorian_en}
              calendarPosition="bottom-right"
              value={warrantyDate}
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

export default RegistrationGoodDefine;
