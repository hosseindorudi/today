import React, { useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as fa from "react-icons/fa";
import * as fi from "react-icons/fi";
import * as bs from "react-icons/bs";
import useButtonAccess from "../../../customHooks/useButtonAccess";
import ExportAllButton from "../ExportButton/ExportAllButton";
import ImportCSV from "../ImportCSVButton/ImportCSV";
import { TabContext } from "../../../contexts/TabContextProvider";
import AppContext from "../../../contexts/AppContext";
import { Menu, MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
const ActionButtons = ({
  setColumnSideBar,
  columnSideBar,
  exportAccess,
  numberOfRecordsPerPage,
  currentPage,
  sort,
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
  handleRefresh,
  filterObj,
  clickFilterMobile,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        {window.innerWidth <= 1100 && (
          <Button onClick={clickFilterMobile}>
            <fa.FaFilter />
          </Button>
        )}
        <Button onClick={handleRefresh}>
          <fi.FiRefreshCcw />
        </Button>
        {haveAccess(addFormAccess) && (
          <Button className="addBtn" onClick={handleAdd}>
            <fa.FaPlus />
          </Button>
        )}
      </ButtonGroup>
      {window.innerWidth >= 700 ? (
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
              filterObj={filterObj}
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
            className={IsFavorite ? "isFav" : ""}
            onClick={handleClickFav}
          >
            <fa.FaRegStar />
          </Button>
          <Button className="helpBtn" onClick={handleClickHelp} title="help">
            <fa.FaQuestionCircle />
          </Button>
        </ButtonGroup>
      ) : (
        <>
          <ButtonGroup
            variant="outlined"
            className="buttonGroupTopTable"
            aria-label="text button group"
          >
            <Button onClick={handleClick}>
              <bs.BsTools />
            </Button>
          </ButtonGroup>

          <Menu
            className="menuTable"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                setColumnSideBar();
                handleClose();
              }}
            >
              <fa.FaColumns />
              {t("removeColumns")}
            </MenuItem>
            {haveAccess(exportAccess) && (
              <ExportAllButton
                numberOfRecordsPerPage={numberOfRecordsPerPage}
                currentPage={currentPage}
                sort={sort}
                filterObj={filterObj}
                exportLink={exportLink}
                handleClose={handleClose}
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
                handleClose={handleClose}
              />
            )}
            {haveAccess(logAccess) && (
              <MenuItem
                onClick={() => {
                  handleClickLog();
                  handleClose();
                }}
              >
                <fa.FaHistory />
                {t("log")}
              </MenuItem>
            )}
            {haveAccess(accessListAccess) && (
              <MenuItem
                onClick={() => {
                  handleClickAccessList();
                  handleClose();
                }}
              >
                <fa.FaUserLock />
                {t("accessList")}
              </MenuItem>
            )}
            <MenuItem
              disabled={IsFavorite}
              onClick={() => {
                handleClickFav();
                handleClose();
              }}
            >
              <fa.FaRegStar />
              {t("favorite")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClickHelp();
                handleClose();
              }}
            >
              <fa.FaQuestionCircle />
              {t("help")}
            </MenuItem>
          </Menu>
        </>
      )}
    </>
  );
};

export default ActionButtons;
