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
import { provinceCreate } from "../../../../../services/provinceService";
import {
  createSelectOptions,
  defintionInputs,
} from "../../../../../validation/functions";
import Province from "../Province";

const ProvinceDefine = () => {
  const [response, loading, fetchData] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
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
  });
  const { t } = useTranslation();
  const submitted = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Province/Write",
        path: "/Definition/Province/Write",
        access: enums.Definition_Province_Create_w,
        Component: ProvinceDefine,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Province/Read",
        path: "/Definition/Province/Read",
        access: enums.Definition_Province_Read_r,
        Component: Province,
      },
      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setCountryOptions(createSelectOptions(response.Title));
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
      url: countryReadTitle,
      headers: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response && handleResponse(response, type);
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
        url: provinceCreate,
        headers: request,
        data: {
          Id: 0,
          Country_Id: country?.value,
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
        <b>{t("/Definition/Province/Write")}</b>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"model"}>
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
        {defintionInputs(
          values,
          t("personInformationState"),
          t("province_errorMSG")
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

export default ProvinceDefine;
