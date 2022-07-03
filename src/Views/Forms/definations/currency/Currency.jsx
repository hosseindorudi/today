import React, { useRef, useState } from "react";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import TableModal from "./tableModal/TableModal";
import { t } from "i18next";
import { enums } from "../../../../data/Enums";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CurrencyDefine from "./currencyDefine/CurrencyDefine";
import { currencyAccessList, currencyCheckFile, currencyDelete, currencyExport, currencyExportId, currencyFavorite, currencyGetOneRecord, currencyImport, currencyLog, currencyRead, currencyReadPaging, currencySampleFile, currencySetColumn } from "../../../../services/currencyService";
const Currency = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});

  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: CurrencyDefine,
    path: "/Definition/Currency/Write",
    title: "/Definition/Currency/Write",
    access: enums.Definition_Currency_Create_w,
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
        ReadApi={currencyRead}
        deleteApi={currencyDelete}
        unSelectedAPI={currencySetColumn}
        sampleUrl={currencySampleFile}
        fileCheckURL={currencyCheckFile}
        importURL={currencyImport}
        logApi={currencyLog}
        exportId={currencyExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Currency_Export_r}
        exportLink={currencyExport}
        importAccess={enums.Definition_Currency_Import_w}
        logAccess={enums.Definition_Currency_Log_r}
        readPagingApi={currencyReadPaging}
        accessListAccess={enums.Definition_Currency_Read_r}
        accessListApi={currencyAccessList}
        favouriteApi={currencyFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Currency_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Currency_Delete_w}
        editAccess={enums.Definition_Currency_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={currencyGetOneRecord}
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

export default Currency;
