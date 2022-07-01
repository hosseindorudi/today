import React, { useRef, useState } from "react";
// import TableModal from './tableModal/TableModal'
import { t } from "i18next";
import { toast } from "react-toastify";

import { answerPageAccessList, answerPageCheckFile, answerPageDelete, answerPageExport, answerPageExportId, answerPageFavorite, answerPageGetOneRecord, answerPageImport, answerPageLog, answerPageRead, answerPageReadPaging, answerPageSampleFile, answerPageSetColumn } from "../../../../../services/answerService";
import AnswerForm from "../answerForm/AnswerForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../../customHooks/useWindowSize";

const AnswerList = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType","QuestionPage_Id","AnswerPageFailed_Title","AnswerPageFailed_Id","Answer"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});

  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: AnswerForm,
    path: "/Survey/Answer/Create",
    title: "routes.answerForm",
    access: enums.Survey_AnswerPage_Create_w,
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
      {/* {tableModalOpen && (
        <TableModal
          rowValus={rowValus}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )} */}

      <CustomTable
        ref={childRef}
        ReadApi={answerPageRead}
        deleteApi={answerPageDelete}
        unSelectedAPI={answerPageSetColumn}
        sampleUrl={answerPageSampleFile}
        fileCheckURL={answerPageCheckFile}
        importURL={answerPageImport}
        logApi={answerPageLog}
        exportId={answerPageExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Survey_AnswerPage_Export_r}
        exportLink={answerPageExport}
        importAccess={enums.Survey_AnswerPage_Import_w}
        logAccess={enums.Survey_AnswerPage_Log_r}
        readPagingApi={answerPageReadPaging}
        accessListAccess={enums.Survey_AnswerPage_Read_r}
        accessListApi={answerPageAccessList}
        favouriteApi={answerPageFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Survey_AnswerPage_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Survey_AnswerPage_Delete_w}
        editAccess={enums.Survey_AnswerPage_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={answerPageGetOneRecord}
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

export default AnswerList;
