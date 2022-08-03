import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import ImportCSVModal from './ImportCSVModal'
import ImportUIModal from './ImportUIModal'
const ImportCSV = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const [modalImportUI, setModalImportUI] = useState(false)
  const [file, setFile] = useState(null)
  const [withHeader, setWithHeader] = useState(true);
  const handleOpenModalCSV=()=>{
    setFile(null)
    setWithHeader(true)
    setModalShow(true)
  } 
  const handleUIClick=()=>{
    setModalShow(false)
    setModalImportUI(true)
  }

  return (
    <>
    {modalShow&&
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow} importSuccess={props.importSuccess} sampleUrl={props.sampleUrl} fileCheckURL={props.fileCheckURL} importURL={props.importURL} handleUIClick={handleUIClick}
    file={file} setFile={setFile} withHeader={withHeader} setwithheader={setWithHeader}
    />
    } 
    {modalImportUI &&(
      <ImportUIModal onHide={()=>setModalImportUI(false)} show={modalImportUI} columnInfo={props.columnInfo} file={file} withHeader={withHeader}/>
    )}
    <button  className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV