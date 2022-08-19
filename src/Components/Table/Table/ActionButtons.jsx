import React, { useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as fa from "react-icons/fa";
import * as fi from 'react-icons/fi'
import useButtonAccess from "../../../customHooks/useButtonAccess";
import ExportAllButton from "../ExportButton/ExportAllButton";
import ImportCSV from "../ImportCSVButton/ImportCSV";
import { TabContext } from "../../../contexts/TabContextProvider";
import AppContext from "../../../contexts/AppContext";
const ActionButtons = ({
  setSearch,
  search,
  searchBegin,
  searchEnd,
  setColumnSideBar,
  columnSideBar,
  exportAccess,
  numberOfRecordsPerPage,
  currentPage,
  sort,
  flt_Title,
  exportLink,
  importAccess,
  importSuccess,
  sampleUrl,
  fileCheckURL,
  importURL,
  logAccess,
  handleClickLog,
  accessListAccess,
  handleClickAccessList,
  IsFavorite,
  handleClickFav,
  handleClickHelp,
  totalRecord,
  columnInfo,
  importarray,
  sortedBy,
  isAssending,
  addObject,
  addFormAccess,
  handleRefresh
}) => {
  const tabContext = useContext(TabContext);
  const { app } = useContext(AppContext);
  const [haveAccess] = useButtonAccess();
  const handleAdd = () => {
    tabContext.addRemoveTabs({ path: app.activeTab }, "remove");
    tabContext.addRemoveTabs(addObject, "add");
  };
  return (
    <>
      <ButtonGroup
        variant="outlined"
        className="buttonGroupTopTable"
        aria-label="text button group"
      > 
        <Button  onClick={handleRefresh}><fi.FiRefreshCcw/></Button>
        {haveAccess(addFormAccess)&&<Button className="addBtn" onClick={handleAdd}><fa.FaPlus/></Button>}
      </ButtonGroup>
      <ButtonGroup
        variant="outlined"
        className="buttonGroupTopTable"
        aria-label="text button group"
      >
        <Button onClick={setColumnSideBar}>
          <fa.FaColumns />
        </Button>
        {haveAccess(exportAccess) && (
          <ExportAllButton
            numberOfRecordsPerPage={numberOfRecordsPerPage}
            currentPage={currentPage}
            sort={sort}
            flt_Title={flt_Title}
            seartBegin={searchBegin}
            seartEnd={searchEnd}
            exportLink={exportLink}
          />
        )}
        {haveAccess(importAccess) && (
          <ImportCSV
            importSuccess={importSuccess}
            sampleUrl={sampleUrl}
            fileCheckURL={fileCheckURL}
            importURL={importURL}
            columnInfo={columnInfo}
            importarray={importarray}
          />
        )}
        {haveAccess(logAccess) && (
          <Button title="log" onClick={handleClickLog}>
            <fa.FaHistory />
          </Button>
        )}
        {haveAccess(accessListAccess) && (
          <Button onClick={handleClickAccessList}>
            <fa.FaUserLock />
          </Button>
        )}
        <Button
          disabled={IsFavorite}
          title="favorite"
          className={IsFavorite?"isFav":""}
          onClick={handleClickFav}
        >
          <fa.FaRegStar />
        </Button>
        <Button className="helpBtn" onClick={handleClickHelp} title="help">
          <fa.FaQuestionCircle />
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ActionButtons;
