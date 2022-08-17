import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useRequest from "../../../../../customHooks/useRequest";
import useAxios from "../../../../../customHooks/useAxios";
import { provinceReadTitle } from "../../../../../services/provinceService";
import {
  createSelectOptions,
  defintionInputs,
  handleError,
} from "../../../../../validation/functions";
import FormInput from "../../../../../Components/periodity/formInput/FormInput";
import { CityUpdate } from "../../../../../services/cityService";
import { CustomReactMultiSelect } from "../../../../../Components/Select/customReactSelect";
import { ResultCodeEnum } from "../../../../../data/ResultCodeEnum";
const TableModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [province, setProvince] = useState(undefined);
  const { t } = useTranslation();
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  useEffect(() => {
    const prop = props.rowValus;
    setValues({
      ...values,
      title: prop.Title,
      color: `#${prop.Color}`,
      periority: prop.Priority,
      desc: prop.Description,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: request,
    };
    return params;
  };

  const getDatas = () => {
    const provinceTitles = axios.request(createParams(provinceReadTitle));
    axios
      .all([provinceTitles])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result === ResultCodeEnum.Ok
            ? setProvinceOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
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
    setProvince(
      provinceOptions.find((m) => m.value === props.rowValus.Province_Id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceOptions]);

  const handleResponse = (response) => {
    props.updated();
  };
  useEffect(() => {
    response && handleResponse();
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
        url: CityUpdate,
        headers: request,
        data: {
          Province_Id: province?.value,
          Id: props.rowValus.Id,
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
    }
  };
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      className="updateCustomerModal"
    >
      <Modal.Header closeButton></Modal.Header>
      <Form
        className="periorityFormModal"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Modal.Body>
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
          {defintionInputs(values).map((input) => (
            <FormInput key={input.id} {...input} onChange={onChangeHandler} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} type="submit">
            {" "}
            {t("operatorGroupFormSubmit")}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TableModal;
