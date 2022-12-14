import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import {
  createSelectOptions,
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import axios from "axios";
import { deviceReadTitle } from "../../../../../services/deviceService";
import { countryReadTitle } from "../../../../../services/countryService";
import { modelUpdate } from "../../../../../services/modelService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { ColorReadTitle } from "../../../../../services/colorService";
import { ResultCodeEnum } from "../../../../../data/ResultCodeEnum";

const TableModal = (props) => {
  const [response, loading, fetchData] = useAxios();
  const [validated, setValidated] = useState(false);
  const { t } = useTranslation();
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [device, setDevice] = useState(undefined);
  const [colorOptions, setColorOptions] = useState([]);
  const [color, setColor] = useState(undefined);
  const [countryOptions, setCountryOptions] = useState([]);
  const [country, setCountry] = useState(undefined);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    Activated: false,
    RamMemory: 0,
    RomMemory: 0,
  });
  const handleResponse = (response) => {
    props.updated();
  };
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: request,
    };
    return params;
  };
  useEffect(() => {
    setDevice(deviceOptions.find((i) => i.value === props.rowValus.Device_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceOptions]);
  useEffect(() => {
    setCountry(
      countryOptions.find((i) => i.value === props.rowValus.Country_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryOptions]);
  useEffect(() => {
    setColor(colorOptions.find((i) => i.value === props.rowValus.Color_Id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorOptions]);
  const getDatas = () => {
    const deviceTitles = axios.request(createParams(deviceReadTitle));
    const countryTitles = axios.request(createParams(countryReadTitle));
    const colorTitles = axios.request(createParams(ColorReadTitle));
    axios
      .all([deviceTitles, countryTitles, colorTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result === ResultCodeEnum.Ok
            ? setDeviceOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result === ResultCodeEnum.Ok
            ? setCountryOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
          allData[2].data?.Result === ResultCodeEnum.Ok
            ? setColorOptions(createSelectOptions(allData[2].data.Title))
            : handleError(allData[2].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  useEffect(() => {
    getDatas();
    const prop = props.rowValus;
    setValues({
      ...values,
      title: prop.Title,
      color: `#${prop.Color}`,
      periority: prop.Priority,
      desc: prop.Description,
      Activated: prop.Activated,
      RamMemory: prop.RamMemory,
      RomMemory: prop.RomMemory,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse();

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
        url: modelUpdate,
        headers: request,
        data: {
          Id: props.rowValus.Id,
          Device_Id: device?.value,
          Country_Id: country?.value,
          Color_Id: color?.value,
          RamMemory: values.RamMemory,
          RomMemory: values.RomMemory,
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
          {defintionInputs(values).map((input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          ))}
          <div className="Row">
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
          <div className="Row">
            <Form.Group className="mb-3" controlId={"BodyColor"}>
              <Form.Label>{t("model.BodyColor")}</Form.Label>
              <CustomReactMultiSelect
                isMulti={false}
                options={colorOptions}
                value={color}
                onchangeHandler={(e) => setColor(e)}
                placeholder={t("model.BodyColor")}
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
