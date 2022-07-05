import { t } from "i18next";
import React, { useState } from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import MapComponent from "./Map";

const MapModal = (props) => {
  const [show, setShow] = useState(false);
  const handleSubmit = () => {};
  return (
    <>
      {show && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modalLog"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <FormGroup>
              {/* <InputBaseSearch
                handleChangeSearchMap={this.handleChangeSearchMap}
                mapSearchvalue={this.state.mapSearchvalue}
                handleChangeSearchSubmit={this.handleChangeSearchSubmit}
              />
              {this.state.mapSearchvalue.length > 1 &&
                this.state.foundLocations.length > 0 && (
                  <div role="tooltip" className="makeStyles-popOver-8">
                    <div className="MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded">
                      <ul className="listLocations">
                        {this.state.foundLocations.map((item) => (
                          <li onClick={() => this.onClickLocation(item)}>
                            {item.address}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )} */}

              <MapComponent
               
                // reverseFunction={this.reverseFunction}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>{t("submit")}</Button>
          </Modal.Footer>
        </Modal>
      )}
      <Button onClick={() => setShow(true)}>{t("map")}</Button>
    </>
  );
};

export default MapModal;
