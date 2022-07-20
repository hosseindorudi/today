import { t } from 'i18next';
import React, { useEffect } from 'react'
import * as cg from "react-icons/cg";
import useAxios from '../../../customHooks/useAxios';
import useRequest from '../../../customHooks/useRequest';
// import { groupExport } from '../../../services/groupService';
import { downloadCSVCode, setDatePickerDate } from '../../../validation/functions';
import { toast } from "react-toastify";
const ExportAllButton = (props) => {
    const [response, loading, fetchData] = useAxios();
    const request=useRequest()
    const abortController = new AbortController();
    const handleExport = () => {
      if (props.repaireExp) {
      fetchData({
        method: "POST",
        url: props.exportLink,
        headers:request,
      
        signal: abortController.signal,
      })


    }else {
      const paging = {
        NumberOfRecordsPerPage: props.numberOfRecordsPerPage,
        CurrentPage: props.currentPage,
        IsAscending: props.sort.IsAscending,
        SortBy: props.sort.SortBy,
      };
        fetchData({
          method: "POST",
          url: props.exportLink,
          headers: request,
          data:{
            
            paging: paging,
            filter: {
              flt_Title: props.flt_Title,
              flt_FromDate: props.seartBegin ? setDatePickerDate(props.seartBegin) : null,
              flt_ToDate: props.seartEnd ? setDatePickerDate(props.seartEnd) : null,
            },
          },
          signal: abortController.signal,
        });
      }
      };

      const noFileToast = () => {
    
        toast.info(t("noDataFound.table"), {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      const handleDownload=(res)=>{
       
            downloadCSVCode(res,t("exportCSV"))
      }
      const handleResponse=(response)=>{
        if(response.length){
          return handleDownload(response)
        }
        return noFileToast()
      }
      useEffect(() => {
        response&&handleResponse(response)
        // response?.length? handleDownload(response) : noFileToast()
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response])
  return (
    <button
    disabled={loading}
    className="reactTableParentExportButton"
    title="exportCSV"
    onClick={handleExport}
  >
    <cg.CgExport />
  </button>
  )
}

export default ExportAllButton