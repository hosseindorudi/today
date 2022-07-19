import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import {
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import "../../../../../assets/css/periorityForm.css";
import { toast } from "react-toastify";
import { questionnaireTypeCreate } from "../../../../../services/questionnaireType";
import QuestionnaireType from "../QuestionnaireType";
import useAxios from "../../../../../customHooks/useAxios";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import { enums } from "../../../../../data/Enums";
import useRequest from "../../../../../customHooks/useRequest";
const QuestionnaireTypeDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
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
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: QuestionnaireTypeDefine,
        path: "/Definition/QuestionnaireType/Write",
        title: "/Definition/QuestionnaireType/Write",
        access: enums.Definition_QuestionnaireType_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/QuestionnaireType/Read",
        path: "/Definition/QuestionnaireType/Read",
        access: enums.Definition_QuestionnaireType_Read_r,
        Component: QuestionnaireType,
      },

      "add"
    );
  };

  useEffect(() => {
    response&&handleResponse(response)
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
        url: questionnaireTypeCreate,
        headers:request,
        data: {
          
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
        <b>{t("/Definition/QuestionnaireType/Write")}</b>
        {defintionInputs(
          values,
          t("QuestionnaireType_Title"),
          t("QuestionnaireType_errorMSG")
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

export default QuestionnaireTypeDefine;
