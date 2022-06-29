import "../../../../assets/css/table.css";
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";

import RepairsPerformedDefine from "./repairsPerformedDefine/RepairsPerformedDefine";
import { repairsPerformedAccessList, repairsPerformedCheckFile, repairsPerformedDelete, repairsPerformedExport, repairsPerformedExportId, repairsPerformedGetOneRecord, repairsPerformedImport, repairsPerformedLog, repairsPerformedRead, repairsPerformedReadPaging, repairsPerformedSampleFile, repairsPerformedSetToFavorite, repairsPerformedSetUnselectedColumn } from "../../../../services/repairsPerformed";

const RepairsPerformed = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "Language_EId",
    "SourceType",
    "Model_Id",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component:RepairsPerformedDefine,
    path: "/Definition/RepairsPerformed/Write",
    title: "/Definition/RepairsPerformed/Write",
    access: enums.Definition_RepairsPerformed_Create_w,
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
        ReadApi={repairsPerformedRead}
        deleteApi={repairsPerformedDelete}
        unSelectedAPI={repairsPerformedSetUnselectedColumn}
        sampleUrl={repairsPerformedSampleFile}
        fileCheckURL={repairsPerformedCheckFile}
        importURL={repairsPerformedImport}
        logApi={repairsPerformedLog}
        exportId={repairsPerformedExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_RepairsPerformed_Export_r}
        exportLink={repairsPerformedExport}
        importAccess={enums.Definition_RepairsPerformed_Import_w}
        logAccess={enums.Definition_RepairsPerformed_Log_r}
        readPagingApi={repairsPerformedReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={repairsPerformedAccessList}
        favouriteApi={repairsPerformedSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_RepairsPerformed_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_RepairsPerformed_Delete_w}
        editAccess={enums.Definition_RepairsPerformed_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={repairsPerformedGetOneRecord}
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

export default RepairsPerformed;
