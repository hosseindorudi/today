import { t } from 'i18next';
import React,{ useContext, useEffect, useState } from 'react'
import FormInput from '../../../../../../Components/periodity/formInput/FormInput';
import { TabContext } from '../../../../../../contexts/TabContextProvider';
import useAxios from '../../../../../../customHooks/useAxios';
import useRequest from '../../../../../../customHooks/useRequest';

import { enums } from '../../../../../../data/Enums';
import { toast } from "react-toastify";
import '../../../../../../assets/css/periorityForm.css'
import CheckListEntry from '../CheckListEntry';
import { inputQualityControlCreate } from '../../../../../../services/inputQualityControlService';
const CheckListEntryFormDefine = () => {
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
  
    const inputs = [
      {
        id: 1,
        name: "title",
        type: "text",
        label: t("title"),
        placeholder: t("title"),
        errorMessage: t("title.errorMessage"),
        pattern: "^[\u0600-\u06FF,A-Za-z0-9]{4,12}",
        required: true,
        value: values.title,
      },
      {
        id: 2,
        name: "color",
        label: t("color"),
        type: "color",
        errorMessage: t("color.errorMessage"),
        required: true,
      },
      {
        id: 3,
        name: "periority",
        type: "number",
        label: t("periodity"),
        placeholder: t("periodity"),
        errorMessage: t("periodity.errorMessage"),
        required: true,
        value: values.periority,
      },
      {
        id: 4,
        name: "desc",
        type: "text",
        label: t("description"),
        placeholder: t("description"),
        errorMessage: t("description.errorMessage"),
        pattern: "^[\u0600-\u06FF]{20,250}",
        required: true,
        value: values.desc,
      },
    ];
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
    }, [response]);
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
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
    };
return (
  <div className="periorityFormMain">
        <div className="periorityFormHeader">
          <h1>{t("routes.entryCheckListForm")}</h1>
        </div>
        <div className="periorityFormmainDiv">
          <div className="periorityFormForm">
            <form onSubmit={handleSubmit} className="periorityForms">
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
      
              <button disabled={loading} className="periorityFormSubmit">{t("submit")}</button>
            </form>
          </div>
        </div>
      </div>
)
}

export default CheckListEntryFormDefine