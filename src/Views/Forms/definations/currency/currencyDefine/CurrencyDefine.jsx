import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../../../../customHooks/useAxios";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useRequest from "../../../../../customHooks/useRequest";
import { defintionInputs } from "../../../../../validation/functions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { enums } from "../../../../../data/Enums";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { currencyCreate } from "../../../../../services/currencyService";
import Currency from "../Currency";
import "./currencyDefine.css";
const CurrencyDefine = () => {
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [response, loading, fetchData] = useAxios();
  const tabContext = useContext(TabContext);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    IsReference: false,
    Rate: 0,
  });
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: CurrencyDefine,
        path: "/Definition/Currency/Write",
        title: "/Definition/Currency/Write",
        access: enums.Definition_Currency_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Currency/Read",
        path: "/Definition/Currency/Read",
        access: enums.Definition_Currency_Read_r,
        Component: Currency,
      },

      "add"
    );
  };

  useEffect(() => {
    response && handleResponse(response);
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSwich = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
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
        url: currencyCreate,
        headers: request,
        data: {
          Id: 0,
          Priority: values.periority,
          Title: values.title,
          Description: values.desc,
          Color: values.color.substring(1),
          IsReference: values.IsReference,
          Rate: values.Rate,
        },
        signal: abortController.signal,
      });
    }
  };

  return (
    <div className="currency">
      <Form
        className="currencyform"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/Currency/Write")}</b>
        <div className="Row">
          <Form.Group className="mb-3" controlId={"Rate"}>
            <Form.Label>{t("Rate")}</Form.Label>
            <Form.Control
              type="number"
              required
              name="Rate"
              value={values.Rate}
              placeholder={t("Rate")}
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId={"IsReference"}>
            <Form.Label>{t("IsReference")}</Form.Label>
            <Form.Check
              type="switch"
              checked={values.IsReference}
              name="IsReference"
              onChange={handleSwich}
            />
          </Form.Group>
        </div>
        {defintionInputs(
          values,
          t("/Definition/Currency/Read"),
          t("currency_errorMSG")
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

export default CurrencyDefine;
