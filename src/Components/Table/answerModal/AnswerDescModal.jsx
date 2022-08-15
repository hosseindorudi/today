import React from "react";
import {  Modal } from "react-bootstrap";

const AnswerDescModal = (props) => {
  return (
    <Modal
    show={props.show}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={props.onHide}
    backdrop="static"
    keyboard={false}

      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {props.desc}
        </Modal.Body>
      </Modal>
  )
}

export default AnswerDescModal