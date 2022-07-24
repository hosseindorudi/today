import './descModal.css'
import { Modal } from "react-bootstrap";
import { convertUTC } from '../../../validation/functions';
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
            <Modal.Body  className="logSecondModalDesc">
            
            {props.value.split("\n").map((val) => {
            if ( val.split(" ")[0] === "DateSet:" ) {
                let date = val.split(' ');
                let a = date[1].split("T")
                a[0] = convertUTC(a[0])
                date[1] = a.join("   ")
                a = date[3]?.split("T")
                a && (a[0] = convertUTC(a[0]))
                a && (date[3] = a.join("   "))
            
                return <>{date.join(" ")} <br /></>
              }else {
                return <>{val} <br /></>
              }   
            })}

            </Modal.Body>
        </Modal>
    </>
  )
}

export default DescModal