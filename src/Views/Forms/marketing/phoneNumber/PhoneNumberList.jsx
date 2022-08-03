import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import PhoneNumberDefine from "./phoneNumberDefine/PhoneNumberDefine";
import TableModal from "./tableModal/TableModal";
import { t } from "i18next";
import {
  PhonePoolRead,
  PhonePoolReadPaging,
  PhonePoolGetOneRecord,
  PhonePoolDelete,
  PhonePoolFavorite,
  PhonePoolExportId,
  PhonePoolExport,
  PhonePoolSampleFile,
  PhonePoolCheckFile,
  PhonePoolImportFile,
  PhonePoolLog,
  PhonePoolSetUnselectedColumn,
  PhonePoolAccessList,
  PhonePoolColumnInfo,
  PhonePoolImportArray,
} from "../../../../services/phoneNumberGroupService";
import { enums } from "../../../../data/Enums";
import { toast } from "react-toastify";

const PhoneNumberList = () => {
  const filteredColumns = ["IsLimited", "Registrar", "SourceType", "Id"];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const childRef = useRef();
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: PhoneNumberDefine,
    path: "/Marketing/PhoneNumber/Create",
    title: "/Marketing/PhoneNumber/Create",
    access: enums.Marketing_PhoneNumber_Create_w,
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
        columnInfo={PhonePoolColumnInfo}
        importarray={PhonePoolImportArray}
        ref={childRef}
        ReadApi={PhonePoolRead}
        deleteApi={PhonePoolDelete}
        unSelectedAPI={PhonePoolSetUnselectedColumn}
        sampleUrl={PhonePoolSampleFile}
        fileCheckURL={PhonePoolCheckFile}
        importURL={PhonePoolImportFile}
        logApi={PhonePoolLog}
        exportId={PhonePoolExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Marketing_PhonePool_Export_r}
        exportLink={PhonePoolExport}
        importAccess={enums.Marketing_PhonePool_Import_w}
        logAccess={enums.Marketing_PhonePool_Log_r}
        readPagingApi={PhonePoolReadPaging}
        accessListAccess={enums.Marketing_PhonePool_Read_r}
        accessListApi={PhonePoolAccessList}
        favouriteApi={PhonePoolFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Marketing_PhonePool_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Marketing_PhonePool_Delete_w}
        editAccess={enums.Marketing_PhonePool_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={PhonePoolGetOneRecord}
        setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
      />
    </>
  );
};

export default PhoneNumberList;
