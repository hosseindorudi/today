import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { durations } from "../../../data/constants";
import { toast } from "react-toastify";
import "./mapPage.css";
import AppContext from "../../../contexts/AppContext";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { handleSeccess } from "../../../validation/functions";
import { LoginHistoryReportDispersion } from "../../../services/loginHistoryServices";
import {Chart} from 'chart.js'
const MapPage = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(true);
  const [fromDate, setFromDate] = useState( new Date(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState(
    new Date());
  const { app } = useContext(AppContext);
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [type, setType] = useState("");
  const [EId, setEId] = useState(1)
  const ctx = document.getElementById('myChart');


  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        handleSeccess(t("reports_ready"));
        console.log(response)
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])


  const handleSubmit =() => {
    setType("SUBMIT");
        fetchData({
          method: "POST",
          url: LoginHistoryReportDispersion,
          headers: request,
          data: {
            TimePeriod: isActive,
            TimePeriod_EId: EId,
            From: isActive ? "2022-08-17T08:21:35.966Z" : fromDate,
            To: isActive ? "2022-08-17T08:21:35.966Z" : endDate,
          },
          signal: abortController.signal,
        });
  }


  return (
    <div className="mainMap">
      <div className="topLayerMap">
        <Form.Group className="mb-3 activationRow" controlId={"switch"}>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={isActive ? t("duration") : t("choices")}
            value={isActive}
            checked={isActive}
            onChange={(e) => setIsActive(!isActive)}
          />
        </Form.Group>

        {!isActive ? (
          <>
            <Form.Group className="mb-3" controlId={"startDate"}>
            <Form.Label>{t("startDate")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                placeholder={t("startDate")}
                onChange={(newValue) => {
                  setFromDate(newValue);
                  if (endDate !== null && newValue > endDate) {
                    toast.error(
                      "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                      {
                        position: toast.POSITION.BOTTOM_CENTER,
                      }
                    );

                    setEndDate(null);
                  }
                }}
                name="LimitTo"
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={fromDate}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId={"endDate"}>
            <Form.Label>{t("endDate")}</Form.Label>
              <DatePicker
                containerClassName="custom-container"
                placeholder={t("endDate")}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  if (fromDate !== null && newValue < fromDate) {
                    toast.error(
                      "تاریخ پایانی نمیتواند از تاریخ شروع کمتر باشد",
                      {
                        position: toast.POSITION.BOTTOM_CENTER,
                      }
                    );

                    setEndDate(null);
                  }
                }}
                name="LimitTo"
                calendar={app.lang === "fa" ? persian : gregorian}
                locale={app.lang === "fa" ? persian_fa : gregorian_en}
                calendarPosition="bottom-right"
                value={endDate}
              />
            </Form.Group>
          </>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>{t("choices")}</Form.Label>
            <Form.Select aria-label="Duration"
            onChange={(e) => setEId(e.target.value)}
            >
              <option hidden>{t("choices")}</option>
              {durations.map((d, i) => (
                <option value={d.value} key={i}>
                  {d.text}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Button className="btnShowMap" onClick={handleSubmit} disabled={loading}>{t("show")}</Button>
      </div>
      <div className="reportChart">
      <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
};

export default MapPage;
