import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../../../../customHooks/useAxios";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useRequest from "../../../../../customHooks/useRequest";
import {
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { enums } from "../../../../../data/Enums";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import AnswerPageFailed from "../AnswerPageFailed";
import { AnswerPageFailedCreate } from "../../../../../services/answerPageFailedService";

const AnswerPageFailedForm = () => {
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [response, loading, fetchData, setResponse] = useAxios();
  const tabContext = useContext(TabContext);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    AnswerPageFailed: "#000000",
    periority: 1,
    desc: "",
  });
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: AnswerPageFailedForm,
        path: "/Definition/AnswerPageFailed/Write",
        title: "/Definition/AnswerPageFailed/Write",
        access: enums.Definition_AnswerPageFailed_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        Component: AnswerPageFailed,
        path: "/Definition/AnswerPageFailed/Read",
        title: "/Definition/AnswerPageFailed/Read",
        access: enums.Definition_AnswerPageFailed_Read_r,
      },

      "add"
    );
  };

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
      fetchData({
        method: "POST",
        url: AnswerPageFailedCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: 0,
          Priority: values.periority,
          Title: values.title,
          Description: values.desc,
          Color: values.color.substring(1),

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
        <b>{t("/Definition/AnswerPageFailed/Write")}</b>

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

export default AnswerPageFailedForm;
