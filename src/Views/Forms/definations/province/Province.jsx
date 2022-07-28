 
import React, {
  useRef,
  useState,
} from "react";
import TableModal from "./TableModal/TableModal";
import { enums } from "../../../../data/Enums";
import { t } from "i18next";
import { toast } from "react-toastify";
import useWindowSize from "../../../../customHooks/useWindowSize";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import ProvinceDefine from "./ProvinceDefine/ProvinceDefine";
import { provinceAccessList, provinceCheckFile, provinceDelete, provinceExport, provinceExportId, provinceFavorite, provinceGetOneRecord, provinceImportFile, provinceLog, provinceRead, provinceReadPaging, provinceSampleFile, provinceSetUnselectedColumn } from "../../../../services/provinceService";

const Province = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "Country_Id"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    title: "/Definition/Province/Write",
          path: "/Definition/Province/Write",
          access: enums.Definition_Province_Create_w,
          Component: ProvinceDefine,
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
        ReadApi={provinceRead}
        deleteApi={provinceDelete}
        unSelectedAPI={provinceSetUnselectedColumn}
        sampleUrl={provinceSampleFile}
        fileCheckURL={provinceCheckFile}
        importURL={provinceImportFile}
        logApi={provinceLog}
        exportId={provinceExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_Province_Export_r}
        exportLink={provinceExport}
        importAccess={enums.Definition_Province_Import_w}
        logAccess={enums.Definition_Province_Log_r}
        readPagingApi={provinceReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={provinceAccessList}
        favouriteApi={provinceFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_Province_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_Province_Delete_w}
        editAccess={enums.Definition_Province_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={provinceGetOneRecord}
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

export default Province;
