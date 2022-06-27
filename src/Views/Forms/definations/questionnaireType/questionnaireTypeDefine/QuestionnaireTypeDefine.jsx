import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import FormInputTest from "../../../../../Components/periodity/formInput/FormInputTest";
import "./define.css"
const QuestionnaireTypeDefine = () => {
  const [validated, setValidated] = useState(false);
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: ""
  });
  const {t}=useTranslation()
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const input=[
    {
      id: 1,
      name: "title",
      type: "text",
      label: t("title"),
      placeholder: t("title"),
      errorMessage: t("title.errorMessage"),
      pattern: "^[\u0600-\u06FF,A-Za-z0-9 ]{2,100}",
      required: true,
      value: values.title,
    },
    {
      id: 2,
      name: "color",
      label: t("color"),
      type: "color",
      errorMessage: t("color.errorMessage"),
      value:values.color
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
  ]
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="periorityFormDefine">
      <Form
        className="PForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/QuestionnaireType/Write")}</b>
        {input.map((input) => (
              <FormInputTest
                key={input.id}
                {...input}
                onChange={onChangeHandler}
              />
            ))}
       

        <Button type="submit">{t("answerForm.start")}</Button>
      </Form>
    </div>
  );
};

export default QuestionnaireTypeDefine;
