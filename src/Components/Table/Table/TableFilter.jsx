import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import AppContext from "../../../contexts/AppContext";
import { Button } from "@mui/material";
import * as fa from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { setDatePickerDate } from "../../../validation/functions";

const TableFilter = ({ filteres, filterObj, setfilterObj,handleClickSendFilter,handleClearFilter }) => {
  const { app } = useContext(AppContext);
  const { t } = useTranslation();
  const handleChange = (value, name) => {
    setfilterObj(prevState=>({
        ...prevState,
        [name]:value
    }))
  };

  const checkFilter = () => {
    return filteres?.map((filter, index) => {
      let cmp;
      switch (filter.type) {
        case "string":
          cmp = (
            <>
              {" "}
              <Form.Label>{t(filter.field)}</Form.Label>
              <Form.Control
                value={filterObj[filter.field]}
                type="string"
                name={filter.field}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </>
          );
          break;
        case "number":
          cmp = (
            <>
              <Form.Label>{t(filter.field)}</Form.Label>
              <Form.Control
                value={filterObj[filter.field]}
                type="number"
                name={filter.field}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
            </>
          );
          break;
        case "boolean":
          cmp = (
            <>
              <Form.Label>{t(filter.field)}</Form.Label>
              <Form.Check
                type="switch"
                name={filter.field}
                checked={filterObj[filter.field]}
                onChange={(e) => handleChange(e.target.checked, e.target.name)}
              />
            </>
          );
          break;
        case "date":
          cmp = (
            <>
              <Form.Label>{t(filter.field)}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                name={filter.field}
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                onChange={(e)=>handleChange(setDatePickerDate(e.toDate()),filter.field)}
                value={filterObj[filter.field]&&new Date(filterObj[filter.field])}
              />
            </>
          );
          break;
        default:
          break;
      }
      return cmp;
    });
  };
  return (
    <>
      {" "}
      <Form.Group className="mb-3">{checkFilter()}</Form.Group>
      <div className="btnContainerFilter">
          <Button size="small" variant="contained" onClick={handleClickSendFilter}>
            {t("send")}
          </Button>
          <Button onClick={handleClearFilter}>
            <fa.FaEraser />
          </Button>
      
      </div>
    </>
  );
};

export default TableFilter;
