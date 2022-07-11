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
import { provinceReadTitle } from "../../../../../services/provinceService";
import { createSelectOptions, defintionInputs, handleError } from "../../../../../validation/functions";
import { CityCreate } from "../../../../../services/cityService";
import CityList from '../CityList'
const CityForm = () => {
    const [response, loading, fetchData, setResponse] = useAxios();
    const [validated, setValidated] = useState(false);
    const [provinceOptions,setProvinceOptions]=useState([])
    const [province, setProvince] = useState(undefined);
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
          Component: CityForm,
            path: "/Definition/City/Write",
            title: "/Definition/City/Write",
            access: enums.Definition_City_Create_w,
        },
        "remove"
      );
      tabContext.addRemoveTabs(
        {
          title: "/Definition/City/Read",
          path: "/Definition/City/Read",
          access: enums.Definition_City_Read_r,
          Component: CityList,
        },
        "add"
      );
    };
    const createParams = (service) => {
      const params = {
        method: "POST",
        url: service,
        headers: {
          accept: "*/*",
        },
        data: request,
      };
      return params;
    };
   const getDatas=()=>{
      const provinceTitles = axios.request(
        createParams(provinceReadTitle)
      );
      axios
      .all([
        provinceTitles,
      ])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setProvinceOptions(createSelectOptions(allData[0].data.Title))
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
      if (response) {
        response.Result
          ? handleResponse(response)
          : handleError(response.Message);
        setResponse(undefined);
      }
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
          url: CityCreate,
          headers: {
            accept: "*/*",
          },
          data: {
            Request: request,
            Id: 0,
            Province_Id:province?.value,
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
          <b>{t("/Definition/City/Write")}</b>
          <div className="Row">
          <Form.Group className="mb-3" controlId={"province"}>
          <Form.Label>{t("province")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={provinceOptions}
              value={province}
              onchangeHandler={(e) => setProvince(e)}
              placeholder={t("province")}
            />
           </Form.Group>
  
          </div>
          {defintionInputs(values,t("personInformationCity"),t("Model_errorMSG")).map((input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          ))}
          
          
          <Button disabled={loading} type="submit">
            {t("submit")}
          </Button>
        </Form>
      </div>
    )
}

export default CityForm