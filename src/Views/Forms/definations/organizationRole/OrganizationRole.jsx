 
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import { enums } from "../../../../data/Enums";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
import OrganizationRoleDefine from "./organizationRoleDefine/OrganizationRoleDefine";
import { organizationalRoleAccessList, organizationalRoleCheckFile, OrganizationalRoleColumnInfo, organizationalRoleDelete, organizationalRoleExport, organizationalRoleExportId, organizationalRoleFavorite, organizationalRoleGetOneRecord, OrganizationalRoleImportArray, organizationalRoleImportFile, organizationalRoleLog, organizationalRoleRead, organizationalRoleReadPaging, organizationalRoleSampleFile, organizationalRoleSetUnselectedColumn } from "../../../../services/organizationRoleService";
const OrganizationRole = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValus, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/OrganizationalRole/Read")];

  const addObject = {
    Component: OrganizationRoleDefine,
    path: "/Definition/OrganizationalRole/Write",
    title: "/Definition/OrganizationalRole/Write",
    access: enums.Definition_OrganizationalRole_Create_w,
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
      
      {/* {showGetPermissionModal &&(
          <PermissionModal  permissions={permissions}
          show={showGetPermissionModal}
          onHide={() => setShowGetPermissionModal(false)}
          setPermission={setPermission}
          />
        )} */}
      <CustomTable
        columnInfo={OrganizationalRoleColumnInfo}
        importarray={OrganizationalRoleImportArray}
        ref={childRef}
        ReadApi={organizationalRoleRead}
        deleteApi={organizationalRoleDelete}
        unSelectedAPI={organizationalRoleSetUnselectedColumn}
        sampleUrl={organizationalRoleSampleFile}
        fileCheckURL={organizationalRoleCheckFile}
        importURL={organizationalRoleImportFile}
        logApi={organizationalRoleLog}
        exportId={organizationalRoleExportId}
        changePasswordURL={""}
        addObject={addObject}
        exportAccess={enums.Definition_OrganizationalRole_Export_r}
        exportLink={organizationalRoleExport}
        importAccess={enums.Definition_OrganizationalRole_Import_w}
        logAccess={enums.Definition_Model_Log_r}
        readPagingApi={organizationalRoleReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={organizationalRoleAccessList}
        favouriteApi={organizationalRoleFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Definition_OrganizationalRole_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_OrganizationalRole_Delete_w}
        editAccess={enums.Definition_OrganizationalRole_Update_w}
        permissionsAccess={""}
        changePasswordAccess={""}
        getOneRecord={organizationalRoleGetOneRecord}
        setUpdate={setUpdate}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
      />
    </>
  );
};

export default OrganizationRole;
