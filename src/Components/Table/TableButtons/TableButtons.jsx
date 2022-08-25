import React, { useCallback, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import * as gr from "react-icons/gr";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { downloadCSVCode } from "../../../validation/functions";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const TableButtons = ({
  rowValue,
  exportLink,
  deleteCalled,
  handleClickEdit,
  deleteType,
  editType,
  exportType,
  accessListType,
  handleClickGetPermission,
  changePasswordType,
  handlePassEdit,
  handleAddQuestion,
  addAccess,
  handleCreateRate,
  rateAccess,
  handleReadAnswers,
  readAnswersAccess,
  handlePolicyBrowser,
  policyBrowserAccess,
  operatorRoleAccess,
  handleOperatorRole,
  policyOsAccess,
  handlePolicyOs,
  policyLocationAccess,
  handlePolicyLocation,
  policyIpAccess,
  handlePolicyIP,
  handleAddress,
  addressAccess,
  addOperatorAccess,
  addOperator,
  handlePhone,
  phoneAccess,
  handleMobile,
  mobileAccess,
  handleAccount,
  accountAccess,
  sendMessageBankAccess,
  sendMessageBank,
  handleuploadFile,
  handleClickQrCode,
  downloadQRAccess,
  addModelAccess
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [response, loading, fetchData] = useAxios();
  const request = useRequest();
  const { t } = useTranslation();
  const [haveAccess] = useButtonAccess();
  const handleResponse = useCallback(
    (res) => {
      if (res.Content && res.Content.length > 0) {
        return downloadCSVCode(res.Content, res.Name);
      }
      return noFileToast();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const noFileToast = () => {
    toast.info(t("noDataFound.table"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleExport = () => {
    fetchData({
      method: "POST",
      url: exportLink,
      headers: request,
      data: {
        Id: rowValue.Id,
      },
    });
  };

  useEffect(() => {
    response && handleResponse(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
  const actions = [
    {
      icon: <fa.FaEdit color="orange" />,
      name: "edit",
      click: () => handleClickEdit(rowValue.Id),
      access: editType,
    },
    {
      icon: <fa.FaTrash color="red" />,
      name: "Delete",
      click: () => deleteCalled(rowValue.Id),
      access: deleteType,
    },
    {
      icon: <fa.FaFileCsv color="green" />,
      name: "exportCSV",
      click: () => handleExport(),
      access: exportType,
    },
    {
      icon: <fa.FaLock color="brown"/>,
      name: "ChangePassword",
      click: () => handlePassEdit(rowValue.Id),
      access: changePasswordType,
    },
    {
      icon: <fa.FaPlusCircle color="darkblue"/>,
      name: "Add-Question",
      click: () => handleAddQuestion(rowValue.Id),
      access: addAccess,
    },
    {
      icon: <fa.FaDollarSign  color="brown"/>,
      name: "createRate",
      click: () => handleCreateRate(rowValue.Id),
      access: rateAccess,
    },
    {
      icon: <fa.FaBookReader  color="brown"/>,
      name: "readAnswer",
      click: () => handleReadAnswers(rowValue.Id),
      access: readAnswersAccess,
    },
    {
      icon: <fa.FaFirefoxBrowser  color="brown"/>,
      name: "policyBrowser",
      click: () => handlePolicyBrowser(rowValue.Id),
      access: policyBrowserAccess,
    },
    {
      icon: <fa.FaInternetExplorer  color="brown"/>,
      name: "policyIpAccess",
      click: () => handlePolicyIP(rowValue.Id),
      access: policyIpAccess,
    },
    {
      icon: <gr.GrMapLocation  color="brown"/>,
      name: "policyLocationAccess",
      click: () => handlePolicyLocation(rowValue.Id),
      access: policyLocationAccess,
    },
    {
      icon: <fa.FaWindows  color="brown"/>,
      name: "policyOsAccess",
      click: () => handlePolicyOs(rowValue.Id),
      access: policyOsAccess,
    },
    {
      icon: <gr.GrUserSettings  color="brown"/>,
      name: "OperatorRole",
      click: () => handleOperatorRole(rowValue.Id),
      access: operatorRoleAccess,
    },
    {
      icon: <fa.FaMap  color="blue"/>,
      name: "addAddress",
      click: () => handleAddress(rowValue.Id),
      access: addressAccess,
    },
    {
      icon: <fa.FaFileUpload color="green"/>,
      name: "addFile",
      click: () => handleuploadFile(rowValue.Id),
      access: addressAccess,
    },
    {
      icon: <fa.FaMobileAlt color="teal"/>,
      name: "Mobile",
      click: () => handleMobile(rowValue.Id),
      access: mobileAccess,
    },
    {
      icon: <fa.FaPhoneAlt color="teal"/>,
      name: "Phone",
      click: () => handlePhone(rowValue.Id),
      access: phoneAccess,
    },
    {
      icon: <fa.FaMoneyCheckAlt color="steelblue"/>,
      name: "bankAccount",
      click: () => handleAccount(rowValue.Id),
      access: accountAccess,
    },
    {
      icon: <fa.FaUserPlus color="steelblue"/>,
      name: "addOperator",
      click: () => addOperator(rowValue.Id),
      access: addOperatorAccess,
    },
    {
      icon: <fa.FaUserPlus color="steelblue"/>,
      name: "sendMessageBank",
      click: () => sendMessageBank(rowValue),
      access: sendMessageBankAccess,
    },
    {
      icon: <fa.FaKey color="red"/>,
      name: "Permission",
      click: () => handleClickGetPermission(rowValue.Id),
      access: accessListType,
    },
    {
      icon: <fa.FaQrcode color="silver"/>,
      name: "QrCodeDownload",
      click: () => handleClickQrCode(rowValue),
      access: downloadQRAccess,
    },
    {
      icon: <fa.FaPlusCircle color="silver"/>,
      name: "addModelItem",
      click: () => console.log(rowValue),
      access: addModelAccess,
    },
  ];
  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>
      <Menu
        className="menuTable"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map(
          (menu, index) =>
            haveAccess(menu.access) && (
              <MenuItem
                key={index}
                onClick={() => {
                  menu.click();
                  handleClose();
                }}
                disabled={loading}
              >
                {menu.icon}
                {t(menu.name)}
              </MenuItem>
            )
        )}
      </Menu>
    </div>
  );
};

export default TableButtons;
