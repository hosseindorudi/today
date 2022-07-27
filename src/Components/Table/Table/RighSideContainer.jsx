import React from "react";
import { useTranslation } from "react-i18next";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import ExportAllButton from "../ExportButton/ExportAllButton";
import ImportCSV from "../ImportCSVButton/ImportCSV";
import * as fa from "react-icons/fa";
import useWindowSize from "../../../customHooks/useWindowSize";
const RighSideContainer = ({
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
  columnInfo

}) => {
  const [haveAccess] = useButtonAccess();
  const {t}=useTranslation()
  const withOfScreen = useWindowSize().width;

  return (
    <div className="groupContainerRight" style ={{display : withOfScreen < 420 ? "none" : "flex"}}>
      <div className="reacttableParentMainRightUp">
        <span className="reacttableParentMainRightUpInformation">
          {t("table.information")}
        </span>
        <div className="reacttableParentMainRightUpInformationDiv"></div>
      </div>
      <div className="reacttableParentMainRightDown">
        <span className="reacttableParentMainRightDownToolBox">
          {t("table.tools")}
        </span>
        <div className="reacttableParentMainRightDownToolBoxDiv">
          <div
            onClick={() => {
              setSearch((prev) => !prev);
            }}
            style={{
              color:
                !search && searchBegin !== null && searchEnd !== null
                  ? "red"
                  : "lightgray",
            }}
          >
            <i className="fa fa-search searchDater" aria-hidden="true"></i>
          </div>
          <div className="reacttableParentMainRightDownToolBoxDivColumnBtn">
            <button
              className={columnSideBar ? "hold" : "columnBtnTableToggle"}
              onClick={() => {
                setColumnSideBar(!columnSideBar);
              }}
            >
              {t("table.groups")}
            </button>
          </div>
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
            
            />
          )}
          {haveAccess(logAccess) && (
            <button
              className="reactTableParentLogButton"
              title="log"
              onClick={handleClickLog}
            >
              <fa.FaHistory />
            </button>
          )}

          {haveAccess(accessListAccess) && (
            <button
              className="reactTableParentAccessButton"
              onClick={handleClickAccessList}
            >
              <fa.FaUserLock />
            </button>
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
    </div>
  );
};

export default RighSideContainer;
