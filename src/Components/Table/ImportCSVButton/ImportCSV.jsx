import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import ImportCSVModal from './ImportCSVModal'
const ImportCSV = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const handleOpenModalCSV=()=>{
    setModalShow(true)
  } 

  return (
    <>
    {modalShow&&
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow} importSuccess={props.importSuccess} sampleUrl={props.groupSampleFile} fileCheckURL={props.groupCheckFile} importURL={props.groupImportFile}/>
    } 
    <button  className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV