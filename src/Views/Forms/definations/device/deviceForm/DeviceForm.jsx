
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { companyReadTitle } from '../../../../../services/companyService';
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import { DeviceCreate } from '../../../../../services/deviceService';
import DeviceList from '../DeviceList'
const DeviceForm = () => {
    const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [companyOptions,setCompanyOptions]=useState([])
  const [company, setCompany] = useState(undefined);
  const request = useRequest();
  const tabContext = useContext(TabContext);
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    Activated:false,
    RamMemory: 0,
    RomMemory: 0,
    BodyColor: "",
  });
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: DeviceForm,
          path: "/Definition/Device/Write",
          title: "/Definition/Device/Write",
          access: enums.Definition_Device_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        title: "/Definition/Device/Read",
        path: "/Definition/Device/Read",
        access: enums.Definition_Device_Read_r,
        Component: DeviceList,
      },
      "add"
    );
  };
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: request,
      
    };
    return params;
  };
 const getDatas=()=>{
    const companyTitles = axios.request(
      createParams(companyReadTitle)
    );
    axios
    .all([
      companyTitles,
    ])
    .then(
      axios.spread((...allData) => {
        allData[0].data?.Result
          ? setCompanyOptions(createSelectOptions(allData[0].data.Title))
          : handleError(allData[0].data.Message);
          })
    )
    .catch((error) => {
      handleError(error.message);
    });
  }
  useEffect(() => {
      getDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    response&&handleResponse(response)
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
        url: DeviceCreate,
        headers:request,
        data: {
          
          Id: 0,
          Company_Id:company?.value,
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
        <b>{t("/Definition/Device/Write")}</b>
        <div className="Row">
        <Form.Group className="mb-3" controlId={"company"}>
        <Form.Label>{t("company")}</Form.Label>
          <CustomReactMultiSelect
            isMulti={false}
            options={companyOptions}
            value={company}
            onchangeHandler={(e) => setCompany(e)}
            placeholder={t("company")}
          />
         </Form.Group>

        </div>
        {defintionInputs(values,t("device"),t("Device_errorMSG")).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}
        
        
        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  )
}

export default DeviceForm