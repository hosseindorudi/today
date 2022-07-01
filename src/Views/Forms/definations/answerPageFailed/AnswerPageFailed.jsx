import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import TableModal from "./tableModal/TableModal";
import { t } from "i18next";
import {
  AnswerPageFailedRead,
  AnswerPageFailedReadPaging,
  AnswerPageFailedGetOneRecord,
  AnswerPageFailedDelete,
  AnswerPageFailedFavorite,
  AnswerPageFailedExportId,
  AnswerPageFailedExport,
  AnswerPageFailedSampleFile,
  AnswerPageFailedCheckFile,
  AnswerPageFailedImport,
  AnswerPageFailedLog,
  AnswerPageFailedSetColumn,
  AnswerPageFailedAccessList,
} from "../../../../services/answerPageFailedService";
import { enums } from "../../../../data/Enums";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import AnswerPageFailedForm from "./answerPageFailedForm/AnswerPageFailedForm";
const AnswerPageFailed = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});

  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: AnswerPageFailedForm,
    path: "/Definition/AnswerPageFailed/Write",
    title: "/Definition/AnswerPageFailed/Write",
    access: enums.Definition_AnswerPageFailed_Create_w,
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
        ReadApi={AnswerPageFailedRead}
        deleteApi={AnswerPageFailedDelete}
        unSelectedAPI={AnswerPageFailedSetColumn}
        sampleUrl={AnswerPageFailedSampleFile}
        fileCheckURL={AnswerPageFailedCheckFile}
        importURL={AnswerPageFailedImport}
        logApi={AnswerPageFailedLog}
        exportId={AnswerPageFailedExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_AnswerPageFailed_Export_r}
        exportLink={AnswerPageFailedExport}
        importAccess={enums.Definition_AnswerPageFailed_Import_w}
        logAccess={enums.Definition_AnswerPageFailed_Log_r}
        readPagingApi={AnswerPageFailedReadPaging}
        accessListAccess={enums.Definition_AnswerPageFailed_Read_r}
        accessListApi={AnswerPageFailedAccessList}
        favouriteApi={AnswerPageFailedFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_AnswerPageFailed_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_AnswerPageFailed_Delete_w}
        editAccess={enums.Definition_AnswerPageFailed_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={AnswerPageFailedGetOneRecord}
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

export default AnswerPageFailed;
