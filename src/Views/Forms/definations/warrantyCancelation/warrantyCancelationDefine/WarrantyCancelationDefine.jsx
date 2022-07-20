import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import "../../../../../assets/css/periorityForm.css";
import { enums } from "../../../../../data/Enums";
import { toast } from "react-toastify";
import { reasonForCancellationOfWarrantyCreate } from "../../../../../services/warrantyCancellationService";
import WarrantyCancelation from "../WarrantyCancelation";
import { defintionInputs } from "../../../../../validation/functions";
import { Form, Button } from "react-bootstrap";

const WarrantyCancelationDefine = () => {
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
        Component: WarrantyCancelationDefine,
        path: "/Definition/warrantyCancelation/Write",
        title: "/Definition/warrantyCancelation/Write",
        access: enums.Definition_CancellationOfWarranty_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/warrantyCancelation/Read",
        path: "/Definition/warrantyCancelation/Read",
        access: enums.Definition_CancellationOfWarranty_Read_r,
        Component: WarrantyCancelation,
      },

      "add"
    );
  };

  useEffect(() => {
    response && handleResponse(response);
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
        url: reasonForCancellationOfWarrantyCreate,
        headers: request,
        data: {
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
        <b>{t("WarrantyCancelationDefineHeader")}</b>

        {defintionInputs(
          values,
          t("routes.warrantyCancelation"),
          t("warrantyCancelation_errorMSG")
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

export default WarrantyCancelationDefine;
