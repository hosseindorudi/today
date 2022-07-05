import './descModal.css'
import { Modal } from "react-bootstrap";
const DescModal = (props) => {
  return (
    <>
        <Modal
            onHide={props.onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body  className="logSecondModal">
            
            <p>{props.value}</p>

            </Modal.Body>
        </Modal>
    </>
  )
}

export default DescModal