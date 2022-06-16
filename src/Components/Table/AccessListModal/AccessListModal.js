import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { convertUTC } from '../../../validation/functions'

const AccessListModal = (props) => {
    const accessList=props.accessList
  return (
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
            {Object.keys(accessList[0]).map((k) => (
              <th key={k}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accessList.map((a, index) => (
            <tr key={index}>
              {Object.keys(a).map((key, index) => (
                <td key={key+index}>{key==="DateSet"?convertUTC(a[key]):a[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Modal.Body>
  </Modal>
  )
}

export default AccessListModal