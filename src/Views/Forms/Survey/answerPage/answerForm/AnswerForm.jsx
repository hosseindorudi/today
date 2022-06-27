import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button } from "react-bootstrap";
import "./answerForm.css";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import useRequest from "../../../../../customHooks/useRequest";
import { handleError } from "../../../../../validation/functions";
import useAxios from "../../../../../customHooks/useAxios";
const AnswerForm = () => {
  const { t } = useTranslation();
  const [questionTitles, setQuestionTitles] = useState([]);
  const request=useRequest()
  const [type, setType] = useState("")
  const [response, loading, fetchData, setResponse] = useAxios(); 
  const [loadingSelect,setLoadingSelect]=useState(false)
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    nationalID: "",
    phone: "",
    mobile: "",
  });

  useEffect(() => {
    setLoadingSelect(true)
    setType("READTITLES")
    fetchData({
        method: "POST",
        // url: customerCreate,
        headers: {
          accept: "*/*",
        },
        data:request 
    })
    return () => {
        setResponse(undefined)
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleResponse=(response,type)=>{
    switch (type) {
        case "READTITLES":
            console.log(response)
            break;
    
        default:
            break;
    }
  }
  useEffect(() => {
    if (response){
        response.Result?handleResponse(response,type):handleError(response.Message)          
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])
  const onChageQuestionSelect = () => {};
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  };
  return (
    <div className="answerList">
      <Form
        className="answerListForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("routes.answerForm")}</b>
        <div className="answerList-select">
          <CustomReactMultiSelect
            options={questionTitles}
            placeholder={t("answerPage.chooseQuestion")}
            isMulti={false}
            onchangeHandler={onChageQuestionSelect}
            isLoading={loadingSelect}
          />
        </div>
        <Form.Group className="mb-3" controlId="nationalId">
          <Form.Label>{t("nationalId")}</Form.Label>
          <Form.Control
            type="number"
            placeholder={t("nationalId")}
            name="nationalID"
            value={values.nationalID}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>{t("Phone")}</Form.Label>
          <Form.Control
            type="tel"
            placeholder={t("Phone")}
            name="phone"
            value={values.phone}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="mobile">
          <Form.Label>{t("Mobile")}</Form.Label>
          <Form.Control
            type="tel"
            placeholder={t("Mobile")}
            name="mobile"
            value={values.mobile}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">{t("answerForm.start")}</Button>
      </Form>
    </div>
  );
};

export default AnswerForm;
