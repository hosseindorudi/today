import React, { useEffect, useRef, useState } from "react";
// import TableModal from './tableModal/TableModal'
// import { t } from "i18next";
// import { toast } from "react-toastify";

import { answerPageAccessList, answerPageCheckFile, answerPageDelete, answerPageExport, answerPageExportId, answerPageFavorite, answerPageGetOneRecord, answerPageImport, answerPageLog, answerPageRead, answerPageReadAnswer, answerPageReadPaging, answerPageSampleFile, answerPageSetColumn } from "../../../../../services/answerService";
import AnswerForm from "../answerForm/AnswerForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../../customHooks/useWindowSize";
import AnswerModal from "../../../../../Components/Table/answerModal/AnswerModal";
import useAxios from "../../../../../customHooks/useAxios";
import { handleError } from "../../../../../validation/functions";
import useRequest from "../../../../../customHooks/useRequest";
import BackDrop from "../../../../../Components/backDrop/BackDrop";

const AnswerList = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType","QuestionPage_Id","AnswerPageFailed_Id","Answer"];


  const childRef = useRef();
  const [rowValues, setRowValues] = useState([]);
  const [answerModalOpen, setAnswerModalOpen] = useState(false);
  const [mobileModal, setMobileModal] = useState(false);
  const request=useRequest()
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;
  const [response,loading, fetchData, setResponse] = useAxios();
  const addObject = {
    Component: AnswerForm,
    path: "/Survey/Answer/Create",
    title: "routes.answerForm",
    access: enums.Survey_AnswerPage_Create_w,
  };


  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };
  const handleResponse=(response)=>{
    setRowValues(response.Record)
    setAnswerModalOpen(true)
  }
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response)
        : handleError(response.Message);
      setResponse(undefined);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);
  const handleReadAnswers=(id)=>{
    fetchData({
      method: "POST",
      url: answerPageReadAnswer,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        id: id
      }
    });
  }
  return (
    <>
    {loading && <BackDrop open={true} />}
{answerModalOpen &&(
  <AnswerModal   onHide={() => setAnswerModalOpen(false)}
  logs={rowValues}
  show={answerModalOpen}/>
)}
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
        // setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        readAnswersAccess={enums.Survey_AnswerPage_Read_r}
        handleReadAnswers={handleReadAnswers}
      />
    </>
  );
};

export default AnswerList;
