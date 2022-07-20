import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../../../../customHooks/useAxios";
import { TabContext } from "../../../../../contexts/TabContextProvider";
import useRequest from "../../../../../customHooks/useRequest";
import {
  createSelectOptions,
  defintionInputs,
} from "../../../../../validation/functions";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { enums } from "../../../../../data/Enums";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { defectCreate } from "../../../../../services/defectService";
import Deffectlist from "../DeffectList";
import { modelReadTitle } from "../../../../../services/modelService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";

const DeffectForm = () => {
  const { t } = useTranslation();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [response, loading, fetchData] = useAxios();
  const tabContext = useContext(TabContext);
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setmodel] = useState(undefined);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const handleSuccess = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
    tabContext.addRemoveTabs(
      {
        Component: DeffectForm,
        path: "/Definition/Defect/Write",
        title: "/Definition/Defect/Write",
        access: enums.Definition_Defect_Create_w,
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        Component: Deffectlist,
        path: "/Definition/Defect/Read",
        title: "/Definition/Defect/Read",
        access: enums.Definition_Defect_Read_r,
      },

      "add"
    );
  };
  const handleResponse = (response, type) => {
    switch (type) {
      case "READTITLE":
        setModelOptions(createSelectOptions(response.Title));
        break;
      case "SUBMIT":
        handleSuccess();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    response && handleResponse(response, type);

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setType("READTITLE");
    fetchData({
      method: "POST",
      url: modelReadTitle,
      headers: request,

      signal: abortController.signal,
    });
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity()) {
      setType("SUBMIT");
      fetchData({
        method: "POST",
        url: defectCreate,
        headers: request,
        data: {
          Id: 0,
          Model_Id: model?.value,
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

  return (
    <div className="periorityFormDefine">
      <Form
        className="periorityForm"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <b>{t("/Definition/Defect/Write")}</b>
        <div className="Row">
          <Form.Group className="mb-3">
            <Form.Label>{t("model")}</Form.Label>
            <CustomReactMultiSelect
              isMulti={false}
              options={modelOptions}
              value={model}
              onchangeHandler={(e) => setmodel(e)}
              placeholder={t("model")}
            />
          </Form.Group>
        </div>
        {defintionInputs(
          values,
          t("admissionDeffect"),
          t("defect_errorMSG")
        ).map((input) => (
          <FormInput key={input.id} {...input} onChange={onChangeHandler} />
        ))}

        <Button disabled={loading} type="submit">
          {t("submit")}
        </Button>
      </Form>
    </div>
  );
};

export default DeffectForm;
