import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalCheckResult = (props) => {
  return (
    <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
    <div className='checkResultModal' style={{direction:"ltr"}}>
       <p> {props.data}</p>
    </div>
    </Modal.Body>
  </Modal>
  )
}

export default ModalCheckResult