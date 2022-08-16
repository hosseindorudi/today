import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MapPlenty from "../../../Components/map/MapPlenty";
import { durations } from "../../../data/constants";
import "./mapPage.css";
const MapPage = () => {
  const { t } = useTranslation();
  const locations=[{
    lat:35.7459184,
    lng:51.3785716,
    value:10
  },
  {
    lat:35.7567854,
    lng:51.4149229,
    value:20
  },
  {
    lat:35.7478345,
    lng:51.4217457,
    value:15
  },
  {
    lat:35.7229429,
    lng:51.4014485,
    value:30
  },
  // {
  //   lat:0,
  //   lng:0,
  //   value:0
  // }
]
  return (
    <div className="mainMap">
      <div className="topLayerMap">
        <Form.Group className="mb-3">
          <Form.Label>{t("duration")}</Form.Label>
          <Form.Select aria-label="Duration">
            <option hidden>{t("duration")}</option>
            {durations.map((d, i) => (
              <option value={d.value} key={i}>
                {d.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("country")}</Form.Label>
          <Form.Select aria-label="Duration">
            <option hidden>{t("duration")}</option>
            {durations.map((d, i) => (
              <option value={d.value} key={i}>
                {d.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button className="btnShowMap">{t("show")}</Button>
      </div>
      <MapPlenty locations={locations}/>
    </div>
  );
};

export default MapPage;
