import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    CityRead,
    CityReadPaging,
    CityGetOneRecord,
    CityDelete,
    CityFavorite,
    CityExportId,
    CityExport,
    CitySampleFile,
    CityCheckFile,
    CityImportFile,
    CityLog,
    CitySetUnselectedColumn,
    CityAccessList,
        } from '../../../../services/cityService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import CityForm from './cityForm/CityForm';

const CityList = () => {
    const filteredColumns = ["IsLimited", "Registrar","SourceType", "Province_Id"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: CityForm,
      path: "/Definition/City/Write",
      title: "/Definition/City/Write",
      access: enums.Definition_City_Create_w
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
       ReadApi={CityRead}
       deleteApi={CityDelete}
       unSelectedAPI={CitySetUnselectedColumn}
       sampleUrl={CitySampleFile}
       fileCheckURL={CityCheckFile}
       importURL={CityImportFile}
       logApi={CityLog}
       exportId={CityExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_City_Export_r}
       exportLink={CityExport}
       importAccess={enums.Definition_City_Import_w}
       logAccess={enums.Definition_City_Log_r}
       readPagingApi={CityReadPaging}
       accessListAccess={enums.Definition_City_Read_r}
       accessListApi={CityAccessList}
       favouriteApi={CityFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_City_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_City_Delete_w}
       editAccess={enums.Definition_City_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={CityGetOneRecord}
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

export default CityList