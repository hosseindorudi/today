import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import ComponyForm from './componyForm/ComponyForm';
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    companyRead,
    companyReadPaging,
    companyGetOneRecord,
    companyDelete,
    companyFavorite,
    companyExportId,
    companyExport,
    companySampleFile,
    companyCheckFile,
    companyImportFile,
    companyLog,
    companySetUnselectedColumn,
    companyAccessList,
        } from '../../../../services/companyService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';

const ComponyList = () => {


    const filteredColumns = ["IsLimited", "Id", "Registrar","SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});


  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: ComponyForm,
    path: "/Definition/Company/Write",
    title: "/Definition/Company/Write",
    access: enums.Definition_Company_Create_w
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
        ReadApi={companyRead}
        deleteApi={companyDelete}
        unSelectedAPI={companySetUnselectedColumn}
        sampleUrl={companySampleFile}
        fileCheckURL={companyCheckFile}
        importURL={companyImportFile}
        logApi={companyLog}
        exportId={companyExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Company_Export_r}
        exportLink={companyExport}
        importAccess={enums.Definition_Company_Import_w}
        logAccess={enums.Definition_Company_Log_r}
        readPagingApi={companyReadPaging}
        accessListAccess={enums.Definition_Company_Read_r}
        accessListApi={companyAccessList}
        favouriteApi={companyFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Company_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Company_Delete_w}
        editAccess={enums.Definition_Company_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={companyGetOneRecord}
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

export default ComponyList