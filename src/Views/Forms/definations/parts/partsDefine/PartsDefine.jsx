import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { partCreate } from "../../../../../services/partService";
import Parts from "../Parts";
import "../../../../../assets/css/periorityForm.css";
import { createSelectOptions, defintionInputs } from "../../../../../validation/functions";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { partGroupReadTitle } from "../../../../../services/partGroup";
import { qualityReadTitle } from "../../../../../services/qualityService";
import axios from "axios";
import './partsDefine.css'
const PartsDefine = () => {
  const [type, setType] = useState("");
  const [validated, setValidated] = useState(false);
  const [partGroupOptions, setPartGroupOptions] = useState([]);
  const [partGroup, setPartGroup] = useState(undefined);
  const [qualityOptions, setQualityOptions] = useState([]);
  const [quality, setQuality] = useState(undefined);
  const tabContext = useContext(TabContext);
  const [response, loading, fetchData, setResponse] = useAxios();
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
  const handleSuccess = () => {
    toast.success(t("part.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: PartsDefine,
          title: "/Definition/Part/Write",
        path: "/Definition/Part/Write",
          access: enums.Definition_Part_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Part/Read",
        path: "/Definition/Part/Read",
        access: enums.Definition_Part_Read_r,
        Component: Parts,
      },

      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
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
      fetchData({
        method: "POST",
        url: partCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          PartGroup_Id:partGroup?.value,
          Quality_Id:quality?.value,
          Id: 0,
          Length:values.length,
          Width:values.Width,
          Height:values.Height,
          Weight:values.Weight,
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
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("PartsDefineHeader")}</b>
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
              value={values.IsPerishable}
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
              value={values.MainPart}
              onChange={onChangeSwitch}
              
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

export default PartsDefine;
