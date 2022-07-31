import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./logModal.css";
import { t } from "i18next";
import { convertUTC,dateOfLogTable, findBrowserIcon, findOsIcon } from "../../../validation/functions";
const LogModal = (props) => {
  const logs = props.logs;
    const [showDescription, setShowDescription] = useState(false);
    const [description, setDescription] = useState("");
  const handleClickMore=(data)=>{
    setDescription(data)
    setShowDescription(true)
  }

  
  return (
    <>
    {showDescription &&(

   
    <Modal
    onHide={()=>setShowDescription(false)}
    size="md"
   
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={showDescription}
  >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body  className="logSecondModal">


      <p>{description.split('\n').map((desc, i) => {
              if ( desc.split(" ")[0] === "DateSet:" ) {
                let date = desc.split(' ');
                let a = date[1].split("T")
                a[0] = convertUTC(a[0])
                date[1] = a.join("   ")
                a = date[3]?.split("T")
                a && (a[0] = convertUTC(a[0]))
                a && (date[3] = a.join("   "))
                
                return <>{date.join(" ")} <br /></>
              }else {
                return <>{desc} <br /></>
              }   
      } )}</p>

    </Modal.Body>
  </Modal>
   )}
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modalLog"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Table size="sm" className="logModalTable">
          <thead>
            <tr>
              {Object.keys(logs[0]).map((k) => (
                <th key={k}>{t(k)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                {Object.keys(log).map((key, index) => (
                  <>
                  
                  <td key={key+index}>{key==="Description"&&log[key].length>0?(<Button variant="link" className="logoLinkVar" onClick={()=>handleClickMore(log[key])} >{t("logview")}</Button>): key === "DateSet" ?  dateOfLogTable(log[key]):key ==="Browser" ?
                  findBrowserIcon(log[key]) :key ==="OS" ?
                  findOsIcon(log[key])
                  : t(log[key])}</td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default LogModal;
