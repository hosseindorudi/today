import { t } from 'i18next';
import React,{ useContext, useEffect, useState } from 'react'
import FormInput from '../../../../../Components/periodity/formInput/FormInput';
import { TabContext } from '../../../../../contexts/TabContextProvider';
import useAxios from '../../../../../customHooks/useAxios';
import useRequest from '../../../../../customHooks/useRequest';
import '../../../../../assets/css/periorityForm.css'
import { enums } from '../../../../../data/Enums';
import { toast } from "react-toastify";
import WarrantyType from '../WarrantyType';
import { warrantyTypeCreate } from '../../../../../services/warrantyType';
import { defintionInputs } from '../../../../../validation/functions';
const WarrantyTypeDefine = () => {
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
            Component:WarrantyTypeDefine,
            path:"/garanteeTypeForm",
            title:"routes.phoneIssuesForm",
            access:enums.Definition_WarrantyType_Create_w,
        },
        "remove"
      );
      tabContext.addRemoveTabs(
        {
            title: 'routes.phoneIssues',
            path:'/garanteeType',
            access:enums.Definition_WarrantyType_Read_r,
           Component:WarrantyType,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [response]);
  
    const onChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetchData({
        method: "POST",
        url: warrantyTypeCreate,
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
        <div className="periorityFormHeader"><h1>{t("WarrantyTypeDefineHeader")}</h1></div>
        <div className='periorityFormmainDiv'>
            
        <div className="periorityFormForm">
            <form onSubmit={handleSubmit} className="periorityForms">
              {defintionInputs(values).map((input) => (
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

export default WarrantyTypeDefine