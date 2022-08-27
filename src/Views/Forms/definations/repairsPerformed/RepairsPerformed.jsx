import "./repairsPerformed.css";

import { useState,  useRef } from "react";

import {
  RepairsPerformedReadTitle,
  RepairsPerformedCreate,
  RepairsPerformedRead,
  RepairsPerformedLog,
  RepairsPerformedSampleFile,
  RepairsPerformedCheckFile,
  RepairsPerformedImport,
  RepairsPerformedExport,
  RepairsPerformedSetToFavorite,
  RepairsPerformedDelete,
  RepairsPerformedUpdate,
  RepairsPerformedDeleteRate,
  RepairsPerformedReadRate,
  RepairsPerformedCreateRate,
  RepairsPerformedUpdateRate,
  RepairsPerformedColumnInfo,
  RepairsPerformedImportArray,
  RepairsPerformedReadPaging,
  RepairsPerformedGetOneRecord,
  RepairsPerformedSetUnselectedColumn,
  RepairsPerformedExportId,
  RepairsPerformedAccessList
} from "../../../../services/repairsPerformed";
import { t } from "i18next";
import { modelReadTitle } from "../../../../services/modelService";
import { enums } from "../../../../data/Enums";

import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
const RepairsPerformed = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "PartGroup_Id",
    "Quality_Id",
    "Color_Id",
    "SafeMode"
  ];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/RepairsPerformed/Read")];
  const [isFee, setIsFee] = useState(false);
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(null);
  const [perfomedGroupOptions, setPerformedGroupOptions] = useState([]);
  const [performedGroup, setPerformedGroup] = useState({});
  const [perfomedData, setPerformedData] = useState([]);

  

  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <CustomTable
        type="tree"
        columnInfo={RepairsPerformedColumnInfo}
        importarray={RepairsPerformedImportArray}
        ref={childRef}
        ReadApi={RepairsPerformedRead}
        deleteApi={RepairsPerformedDelete}
        unSelectedAPI={RepairsPerformedSetUnselectedColumn}
        sampleUrl={RepairsPerformedSampleFile}
        fileCheckURL={RepairsPerformedCheckFile}
        importURL={RepairsPerformedImport}
        logApi={RepairsPerformedLog}
        exportId={RepairsPerformedExportId}
        exportAccess={enums.Definition_RepairsPerformed_Export_r}
        exportLink={RepairsPerformedExport}
        importAccess={enums.Definition_RepairsPerformed_Import_w}
        logAccess={enums.Definition_RepairsPerformed_Log_r}
        readPagingApi={RepairsPerformedReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={RepairsPerformedAccessList}
        favouriteApi={RepairsPerformedSetToFavorite}
        handleClickHelp={handleClickHelp}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_RepairsPerformed_Delete_w}
        editAccess={enums.Definition_RepairsPerformed_Update_w}
        getOneRecord={RepairsPerformedGetOneRecord}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
        isFee={isFee}
        setIsFee={setIsFee}
        deleteRateApi={RepairsPerformedDeleteRate}
        readRateApi={RepairsPerformedReadRate}
        createRateApi={RepairsPerformedCreateRate}
        updateRateApi={RepairsPerformedUpdateRate}
        createApi={RepairsPerformedCreate}
        modelOptions={modelOptions}
        setModelOptions={setModelOptions}
        model={model}
        setModel={setModel}
        perfomedGroupOptions={perfomedGroupOptions}
        setPerformedGroupOptions={setPerformedGroupOptions}
        performedGroup={performedGroup}
        setPerformedGroup={setPerformedGroup}
        perfomedData={perfomedData}
        setPerformedData={setPerformedData}
        modelReadTitle={modelReadTitle}
        RepairsPerformedReadTitle={RepairsPerformedReadTitle}
        RepairsPerformedUpdate={RepairsPerformedUpdate}
      />
  )
};

export default RepairsPerformed;
