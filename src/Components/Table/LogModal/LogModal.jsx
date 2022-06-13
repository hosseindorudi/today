import React, { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import "./logModal.css";
import * as fa from 'react-icons/fa'
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
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    show={showDescription}
  >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <p>{description}</p>
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
        <Table >
          <thead>
            <tr>
              {Object.keys(logs[0]).map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                {Object.keys(log).map((key, index) => (
                  <td key={key+index}>{key==="Description"&&log[key].length>0?<button onClick={()=>handleClickMore(log[key])} className={"tableEyeBtn"}><fa.FaRegEye/></button>:log[key]}</td>
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
