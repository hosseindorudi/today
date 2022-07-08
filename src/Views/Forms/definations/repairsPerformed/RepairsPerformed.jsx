import "./repairsPerformed.css";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useCallback } from "react";
import {
  handleError,
  createSelectOptions,
  defintionInputs,
} from "../../../../validation/functions";
import FormInput from "../../../../Components/periodity/formInput/FormInput";
import { modelReadTitle } from "../../../../services/modelService";
import {
  repairsPerformedReadTitle,
  repairsPerformedCreate,
  repairsPerformedRead,
} from "../../../../services/repairsPerformed";
import axios from "axios";
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
  const [perfomedData, setPerformedData] = useState([]);
  const request = useRequest();
  const abortController = new AbortController();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
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
  const getDatas = () => {
    const modelTitles = axios.request(createParams(modelReadTitle));
    const perfomedGroupTitles = axios.request(
      createParams(repairsPerformedReadTitle)
    );
    const getAllData = axios.request(createParams(repairsPerformedRead));
    axios
      .all([modelTitles, perfomedGroupTitles, getAllData])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setModelOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setPerformedGroupOptions(
                createSelectOptions(allData[1].data.Title)
              )
            : handleError(allData[1].data.Message);
          allData[2].data?.Result
            ? setPerformedData(allData[2].data.Title)
            : handleError(allData[2].data.Message);
          setModel(undefined);
          setPerformedGroup(undefined);
          setValues({
            title: "",
            color: "#000000",
            periority: 1,
            desc: "",
          });
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };
  useEffect(() => {
    handleResponseFunc(response, "READ");
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

  const handleResponseFunc = useCallback(
    (response, type) => {
      switch (type) {
        // case "DELETE":
        //   handleDeleted();
        //   break;
        case "READ":
          getDatas();
          break;
        case "CREATE":
          getDatas();
          break;

        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: repairsPerformedCreate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: 0,
        Parent_Id: performedGroup !== undefined ? performedGroup.value : 0,
        Model_Id: model?.value,
        Title: values.title,
        Priority: values.periority,
        Description: values.desc,
        Color: values.color.substring(1),
        SourceType: 0,
        Registrar: 0,
        DateSet: "2022-06-19T16:43:29.709Z",
      },
      signal: abortController.signal,
    });

    handleResponseFunc(response, "CREATE");
  };
  return (
    <>
      <div className="repairedPerformedMain">
        <div className="repairePerformUp">
          <div className="repairedPerformedRight">asdasd</div>
          <div className="repairedPerformedLeft">
            <Form
              className="periorityForm"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <b>{t("/Definition/RepairsPerformed/Write")}</b>
              <div className="repairRowPerformed">
                <Form.Group
                  className="mb-0.5 repairsPerformedItem"
                  controlId={"model"}
                >
                  <Form.Label>{t("Group")}</Form.Label>
                  <CustomReactMultiSelect
                    isMulti={false}
                    options={perfomedGroupOptions}
                    value={performedGroup}
                    onchangeHandler={(e) => setPerformedGroup(e)}
                    placeholder={t("Group")}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-.5 repairsPerformedItem"
                  controlId={"model"}
                >
                  <Form.Label>{t("model")}</Form.Label>
                  <CustomReactMultiSelect
                    isMulti={false}
                    options={modelOptions}
                    value={model}
                    onchangeHandler={(e) => setModel(e)}
                    placeholder={t("model")}
                  />
                </Form.Group>
              </div>
              {defintionInputs(
                values,
                t("/Definition/RepairsPerformed/Read"),
                t("RepairsPerformed_errorMSG")
              ).map((input) => (
                <FormInput
                  performedGroup={model}
                  isRepair={true}
                  key={input.id}
                  {...input}
                  onChange={onChangeHandler}
                />
              ))}
              <Button disabled={loading} type="submit">
                {t("submit")}
              </Button>
            </Form>
          </div>
        </div>
        <div className="repairPerformDown">
          <button>first</button>
          <button>first</button>
          <button>first</button>
          <button>first</button>
          <button>first</button>
          <button>first</button>
        </div>
      </div>
    </>
  );
};

export default RepairsPerformed;
