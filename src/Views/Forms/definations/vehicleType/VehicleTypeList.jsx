import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    VehicleTypeRead,
    VehicleTypeReadPaging,
    VehicleTypeGetOneRecord,
    VehicleTypeDelete,
    VehicleTypeFavorite,
    VehicleTypeExportId,
    VehicleTypeExport,
    VehicleTypeSampleFile,
    VehicleTypeCheckFile,
    VehicleTypeImportFile,
    VehicleTypeLog,
    VehicleTypeSetUnselectedColumn,
    VehicleTypeAccessList,
        } from '../../../../services/vehicleTypeService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import VehicleTypeForm from './vehicleTypeForm/VehicleTypeForm';

const VehicleTypeList = () => {
    const filteredColumns = ["IsLimited", "Registrar","SourceType"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: VehicleTypeForm,
      path: "/Definition/VehicleType/Write",
      title: "/Definition/VehicleType/Write",
      access: enums.Definition_VehicleType_Create_w
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
       ReadApi={VehicleTypeRead}
       deleteApi={VehicleTypeDelete}
       unSelectedAPI={VehicleTypeSetUnselectedColumn}
       sampleUrl={VehicleTypeSampleFile}
       fileCheckURL={VehicleTypeCheckFile}
       importURL={VehicleTypeImportFile}
       logApi={VehicleTypeLog}
       exportId={VehicleTypeExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_VehicleType_Export_r}
       exportLink={VehicleTypeExport}
       importAccess={enums.Definition_VehicleType_Import_w}
       logAccess={enums.Definition_VehicleType_Log_r}
       readPagingApi={VehicleTypeReadPaging}
       accessListAccess={enums.Definition_VehicleType_Read_r}
       accessListApi={VehicleTypeAccessList}
       favouriteApi={VehicleTypeFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_VehicleType_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_VehicleType_Delete_w}
       editAccess={enums.Definition_VehicleType_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={VehicleTypeGetOneRecord}
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

export default VehicleTypeList