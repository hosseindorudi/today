import Mapir from "mapir-react-component";
import React, { useState } from "react";
import { FormGroup, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { mapApiKey } from "../../data/constants";
import { getGeoFromIp } from "../../validation/functions";
import "./map.css";

const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key": mapApiKey, //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});
const MapShowLocation = ({ value,isIP }) => {
  const {t}=useTranslation()
    const [geo, setGeo] = useState(null)
    const [show, setShow] = useState(false)
    const handleClickGetIp=()=>{
        getGeoFromIp(value).then((res) => setGeo(res));
        setShow(true)
    }
    const handleGeoLocation=()=>{
      setGeo(value)
      setShow(true)
    }
  return (
    <>
      {show && (
        <Modal
          show={show}
          onHide={()=>setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <FormGroup>
              <div className="map">
                <Mapir center={geo} Map={Map}>
                  <Mapir.ZoomControl position={"top-left"} />
                  <Mapir.Marker coordinates={geo} anchor="bottom" />
                </Mapir>
              </div>
            </FormGroup>
          </Modal.Body>
        </Modal>
      )}
      <span className="Link" onClick={()=>isIP?handleClickGetIp():handleGeoLocation()}>{isIP?value:t("location")}</span>
    </>
  );
};

export default MapShowLocation;
