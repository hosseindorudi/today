import React, { useState } from "react";
import {  Modal, Table } from "react-bootstrap";
import { checkQuestionEId } from "../../../validation/functions";
import AnswerDescModal from "./AnswerDescModal";

const AnswerModal = (props) => {
  const logs = props.logs;
  const [descOpen, setDescOpen] = useState(false)
  const [desc, setDesc] = useState("")
  console.log(logs)
  return (
    <>
    {
      descOpen && <AnswerDescModal desc={desc}  onHide={() => setDescOpen(false)}
      show={descOpen} />
    }
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
                {/* {logs.map((l, i) => (
                  <th key={i}>{l.Question_Title}</th>
                ))} */}
                <td>سوال</td>
                <td>جواب</td>
              </tr>
            </thead>
            <tbody>
              
                {logs.map((log, index) => (
                  <tr>
                  <th key={index + 1000}>{log.Question_Title}</th>
                  <td key={index}>{log.AnswerItem?log.AnswerItem.map(i=>i.Answer+" "):checkQuestionEId(log.QuestionType_EId,log.Answer, setDescOpen,setDesc)}</td>
                  {/* // {log.Description.length>0&&<p style={{textDecoration:'underline'}} title={log.Description}>{t("Description")}</p>} */}
                  </tr>
                ))}
             
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AnswerModal;
