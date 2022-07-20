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
import StatusDeviceStart from "../StatusDeviceStart";
import { statusDeviceStartCreate } from "../../../../../services/statusDeviceStart";

const StatusDeviceStartDefine = () => {
  const [response, loading, fetchData] = useAxios();
  const [validated, setValidated] = useState(false);
  const tabContext = useContext(TabContext);
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
        Component: StatusDeviceStartDefine,
        path: "/Definition/StatusDeviceStart/Write",
        title: "/Definition/StatusDeviceStart/Write",
        access: enums.Definition_StatusDeviceStart_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/StatusDeviceStart/Read",
        path: "/Definition/StatusDeviceStart/Read",
        access: enums.Definition_StatusDeviceStart_Read_r,
        Component: StatusDeviceStart,
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
        url: statusDeviceStartCreate,
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
        <b>{t("tech.firstState")}</b>

        {defintionInputs(
          values,
          t("StatusDeviceStart"),
          t("statusDeviceStart_errorMSG")
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

export default StatusDeviceStartDefine;
