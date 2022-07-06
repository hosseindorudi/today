import { t } from "i18next";
import Mapir from "mapir-react-component";
import React, { useEffect, useState } from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { mapApiKey } from "../../data/constants";
import { searchApi } from "../../services/mapService";
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
const MapModal = ({qId,submited}) => {
  const [show, setShow] = useState(false);
  const [coord, setCoord] = useState([51.42, 35.72]);
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    submited(qId,coord)
    setShow(false)
  };
  useEffect(() => {
    if (text.length > 1) {
      const params = {};
      const options = { text };
      for (let key in options) {
        if (options[key] !== null && options[key] !== "") {
          params[key] = options[key];
        }
      }
      searchApi(params)
        .then((data) => data.json())
        .then((data) => {
          if (data["odata.count"] > 0) {
            setResults(data.value);
          } else {
            setResults([{ notFound: true }]);
          }
        });
    } else if (text.length === 0) {
      setResults([]);
    }
  }, [text]);
  const clearSearch = () => {
    setResults([]);
    setText("");
  };
  const reverseFunction = (map, e) => {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": mapApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const co = [data.geom.coordinates[0], data.geom.coordinates[1]];
        setCoord(co);
        setDisabled(false);
      });
  };
  return (
    <>
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <FormGroup>
              <div className="map">
                <Mapir
                  center={coord}
                  Map={Map}
                  onClick={reverseFunction}
                  userLocation
                >
                  <Mapir.ZoomControl position={"top-left"} />
                  <Mapir.Marker coordinates={coord} anchor="bottom" />
                </Mapir>
              </div>
              <div class="containerSearch search-box">
                <div class="containerSearch search-box__item flex-row">
                  <input
                    autocomplete="off"
                    className="mapSearchInput"
                    type="text"
                    id="search"
                    placeholder={t("whereUSearching")}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                  {results.length > 0 && (
                    <div class="clear-seach" onClick={() => clearSearch()}>
                      <span> &#10006; </span>
                    </div>
                  )}
                  <div class="btn-seach">
                    {" "}
                    <span>{t("go")}</span>
                  </div>
                </div>
                {results.length > 0 && (
                  <div class="containerSearch search-box__item search-results">
                    {results.map((item) => {
                      if (item.notFound === true) {
                        return <p>{t("noResultFound")}</p>;
                      } else {
                        return (
                          <div
                            onClick={() => {
                              const co = [
                                item.geom.coordinates[0],
                                item.geom.coordinates[1],
                              ];
                              setCoord(co);
                              clearSearch()
                            }}
                            className="search-result-item"
                          >
                            <p className="search-result-item-title">
                              <img alt="marker" src="https://map.ir/css/images/marker-default-white.svg" />
                              {item.title}
                            </p>
                            <p className="search-result-item-address">
                              {item.address}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={disabled} onClick={handleSubmit}>
              {t("submit")}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Button onClick={() => setShow(true)}>{t("map")}</Button>
    </>
  );
};

export default MapModal;
