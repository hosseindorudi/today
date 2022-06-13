import { t } from "i18next";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useCSVReader,usePapaParse  } from "react-papaparse";

import { toast } from "react-toastify";
import useAxios from "../../../customHooks/useAxios";
import useRequest from "../../../customHooks/useRequest";
import { groupCheckFile, groupImportFile, groupSampleFile } from "../../../services/groupService";
import { downloadCSVCode } from "../../../validation/functions";
import "./importModal.css";

const ImportCSVModal = (props) => {
  const { CSVReader } = useCSVReader();
  const { readString } = usePapaParse();
//   const { CSVDownloader, Type } = useCSVDownloader();
  const [response, loading, fetchData] = useAxios();
  const [requestType, setRequestType] = useState("");
  const [data, setData] = useState(null)
  const [importData, setImportData] = useState(null)
  const request = useRequest();

  const handleClickSample = () => {
    setRequestType("SAMPLE");
    fetchData({
      method: "POST",
      url: groupSampleFile,
      headers: {
        accept: "*/*",
      },
      data: request,
    });
  };
  const noFileToast = () => {
    toast.info(t("noDataFound.table"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  
  const handleUploadCheck=()=>{
    var commaSeprated = data.join(', ')
    setRequestType("CHECK");
    fetchData({
      method: "POST",
      url: groupCheckFile,
      headers: {
        accept: "*/*",
      },
      data: {
      Request:request,
      File:commaSeprated
    },
    });
  }
  const makeCSV=(result)=>{
    let val=result.join(", ")
    console.log(result,val)
    // downloadCSVCode(val,"s")
    //     console.log(val)
  }
  const handleSampleDownload=(res)=>{
    const config = {
        worker: true,
        complete: (results) => {
            makeCSV(results.data)
        },
      };
      readString(res,config);
    };
  const handleResponse = useCallback((res,type) => {
    switch (type) {
      case "SAMPLE":
      
        res.length ? handleSampleDownload(res) : noFileToast();
        break;
        case "CHECK":
        console.log(res)
        break;
        case "IMPORT":
            console.log(res)
            break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const handleUploadImport=()=>{
    var commaSeprated = importData.join(', ')
    setRequestType("IMPORT");
    fetchData({
      method: "POST",
      url: groupImportFile,
      headers: {
        accept: "*/*",
      },
      data: {
      Request:request,
      File:commaSeprated
    },
    });
  }

  useEffect(() => {
   
    if (response) {
       
      handleResponse(response,requestType);
    }
  }, [response]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("importFile")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="sampleFileModal">
          <h4>{t("modalImport.sampleFile")}</h4>
          <div className="smapleFileDownload">
            <p>{t("modalImport.clickForDownload")}</p>
            <Button
              variant="info"
              disabled={loading}
              onClick={handleClickSample}
            >
              {t("download")}
            </Button>
          </div>
        </div>
        <div className="checkFile">
          <h4>{t("modalImport.checkFile")}</h4>
          <div className="checkFileButtons">
            <p>{t("modalImport.checkFileUpload")}</p>
            <div className="uploadButtonAndFile">
              <CSVReader
                onUploadAccepted={(results) => {
                 setData(results.data)
                }}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps,
                }) => (
                  <>
                    <div className="csvReader">
                      <button
                        type="button"
                        {...getRootProps()}
                        className="browseFile"
                      >
                        Browse file
                      </button>
                      <div >
                        {acceptedFile && acceptedFile.name}
                      </div>
                      {/* <button {...getRemoveFileProps()} className='remove'>
                        Remove
                      </button> */}
                    </div>
                    {/* <ProgressBar  className='progressBarBackgroundColor'/> */}
                  </>
                )}
              </CSVReader>
              <Button variant="info"disabled={!data?true:false} onClick={handleUploadCheck}>{t("upload")}</Button>
            </div>
          </div>
        </div>
        <div className="import">
        <h4>{t("import")}</h4>
        <div className="checkFileButtons">
            <p>{t("modalImport.importCSV")}</p>
            <div className="uploadButtonAndFile">
              <CSVReader
                onUploadAccepted={(results) => {
                 setImportData(results.data)
                }}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps,
                }) => (
                  <>
                    <div className="csvReader">
                      <button
                        type="button"
                        {...getRootProps()}
                        className="browseFile"
                      >
                        Browse file
                      </button>
                      <div >
                        {acceptedFile && acceptedFile.name}
                      </div>
                      {/* <button {...getRemoveFileProps()} className='remove'>
                        Remove
                      </button> */}
                    </div>
                    {/* <ProgressBar  className='progressBarBackgroundColor'/> */}
                  </>
                )}
              </CSVReader>
              <Button variant="info" disabled={!importData?true:false} onClick={handleUploadImport}>{t("upload")}</Button>
            </div>
            </div>
          
        </div>
      </Modal.Body>
      <Modal.Footer>
      {/* <CSVDownloader
      type={Type.Button}
      filename={'filename'}
      bom={true}
      config={{
        delimiter: ';',
      }}
      data={}
    >
      Download
    </CSVDownloader> */}
        <Button onClick={()=>props.onHide()}>{t("cancel")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportCSVModal;
