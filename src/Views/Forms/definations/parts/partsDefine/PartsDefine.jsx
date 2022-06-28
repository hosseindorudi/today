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
import { productReadTitle } from "../../../../../services/productService";
import Parts from "../Parts";
import "../../../../../assets/css/periorityForm.css";
import { defintionInputs } from "../../../../../validation/functions";

const PartsDefine = () => {
  const [type, setType] = useState("");
  const [validated, setValidated] = useState(false);
  const tabContext = useContext(TabContext);
  const [response, loading, fetchData, setResponse] = useAxios();
  const request = useRequest();
  const abortController = new AbortController();
  const [products, setProducts] = useState([]);
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    productId: "",
  });
  const handleSuccess = () => {
    toast.success(t("part.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: PartsDefine,
        path: "/partsForm",
        title: "routes.partsForm",
        access: enums.Definition_Part_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "routes.parts",
        path: "/parts",
        access: enums.Definition_Part_Read_r,
        Component: Parts,
      },

      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setProducts(response.Title);
        break;
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

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: productReadTitle,
      headers: {
        accept: "*/*",
      },
      data: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Product_Id: values.productId,
          Product_Title: "string",
          Id: 0,
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
  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("PartsDefineHeader")}</b>
        <Form.Group className="mb-3" controlId="product">
          <Form.Label>{t("product")}</Form.Label>
          <Form.Select
            name="productId"
            value={values.productId}
            onChange={onChangeHandler}
            required
          >
            <option value={0} disabled>
              {t("product")}
            </option>
            {products.map((p, i) => (
              <option key={i} value={p.Id}>
                {p.Title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {defintionInputs(values).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}

        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default PartsDefine;
