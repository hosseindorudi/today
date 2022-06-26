import { t } from "i18next";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useAxios from "../../../../../customHooks/useAxios";
import useRequest from "../../../../../customHooks/useRequest";
import { enums } from "../../../../../data/Enums";
import { productGroupReadTitle } from "../../../../../services/productGroup";
import { productCreate } from "../../../../../services/productService";
import Product from "../Product";
import '../../../../../assets/css/periorityForm.css'
import { defintionInputs } from "../../../../../validation/functions";
const ProductDefine = () => {
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
    groupId: 0,
  });

  const handleSuccess=()=>{
  toast.success(t("product.created"), {
        position: toast.POSITION.TOP_CENTER,
      });
      tabContext.addRemoveTabs(
        {
            Component:ProductDefine,
            path:"/productForm",
            title:"routes.productForm",
            access:enums.Definition_Product_Create_w,
        }
        , "remove");
      tabContext.addRemoveTabs(
        {
            title: 'routes.product',
            path:'/product',
            access:enums.Definition_Product_Read_r ,
             Component:Product,
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
        break;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: productGroupReadTitle,
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
      url: productCreate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        ProductGroup_Id: values.groupId,
        ProductGroup_Title: "string",
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
        <h1>{t("ProductDefineHeader")}</h1>
      </div>
      <div className="periorityFormmainDiv">
        <div className="periorityFormForm">
          <form onSubmit={handleSubmit} className="periorityForms">
            <div className="formInput">
              <label className="formInputsLabel">{t("productGroup")}</label>
              <Form.Select
                name="groupId"
                value={values.groupId}
                onChange={onChangeHandler}
              >
                <option value={0} disabled>
                  {t("productGroup")}
                </option>
                {products.map((p, i) => (
                  <option key={i} value={p.Id}>
                    {p.Title}
                  </option>
                ))}
              </Form.Select>
            </div>
            {defintionInputs(values).map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChangeHandler}
              />
            ))}

            <button disabled={loading} className="periorityFormSubmit">{t("submit")}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDefine;
