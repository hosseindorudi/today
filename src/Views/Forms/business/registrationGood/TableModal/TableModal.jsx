import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import { useTranslation } from "react-i18next";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { registrationGoodUpdate } from "../../../../../services/registrationGoodService";
import { companyReadTitle } from "../../../../../services/companyService";
import { deviceReadTitle } from "../../../../../services/deviceService";
import { modelReadTitle } from "../../../../../services/modelService";
import { ImportingCompanyReadTitle } from "../../../../../services/importingCompanyService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { createSelectOptions, handleError, setDatePickerDate } from "../../../../../validation/functions";
import axios from "axios";

const TableModal = (props) => {
  const val = props.rowValus;
  const [validated, setValidated] = useState(false);
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
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const [values, setValues] = useState({
    ModelNumber: "",
    SerialNumber: "",
    CodeNumber: "",
    IMEI1: "",
    IMEI2: "",
    Cottage: 0,
    CommodityID: 0,
    ActivationCode: 0,
    InternalCode: 0,
  });
  const lang = localStorage.getItem("i18nextLng");
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
  useEffect(() => {
    setCompany(companyOptions.find((i) => i.value === val.Company_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyOptions]);
  useEffect(() => {
    setDevice(deviceOptions.find((i) => i.value === val.Device_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceOptions]);
  useEffect(() => {
    setModel(modelOptions.find((i) => i.value === val.Model_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelOptions]);
  useEffect(() => {
    setImportingCompany(
      importingCompanyOptions.find((i) => i.value === val.ImportingCompany_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importingCompanyOptions]);
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
            ? setImportingCompanyOptions(
                createSelectOptions(allData[3].data.Title)
              )
            : handleError(allData[3].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  useEffect(() => {
    getDatas();
    setValues({
      ModelNumber: val.ModelNumber,
      SerialNumber:val.SerialNumber,
      CodeNumber: val.CodeNumber,
      IMEI1:val.IMEI1,
      IMEI2: val.IMEI2,
      Cottage: val.Cottage,
      CommodityID: val.CommodityID,
      ActivationCode: val.ActivationCode,
      InternalCode: val.InternalCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleResponse=()=>{
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
        url: registrationGoodUpdate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: val.Id,
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
          WarrantyDate: setDatePickerDate(
            warrantyDate instanceof DateObject
              ? warrantyDate.toDate()
              : warrantyDate
          ),
          ExpirationDate: setDatePickerDate(
            expirationDate instanceof DateObject
              ? expirationDate.toDate()
              : expirationDate
          ),
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
            containerClassName="custom-container"
              onChange={setWarrantyDate}
              calendar={lang === "fa" ? persian : gregorian}
              locale={lang === "fa" ? persian_fa : gregorian_en}
              calendarPosition="bottom-right"
              value={warrantyDate}
            />
          </Form.Group>
        </div>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"ExpirationDate"}>
            <Form.Label>{t("ExpirationDate")}</Form.Label>
            <DatePicker
                 containerClassName="custom-container"
              onChange={setExpirationdate}
              calendar={lang === "fa" ? persian : gregorian}
              locale={lang === "fa" ? persian_fa : gregorian_en}
              calendarPosition="bottom-right"
              value={expirationDate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"ActivationCode"}>
            <Form.Label>{t("ActivationCode")}</Form.Label>
            <Form.Control
              type="number"
              name="ActivationCode"
              value={values.ActivationCode}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"InternalCode"}>
            <Form.Label>{t("InternalCode")}</Form.Label>
            <Form.Control
              type="number"
              name="InternalCode"
              value={values.InternalCode}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type="submit">
            {" "}
            {t("operatorGroupFormSubmit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TableModal;
