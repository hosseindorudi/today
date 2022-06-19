import { t } from 'i18next';
import React,{ useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormInput from '../../../../../Components/periodity/formInput/FormInput';
import { TabContext } from '../../../../../contexts/TabContextProvider';
import useAxios from '../../../../../customHooks/useAxios';
import useRequest from '../../../../../customHooks/useRequest';
import { enums } from '../../../../../data/Enums';
import { partCreate } from '../../../../../services/partService';
import { productReadTitle } from '../../../../../services/productService';
import Parts from '../Parts';
import './partsDefine.css'

const PartsDefine = () => {
    const [type, setType] = useState("");
    const tabContext = useContext(TabContext);
    const [response, loading, fetchData, setResponse] = useAxios();
    const request = useRequest();
    const abortController = new AbortController();
    const [products, setProducts] = useState([]);
    const [values, setValues] = useState({
      title: "",
      color: "#000000",
      periority: 1,
      desc: "",
      productId: 0,
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
    const handleSuccess=()=>{
        toast.success(t("part.created"), {
          position: toast.POSITION.TOP_CENTER,
        });
        tabContext.addRemoveTabs(
          {
            Component:PartsDefine,
            path:"/partsForm",
            title:"routes.partsForm",
            access:enums.Definition_Part_Create_w,
          }
          , "remove");
        tabContext.addRemoveTabs(
          {
            title: 'routes.parts',
            path:'/parts',
            access:enums.Definition_Part_Read_r,
           Component:Parts,
          }
          
          , "add");
    }
    const handleResponse = (response, type) => {
      switch (type) {
        case "READTITLE":
          setProducts(response.Title);
          break;
          case "SUBMIT":
          handleSuccess()
        default:
          break;
      }
      
    };
    const handleError = (message) => {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    };
  
    useEffect(() => {
      if (response) {
        response.Result
          ? handleResponse(response, type)
          : handleError(response.Message);
        setResponse(undefined);
      }
      return () => abortController.abort();
    }, [response]);
  
    useEffect(() => {
      setType("READTITLE");
      fetchData({
        method: "POST",
        url: productReadTitle,
        headers: {
          accept: "*/*",
        },
        data: request,
  
        signal: abortController.signal,
      });
      return () => abortController.abort();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const onChangeHandler = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: partCreate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Product_Id: values.productId,
          Product_Title: "string",
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
        <div className="periorityFormHeader"><h1>{t("PartsDefineHeader")}</h1></div>
        <div className='periorityFormmainDiv'>
            
            <div className="periorityFormForm">
                <form onSubmit={handleSubmit} className='periorityForms'>
                <div className="formInput">
              <label className="formInputsLabel">{t("product")}</label>
              <Form.Select
                name="productId"
                value={values.productId}
                onChange={onChangeHandler}
              >
                <option value={0} disabled>
                  {t("product")}
                </option>
                {products.map((p, i) => (
                  <option key={i} value={p.Id}>
                    {p.Value}
                  </option>
                ))}
              </Form.Select>
            </div>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChangeHandler}
                    />
                ))}
    
                <button disabled={loading} className='periorityFormSubmit'>{t("submit")}</button>
                   
    
                </form>
            </div>
        </div>
    
    </div>
    )
}

export default PartsDefine