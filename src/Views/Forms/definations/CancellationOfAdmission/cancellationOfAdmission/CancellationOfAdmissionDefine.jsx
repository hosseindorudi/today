import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { cancellationOfAdmissionCreate } from "../../../../../services/CancellationOfAdmissionService";
import { defintionInputs } from "../../../../../validation/functions";
import CancellationOfAdmission from "../CancellationOfAdmission";
const CancellationOfAdmissionDefine = () => {
  const [response, loading, fetchData] = useAxios();
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
        Component: CancellationOfAdmissionDefine,
        path: "/Definition/CancellationOfAdmission/Write",
        title: "/Definition/CancellationOfAdmission/Write",
        access: enums.Definition_CancellationOfAdmission_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/CancellationOfAdmission/Read",
        path: "/Definition/CancellationOfAdmission/Read",
        access: enums.Definition_CancellationOfAdmission_Read_r,
        Component: CancellationOfAdmission,
      },
      "add"
    );
  };

  useEffect(() => {
    response && handleResponse(response);
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
        url: cancellationOfAdmissionCreate,
        headers: request,
        data: {
          Id: 0,
          Title: values.title,
          Priority: Number(values.periority),
          Description: values.desc,
          Color: values.color.substring(1),
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
        <b>{t("/Definition/CancellationOfAdmission/Write")}</b>
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

export default CancellationOfAdmissionDefine;
