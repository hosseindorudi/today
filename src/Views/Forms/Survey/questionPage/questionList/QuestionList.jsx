import QuestionForm from '../questionForm/QuestionForm';
import './questionList.css'
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from '../../../../../data/Enums';

import {
   questionRead,
   questionReadPaging,
   questionReadTitle,
   questionGetOneRecord,
   questionUpdate,
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
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: QuestionForm,
    path: "/Survey/QuestionPage/Create/",
    title: "routes.questionForm",
    access: enums.Survey_QuestionPage_Create_w,
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
  const updated = () => {
    setTableModalOpen(false);
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
    //call update function in child class
    childRef.current.updated();
  };
  const addQuestion = () => {
    setTableModalQuestionOpen(false);
    toast.success(t("updatedRecord"), {
      position: toast.POSITION.TOP_CENTER,
    });
    //call update function in child class
    childRef.current.addQuestion();
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
          updated={addQuestion}
        />
      )}
      {tableModalQuestionopen && (
        <TableQuestionModal
          rowValus={rowValus}
          onHide={() => setTableModalQuestionOpen(false)}
          tableModalShow={tableModalQuestionopen}
          updated={updated}
        />
      )}
     
      <CustomTable
        ref={childRef}
        ReadApi={questionRead}
        deleteApi={questionDelete}
        unSelectedAPI={questionSetUnselectedColumn}
        sampleUrl={questionSampleFile}
        fileCheckURL={questionCheckFile}
        importURL={questionImport}
        logApi={questionLog}
        exportId={questionExportId}
        addObject={addObject}
        exportAccess={enums.Survey_QuestionPage_Export_r}
        exportLink={questionExport}
        importAccess={enums.Survey_QuestionPage_Import_w}
        logAccess={enums.Survey_QuestionPage_Log_r}
        readPagingApi={questionReadPaging}
        accessListAccess={enums.Survey_QuestionPage_Read_r}
        accessListApi={questionAccessList}
        favouriteApi={questionSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Survey_QuestionPage_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Survey_QuestionPage_Delete_w}
        editAccess={enums.Survey_QuestionPage_Update_w}
        permissionsAccess={""}
        getOneRecord={questionGetOneRecord}
        setUpdate={setUpdate}
        setAddQuestion={setAddQuestion}
        addAccess = {enums.Survey_QuestionPage_Delete_w}
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

export default QuestionList