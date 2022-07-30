// import { t } from "i18next";
import React, {  useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import * as fa from 'react-icons/fa'
import "./dndImport.css";
const DndImport = (props) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
      };

    //   const handleDrop = function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setDragActive(false);
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //       // handleFiles(e.dataTransfer.files);
    //     }
    //   };

      const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          // handleFiles(e.target.files);
        }
      };

      const onButtonClick = () => {
        inputRef.current.click();
      };

  return (
    <Modal
      onHide={props.onHide}
      show={props.tableModalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      className="modalPermission"
    >
      <Modal.Header></Modal.Header>
      <Modal.Body className="modalTopPad">
        <div className="dndMainDiv">
          <div className="dndChild">
            <div className="dndInsideChild">
              <Button variant="primary">فایل نمونه</Button>
            </div>
          </div>
          <div className="dndChild">
            <div className="dndInsideChild">
              <input type="file" id="input-file-upload" onChange={handleChange} ref={inputRef} multiple={true} onDragEnter={handleDrag}/>
              <label className={dragActive ? "drag-active" : "" } id="label-file-upload" htmlFor="input-file-upload">
                <div>
                  
                  <button  onClick={onButtonClick} className="upload-button"><fa.FaPlus className="dndPlusBtn"/></button>
                </div>
                
              </label>
              <p>بررسی فایل</p>
            </div>
          </div>
          <div className="dndChild">
            <div className="dndInsideChild">
              <input type="file" id="input-file-upload" onChange={handleChange} ref={inputRef} multiple={true} onDragEnter={handleDrag}/>
              <label className={dragActive ? "drag-active" : "" } id="label-file-upload" htmlFor="input-file-upload">
                <div>
                  
                  <button  onClick={onButtonClick} className="upload-button"><fa.FaPlus className="dndPlusBtn"/></button>
                </div>
                
              </label>
              <p>بارگذاری</p>
            </div>
          </div>
          <div className="dndChild">
            <div className="dndInsideChild">
              <Button variant="secondary">بارگذاری دستی</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          انصراف
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DndImport;
