import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { durations } from "../../../data/constants";
import "./mapPage.css";
const MapPage = () => {
  const { t } = useTranslation();

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
    </div>
  );
};

export default MapPage;
