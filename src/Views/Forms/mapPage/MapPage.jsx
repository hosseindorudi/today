import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { durations, mapApiKey } from "../../../data/constants";
import { toast } from "react-toastify";
import "./mapPage.css";
import AppContext from "../../../contexts/AppContext";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { handleSeccess } from "../../../validation/functions";
import { LoginHistoryReportDispersion } from "../../../services/loginHistoryServices";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import FieldSetBorder from "../../../Components/fieldSetBorder/FieldSetBorder";
import ReactWordcloud from "react-wordcloud";
import Mapir from "mapir-react-component";


const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      mode: "no-cors",
      url: url,
      headers: {
        "x-api-key": mapApiKey, //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});


const MapPage = () => {
  const styles = {
    clusterMarker: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      border: "2px solid gray",
      cursor: "pointer",
    },
  };

  const clusterMarker = (coordinates, pointCount) => (
    <Mapir.Marker coordinates={coordinates} style={styles.clusterMarker} anchor="bottom">
      <div>{pointCount}</div>
    </Mapir.Marker>
  );

  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(true);
  const [fromDate, setFromDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { app } = useContext(AppContext);
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const [type, setType] = useState("");
  const [EId, setEId] = useState(1);
  const [osData, setOsData] = useState();
  const [dateData, setDateData] = useState();
  const [browserData, setBrowserData] = useState();
  const [userData, setUserData] = useState([]);
  const [iPData, setIPData] = useState([]);
  const [geoLocationData, setGeoLocationData] = useState([]);
  const [geoRes, setgeoRes] = useState([]);

  // const setColorsOption = (value) => {
  //   let sortArr = [...value].sort((a, b) => a.Count - b.Count);
  //   let color = sortArr.map((v, i) => {});
  // };

  const createWordCloudData = (data) => {
    let arr = [];
    data.map((d, i) => arr.push({ text: d.Title, value: d.Count }));
    console.log(arr);
    return arr;
  };

  const createGeolocationData = (data) => {
    let obj = {
      type: "FeatureCollection",
      name: "cluster",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: [],
    };
    data.map((d, i) =>
      obj.features.push({
        type: "Feature",
        properties: { id: null },
        geometry: {
          type: "Point",
          coordinates: [
            Number(d.Title.split(",")[1]),
            Number(d.Title.split(",")[0]),
          ],
        },
      })
    );
    // console.log(geoRes)
    return obj;
  };


  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":

        response.OS &&
          setOsData({
            labels: response.OS.map((os) => os.Title),
            datasets: [
              {
                label: "تعداد",
                data: response.OS.map((os) => os.Count),
                backgroundColor: [
                  "Blue ",
                  "Green",
                  "Red",
                  "Orange",
                  "Violet",
                  "Indigo",
                  "Yellow ",
                ],
                borderColor: "gray",
                borderWidth: 1,
              },
            ],
          });
        response.Date &&
          setDateData({
            labels: response.Date.map((date) => date.Title),
            datasets: [
              {
                label: "تعداد اتصال",
                data: response.Date.map((date) => date.Count),
                backgroundColor: [
                  "Blue ",
                  "Green",
                  "Red",
                  "Orange",
                  "Violet",
                  "Indigo",
                  "Yellow ",
                ],
                borderColor: "gray",
                borderWidth: 1,
              },
            ],
          });
        response.Browser &&
          setBrowserData({
            labels: [...response.Browser]
              .sort((a, b) => a.Count - b.Count)
              .map((browser) => browser.Title),
            datasets: [
              {
                label: "تعداد اتصال",
                data: [...response.Browser]
                  .sort((a, b) => b.Count - a.Count)
                  .map((browser) => browser.Count),
                backgroundColor: [
                  "Red ",
                  "Green",
                  "blue",
                  "Orange",
                  "Violet",
                  "Indigo",
                  "Yellow ",
                ],
                borderColor: "gray",
                borderWidth: 1,
              },
            ],
          });
        response.User && setUserData(createWordCloudData(response.User));
        response.IP && setIPData(createWordCloudData(response.IP));
        response.Geolocation &&
          setGeoLocationData(createGeolocationData(response.Geolocation));
        response.Geolocation && setgeoRes(response.Geolocation);
        break;
      default:
        break;
    }
  };




  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleSubmit = () => {
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
  };

  return (
    <div className="mainMap">

      <div className="topLayerMap">
      {/* <FieldSetBorder legend="ورود کاربرها">
              </FieldSetBorder> */}
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
            <Form.Select
              aria-label="Duration"
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

        <Button
          className="btnShowMap"
          onClick={handleSubmit}
          disabled={loading}
        >
          {t("show")}
        </Button>
      </div>
      <div className="downLayerChart">
        <div className="rowLayerChart">
          <div className="firstRowChart">
            {osData && (
              <FieldSetBorder legend="سیستم عامل">
                <Bar data={osData} style={{ width: "40%" }} />
              </FieldSetBorder>
            )}
          </div>
          <div className="firstRowChart">
            {dateData && (
              <FieldSetBorder legend="تاریخ اتصال">
                <Line data={dateData} style={{ width: "40%" }} />
              </FieldSetBorder>
            )}
          </div>
        </div>
        <div className="rowLayerChart">
        <div
            className="firstRowChart1"
          >
            {browserData && (
              <FieldSetBorder legend="مرورگر" >
                <Pie data={browserData} />
              </FieldSetBorder>
            )}
            </div>
          <div
            className="firstRowChart"
            style={{ width: "100%", height: "100%" }}
          >
            
            {browserData && (
              <FieldSetBorder legend="ورود کاربرها">
                <ReactWordcloud words={userData} style={{ width: "100%" }} />
              </FieldSetBorder>
            )}
          </div>
          <div
            className="firstRowChart"
            style={{ width: "100%", height: "100%" }}
          >
            {dateData && (
              <FieldSetBorder legend="آی پی">
                <ReactWordcloud words={iPData} style={{ width: "100%" }} />
              </FieldSetBorder>
            )}
          </div>
        </div>
        <div className="rowLayerChart" >
          
          <div
            className="firstRowChart"
            style={{ width: "100%", height: "100%" }}
          >
            {geoLocationData.length !== 0 && (
              <FieldSetBorder legend="مختصات">
                <div className="map" style={{ width: "100%", height: "100%" }}>
                  <Mapir  Map={Map} userLocation>
                  <Mapir.ZoomControl position={"top-left"} />
                    <Mapir.Cluster
                      zoomOnClick
                      ClusterMarkerFactory={clusterMarker}
                    >
                      {geoLocationData?.features?.map((feature, key) => (
                        <Mapir.Marker
                          key={key}
                          coordinates={feature.geometry.coordinates}
                          Image={"https://cdn-icons-png.flaticon.com/512/0/14.png"}
                          // pointCount={geoRes[key].Count}
                        />
                      ))}
                    </Mapir.Cluster>
                  </Mapir>
                </div>
              </FieldSetBorder>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MapPage;
