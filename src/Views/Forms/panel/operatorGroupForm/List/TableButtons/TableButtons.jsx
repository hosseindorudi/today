import React, { useCallback, useContext, useEffect } from "react";
import "./tableButtons.css";
import * as fa from "react-icons/fa";
import {  groupExportId } from "../../../../../../services/groupService";
import useAxios from "../../../../../../customHooks/useAxios";
import useRequest from "../../../../../../customHooks/useRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import AppContext from "../../../../../../contexts/AppContext";
import { downloadCSVCode } from "../../../../../../validation/functions";
import useButtonAccess from "../../../../../../customHooks/useButtonAccess";

const TableButtons = ({ rowValue, deleteCalled, handleClickEdit,deleteType,editType,exportType }) => {
  const [response, loading, fetchData,setResponse] = useAxios();
  const {app}=useContext(AppContext)
  const request = useRequest();
  const { t } = useTranslation();
  const [isDisabled]=useButtonAccess()
  const handleResponse = useCallback((res) => {
    if (res.length) {
    return downloadCSVCode(res,app.title)
    } else {
      toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, []);

  const handleExport = () => {
    fetchData({
      method: "POST",
      url: groupExportId,
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
      setResponse(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
  return (
    <div className="widgetLgStatus">
      <button
        title="exportCSV"
        className="Approved widgetLgButton"
        onClick={handleExport}
        disabled={loading || isDisabled(exportType)}
      >
        <fa.FaFileCsv />
      </button>
      <button
        className="Approved widgetLgButton"
        onClick={() => handleClickEdit(rowValue.Id)}
        title="edit"
        disabled={isDisabled(editType)}
      >
        <fa.FaEdit />
      </button>
      <button className="Pending widgetLgButton">
        <fa.FaKey />
      </button>
      <button
      title="delete"
        className="Declined widgetLgButton"
        onClick={() => {
          deleteCalled(rowValue.Id);
        }}
        disabled={isDisabled(deleteType)}
      >
        <fa.FaTrash />
      </button>
    </div>
  );
};

export default TableButtons;
