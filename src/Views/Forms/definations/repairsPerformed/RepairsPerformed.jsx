import "./repairsPerformed.css";
import useAxios from '../../../../customHooks/useAxios';
import useRequest from '../../../../customHooks/useRequest'
import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { 
  handleError,
  createSelectOptions,
  defintionInputs, 
} from "../../../../validation/functions";
import FormInput from "../../../../Components/periodity/formInput/FormInput";
import { modelReadTitle } from "../../../../services/modelService";
import { repairsPerformedReadTitle } from "../../../../services/repairsPerformed";
import axios from 'axios'
import { useTranslation } from "react-i18next";
import { CustomReactMultiSelect } from "../../../../Components/Select/customReactSelect";
import { toast } from "react-toastify";
const RepairsPerformed = () => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(undefined);
  const [perfomedGroupOptions, setPerformedGroupOptions] = useState([]);
  const [performedGroup, setPerformedGroup] = useState(undefined);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
    fee: 0,
  });
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
  }
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
  const getDatas = () => {
    const modelTitles = axios.request(createParams(modelReadTitle));
    const perfomedGroupTitles = axios.request(createParams(repairsPerformedReadTitle));
    axios
      .all([modelTitles, perfomedGroupTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setModelOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setPerformedGroupOptions(createSelectOptions(allData[1].data.Title))
            : handleError(allData[1].data.Message);
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
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

  }
  return (

    <>

      <div className="repairedPerformedMain">
        <div className="repairedPerformedRight">asdasd</div>
        <div className="repairedPerformedLeft">
            <div className="periorityFormDefine">
              <Form
                className="periorityForm"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <b>{t("/Definition/RepairsPerformed/Write")}</b>
                <div className="repairRow">
                  <Form.Group className="mb-3" controlId={"model"}>
                    <Form.Label>{t("model")}</Form.Label>
                    <CustomReactMultiSelect
                      isMulti={false}
                      options={modelOptions}
                      value={model}
                      onchangeHandler={(e) => setModel(e)}
                      placeholder={t("model")}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId={"model"}>
                    <Form.Label>{t("fee")}</Form.Label>
                    <Form.Control
                      name="fee"
                      value={values.fee}
                      type="number"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                </div>
                {defintionInputs(
                  values,
                  t("/Definition/RepairsPerformed/Read"),
                  t("RepairsPerformed_errorMSG")
                ).map((input) => (
                  <FormInput key={input.id} {...input} onChange={onChangeHandler} />
                ))}
                <Button disabled={loading} type="submit">
                  {t("submit")}
                </Button>
              </Form>
            </div>
        </div>
      </div>
    
    </>

  );
};

export default RepairsPerformed;
