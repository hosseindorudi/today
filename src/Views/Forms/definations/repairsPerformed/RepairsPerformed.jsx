import "./repairsPerformed.css";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import '../../../../assets/css/table.css'
import {
  handleError,
  createSelectOptions,
  defintionInputs,
} from "../../../../validation/functions";
import * as fa from 'react-icons/fa'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import FormInput from "../../../../Components/periodity/formInput/FormInput";
import { modelReadTitle } from "../../../../services/modelService";
import {
  repairsPerformedReadTitle,
  repairsPerformedCreate,
  repairsPerformedRead,
  repairsPerformedLog,
  repairsPerformedSampleFile,
  repairsPerformedCheckFile,
  repairsPerformedImport,
  repairsPerformedExport,
  repairsPerformedSetToFavorite,
  repairsPerformedDelete,
  repairsPerformedUpdate,
  repairsPerformedDeleteRate,
  repairsPerformedReadRate,
  repairsPerformedCreateRate,
  repairsPerformedUpdateRate,
} from "../../../../services/repairsPerformed";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { CustomReactMultiSelect } from "../../../../Components/Select/customReactSelect";
import { toast } from "react-toastify";
import useButtonAccess from "../../../../customHooks/useButtonAccess";
import { enums } from "../../../../data/Enums";
import BackDrop from "../../../../Components/backDrop/BackDrop";
import LogModal from "../../../../Components/Table/LogModal/LogModal";
import ImportCSV from "../../../../Components/Table/ImportCSVButton/ImportCSV";
import ExportAllButton from "../../../../Components/Table/ExportButton/ExportAllButton";
import AppContext from "../../../../contexts/AppContext";
import useGeoLocation from "../../../../customHooks/useGeoLocation";
import AddCurrencyModal from "../../../../Components/Table/addCurrencyModal/AddCurrencyModal";
const RepairsPerformed = () => {
  const { app } = useContext(AppContext);
  const [response, loading, fetchData, setResponse] = useAxios();
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState("");
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState(undefined);
  const [perfomedGroupOptions, setPerformedGroupOptions] = useState([]);
  const [performedGroup, setPerformedGroup] = useState({});
  const [perfomedData, setPerformedData] = useState([]);
  const request = useRequest();
  const abortController = new AbortController();
  const [haveAccess] = useButtonAccess();
  const [showLogModal, setShowLogModal] = useState(false)
  const [log, setLog] = useState(null);
  const [IsFavorite, setIsFavorite] = useState(false);
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();
  const [editData, setEditData] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [feeRecord, setFeeRecord] = useState({})
  const [isFee, setIsFee] = useState(false)
  const [values, setValues] = useState({
    title: "",
    color: "#000000",
    periority: 1,
    desc: "",
  });
  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { t } = useTranslation();
  const handleResponse = () => {
    toast.success(t("item.created"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const createParams = (service) => {
    const params = {
      method: "POST",
      url: service,
      headers: {
        accept: "*/*",
      },
      data: request,
    };
    return params;
  };
  const getDatas = () => {
    const modelTitles = axios.request(createParams(modelReadTitle));
    const perfomedGroupTitles = axios.request(
      createParams(repairsPerformedReadTitle)
    );
    const getAllData = axios.request(createParams(repairsPerformedRead));
    axios
      .all([modelTitles, perfomedGroupTitles, getAllData])
      .then(
        axios.spread((...allData) => {
          allData[0].data?.Result
            ? setModelOptions(createSelectOptions(allData[0].data.Title))
            : handleError(allData[0].data.Message);
          allData[1].data?.Result
            ? setPerformedGroupOptions(
                createSelectOptions(allData[1].data.Title)
              )
            : handleError(allData[1].data.Message);
          allData[2].data?.Result
            ? setPerformedData(allData[2].data.Record)
            : handleError(allData[2].data.Message);
          setIsFavorite(allData[2].data.IsFavorite)
          setModel(undefined);
          setPerformedGroup({});
          setValues({
            title: "",
            color: "#000000",
            periority: 1,
            desc: "",
          });
        })
      )
      .catch((error) => {
        handleError(error.message);
      });
  };


  // const handleViewer = () =>{
  //   perfomedVar.map((data) => {

  //   })
  // }


  // useEffect(()=> {
  //   let perfomedVar = perfomedData;
  //   let finalData = []
    
  //   perfomedVar.map((data) => {
  //     if(data.Parent_Title === " ") {
  //       finalData.push({id:data.Id,name:data.Title, children:[]})
  //       perfomedVar.map((d) => {
  //         if(d.Parent_Title === data.Title) {
              
  //         }
  //       })
  //     }
  //   })
  // },[perfomedData])

  useEffect(() => {
    handleResponseFunc(response, "READ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponseFunc(response, type)
        : handleError(response.Message);
      setResponse(undefined);
    }
    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponseFunc = useCallback(
    (response, type) => {
      switch (type) {
        case "DELETE":
          handleDeleted();
          break;
        case "READ":
          getDatas();
          break;
        case "CREATE":
          getDatas();
          break;
          case "LOG":
            logResponse(response);
            break;
          case "FAVORITE":
            favorited();
            break;

        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const logResponse = (res) => {
    if (res.Log.length ===0)  {
      return toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLog(res.Log);
    setShowLogModal(true);
  };
  const handleClickLog = () => {
    setType("LOG");
    fetchData({
      method: "POST",
      url: repairsPerformedLog,
      headers: {
        accept: "*/*",
      },
      data: request,
      signal: abortController.signal,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData({
      method: "POST",
      url: repairsPerformedCreate,
      headers: {
        accept: "*/*",
      },
      data: {
        Request: request,
        Id: 0,
        Parent_Id: performedGroup !== {} ? performedGroup.value : 0,
        Model_Id: model?.value,
        Title: values.title,
        Priority: values.periority,
        Description: values.desc,
        Color: values.color.substring(1),
        SourceType: 0,
        Registrar: 0,
        DateSet: "2022-06-19T16:43:29.709Z",
      },
      signal: abortController.signal,
    });

    handleResponseFunc(response, "READ");
  };

  const importSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
    });}

    const favorited = () => {
      setIsFavorite(true);
      toast.success(t("favorited"), {
        position: toast.POSITION.TOP_CENTER,
      });
    };

    const handleClickFav = () => {
      setType("FAVORITE");
      fetchData({
        method: "POST",
        url: repairsPerformedSetToFavorite,
        headers: {
          accept: "*/*",
        },
        data: request,
        signal: abortController.signal,
      });
    };

    const handleClickHelp = () => {
      window.open("https://www.google.com");
    };

    const handleDeleted = () => {
      Swal.fire(
        t("sweetAlert.deleted"),
        t("sweetAlert.recordDeleted"),
        "success"
      );
  
      getDatas();
    };

    const EditeOneRecord =(data) => {
      setEditData(data)
      setIsEdit(true)
      console.log(data)
     setModel(modelOptions.filter(f => f.label === data.Model_Title))
     data.Parent_Id === 0 ? setPerformedGroup({}) :
     setPerformedGroup(perfomedGroupOptions.filter(f => f.label === data.Parent_Title))

      setValues({
        title: data.Title,
        color: `#${data.Color}`,
        periority: data.Priority,
        desc: data.Description,
      });
    }

    const deleteOneRecord = (id) => {
      Swal.fire({
        title: t("table.deleteTitle"),
        text: t("table.noReturn"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("sweetAlert.yes"),
        cancelButtonText: t("sweetAlert.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          setType("DELETE");
          fetchData({
            method: "POST",
            url: repairsPerformedDelete,
            headers: {
              accept: "*/*",
            },
  
            data: {
              Request: {
                Language: app.langCode,
                Token: accessToken ? accessToken : "",
                Latitude: location.loaded ? location.coordinates.lat : 0,
                Longitude: location.loaded ? location.coordinates.lng : 0,
              },
              Id: id,
            },
  
            signal: abortController.signal,
          });
        }
      });
    };

    const handleCancelation =() => {
      setIsEdit(false)
      setModel(undefined);
          setPerformedGroup({});
          setValues({
            title: "",
            color: "#000000",
            periority: 1,
            desc: "",
          });

    }

    const handleEditSubmit =() => {
      console.log(performedGroup)
      setType("READ")
      fetchData({
        method: "POST",
        url: repairsPerformedUpdate,
        headers: {
          accept: "*/*",
        },
        data: {
          Request: request,
          Id: editData.Id,
          Parent_Id: performedGroup !== {} ? performedGroup.value : 0,
          Model_Id: model[0]?.value,
          Title: values.title,
          Priority: values.periority,
          Description: values.desc,
          Color: values.color.substring(1),
          SourceType: 0,
          Registrar: 0,
          DateSet: "2022-06-19T16:43:29.709Z",
        },
        signal: abortController.signal,
      });
      setIsEdit(false)
      setModel(undefined);
          setPerformedGroup({});
          setValues({
            title: "",
            color: "#000000",
            periority: 1,
            desc: "",
          });
  
    }

  const handleTreeView = (data) => {
    
    
      return (<div className="treeViewRow">
        <TreeItem nodeId={String(data.Id)} label={data.Title} style={{width:"100%"}} >
                  {perfomedData.map(d => (
                    d.Parent_Id === data.Id ? handleTreeView(d)
                      
                     : null
                  )) }
                  
              </TreeItem>
              <button className="rowViewBtn" onClick={() => deleteOneRecord(data.Id)}><fa.FaTrash/></button>
              <button className="rowViewBtnEdit" onClick={() => EditeOneRecord(data)}><fa.FaRegEdit/></button>
              {data.Parent_Id === 0 && <button className="rowViewBtnFee" onClick={()=> {
                setFeeRecord(data);
                setIsFee(true)
              }}><fa.FaDollarSign/></button>}
      </div>)
  
  }

  return (
    <>
    {loading && <BackDrop open={true} />}
      {showLogModal && (
        <LogModal
          onHide={() => setShowLogModal(false)}
          logs={log}
          show={showLogModal}
        />
      )}
      {isFee && (
        <AddCurrencyModal
          onHide={() => setIsFee(false)}
          delete={repairsPerformedDeleteRate}
          id={feeRecord.Id}
          read={repairsPerformedReadRate}
          create={repairsPerformedCreateRate}
          update={repairsPerformedUpdateRate}
          show={isFee}
        />
      )}
      <div className="repairedPerformedMain">
        <div className="repairePerformUp">
          <div className="repairedPerformedRight">
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            style={{direction:"ltr"}}
            sx={{ height: "100%", flexGrow: 1, width:"100%",  overflowY: 'auto' }}
          >
            
            {perfomedData.map((data) => (
              data.Parent_Id === 0 &&

               handleTreeView(data)
              
            ))}
          </TreeView> 


          </div>
          <div className="repairedPerformedLeft">
            {console.log(perfomedData)}
            <Form
              className="periorityForm"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <b>{t("/Definition/RepairsPerformed/Write")}</b>
              <div className="repairRowPerformed">
                <Form.Group
                  className="mb-0.5 repairsPerformedItem"
                  controlId={"model"}
                >
                  <Form.Label>{t("Group")}</Form.Label>
                  <CustomReactMultiSelect
                    isMulti={false}
                    options={perfomedGroupOptions}
                    value={performedGroup}
                    onchangeHandler={(e) => setPerformedGroup(e)}
                    placeholder={t("Group")}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-.5 repairsPerformedItem"
                  controlId={"model"}
                >
                  <Form.Label>{t("model")}</Form.Label>
                  <CustomReactMultiSelect
                    isMulti={false}
                    options={modelOptions}
                    value={model}
                    onchangeHandler={(e) => setModel(e)}
                    placeholder={t("model")}
                  />
                </Form.Group>
              </div>
              {defintionInputs(
                values,
                t("/Definition/RepairsPerformed/Read"),
                t("RepairsPerformed_errorMSG")
              ).map((input) => (
                <FormInput
                  performedGroup={model}
                  isRepair={true}
                  key={input.id}
                  {...input}
                  onChange={onChangeHandler}
                />
              ))}
              {!isEdit ? <>
                <Button disabled={loading} type="submit">
                {t("submit")}
              </Button>
              </> :
                <div className="repairedFormDownDiv">
                  <Button disabled={loading} onClick={handleEditSubmit} variant="warning">
                    {t("repairedEdit")}
                  </Button>
                  <Button disabled={loading} variant="danger" onClick={handleCancelation}>
                    {t("repairedCancel")}
                  </Button>
                </div>
              }
            </Form>
          </div>
        </div>
        <div className="repairPerformDown">
        {haveAccess(enums.Definition_RepairsPerformed_Log_r) && (
            <button
              className="reactTableParentLogButton"
              title="log"
              onClick={handleClickLog}
            >
              <fa.FaHistory />
            </button>
          )}
          {haveAccess(enums.Definition_RepairsPerformed_Import_w) && (
            <ImportCSV
              importSuccess={importSuccess}
              sampleUrl={repairsPerformedSampleFile}
              fileCheckURL={repairsPerformedCheckFile}
              importURL={repairsPerformedImport}
            />
          )}
          {haveAccess(enums.Definition_RepairsPerformed_Export_r) && (
            <ExportAllButton
              repaireExp = {true}
              exportLink={repairsPerformedExport}
            />
          )}
          <button
            disabled={IsFavorite}
            title="favorite"
            className={`reactTableParentFavoritButton ${
              IsFavorite ? "favactive" : ""
            }`}
            onClick={handleClickFav}
          >
            <fa.FaRegStar />
          </button>
          <button
            className="reactTableParentHelpButton"
            onClick={handleClickHelp}
            title="help"
          >
            <fa.FaQuestionCircle />
          </button>
        </div>
      </div>
    </>
  );
};

export default RepairsPerformed;
