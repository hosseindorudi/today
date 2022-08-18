import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as fa from "react-icons/fa";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import ExportAllButton from "../ExportButton/ExportAllButton";
import ImportCSV from "../ImportCSVButton/ImportCSV";
const ActionButtons = ({setSearch,
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
    isAssending}) => {
    const [haveAccess] = useButtonAccess();
  return (
    <ButtonGroup
      variant="text"
      className="buttonGroupTopTable"
      aria-label="text button group"
    >
      <Button
        onClick={
            setColumnSideBar}
      >
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
            <Button
              title="log"
              onClick={handleClickLog}
            >
              <fa.FaHistory />
            </Button>
          )}
          {haveAccess(accessListAccess) && (
            <Button
              onClick={handleClickAccessList}
            >
              <fa.FaUserLock />
            </Button>
          )}
            <Button
            disabled={IsFavorite}
            title="favorite"
            className={`reactTableParentFavoritButton ${
              IsFavorite ? "favactive" : ""
            }`}
            onClick={handleClickFav}
          >
            <fa.FaRegStar />
          </Button>
          <Button
            onClick={handleClickHelp}
            title="help"
          >
            <fa.FaQuestionCircle />
          </Button>

    </ButtonGroup>
  );
};

export default ActionButtons;
