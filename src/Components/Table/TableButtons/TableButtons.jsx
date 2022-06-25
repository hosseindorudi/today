import React, { useCallback, useContext, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AppContext from "../../../contexts/AppContext";
import { downloadCSVCode } from "../../../validation/functions";
import useButtonAccess from "../../../customHooks/useButtonAccess";

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
  handlePassEdit
 
}) => {
  const [response, loading, fetchData, setResponse] = useAxios();
  const { app } = useContext(AppContext);
  const request = useRequest();
  const { t } = useTranslation();
  const [haveAccess] = useButtonAccess();
  const handleResponse = useCallback((res) => {
    if (res.length) {
      return downloadCSVCode(res, app.title);
    } else {
      toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [app.title,t]);

  const handleExport = () => {
    fetchData({
      method: "POST",
      url: exportLink,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: rowValue.Id,
      },
    });
  };

  useEffect(() => {
    if (response) {
      handleResponse(response);
      setResponse(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
  return (
    <div className="widgetLgStatus">
      {haveAccess(exportType) && (
        <button
          title="exportCSV"
          className="Approved widgetLgButton"
          onClick={handleExport}
          disabled={loading}
        >
          <fa.FaFileCsv />
        </button>
      )}
      {haveAccess(editType) && (
        <button
          className="Approved widgetLgButton"
          onClick={() => handleClickEdit(rowValue.Id)}
          title="edit"
        >
          <fa.FaEdit />
        </button>
      )}
      {haveAccess(changePasswordType)&&(
        <button className="Pending widgetLgButton" onClick={()=>handlePassEdit(rowValue.Id)}>
        <fa.FaLock />
      </button>
      )}
      {haveAccess(accessListType) && (
        <button className="Pending widgetLgButton" onClick={()=>handleClickGetPermission(rowValue.Id)}>
          <fa.FaKey />
        </button>
      )}
      {haveAccess(deleteType) && (
        <button
          title="delete"
          className="Declined widgetLgButton"
          onClick={() => {
            deleteCalled(rowValue.Id);
          }}
        >
          <fa.FaTrash />
        </button>
      )}
    </div>
  );
};

export default TableButtons;
