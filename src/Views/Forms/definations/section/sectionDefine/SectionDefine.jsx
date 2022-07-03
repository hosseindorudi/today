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
import { cityReadTitle } from "../../../../../services/cityService";
import { sectionCreate } from "../../../../../services/sectionService";
import {
  createSelectOptions,
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import Section from "../Section";
const SectionDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [city, setCity] = useState(undefined);
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
        Component: SectionDefine,
        path: "/Definition/Section/Write",
        title: "/Definition/Section/Write",
        access: enums.Definition_Section_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Section/Read",
        path: "/Definition/Section/Read",
        access: enums.Definition_Section_Read_r,
        Component: Section,
      },
      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setCityOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        submitted();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: cityReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal: abortController.signal,
    });
    return () => abortController.abort();
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
        url: sectionCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
          City_Id: city?.value,
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
        <b>{t("/Definition/Section/Write")}</b>
        <Form.Group className="mb-3" controlId={"city"}>
          <Form.Label>{t("city")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={cityOptions}
            value={city}
            onchangeHandler={(e) => setCity(e)}
            placeholder={t("city")}
          />
        </Form.Group>

        {defintionInputs(values, t("admissionpart"), t("section_errorMSG")).map(
          (input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          )
        )}
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default SectionDefine;
