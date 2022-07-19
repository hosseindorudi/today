import { t } from "i18next";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { Form, Button } from "react-bootstrap";
import { enums } from "../../../../../data/Enums";
import "../../../../../assets/css/periorityForm.css";
import {
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import StatusDeviceEnd from "../StatusDeviceEnd";
import { statusDeviceEndCreate } from "../../../../../services/statusDeviceEndService";
const StatusDeviceEndDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const tabContext = useContext(TabContext);
  const [validated, setValidated] = useState(false);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: StatusDeviceEndDefine,
        path: "/StatusDeviceEndDefine",
        title: "StatusDeviceEndDefine",
        access: enums.Definition_StatusDeviceEnd_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "StatusDeviceEnd",
        path: "/StatusDeviceEnd",
        access: enums.Definition_StatusDeviceEnd_Read_r,
        Component: StatusDeviceEnd,
      },

      "add"
    );
  };

  useEffect(() => {
    response&&handleResponse(response)
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
        url: statusDeviceEndCreate,
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
  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("StatusDeviceEndDefine")}</b>

        {defintionInputs(
          values,
          t("statusDeviceEnd"),
          t("StatusDeviceEndDefine_errorMSG")
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

export default StatusDeviceEndDefine;
