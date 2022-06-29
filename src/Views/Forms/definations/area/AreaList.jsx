import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    areaRead,
    areaReadPaging,
    areaGetOneRecord,
    areaDelete,
    areaFavorite,
    areaExportId,
    areaExport,
    areaSampleFile,
    areaCheckFile,
    areaImport,
    areaLog,
    areaSetColumn,
    areaAccessList,
        } from '../../../../services/areaService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import areaForm from './areaForm/AreaForm';

const AreaList = () => {
    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType", "Section_Id"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: areaForm,
      path: "/Definition/Area/Write",
      title: "/Definition/Area/Write",
      access: enums.Definition_Area_Create_w
    };
    
    const setUpdate = (res) => {
      const record = res.Record;
      setRowValues(record);
      setTableModalOpen(true);
    };
    const updated = () => {
      setTableModalOpen(false);
      toast.success(t("updatedRecord"), {
        position: toast.POSITION.TOP_CENTER,
      });
      //call update function in child class
      childRef.current.updated();
    };
  
    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };

  return (
    <>
     
    {tableModalOpen && (
       <TableModal
         rowValus={rowValus}
         onHide={() => setTableModalOpen(false)}
         tableModalShow={tableModalOpen}
         updated={updated}
       />
     )}
     
     <CustomTable
       ref={childRef}
       ReadApi={areaRead}
       deleteApi={areaDelete}
       unSelectedAPI={areaSetColumn}
       sampleUrl={areaSampleFile}
       fileCheckURL={areaCheckFile}
       importURL={areaImport}
       logApi={areaLog}
       exportId={areaExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_Area_Export_r}
       exportLink={areaExport}
       importAccess={enums.Definition_Area_Import_w}
       logAccess={enums.Definition_Area_Log_r}
       readPagingApi={areaReadPaging}
       accessListAccess={enums.Definition_Area_Read_r}
       accessListApi={areaAccessList}
       favouriteApi={areaFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_Area_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_Area_Delete_w}
       editAccess={enums.Definition_Area_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={areaGetOneRecord}
       setUpdate={setUpdate}
       mobileModal = {mobileModal}
       setMobileModal = {setMobileModal}
       widthOFScreen ={widthOFScreen}
       mobileModalButtons={mobileModalButtons}
       setMobileModalButtons={setMobileModalButtons}
       setMobileModalColumns={setMobileModalColumns}
       mobileModalColumns={mobileModalColumns}
     />
    
    </>
  )
}

export default AreaList