import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import ImportCSVModal from './ImportCSVModal'
const ImportCSV = () => {
  const [modalShow, setModalShow] = useState(false)
  const handleOpenModalCSV=()=>{
    setModalShow(true)
  } 

  return (
    <>
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow}/>
    <button className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV