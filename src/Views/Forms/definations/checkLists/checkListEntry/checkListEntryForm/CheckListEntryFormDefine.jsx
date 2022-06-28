import { t } from 'i18next';
import React,{ useContext, useEffect, useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import FormInput from '../../../../../../Components/periodity/formInput/FormInput';
import { TabContext } from '../../../../../../contexts/TabContextProvider';
import useAxios from '../../../../../../customHooks/useAxios';
import useRequest from '../../../../../../customHooks/useRequest';

import { enums } from '../../../../../../data/Enums';
import { toast } from "react-toastify";
import '../../../../../../assets/css/periorityForm.css'
import CheckListEntry from '../CheckListEntry';
import { inputQualityControlCreate } from '../../../../../../services/inputQualityControlService';
import { defintionInputs } from '../../../../../../validation/functions';
const CheckListEntryFormDefine = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
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
          Component:CheckListEntryFormDefine ,
          path:"/entryCheckListForm",
          title:"routes.entryCheckListForm",
          access:enums.Definition_InputQualityControl_Create_w,
        },
        "remove"
      );
      tabContext.addRemoveTabs(
        {
          title: 'routes.entryCheckList',
          path:'/entryCheckList',
          access:enums.Definition_InputQualityControl_Read_r,
         Component:CheckListEntry,
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
        url: inputQualityControlCreate,
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
    <b>{t("routes.entryCheckListForm")}</b>
          {defintionInputs(values).map((input) => (
          <FormInput
            key={input.id}
            {...input}
            onChange={onChangeHandler}
          />
        ))}
   

    <Button disabled={loading} type="submit">{t("submit")}</Button>
  </Form>
  
</div>
 
)
}

export default CheckListEntryFormDefine