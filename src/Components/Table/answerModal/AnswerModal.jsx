import React from "react";
import {  Modal, Table } from "react-bootstrap";

const AnswerModal = (props) => {
  const logs = props.logs;
  return (
    <>
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
                {logs.map((l, i) => (
                  <th key={i}>{l.Question_Title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {logs.map((log, index) => (
                  <td key={index}>{log.Answer}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AnswerModal;
