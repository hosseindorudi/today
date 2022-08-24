import "./repairsPerformed.css";
import useAxios from "../../../../customHooks/useAxios";
import useRequest from "../../../../customHooks/useRequest";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useCallback, useRef } from "react";
import Swal from "sweetalert2";
import {
  handleError,
  createSelectOptions,
  defintionInputs,
  createSelectRepairedOptions,
} from "../../../../validation/functions";
import * as fa from "react-icons/fa";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import FormInput from "../../../../Components/periodity/formInput/FormInput";
import { modelReadTitle } from "../../../../services/modelService";
import {
  RepairsPerformedReadTitle,
  RepairsPerformedCreate,
  RepairsPerformedRead,
  RepairsPerformedLog,
  RepairsPerformedSampleFile,
  RepairsPerformedCheckFile,
  RepairsPerformedImport,
  RepairsPerformedExport,
  RepairsPerformedSetToFavorite,
  RepairsPerformedDelete,
  RepairsPerformedUpdate,
  RepairsPerformedDeleteRate,
  RepairsPerformedReadRate,
  RepairsPerformedCreateRate,
  RepairsPerformedUpdateRate,
  RepairsPerformedColumnInfo,
  RepairsPerformedImportArray,
  RepairsPerformedReadPaging,
  RepairsPerformedGetOneRecord,
  RepairsPerformedSetUnselectedColumn,
  RepairsPerformedExportId,
  RepairsPerformedAccessList
} from "../../../../services/repairsPerformed";
import { t } from "i18next";

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
import AddCurrencyModal from "../../../../Components/Table/addCurrencyModal/AddCurrencyModal";
import { ResultCodeEnum } from "../../../../data/ResultCodeEnum";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import CustomTable from "../../../../Components/Table/Table/CustomTable";
import useWindowSize from "../../../../customHooks/useWindowSize";
const RepairsPerformed = () => {
  // const [response, loading, fetchData] = useAxios();
  // const [validated, setValidated] = useState(false);
  // const [type, setType] = useState("");
  // const [modelOptions, setModelOptions] = useState([]);
  // const [model, setModel] = useState(null);
  // const [perfomedGroupOptions, setPerformedGroupOptions] = useState([]);
  // const [performedGroup, setPerformedGroup] = useState({});
  // const [perfomedData, setPerformedData] = useState([]);
  // const request = useRequest();
  // const abortController = new AbortController();
  // const [haveAccess] = useButtonAccess();
  // const [showLogModal, setShowLogModal] = useState(false);
  // const [log, setLog] = useState(null);
  // const [IsFavorite, setIsFavorite] = useState(false);
  // const [editData, setEditData] = useState({});
  // const [isEdit, setIsEdit] = useState(false);
  // const [feeRecord, setFeeRecord] = useState({});
  // const [isFee, setIsFee] = useState(false);
  // const [values, setValues] = useState({
  //   title: "",
  //   color: "#000000",
  //   periority: 1,
  //   desc: "",
  // });
  // const onChangeHandler = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };
  // const { t } = useTranslation();
  // const [isOpen, setisOpen] = useState(false);
  // const createParams = (service) => {
  //   const params = {
  //     method: "POST",
  //     url: service,
  //     headers: request,
  //   };
  //   return params;
  // };
  // const getDatas = () => {
  //   setisOpen(false);
  //   const modelTitles = axios.request(createParams(modelReadTitle));
  //   const perfomedGroupTitles = axios.request(
  //     createParams(repairsPerformedReadTitle)
  //   );
  //   const getAllData = axios.request(createParams(repairsPerformedRead));
  //   axios
  //     .all([modelTitles, perfomedGroupTitles, getAllData])
  //     .then(
  //       axios.spread((...allData) => {
  //         allData[0].data?.Result === ResultCodeEnum.Ok
  //           ? setModelOptions(createSelectOptions(allData[0].data.Title))
  //           : handleError(allData[0].data.Message);
  //         allData[1].data?.Result === ResultCodeEnum.Ok
  //           ? setPerformedGroupOptions(
  //               createSelectRepairedOptions(allData[1].data.Title)
  //             )
  //           : handleError(allData[1].data.Message);
  //         allData[2].data?.Result === ResultCodeEnum.Ok
  //           ? setPerformedData(allData[2].data.Record)
  //           : handleError(allData[2].data.Message);
  //         setIsFavorite(allData[2].data.IsFavorite);
  //         setModel(null);
  //         setPerformedGroup({});
  //         setValues({
  //           title: "",
  //           color: "#000000",
  //           periority: 1,
  //           desc: "",
  //         });
  //       })
  //     )
  //     .catch((error) => {
  //       handleError(error.message);
  //     });
  // };



  // useEffect(() => {
  //   setType("READ");
  //   handleResponse(response, "READ");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // useEffect(() => {
  //   response && handleResponse(response, type);
  //   return () => abortController.abort();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [response]);

  // const handleResponse = useCallback(
  //   (response, type) => {
  //     switch (type) {
  //       case "READ":
  //         getDatas();
  //         break;
  //       case "CREATE":
  //         getDatas();
  //         break;
  //       case "LOG":
  //         logResponse(response);
  //         break;
  //       case "FAVORITE":
  //         favorited();
  //         break;
  //       case "DELETE":
  //         handleDeleted();
  //         break;
  //       default:
  //         break;
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  // const logResponse = (res) => {
  //   if (res.Log.length === 0) {
  //     return toast.info(t("noDataFound.table"), {
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   }
  //   setLog(res.Log);
  //   setShowLogModal(true);
  // };
  // const handleClickLog = () => {
  //   setType("LOG");
  //   fetchData({
  //     method: "POST",
  //     url: repairsPerformedLog,
  //     headers: request,

  //     signal: abortController.signal,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (!form.checkValidity()) {
  //     e.stopPropagation();
  //   }
  //   setValidated(true);
  //   if (form.checkValidity()) {
  //     setType("CREATE");
  //     fetchData({
  //       method: "POST",
  //       url: repairsPerformedCreate,
  //       headers: request,
  //       data: {
  //         Id: 0,
  //         Parent_Id: performedGroup !== {} ? performedGroup.value : 0,
  //         Model_Id: model?.value,
  //         Title: values.title,
  //         Priority: values.periority,
  //         Description: values.desc,
  //         Color: values.color.substring(1),
  //         SourceType: 0,
  //         Registrar: 0,
  //         DateSet: "2022-06-19T16:43:29.709Z",
  //       },
  //       signal: abortController.signal,
  //     });

  //     // handleResponse(response, "CREATE");
  //   }
  // };

  // const importSuccess = (message) => {
  //   toast.success(message, {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  // const favorited = () => {
  //   setIsFavorite(true);
  //   toast.success(t("favorited"), {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  // const handleClickFav = () => {
  //   setType("FAVORITE");
  //   fetchData({
  //     method: "POST",
  //     url: repairsPerformedSetToFavorite,
  //     headers: request,
  //     signal: abortController.signal,
  //   });
  // };

  // const handleClickHelp = () => {
  //   window.open("https://www.google.com");
  // };

  // const handleDeleted = () => {
  //   Swal.fire(
  //     t("sweetAlert.deleted"),
  //     t("sweetAlert.recordDeleted"),
  //     "success"
  //   );
  //   setIsEdit(false);
  //   getDatas();
  // };

  // const EditeOneRecord = (data) => {
  //   setEditData(data);
  //   console.log("asdasda", performedGroup);

  //   setIsEdit(true);
  //   console.log(data);
  //   setModel(modelOptions.filter((f) => f.value === data.Model_Id));
  //   let g = perfomedGroupOptions.filter((f) => f.value === data.Id);
  //   g[0].label = data.Parent_Title;
  //   data.Parent_Id === 0 ? setPerformedGroup({}) : setPerformedGroup(g[0]);
  //   console.log(perfomedGroupOptions);

  //   console.log(g);
  //   setValues({
  //     title: data.Title,
  //     color: `#${data.Color}`,
  //     periority: data.Priority,
  //     desc: data.Description,
  //   });
  // };

  // const deleteOneRecord = (id) => {
  //   Swal.fire({
  //     title: t("table.deleteTitle"),
  //     text: t("table.noReturn"),
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: t("sweetAlert.yes"),
  //     cancelButtonText: t("sweetAlert.cancel"),
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setType("DELETE");
  //       fetchData({
  //         method: "POST",
  //         url: repairsPerformedDelete,
  //         headers: request,
  //         data: {
  //           Id: id,
  //         },
  //         signal: abortController.signal,
  //       });
  //     }
  //   });
  // };

  // const handleCancelation = () => {
  //   setIsEdit(false);
  //   setisOpen(false);
  //   setModel(null);
  //   setPerformedGroup({});
  //   setValues({
  //     title: "",
  //     color: "#000000",
  //     periority: 1,
  //     desc: "",
  //   });
  // };

  // const handleEditSubmit = () => {
  //   console.log(model);
  //   setType("READ");
  //   fetchData({
  //     method: "POST",
  //     url: repairsPerformedUpdate,
  //     headers: request,
  //     data: {
  //       Id: editData.Id,
  //       Parent_Id: performedGroup?.value,
  //       Model_Id: model.value
  //         ? model.value
  //         : model[0].value
  //         ? model[0].value
  //         : null,
  //       Title: values.title,
  //       Priority: values.periority,
  //       Description: values.desc,
  //       Color: values.color.substring(1),
  //       SourceType: 0,
  //       Registrar: 0,
  //       DateSet: "2022-06-19T16:43:29.709Z",
  //     },
  //     signal: abortController.signal,
  //   });
  //   setIsEdit(false);
  //   setModel(null);
  //   setPerformedGroup({});
  //   setValues({
  //     title: "",
  //     color: "#000000",
  //     periority: 1,
  //     desc: "",
  //   });
  //   setisOpen(false);
  // };

  // const handleTreeView = (data) => {
  //   return (
  //     <div className="treeViewRow">
  //       <TreeItem
  //         nodeId={String(data.Id)}
  //         label={data.Title}
  //         style={{ width: "100%" }}
  //       >
  //         {perfomedData.map((d) =>
  //           d.Parent_Id === data.Id ? handleTreeView(d) : null
  //         )}
  //       </TreeItem>
  //       <button className="rowViewBtn" onClick={() => deleteOneRecord(data.Id)}>
  //         <fa.FaTrash />
  //       </button>
  //       <button
  //         className="rowViewBtnEdit"
  //         onClick={() => {
  //           setisOpen(true);
  //           EditeOneRecord(data);
  //         }}
  //       >
  //         <fa.FaRegEdit />
  //       </button>
  //       {data.Parent_Id === 0 && (
  //         <button
  //           className="rowViewBtnFee"
  //           onClick={() => {
  //             setFeeRecord(data);
  //             setIsFee(true);
  //           }}
  //         >
  //           <fa.FaDollarSign />
  //         </button>
  //       )}
  //     </div>
  //   );
  // };

  // return (
  //   <>
  //     {loading && <BackDrop open={true} />}
  //     {showLogModal && (
  //       <LogModal
  //         onHide={() => setShowLogModal(false)}
  //         logs={log}
  //         show={showLogModal}
  //       />
  //     )}
  //     {isFee && (
  //       <AddCurrencyModal
  //         onHide={() => setIsFee(false)}
  //         delete={repairsPerformedDeleteRate}
  //         id={feeRecord.Id}
  //         read={repairsPerformedReadRate}
  //         create={repairsPerformedCreateRate}
  //         update={repairsPerformedUpdateRate}
  //         show={isFee}
  //       />
  //     )}

  //     <div className="repairedPerformedMain">
  //       <Box
  //         flexDirection={{
  //           lg: "row-reverse",
  //           md: "row-reverse",
  //           sm: "column",
  //           xs: "column",
  //         }}
  //         display="flex"
  //         flex="95%"
  //         width="100%"
  //       >
  //         <Accordion
  //           expanded={isOpen}
  //           sx={{
  //             width: "100%",
  //             display: {
  //               lg: "none",
  //               md: "none",
  //               sm: "flex",
  //               xs: "flex",
  //             },
  //             flexDirection: "column",
  //           }}
  //         >
  //           <AccordionSummary
  //             sx={{ width: "100%" }}
  //             onClick={() => setisOpen(!isOpen)}
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls="panel1a-content"
  //             id="panel1a-header"
  //           >
  //             <Typography>ساخت مورد جدید</Typography>
  //           </AccordionSummary>
  //           <AccordionDetails>
  //             <div className="repairedPerformedLeft">
  //               <Form
  //                 className="periorityForm"
  //                 noValidate
  //                 // validated={validated}
  //                 onSubmit={handleSubmit}
  //               >
  //                 <b>{t("/Definition/RepairsPerformed/Write")}</b>
  //                 <div className="repairRowPerformed">
  //                   <Form.Group
  //                     className="mb-0.5 repairsPerformedItem"
  //                     controlId={"model"}
  //                   >
  //                     <Form.Label>{t("Group")}</Form.Label>
  //                     <CustomReactMultiSelect
  //                       isMulti={false}
  //                       options={perfomedGroupOptions}
  //                       value={performedGroup}
  //                       onchangeHandler={(e) => setPerformedGroup(e)}
  //                       placeholder={t("Group")}
  //                     />
  //                   </Form.Group>
  //                   <Form.Group
  //                     className="mb-.5 repairsPerformedItem"
  //                     controlId={"model"}
  //                   >
  //                     <Form.Label>{t("model")}</Form.Label>
  //                     <CustomReactMultiSelect
  //                       isMulti={false}
  //                       options={modelOptions}
  //                       value={model}
  //                       onchangeHandler={(e) => setModel(e)}
  //                       placeholder={t("model")}
  //                     />
  //                   </Form.Group>
  //                 </div>
  //                 {defintionInputs(
  //                   values,
  //                   t("Title"),
  //                   t("RepairsPerformed_errorMSG"),
  //                   true
  //                 ).map((input) => (
  //                   <FormInput
  //                     performedGroup={model}
  //                     isRepair={true}
  //                     key={input.id}
  //                     {...input}
  //                     onChange={onChangeHandler}
  //                   />
  //                 ))}
  //                 {!isEdit ? (
  //                   <>
  //                     <Button disabled={loading} type="submit">
  //                       {t("submit")}
  //                     </Button>
  //                   </>
  //                 ) : (
  //                   <div className="repairedFormDownDiv">
  //                     <Button
  //                       disabled={loading}
  //                       onClick={handleEditSubmit}
  //                       variant="warning"
  //                     >
  //                       {t("repairedEdit")}
  //                     </Button>
  //                     <Button
  //                       disabled={loading}
  //                       variant="danger"
  //                       onClick={handleCancelation}
  //                     >
  //                       {t("repairedCancel")}
  //                     </Button>
  //                   </div>
  //                 )}
  //               </Form>
  //             </div>
  //           </AccordionDetails>
  //         </Accordion>

  //         <Box
  //           display={{
  //             lg: "flex",
  //             md: "flex",
  //             sm: "none",
  //             xs: "none",
  //           }}
  //           flex={1}
  //         >
  //           <Form
  //             className="periorityForm"
  //             style={{ margin: "0 auto" }}
  //             noValidate
  //             // validated={validated}
  //             onSubmit={handleSubmit}
  //           >
  //             <b>{t("/Definition/RepairsPerformed/Write")}</b>
  //             <div className="repairRowPerformed">
  //               <Form.Group
  //                 className="mb-0.5 repairsPerformedItem"
  //                 controlId={"model"}
  //               >
  //                 <Form.Label>{t("Group")}</Form.Label>
  //                 <CustomReactMultiSelect
  //                   isMulti={false}
  //                   options={perfomedGroupOptions}
  //                   value={performedGroup}
  //                   onchangeHandler={(e) => setPerformedGroup(e)}
  //                   placeholder={t("Group")}
  //                 />
  //               </Form.Group>
  //               <Form.Group
  //                 className="mb-.5 repairsPerformedItem"
  //                 controlId={"model"}
  //               >
  //                 <Form.Label>{t("model")}</Form.Label>
  //                 <CustomReactMultiSelect
  //                   isMulti={false}
  //                   options={modelOptions}
  //                   value={model}
  //                   onchangeHandler={(e) => setModel(e)}
  //                   placeholder={t("model")}
  //                 />
  //               </Form.Group>
  //             </div>
  //             {defintionInputs(
  //               values,
  //               t("Title"),
  //               t("RepairsPerformed_errorMSG"),
  //               true
  //             ).map((input) => (
  //               <FormInput
  //                 performedGroup={model}
  //                 isRepair={true}
  //                 key={input.id}
  //                 {...input}
  //                 onChange={onChangeHandler}
  //               />
  //             ))}
  //             {!isEdit ? (
  //               <>
  //                 <Button disabled={loading} type="submit">
  //                   {t("submit")}
  //                 </Button>
  //               </>
  //             ) : (
  //               <div className="repairedFormDownDiv">
  //                 <Button
  //                   disabled={loading}
  //                   onClick={handleEditSubmit}
  //                   variant="warning"
  //                 >
  //                   {t("repairedEdit")}
  //                 </Button>
  //                 <Button
  //                   disabled={loading}
  //                   variant="danger"
  //                   onClick={handleCancelation}
  //                 >
  //                   {t("repairedCancel")}
  //                 </Button>
  //               </div>
  //             )}
  //           </Form>
  //         </Box>
  //         <div className="repairedPerformedRight">
  //           <TreeView
  //             aria-label="file system navigator"
  //             defaultCollapseIcon={<ExpandMoreIcon />}
  //             defaultExpandIcon={<ChevronRightIcon />}
  //             style={{ direction: "ltr" }}
  //             sx={{
  //               height: "100%",
  //               flexGrow: 1,
  //               width: "100%",
  //               overflowY: "auto",
  //             }}
  //           >
  //             {perfomedData.map(
  //               (data) => data.Parent_Id === 0 && handleTreeView(data)
  //             )}
  //           </TreeView>
  //         </div>
  //       </Box>
  //       {/* <div className="repairPerformDown">
  //         {haveAccess(enums.Definition_RepairsPerformed_Log_r) && (
  //           <button
  //             className="reactTableParentLogButton"
  //             title="log"
  //             onClick={handleClickLog}
  //           >
  //             <fa.FaHistory />
  //           </button>
  //         )}
  //         {haveAccess(enums.Definition_RepairsPerformed_Import_w) && (
  //           <ImportCSV
  //             importSuccess={importSuccess}
  //             sampleUrl={repairsPerformedSampleFile}
  //             fileCheckURL={repairsPerformedCheckFile}
  //             importURL={repairsPerformedImport}
  //           />
  //         )}
  //         {haveAccess(enums.Definition_RepairsPerformed_Export_r) && (
  //           <ExportAllButton
  //             repaireExp={true}
  //             exportLink={repairsPerformedExport}
  //           />
  //         )}
  //         <button
  //           disabled={IsFavorite}
  //           title="favorite"
  //           className={`reactTableParentFavoritButton ${
  //             IsFavorite ? "favactive" : ""
  //           }`}
  //           onClick={handleClickFav}
  //         >
  //           <fa.FaRegStar />
  //         </button>
  //         <button
  //           className="reactTableParentHelpButton"
  //           onClick={handleClickHelp}
  //           title="help"
  //         >
  //           <fa.FaQuestionCircle />
  //         </button>
  //       </div> */}
  //     </div>
  //   </>
  // );

  const childRef = useRef();
  const filteredColumns = [
    "IsLimited",
    "Registrar",
    "Language_EId",
    "SourceType",
    "PartGroup_Id",
    "Quality_Id",
    "Color_Id",
    "SafeMode"
  ];
  const [mobileModal, setMobileModal] = useState(false)
  const [mobileModalButtons, setMobileModalButtons] = useState(false)
  const [mobileModalColumns, setMobileModalColumns] = useState(false)
  const widthOFScreen = useWindowSize().width
  const BcItems = [t("routes.basicDefinations"), t("/Definition/RepairsPerformed/Read")];
  const [isFee, setIsFee] = useState(false);



  const handleClickHelp = () => {
    window.open("https://www.google.com");
  };

  return (
    <CustomTable
        type="tree"
        columnInfo={RepairsPerformedColumnInfo}
        importarray={RepairsPerformedImportArray}
        ref={childRef}
        ReadApi={RepairsPerformedRead}
        deleteApi={RepairsPerformedDelete}
        unSelectedAPI={RepairsPerformedSetUnselectedColumn}
        sampleUrl={RepairsPerformedSampleFile}
        fileCheckURL={RepairsPerformedCheckFile}
        importURL={RepairsPerformedImport}
        logApi={RepairsPerformedLog}
        exportId={RepairsPerformedExportId}
        exportAccess={enums.Definition_RepairsPerformed_Export_r}
        exportLink={RepairsPerformedExport}
        importAccess={enums.Definition_RepairsPerformed_Import_w}
        logAccess={enums.Definition_RepairsPerformed_Log_r}
        readPagingApi={RepairsPerformedReadPaging}
        accessListAccess={enums.Operator_AccessList_Read_r}
        accessListApi={RepairsPerformedAccessList}
        favouriteApi={RepairsPerformedSetToFavorite}
        handleClickHelp={handleClickHelp}
        filteredColumns={filteredColumns}
        deleteAccess={enums.Definition_RepairsPerformed_Delete_w}
        editAccess={enums.Definition_RepairsPerformed_Update_w}
        getOneRecord={RepairsPerformedGetOneRecord}
        mobileModal = {mobileModal}
        setMobileModal = {setMobileModal}
        widthOFScreen ={widthOFScreen}
        mobileModalButtons={mobileModalButtons}
        setMobileModalButtons={setMobileModalButtons}
        setMobileModalColumns={setMobileModalColumns}
        mobileModalColumns={mobileModalColumns}
        BcItems={BcItems}
        isFee={isFee}
        setIsFee={setIsFee}
        deleteRateApi={RepairsPerformedDeleteRate}
        readRateApi={RepairsPerformedReadRate}
        createRateApi={RepairsPerformedCreateRate}
        updateRateApi={RepairsPerformedUpdateRate}
      />
  )
};

export default RepairsPerformed;
