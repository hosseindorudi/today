import React, { useRef, useState } from 'react'
import CustomTable from '../../../../Components/Table/Table/CustomTable'
import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { 
    ImportingCompanyRead,
    ImportingCompanyReadPaging,
    ImportingCompanyGetOneRecord,
    ImportingCompanyDelete,
    ImportingCompanyFavorite,
    ImportingCompanyExportId,
    ImportingCompanyExport,
    ImportingCompanySampleFile,
    ImportingCompanyCheckFile,
    ImportingCompanyImportFile,
    ImportingCompanyLog,
    ImportingCompanySetUnselectedColumn,
    ImportingCompanyAccessList,
        } from '../../../../services/importingCompanyService';
import { enums } from '../../../../data/Enums';
import { toast } from "react-toastify";
import useWindowSize from '../../../../customHooks/useWindowSize';
import ImportingCompanyForm from './importingCompanyForm/ImportingCompanyForm';

const ImportingImportingCompanyList = () => {
  

  const filteredColumns = ["IsLimited", "Registrar","SourceType"];
  const BcItems = [t("routes.basicDefinations"), t("/Definition/ImportingCompany/Read")];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});


  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: ImportingCompanyForm,
    path: "/Definition/ImportingCompany/Write",
    title: "/Definition/ImportingCompany/Write",
    access: enums.Definition_ImportingCompany_Create_w
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
        ReadApi={ImportingCompanyRead}
        deleteApi={ImportingCompanyDelete}
        unSelectedAPI={ImportingCompanySetUnselectedColumn}
        sampleUrl={ImportingCompanySampleFile}
        fileCheckURL={ImportingCompanyCheckFile}
        importURL={ImportingCompanyImportFile}
        logApi={ImportingCompanyLog}
        exportId={ImportingCompanyExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_ImportingCompany_Export_r}
        exportLink={ImportingCompanyExport}
        importAccess={enums.Definition_ImportingCompany_Import_w}
        logAccess={enums.Definition_ImportingCompany_Log_r}
        readPagingApi={ImportingCompanyReadPaging}
        accessListAccess={enums.Definition_ImportingCompany_Read_r}
        accessListApi={ImportingCompanyAccessList}
        favouriteApi={ImportingCompanyFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_ImportingCompany_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_ImportingCompany_Delete_w}
        editAccess={enums.Definition_ImportingCompany_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={ImportingCompanyGetOneRecord}
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

export default ImportingImportingCompanyList