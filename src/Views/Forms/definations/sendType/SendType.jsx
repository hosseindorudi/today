 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import { sendTypeAccessList, sendTypeCheckFile, sendTypeDelete, sendTypeExport, sendTypeExportId, sendTypeGetOneRecord, sendTypeImport, sendTypeLog, sendTypeRead, sendTypeReadPaging, sendTypeSampleFile, sendTypeSetToFavorite, sendTypeSetUnselectedColumn } from "../../../../services/sendType";
import SendTypeDefine from "./sendTypeDefine/SendTypeDefine";

const SendType = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "Language_EId",
    "SourceType",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: SendTypeDefine,
          path: "/Definition/SendType/Write",
          title: "/Definition/SendType/Write",
          access: enums.Definition_SendType_Create_w,
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
        ReadApi={sendTypeRead}
        deleteApi={sendTypeDelete}
        unSelectedAPI={sendTypeSetUnselectedColumn}
        sampleUrl={sendTypeSampleFile}
        fileCheckURL={sendTypeCheckFile}
        importURL={sendTypeImport}
        logApi={sendTypeLog}
        exportId={sendTypeExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_SendType_Export_r}
        exportLink={sendTypeExport}
        importAccess={enums.Definition_SendType_Import_w}
        logAccess={enums.Definition_SendType_Log_r}
        readPagingApi={sendTypeReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={sendTypeAccessList}
        favouriteApi={sendTypeSetToFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_SendType_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_SendType_Delete_w}
        editAccess={enums.Definition_SendType_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={sendTypeGetOneRecord}
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

export default SendType;
