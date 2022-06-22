import './patternModal.css'
import {  Button, Form, Modal } from "react-bootstrap";
import PatternLock from '../../../Views/Forms/service/admission/patternLock/PatternLock';
import { useTranslation } from 'react-i18next'

const PatternModal = (props) => {
    const {t} = useTranslation();

 

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="tableModal">
         
            
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="patternModalDiv">
              <PatternLock 
                    setPatternArr={props.setPatternArr} 
                    size={props.size} 
                    setpatternLock={props.setpatternLock}
                    />
            </div>
            </Form.Group>
            

            
            
         
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PatternModal