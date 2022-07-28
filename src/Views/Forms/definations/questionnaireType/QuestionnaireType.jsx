 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from "../../../../data/Enums";

import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import QuestionnaireTypeDefine from "./questionnaireTypeDefine/QuestionnaireTypeDefine";
import { questionnaireTypeAccessList, questionnaireTypeCheckFile, questionnaireTypeDelete, questionnaireTypeExport, questionnaireTypeExportId, questionnaireTypeGetOneRecord, questionnaireTypeImport, questionnaireTypeLog, questionnaireTypeRead, questionnaireTypeReadPaging, questionnaireTypeSampleFile, questionnaireTypeSetToFavorite, questionnaireTypeSetUnselectedColumn } from "../../../../services/questionnaireType";
const QuestionnaireType = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Group_Id",
    "Language_EId",
    "SourceType",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: QuestionnaireTypeDefine,
    path: "/Definition/QuestionnaireType/Write",
    title: "/Definition/QuestionnaireType/Write",
    access: enums.Definition_QuestionnaireType_Create_w,
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
        ReadApi={questionnaireTypeRead}
        deleteApi={questionnaireTypeDelete}
        unSelectedAPI={questionnaireTypeSetUnselectedColumn}
        sampleUrl={questionnaireTypeSampleFile}
        fileCheckURL={questionnaireTypeCheckFile}
        importURL={questionnaireTypeImport}
        logApi={questionnaireTypeLog}
        exportId={questionnaireTypeExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_QuestionnaireType_Export_r}
        exportLink={questionnaireTypeExport}
        importAccess={enums.Definition_QuestionnaireType_Import_w}
        logAccess={enums.Definition_QuestionnaireType_Log_r}
        readPagingApi={questionnaireTypeReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={questionnaireTypeAccessList}
        favouriteApi={questionnaireTypeSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_QuestionnaireType_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_QuestionnaireType_Delete_w}
        editAccess={enums.Definition_QuestionnaireType_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={questionnaireTypeGetOneRecord}
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
  );
};

export default QuestionnaireType;
