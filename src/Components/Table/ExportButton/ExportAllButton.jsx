import { t } from 'i18next';
import React, { useEffect } from 'react'
import * as cg from "react-icons/cg";
import useAxios from '../../../customHooks/useAxios';
import useRequest from '../../../customHooks/useRequest';
// import { groupExport } from '../../../services/groupService';
import { downloadCSVCode } from '../../../validation/functions';
import { toast } from "react-toastify";
import { Button } from '@mui/material';
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
            filter: props.filterObj,
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
      const handleResponse=(response)=>{
        if(response.Content && response.Content.length>0){
          return downloadCSVCode(response.Content,response.Name)
        }
        return noFileToast()
      }
      useEffect(() => {
        response&&handleResponse(response)
          // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [response])
  return (
    <Button
    disabled={loading}
    className="exportBtn"
    title="exportCSV"
    onClick={handleExport}
  >
    <cg.CgExport />
  </Button>
  )
}

export default ExportAllButton