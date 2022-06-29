import React, { useEffect, useState } from "react";
import {  Button,  Form, Modal } from "react-bootstrap";
import "./tableModal.css";
import '../../../../../assets/css/periorityForm.css'
import { toast } from "react-toastify";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { PartUpdate } from "../../../../../services/partService";
import { t } from "i18next";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { createSelectOptions, defintionInputs } from "../../../../../validation/functions";
import axios from "axios";
import { partGroupReadTitle } from "../../../../../services/partGroup";
import { qualityReadTitle } from "../../../../../services/qualityService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";


const TableModal = (props) => {
  const [type, setType] = useState("");
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [partGroupOptions, setPartGroupOptions] = useState([]);
  const [partGroup, setPartGroup] = useState(undefined);
  const [qualityOptions, setQualityOptions] = useState([]);
  const [quality, setQuality] = useState(undefined);

  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    length:0,
    width:0,
    height:0,
    weight:0,
    BodyColor:"",
    IsPerishable:false,
    MainPart:false,
    TechnicalCode:""
  });

  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  const handleSuccess=()=>{
    props.updated()
  }
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
    const prop = props.rowValus;
    setValues({
      ...values,
      title: prop.Title,
      color: `#${prop.Color}`,
      periority: prop.Priority,
      desc: prop.Description,
      length:prop.Length,
      width:prop.Width,
      height:prop.Height,
      weight:prop.Weight,
      BodyColor:prop.BodyColor,
      IsPerishable:prop.IsPerishable,
      MainPart:prop.MainPart,
      TechnicalCode:prop.TechnicalCode
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        handleSuccess();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setQuality(qualityOptions.find(i=>i.value===props.rowValus.Quality_Id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityOptions])
  useEffect(() => {
    setPartGroup(partGroupOptions.find(i=>i.value===props.rowValus.PartGroup_Id))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partGroupOptions])
 const getDatas=()=>{
    const partGroupTitles = axios.request(
      createParams(partGroupReadTitle)
    );
    const qualityTitles = axios.request(
      createParams(qualityReadTitle)
    );
    axios
    .all([
      partGroupTitles,
      qualityTitles,
    ])
    .then(
      axios.spread((...allData) => {
        allData[0].data?.Result
          ? setPartGroupOptions(createSelectOptions(allData[0].data.Title))
          : handleError(allData[0].data.Message);
        allData[1].data?.Result
          ? setQualityOptions(
              createSelectOptions(allData[1].data.Title)
            )
          : handleError(allData[1].data.Message);
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
        ? handleResponse(response, type)
        : handleError(response.Message);
      setResponse(undefined);
    }
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
      setType("SUBMIT");
      console.log(partGroup)
      fetchData({
        method: "POST",
        url: PartUpdate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          PartGroup_Id:partGroup?.value,
          Quality_Id:quality?.value,
          Id: props.rowValus.Id,
          Length:values.length,
          Width:values.width,
          Height:values.height,
          Weight:values.weight,
          BodyColor:values.BodyColor,
          IsPerishable:values.IsPerishable,
          MainPart:values.MainPart,
          TechnicalCode:values.TechnicalCode,
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
  const onChangeSwitch=(e)=>{
    setValues({ ...values, [e.target.name]: e.target.checked });
  }
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
    <Form  className="periorityFormModal"
        noValidate
        validated={validated}
        onSubmit={handleSubmit} >
    <Modal.Body>
    {defintionInputs(values).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}
         <div className="partsRow">
        <Form.Group className="mb-3" controlId={"groupid"}>
        <Form.Label>{t("partGroup")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={partGroupOptions}
            value={partGroup}
            onchangeHandler={(e) => setPartGroup(e)}
            placeholder={t("partGroup")}
          />
         </Form.Group>
         <Form.Group className="mb-3" controlId={"quality"}>
        <Form.Label>{t("quality")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={qualityOptions}
            value={quality}
            onchangeHandler={(e) => setQuality(e)}
            placeholder={t("quality")}
          />
          </Form.Group>
        </div>
        <div className="partsRow">
          <Form.Group className="mb-3" controlId={"length"}>
            <Form.Label>{t("parts.length")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="length"
              onChange={onChangeHandler}
              value={values.length}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"height"}>
            <Form.Label>{t("part.height")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="height"
              value={values.height}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"width"}>
            <Form.Label>{t("part.width")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="width"
              value={values.width}
              onChange={onChangeHandler}
            />
          </Form.Group>
        </div>
        <div className="partsRow">
          <Form.Group className="mb-3" controlId={"weight"}>
            <Form.Label>{t("parts.weight")}</Form.Label>
            <Form.Control
              type="number"
              min="0"
              name="weight"
              onChange={onChangeHandler}
              value={values.weight}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"BodyColor"}>
            <Form.Label>{t("part.BodyColor")}</Form.Label>
            <Form.Control
              type="text"
              min="0"
              name="BodyColor"
              value={values.BodyColor}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"IsPerishable"}>
            <Form.Label>{t("part.IsPerishable")}</Form.Label>
            <Form.Check
              name="IsPerishable"
              type="switch"
              checked={values.IsPerishable}
              onChange={onChangeSwitch}
            />
          </Form.Group>
        </div>
        <div className="partsRow">
          <Form.Group className="mb-3" controlId={"TechnicalCode"}>
            <Form.Label>{t("parts.TechnicalCode")}</Form.Label>
            <Form.Control
              type="text"
              name="TechnicalCode"
              onChange={onChangeHandler}
              value={values.TechnicalCode}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"MainPart"}>
            <Form.Label>{t("part.MainPart")}</Form.Label>
            <Form.Check
              name="MainPart"
              type="switch"
              checked={values.MainPart}
              onChange={onChangeSwitch}
              
            />
          </Form.Group>
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
