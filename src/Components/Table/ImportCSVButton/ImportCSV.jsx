import React, { useContext, useState } from 'react'
import * as fa from 'react-icons/fa'
import { TabContext } from '../../../contexts/TabContextProvider'
import ImportCSVModal from './ImportCSVModal'
import ImportUI from './importUIComponent/ImportUI'
import ImportUIModal from './ImportUIModal'
const ImportCSV = (props) => {
  const [modalShow, setModalShow] = useState(false)
  const tabContext = useContext(TabContext);
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
    tabContext.addRemoveTabs(
      {
        path: "importUI",
      },
      "remove"
    );
    tabContext.addRemoveTabs(
      {
        Component: ImportUI,
        path: "ImportUI",
        title: "ImportUI",
        columnInfo:props.columnInfo, 
        file:file,
        withHeader:withHeader, 
        importarray:props.importarray
      },
      "add"
    );
    // setModalImportUI(true)
  }
  const importSuccess=(message)=>{
    setModalImportUI(false)
    props.importSuccess(message)
  }
  return (
    <>
    {modalShow&&
    <ImportCSVModal onHide={()=>setModalShow(false)} show={modalShow} importSuccess={props.importSuccess} sampleUrl={props.sampleUrl} fileCheckURL={props.fileCheckURL} importURL={props.importURL} handleUIClick={handleUIClick}
    file={file} setFile={setFile} withHeader={withHeader} setwithheader={setWithHeader}
    />
    } 
    {modalImportUI &&(
      <ImportUIModal onHide={()=>setModalImportUI(false)} show={modalImportUI} columnInfo={props.columnInfo} file={file} withHeader={withHeader} importarray={props.importarray} importSuccess={importSuccess}/>
    )}
    <button  className="reactTableParentImportButton" title="importCSV" onClick={handleOpenModalCSV}>
    <fa.FaFileCsv />
  </button>
    </>
  )
}

export default ImportCSV