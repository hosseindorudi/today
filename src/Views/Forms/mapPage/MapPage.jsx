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

const points = {
  "type": "FeatureCollection",
  "name": "cluster",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.438049280539616, 29.684091547429148 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.438620107768514, 29.681427687027611 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.441283968170055, 29.681237411284641 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.443377001342689, 29.682664479356895 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.440237451583734, 29.678858964497554 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.443377001342689, 29.67923951598349 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.4404277273267, 29.675624276867119 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.435765971624008, 29.678668688754588 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.437859004796643, 29.679049240240523 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.436622212467363, 29.681617962770577 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.436622212467363, 29.675624276867119 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.439190934997413, 29.672675002851129 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.444042966443071, 29.6762902419675 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.442140209013402, 29.677717310039753 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460406680338231, 29.685708891244367 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.459835853109333, 29.683806133814695 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.462785127125315, 29.681427687027611 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.464021919454602, 29.684567236786563 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.461643472667518, 29.684376961043597 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460121266723782, 29.680286032569807 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460501818209714, 29.681998514256509 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.464878160297957, 29.682569341485411 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.462404575639383, 29.68742137293107 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.463451092225704, 29.686279718473266 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.441949933270436, 29.671152796907393 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.442045071141919, 29.673911795180416 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.443377001342689, 29.674292346666348 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460216404595265, 29.688277613774421 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.457647682065208, 29.685899166987333 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.458694198651528, 29.688182475902938 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.45812337142263, 29.682569341485411 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.456220613992954, 29.68447209891508 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.438429832025548, 29.675909690481568 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.439190934997413, 29.677527034296787 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.440618003069666, 29.683520720200246 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.441474243913021, 29.684662374658046 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.442806174113784, 29.684281823172114 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.439000659254447, 29.685994304858816 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.456410889735928, 29.687992200159968 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.454983821663674, 29.685899166987333 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.452129685519168, 29.663541767188715 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.450512341703948, 29.663256353574265 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.449180411503178, 29.663351491445749 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.448990135760212, 29.666395903333221 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.450892893189881, 29.6653493867469 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460977507567129, 29.673245830080031 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.454508132306252, 29.6751485875097 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.454508132306252, 29.677812447911236 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.450036652346533, 29.681237411284641 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.447943619173898, 29.686279718473266 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.450988031061364, 29.668964625863275 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.446516551101645, 29.669535453092173 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.459169888008944, 29.668964625863275 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.441188830298564, 29.666871592690637 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.440237451583734, 29.665920213975802 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.441283968170055, 29.6653493867469 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.439761762226318, 29.667061868433603 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.447753343430925, 29.649746775823612 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.44727765407351, 29.651554395381797 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.44860958427428, 29.651173843895862 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.446421413230162, 29.650412740923993 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.445850586001256, 29.651744671124764 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.448894997888729, 29.659355700843442 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.448514446402797, 29.657643219156739 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.451844271904719, 29.655359910241135 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.449846376603567, 29.655074496626685 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.446135999615706, 29.655835599598554 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.443186725599723, 29.65878487361454 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.44594572387274, 29.66125845827311 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.445374896643841, 29.664873697389485 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.449085273631695, 29.674577760280798 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.460406680338231, 29.662209836987945 ] } },
  { "type": "Feature", "properties": { "id": null }, "geometry": { "type": "Point", "coordinates": [ 52.453651891462904, 29.659736252329377 ] } }
  ]
  }

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
            Number(d.Title.split(",")[0]),
            Number(d.Title.split(",")[1]),
          ],
        },
      })
    );
    console.log(obj)
    // console.log(geoRes)
    return obj;
  };


  const handleResponse = (response, type) => {
    switch (type) {
      case "SUBMIT":
        handleSeccess(t("reports_ready"));
        console.log(response);
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
        <div className="rowLayerChart" >
          <div className="firstRowChart" style={{ width: "100%" }}>
            {browserData && (
              <FieldSetBorder legend="مرورگر">
                <Pie data={browserData} />
              </FieldSetBorder>
            )}
          </div>
          <div
            className="firstRowChart"
            style={{ width: "100%", height: "100%" }}
          >
            {geoLocationData.length !== 0 && (
              <FieldSetBorder legend="مختصات">
                <div className="map" style={{ width: "100%", height: "100%" }}>
                  <Mapir center={[51.3347, 35.7219]} Map={Map} userLocation>
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
        <div className="rowLayerChart">
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
      </div>
    </div>
  );
};

export default MapPage;
