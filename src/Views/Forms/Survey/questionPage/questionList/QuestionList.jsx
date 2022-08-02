import QuestionForm from '../questionForm/QuestionForm';
import './questionList.css'
import { toast } from "react-toastify";
import { enums } from '../../../../../data/Enums';

import {
   questionRead,
   questionReadPaging,
   questionGetOneRecord,
   questionSetUnselectedColumn,
   questionDelete,
   questionSampleFile,
   questionCheckFile,
   questionImport,
   questionExport,
   questionExportId,
   questionLog,
   questionSetToFavorite,
   questionAccessList
    } from '../../../../../services/questionService';
import useWindowSize from '../../../../../customHooks/useWindowSize';
import { useRef, useState } from 'react';
import CustomTable from '../../../../../Components/Table/Table/CustomTable';
import TableModal from './tableModal/TableModal';
import TableQuestionModal from './tableQuestionModal/TableQuestionModal';
import LimitModal from './limitModal/LimitModal';
import { useTranslation } from 'react-i18next';
const QuestionList = () => {

  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "QuestionnaireType_Id",
    "Group_Id",
    "Language_EId",
    "SourceType",
    "Password",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [tableModalQuestionopen, setTableModalQuestionOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const [isLimitModal, setIsLimitModal] = useState(false)
  const widthOFScreen = useWindowSize().width
  const {t} = useTranslation()
  const BcItems = [t("/Survey/QuestionPage/Read"), t("/Survey/QuestionPage/Read")];

  const addObject = {
    Component: QuestionForm,
    path: "/Poll/QuestionPage/Create/",
    title: "routes.questionForm",
    access: enums.Poll_QuestionPage_Create_w,
  };
  const setUpdate = (res) => {
    const record = res.Record;
    setRowValues(record);
    setTableModalOpen(true);
  };
  const setAddQuestion = (res) => {
    const record = res.Record;
    setRowValues(record);
    setTableModalQuestionOpen(true);
  };
  const addOperator = (res) => {
    setRowValues(res);
    setIsLimitModal(true);
  };
  const updated = () => {
    setTableModalOpen(false);
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
    //call update function in child class
    childRef.current.updated();
  };
  const addQuestion = () => {
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
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
      {tableModalQuestionopen && (
        <TableQuestionModal
          rowValus={rowValus}
          onHide={() => setTableModalQuestionOpen(false)}
          tableModalShow={tableModalQuestionopen}
          updated={addQuestion}
        />
      )}
      {isLimitModal && (
        <LimitModal
          rowValus={rowValus}
          onHide={() => setIsLimitModal(false)}
          tableModalShow={isLimitModal}
          updated={addQuestion}
        />
      )}
     
      <CustomTable
        ref={childRef}
        BcItems={BcItems}
        ReadApi={questionRead}
        deleteApi={questionDelete}
        unSelectedAPI={questionSetUnselectedColumn}
        sampleUrl={questionSampleFile}
        fileCheckURL={questionCheckFile}
        importURL={questionImport}
        logApi={questionLog}
        exportId={questionExportId}
        addObject={addObject}
        exportAccess={enums.Poll_QuestionPage_Export_r}
        exportLink={questionExport}
        importAccess={enums.Poll_QuestionPage_Import_w}
        logAccess={enums.Poll_QuestionPage_Log_r}
        readPagingApi={questionReadPaging}
        accessListAccess={enums.Poll_QuestionPage_Read_r}
        accessListApi={questionAccessList}
        favouriteApi={questionSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Poll_QuestionPage_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Poll_QuestionPage_Delete_w}
        editAccess={enums.Poll_QuestionPage_Update_w}
        permissionsAccess={""}
        getOneRecord={questionGetOneRecord}
        setUpdate={setUpdate}
        setAddQuestion={setAddQuestion}
        addAccess = {enums.Poll_QuestionPage_Delete_w}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        addOperator={addOperator}
        addOperatorAccess = {enums.Poll_QuestionPage}
      />
    </>
    
    


  )
}

export default QuestionList