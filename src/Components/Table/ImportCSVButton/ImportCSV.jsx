import React, { useState } from 'react'
import * as fa from 'react-icons/fa'
import useButtonAccess from '../../../customHooks/useButtonAccess'
import ImportCSVModal from './ImportCSVModal'
const ImportCSV = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const [isDisabled]=useButtonAccess()
  const handleOpenModalCSV=()=>{
    setModalShow(true)
  } 

  return (
    <>
    {modalShow&&
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow} importSuccess={props.importSuccess}/>
    } 
    <button disabled={isDisabled(props.type)} className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV