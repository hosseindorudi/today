import "../../../../../assets/css/table.css";
import React, { useRef, useState } from "react";
import TableModal from "./TableModal/TableModal";
import { toast } from "react-toastify";
import { t } from "i18next";
import CustomerForm from "../CustomerForm";
import { enums } from "../../../../../data/Enums";
import {
  customerAccessList,
  customerChangePassword,
  customerCheckFile,
  customerDelete,
  customerExport,
  customerExportId,
  customerFavorite,
  customerGetOneRecord,
  customerImportFile,
  customerLog,
  customerRead,
  customerReadPaging,
  customerSampleFile,
  customerSetUnselectedColumn,
} from "../../../../../services/customerService";
import CustomTable from "../../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../../customHooks/useWindowSize";
import CustomerAddressModal from "../../../../../Components/Table/customerAddressModal/CustomerAddressModal";
const CustomerList = () => {
  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Id",
    "Registrar",
    "Group_Id",
    "Language_EId",
    "SourceType",
    "Password",
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const [isAddress, setIsAddress] = useState(false)
  const widthOFScreen = useWindowSize().width

  const addObject = {
    Component: CustomerForm,
    path: "/customerform",
    title: "routes.customerForm",
    access: enums.Customer_Customer_Create_w,
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
  const handleAddress = (id) => {
    setRowValues(id);
    setIsAddress(true);
  };

  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <>
      {tableModalOpen && (
        <TableModal
          rowValus={rowValues}
          onHide={() => setTableModalOpen(false)}
          tableModalShow={tableModalOpen}
          updated={updated}
        />
      )}

    {isAddress && (
        <CustomerAddressModal
          rowValues={rowValues}
          onHide={() => setIsAddress(false)}
          show={isAddress}
        />
      )}

      <CustomTable
        ref={childRef}
        ReadApi={customerRead}
        deleteApi={customerDelete}
        unSelectedAPI={customerSetUnselectedColumn}
        sampleUrl={customerSampleFile}
        fileCheckURL={customerCheckFile}
        importURL={customerImportFile}
        logApi={customerLog}
        exportId={customerExportId}
        changePasswordURL={customerChangePassword}
        addObject={addObject}
        exportAccess={enums.Customer_Customer_Export_r}
        exportLink={customerExport}
        importAccess={enums.Customer_Customer_Import_w}
        logAccess={enums.Customer_Customer_Log_r}
        readPagingApi={customerReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={customerAccessList}
        favouriteApi={customerFavorite}
        handleClickHelp={handleClickHelp}
        addFormAccess={enums.Customer_Customer_Create_w}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Customer_Customer_Delete_w}
        editAccess={enums.Customer_Customer_Update_w}
        permissionsAccess={""}
        changePasswordAccess={enums.Customer_Customer_ChangePassword_w}
        getOneRecord={customerGetOneRecord}
        setUpdate={setUpdate}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        handleAddress={handleAddress}
        addressAccess = {enums.Customer_Customer_Create_w}
      />
    </>
  );
};

export default CustomerList;
