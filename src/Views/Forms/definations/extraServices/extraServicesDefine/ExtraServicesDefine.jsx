import { t } from 'i18next';
import React,{ useContext, useEffect, useState } from 'react'
import FormInput from '../../../../../Components/periodity/formInput/FormInput';
import { TabContext } from '../../../../../contexts/TabContextProvider';
import useAxios from '../../../../../customHooks/useAxios';
import useRequest from '../../../../../customHooks/useRequest';
import '../../../../../assets/css/periorityForm.css'
import { enums } from '../../../../../data/Enums';
import { toast } from "react-toastify";
import { additionalServiceCreate } from '../../../../../services/additionalServiceService';
import ExtraServices from '../ExtraServices';
import { defintionInputs } from '../../../../../validation/functions';
import { Form, Button } from "react-bootstrap";
const ExtraServicesDefine = () => {
  const [validated, setValidated] = useState(false);
    const [response, loading, fetchData, setResponse] = useAxios();
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
            Component:ExtraServicesDefine,
            path:"/extraServicesForm",
            title:"routes.extraServicesForm",
            access:enums.Definition_AdditionalService_Create_w,
        },
        "remove"
      );
      tabContext.addRemoveTabs(
        {
            title: 'routes.extraServices',
            path:'/extraServices',
            access:enums.Definition_AdditionalService_Read_r,
           Component:ExtraServices,
        },
  
        "add"
      );
    };
    const handleError = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
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
        url: additionalServiceCreate,
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
        <b>{t("ExtraServicesDefineHeader")}</b>

        {defintionInputs(values).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}

        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
   
    )
}

export default ExtraServicesDefine