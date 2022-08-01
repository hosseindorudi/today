import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import CustomTable from '../../../../Components/Table/Table/CustomTable';
import useWindowSize from '../../../../customHooks/useWindowSize';
import { enums } from '../../../../data/Enums';
import {
    onlineCustomerRead,
    onlineCustomerReadPaging,
    onlineCustomerFavorite,
    onlineCustomerExportId,
    onlineCustomerExport,
    onlineCustomerLog,
    onlineCustomerSetUnselectedColumn,
    onlineCustomerAccessList,
  } from "../../../../services/onlineCustomerService";
const Online = () => {
    const childRef = useRef();
    const filteredColumns = [
      "IsLimited",
      "Id",
      "Registrar",
      "Group_Id",
      "Language_EId",
      "SourceType",
      "Operator_Id",
    ];
    const [mobileModal, setMobileModal] = useState(false);
    const [mobileModalButtons, setMobileModalButtons] = useState(false);
    const [mobileModalColumns, setMobileModalColumns] = useState(false);
    const widthOFScreen = useWindowSize().width;
    const {t} = useTranslation()
    const BcItems = [t("/Customer/Customer/Read"), t("/Customer/OnlineCustomer/Read")];
  
    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };
  
    return (
      <>
        <CustomTable
          ref={childRef}
          BcItems={BcItems}
          ReadApi={onlineCustomerRead}
          deleteApi={""}
          unSelectedAPI={onlineCustomerSetUnselectedColumn}
          sampleUrl={""}
          fileCheckURL={""}
          importURL={""}
          logApi={onlineCustomerLog}
          exportId={onlineCustomerExportId}
          changePasswordURL={""}
          addObject={""}
          exportAccess={enums.Customer_OnlineCustomer_Export_r}
          exportLink={onlineCustomerExport}
          importAccess={""}
          logAccess={enums.Customer_OnlineCustomer_Log_r}
          readPagingApi={onlineCustomerReadPaging}
          accessListAccess={enums.Customer_OnlineCustomer_Read_r}
          accessListApi={onlineCustomerAccessList}
          favouriteApi={onlineCustomerFavorite}
          handleClickHelp={handleClickHelp}
          addFormAccess={""}
          filteredColumns={filteredColumns}
          deleteAccess={""}
          editAccess={""}
          permissionsAccess={""}
          changePasswordAccess={""}
          getOneRecord={""}
          setUpdate={""}
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
}

export default Online