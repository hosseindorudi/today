import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    CountryRead,
    CountryReadPaging,
    CountryGetOneRecord,
    CountryDelete,
    CountryFavorite,
    CountryExportId,
    CountryExport,
    CountrySampleFile,
    CountryCheckFile,
    CountryImportFile,
    CountryLog,
    CountrySetUnselectedColumn,
    CountryAccessList,
        } from '../../../../services/countryService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import CountryForm from './countryForm/CountryForm';

const Countrylist = () => {

    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];

    const [tableModalOpen, setTableModalOpen] = useState(false);
    const [rowValus, setRowValues] = useState({});
  
  
    const childRef = useRef();
  
    const [mobileModal, setMobileModal] = useState(false)
    const [mobileModalButtons, setMobileModalButtons] = useState(false)
    const [mobileModalColumns, setMobileModalColumns] = useState(false)
    const widthOFScreen = useWindowSize().width
  
    const addObject = {
      Component: CountryForm,
      path: "/Definition/Country/Write",
      title: "/Definition/Country/Write",
      access: enums.Definition_Country_Create_w
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
       ReadApi={CountryRead}
       deleteApi={CountryDelete}
       unSelectedAPI={CountrySetUnselectedColumn}
       sampleUrl={CountrySampleFile}
       fileCheckURL={CountryCheckFile}
       importURL={CountryImportFile}
       logApi={CountryLog}
       exportId={CountryExportId}
       changePasswordURL={""}
       addObject={addObject}
       exportAccess={enums.Definition_Country_Export_r}
       exportLink={CountryExport}
       importAccess={enums.Definition_Country_Import_w}
       logAccess={enums.Definition_Country_Log_r}
       readPagingApi={CountryReadPaging}
       accessListAccess={enums.Definition_Country_Read_r}
       accessListApi={CountryAccessList}
       favouriteApi={CountryFavorite}
       handleClickHelp={handleClickHelp}
       addFormAccess={enums.Definition_Country_Create_w}
       filteredColumns={filteredColumns}
       deleteAccess={enums.Definition_Country_Delete_w}
       editAccess={enums.Definition_Country_Update_w}
       permissionsAccess={""}
       changePasswordAccess={""}
       getOneRecord={CountryGetOneRecord}
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

export default Countrylist