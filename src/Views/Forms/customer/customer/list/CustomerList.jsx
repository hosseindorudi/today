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
  CustomerColumnInfo,
  customerDelete,
  customerExport,
  customerExportId,
  customerFavorite,
  customerGetOneRecord,
  CustomerImportArray,
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
import CustomerMobileModal from "../../../../../Components/Table/customerMobileModal/CustomerMobileModal";
import CustomerPhoneModal from "../../../../../Components/Table/customerPhoneModal/CustomePhoneModal";
import CustomerAccountModal from "../../../../../Components/Table/customerAccountModal/CustomerAccountModal";
import CustomerFileUploadModal from "../../../../../Components/Table/customerFileUploadModal/CustomerFileUploadModal";
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
    "SafeMode",
    "CustomerStatus_Id"
  ];
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState({});
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const [isAddress, setIsAddress] = useState(false)
  const [isFileUpload, setIsFileUpload] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPhone, setIsPhone] = useState(false)
  const [isAccount, setIsAccount] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("/Customer/Customer/Read"), t("/Customer/Customer/Read")];
  const filterArr = ["Flt_CustomerName_string"]
  const [filterVal, setFilterVal] =useState({
    Flt_CustomerName:"",
  })
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
  const handleuploadFile = (id) => {
    setRowValues(id);
    setIsFileUpload(true)

  };
  const handlePhone = (id) => {
    setRowValues(id);
    setIsPhone(true);
  };
  const handleMobile = (id) => {
    setRowValues(id);
    setIsMobile(true);
  };
  const handleAccount = (id) => {
    setRowValues(id);
    setIsAccount(true);
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
    {isFileUpload &&(
      <CustomerFileUploadModal  rowValues={rowValues}
      onHide={() => setIsFileUpload(false)}
      show={isFileUpload}/>
    )}
    {isAddress && (
        <CustomerAddressModal
          rowValues={rowValues}
          onHide={() => setIsAddress(false)}
          show={isAddress}
        />
      )}
       {isMobile && (
        <CustomerMobileModal
          rowValues={rowValues}
          onHide={() => setIsMobile(false)}
          show={isMobile}
        />
      )}
       {isPhone && (
        <CustomerPhoneModal
          rowValues={rowValues}
          onHide={() => setIsPhone(false)}
          show={isPhone}
        />
      )}
       {isAccount && (
        <CustomerAccountModal
          rowValues={rowValues}
          onHide={() => setIsAccount(false)}
          show={isAccount}
        />
      )}

      <CustomTable
        columnInfo={CustomerColumnInfo}
        importarray={CustomerImportArray}
        ref={childRef}
        BcItems={BcItems}
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
        handlePhone={handlePhone}
        phoneAccess = {enums.Customer_Customer_Create_w}
        handleMobile={handleMobile}
        mobileAccess = {enums.Customer_Customer_Create_w}
        handleAccount={handleAccount}
        accountAccess = {enums.Customer_Customer_Create_w}
        handleuploadFile={handleuploadFile}
        filterArr={filterArr}
        setFilterVal={setFilterVal}
        filterVal={filterVal}
      />
    </>
  );
};

export default CustomerList;
