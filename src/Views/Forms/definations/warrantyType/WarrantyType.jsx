
import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './TableModal/TableModal'
import { t } from "i18next";
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';

import { warrantyTypeAccessList, warrantyTypeCheckFile, WarrantyTypeColumnInfo, warrantyTypeDelete, warrantyTypeExport, warrantyTypeExportId, warrantyTypeFavorite, warrantyTypeGetOneRecord, WarrantyTypeImportArray, warrantyTypeImportFile, warrantyTypeLog, warrantyTypeRead, warrantyTypeReadPaging, warrantyTypeSampleFile, warrantyTypeSetUnselectedColumn } from "../../../../services/warrantyType";
import WarrantyTypeDefine from './warrantyTypeDefine/WarrantyTypeDefine';
const WarrantyType = () => {
  const filteredColumns = ["IsLimited", "Registrar","SourceType",
  "SafeMode"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});


  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/WarrantyType/Read")];

  const addObject = {
    Component: WarrantyTypeDefine,
    path: "/Definition/WarrantyType/Write",
    title: "/Definition/WarrantyType/Write",
    access: enums.Definition_WarrantyType_Create_w
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
        columnInfo={WarrantyTypeColumnInfo}
        importarray={WarrantyTypeImportArray}
     ref={childRef}
     ReadApi={warrantyTypeRead}
     deleteApi={warrantyTypeDelete}
     unSelectedAPI={warrantyTypeSetUnselectedColumn}
     sampleUrl={warrantyTypeSampleFile}
     fileCheckURL={warrantyTypeCheckFile}
     importURL={warrantyTypeImportFile}
     logApi={warrantyTypeLog}
     exportId={warrantyTypeExportId}
     changePasswordURL={""}
     addObject={addObject}
     exportAccess={enums.Definition_WarrantyType_Export_r}
     exportLink={warrantyTypeExport}
     importAccess={enums.Definition_WarrantyType_Import_w}
     logAccess={enums.Definition_WarrantyType_Log_r}
     readPagingApi={warrantyTypeReadPaging}
     accessListAccess={enums.Definition_WarrantyType_Read_r}
     accessListApi={warrantyTypeAccessList}
     favouriteApi={warrantyTypeFavorite}
     handleClickHelp={handleClickHelp}
     addFormAccess={enums.Definition_WarrantyType_Create_w}
     filteredColumns={filteredColumns}
     deleteAccess={enums.Definition_WarrantyType_Delete_w}
     editAccess={enums.Definition_WarrantyType_Update_w}
     permissionsAccess={""}
     changePasswordAccess={""}
     getOneRecord={warrantyTypeGetOneRecord}
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
};

export default WarrantyType