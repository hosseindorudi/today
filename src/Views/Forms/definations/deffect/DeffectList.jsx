import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    defectRead,
    defectReadPaging,
    defectGetOneRecord,
    defectDelete,
    defectFavorite,
    defectExportId,
    defectExport,
    defectSampleFile,
    defectCheckFile,
    defectImportFile,
    defectLog,
    defectSetUnselectedColumn,
    defectAccessList,
    DefectColumnInfo,
    DefectImportArray,
        } from '../../../../services/defectService';
import DeffectForm from './deffectForm/DeffectForm';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
const DeffectList = () => {
    const filteredColumns = ["IsLimited", "Registrar","SourceType","Model_Id",
    "SafeMode"];
    const BcItems = [t("routes.basicDefinations"), t("/Definition/Defect/Read")];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: DeffectForm,
      path: "/Definition/Defect/Write",
      title: "/Definition/Defect/Write",
      access: enums.Definition_Defect_Create_w
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
        columnInfo={DefectColumnInfo}
        importarray={DefectImportArray}
       ref={childRef}
       ReadApi={defectRead}
       deleteApi={defectDelete}
       unSelectedAPI={defectSetUnselectedColumn}
       sampleUrl={defectSampleFile}
       fileCheckURL={defectCheckFile}
       importURL={defectImportFile}
       logApi={defectLog}
       exportId={defectExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_Defect_Export_r}
       exportLink={defectExport}
       importAccess={enums.Definition_Defect_Import_w}
       logAccess={enums.Definition_Defect_Log_r}
       readPagingApi={defectReadPaging}
       accessListAccess={enums.Definition_Defect_Read_r}
       accessListApi={defectAccessList}
       favouriteApi={defectFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_Defect_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_Defect_Delete_w}
       editAccess={enums.Definition_Defect_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={defectGetOneRecord}
       setUpdate={setUpdate}
       mobileModal = {mobileModal}
       setMobileModal = {setMobileModal}
       widthOFScreen ={widthOFScreen}
       mobileModalButtons={mobileModalButtons}
       setMobileModalButtons={setMobileModalButtons}
       setMobileModalColumns={setMobileModalColumns}
       mobileModalColumns={mobileModalColumns}
       BcItems={BcItems}
     />
    
    </>
  )
}

export default DeffectList