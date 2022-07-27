import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import ImportCSVModal from './ImportCSVModal'
import ImportUIModal from './ImportUIModal'
const ImportCSV = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const [modalImportUI, setModalImportUI] = useState(false)
  const handleOpenModalCSV=()=>{
    setModalShow(true)
  } 
  const handleUIClick=()=>{
    setModalShow(false)
    setModalImportUI(true)
  }

  return (
    <>
    {modalShow&&
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow} importSuccess={props.importSuccess} sampleUrl={props.sampleUrl} fileCheckURL={props.fileCheckURL} importURL={props.importURL} handleUIClick={handleUIClick}/>
    } 
    {modalImportUI &&(
      <ImportUIModal onHide={()=>setModalImportUI(false)} show={modalImportUI} columnInfo={props.columnInfo}/>
    )}
    <button  className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV