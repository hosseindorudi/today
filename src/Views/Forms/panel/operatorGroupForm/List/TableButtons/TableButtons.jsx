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

const TableButtons = ({ rowValue, deleteCalled, handleClickEdit }) => {
  const [response, loading, fetchData] = useAxios();
  const {app}=useContext(AppContext)
  const request = useRequest();
  const { t } = useTranslation();

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
    // let csvContent = "data:text/csv;charset=utf-8,"
    //     + rows.map(e => e.join(",")).join("\n");
    //     console.log(csvContent)
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, handleResponse]);
  return (
    <div className="widgetLgStatus">
      <button
        title="exportCSV"
        className="Approved widgetLgButton"
        onClick={handleExport}
        disabled={loading}
      >
        <fa.FaFileCsv />
      </button>
      <button
        className="Approved widgetLgButton"
        onClick={() => handleClickEdit(rowValue.Id)}
        title="edit"
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
      >
        <fa.FaTrash />
      </button>
    </div>
  );
};

export default TableButtons;
