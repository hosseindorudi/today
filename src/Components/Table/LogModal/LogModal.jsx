import React, { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./logModal.css";
import { t } from "i18next";
import { convertUTC } from "../../../validation/functions";
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
      {console.log(description.split('\n'))}

      <p>{description.split('\n').map((desc, i) => {

              if ( i === description.split('\n').length -2 ) {
                console.log(desc.split(' '))
                let date = desc.split(' ');
                // let newdate = date[1].split("T")
                let a = date[1].split("T")
                a[0] = convertUTC(a[0])
                date[1] = a.join("   ")
                a = date[3].split("T")
                a[0] = convertUTC(a[0])
                date[3] = a.join("   ")
                console.log(date.join(" "))
                return <>{date.join(" ")} <br /></>
              }else {
                return <>{desc} <br /></>
              }
              
               

        // if(desc === '\n' ){
        //   return <><br /></>
        // }
        // else if (desc === '>'){
        //   return <b style={{color: "blue"}}>{desc}</b>
        // }
        // else if (desc === ':'){
        //   return <b style={{color: "green"}}>{desc}</b>
        // }
        
        // else {
        //  return  desc
        // }
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
                  {console.log(key)}
                  <td key={key+index}>{key==="Description"&&log[key].length>0?(<Button variant="link" className="logoLinkVar" onClick={()=>handleClickMore(log[key])} >{t("logview")}</Button>): key === "DateSet" ?  convertUTC(log[key])   : log[key]}</td>
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
