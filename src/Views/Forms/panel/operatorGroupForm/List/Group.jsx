
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import {
  groupAccessList,
  groupCheckFile,
  groupDelete,
  groupExport,
  groupExportId,
  groupFavorite,
  groupGetOneRecord,
  groupGetPermission,
  groupImportFile,
  groupLog,
  groupRead,
  groupReadPaging,
  groupSampleFile,
  groupSetPermission,
  groupSetUnselectedColumn,
} from "../../../../../services/groupService";
import { toast } from "react-toastify";
import { t } from "i18next";
import OperatorGroupForm from "../OperatorGroupForm";
import { enums } from "../../../../../data/Enums";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../../customHooks/useWindowSize";
import BrowserPolicyModal from "../../../../../Components/Table/browserPolicyModal/BrowserPolicyModal";
import IPpolicyModal from "../../../../../Components/Table/ipPolicyModal/IPpolicyModal";
import OsPolicyModal from "../../../../../Components/Table/osPolicyModal/OsPolicyModal";
import LocationPolicyModal from "../../../../../Components/Table/locationPolicyModal/LocationPolicyModal";
const Group = () => {
  const filteredColumns = ["IsLimited", "Id", "Registrar", "SourceType"];

  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const [modalBrowserPolicy, setModalBrowserPolicy] = useState(false);
  const [modalIpPolicy, setModalIpPolicy] = useState(false);
  const [osModal, setOsModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false)
  const childRef = useRef();

  const [mobileModal, setMobileModal] = useState(false);
  const [mobileModalButtons, setMobileModalButtons] = useState(false);
  const [mobileModalColumns, setMobileModalColumns] = useState(false);
  const widthOFScreen = useWindowSize().width;

  const addObject = {
    Component: OperatorGroupForm,
    path: "/Operator/Group/Create",
    title: "/Operator/Group/Create",
    access: enums.Operator_Group_Create_w,
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

  const handlePolicyBrowser = (id) => {
    setRowValues(id);
    setModalBrowserPolicy(true);
  };
  const handlePolicyIP=(id)=>{
    setRowValues(id)
   setModalIpPolicy(true)
  }
  const handlePolicyOs=(id)=>{
    setRowValues(id)
    setOsModal(true)
  }
  const handlePolicyLocation=(id)=>{
    setRowValues(id)
    setLocationModal(true)
  }
  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValues={rowValues}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}
      {modalBrowserPolicy && (
        <BrowserPolicyModal
          rowValues={rowValues}
          onHide={() => setModalBrowserPolicy(false)}
          show={modalBrowserPolicy}
        />
      )}
    {modalIpPolicy && (
        <IPpolicyModal
          id={rowValues}
          onHide={() => setModalIpPolicy(false)}
          show={modalIpPolicy}
        />
      )}
       {osModal && (
        <OsPolicyModal
          id={rowValues}
          onHide={() => setOsModal(false)}
          show={osModal}
        />
      )}
      {locationModal &&(
        <LocationPolicyModal show={locationModal}    id={rowValues}
        onHide={() => setLocationModal(false)}/>
      )}
      <CustomTable
        ref={childRef}
        ReadApi={groupRead}
        deleteApi={groupDelete}
        unSelectedAPI={groupSetUnselectedColumn}
        sampleUrl={groupSampleFile}
        fileCheckURL={groupCheckFile}
        importURL={groupImportFile}
        logApi={groupLog}
        exportId={groupExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Operator_Group_Export_r}
        exportLink={groupExport}
        importAccess={enums.Operator_Group_Import_w}
        logAccess={enums.Operator_Group_Log_r}
        readPagingApi={groupReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={groupAccessList}
        favouriteApi={groupFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Operator_Group_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Operator_Group_Delete_w}
        editAccess={enums.Operator_Group_Update_w}
        permissionsAccess={enums.Operator_Group_Permission_w}
        getPermissionURL={groupGetPermission}
        setPermissionURL={groupSetPermission}
        changePasswordAccess={""}
        getOneRecord={groupGetOneRecord}
        setUpdate={setUpdate}
        mobileModal={mobileModal}
        setMobileModal={setMobileModal}
        widthOFScreen={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        handlePolicyBrowser={handlePolicyBrowser}
        policyBrowserAccess={enums.Operator_Group_Create_w}
        handlePolicyIP={handlePolicyIP}
        policyIpAccess={enums.Operator_Group_Create_w}
        handlePolicyOs={handlePolicyOs}
        policyOsAccess={enums.Operator_Group_Create_w}
        handlePolicyLocation={handlePolicyLocation}
        policyLocationAccess={enums.Operator_Group_Create_w}
      />
    </>
  );
};

export default Group;
