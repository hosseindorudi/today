import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    InputQualityControlRead,
    InputQualityControlReadPaging,
    InputQualityControlGetOneRecord,
    InputQualityControlDelete,
    InputQualityControlFavorite,
    InputQualityControlExportId,
    InputQualityControlExport,
    InputQualityControlSampleFile,
    InputQualityControlCheckFile,
    InputQualityControlImportFile,
    InputQualityControlLog,
    InputQualityControlSetUnselectedColumn,
    InputQualityControlAccessList,
    InputQualityControlColumnInfo,
    InputQualityControlImportArray,
        } from '../../../../services/inputQualityControlService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import InputQualityControlForm from './inputQualityControlForm/InputQualityControlForm';

const InputQualityControlList = () => {
    const filteredColumns = ["IsLimited", "Registrar","SourceType", "Model_Id",
    "SafeMode"];
    const BcItems = [t("routes.basicDefinations"), t("/Definition/InputQualityControl/Read")];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: InputQualityControlForm,
      path: "/Definition/InputQualityControl/Write",
      title: "/Definition/InputQualityControl/Write",
      access: enums.Definition_InputQualityControl_Create_w
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
        columnInfo={InputQualityControlColumnInfo}
        importarray={InputQualityControlImportArray}
       ref={childRef}
       ReadApi={InputQualityControlRead}
       deleteApi={InputQualityControlDelete}
       unSelectedAPI={InputQualityControlSetUnselectedColumn}
       sampleUrl={InputQualityControlSampleFile}
       fileCheckURL={InputQualityControlCheckFile}
       importURL={InputQualityControlImportFile}
       logApi={InputQualityControlLog}
       exportId={InputQualityControlExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_InputQualityControl_Export_r}
       exportLink={InputQualityControlExport}
       importAccess={enums.Definition_InputQualityControl_Import_w}
       logAccess={enums.Definition_InputQualityControl_Log_r}
       readPagingApi={InputQualityControlReadPaging}
       accessListAccess={enums.Definition_InputQualityControl_Read_r}
       accessListApi={InputQualityControlAccessList}
       favouriteApi={InputQualityControlFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_InputQualityControl_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_InputQualityControl_Delete_w}
       editAccess={enums.Definition_InputQualityControl_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={InputQualityControlGetOneRecord}
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

export default InputQualityControlList