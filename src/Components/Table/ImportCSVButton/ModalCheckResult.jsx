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
   
    
    {props.data.split('\r\n').map((d,i)=>(
        <div >{d} <br /></div>
       ))}

    </Modal.Body>
  </Modal>
  )
}

export default ModalCheckResult