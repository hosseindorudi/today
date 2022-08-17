import { t } from "i18next";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import "../../../../../assets/css/periorityForm.css";
import { defintionInputs } from "../../../../../validation/functions";
import { statusDeviceProgressCreate } from "../../../../../services/statusDeviceProgress";
import StatusDeviceProgress from "../StatusDeviceProgress";
const StatusDeviceProgressDefine = () => {
  const [response, loading, fetchData] = useAxios();
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
        Component: StatusDeviceProgressDefine,
        title: "/Definition/StatusDeviceProgress/Write",
        path: "/Definition/StatusDeviceProgress/Write",
        access: enums.Definition_StatusDeviceProgress_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/StatusDeviceProgress/Read",
        path: "/Definition/StatusDeviceProgress/Read",
        access: enums.Definition_StatusDeviceProgress_Read_r,
        Component: StatusDeviceProgress,
      },

      "add"
    );
  };
  console.log(values)
  useEffect(() => {
    response && handleResponse(response);
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
        url: statusDeviceProgressCreate,
        headers: request,
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
        <b>{t("StatusDeviceProgressDefine")}</b>

        {defintionInputs(
          values,
          t("statusProgressDevice"),
          t("statusDeviceProgress_errorMSG")
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

export default StatusDeviceProgressDefine;
