import { Button, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import * as fa from "react-icons/fa";
import { TabContext } from "../../../contexts/TabContextProvider";
import ImportCSVModal from "./ImportCSVModal";
import ImportUI from "./importUIComponent/ImportUI";
const ImportCSV = (props) => {
  const {t}=useTranslation()
  const [modalShow, setModalShow] = useState(false);
  const tabContext = useContext(TabContext);
  const [file, setFile] = useState(null);
  const [withHeader, setWithHeader] = useState(true);
  const handleOpenModalCSV = () => {
    setFile(null);
    setWithHeader(true);
    setModalShow(true);
    tabContext.addRemoveTabs(
      {
        path: "ImportUI",
      },
      "remove"
    );
  };
  const handleUIClick = () => {
    setModalShow(false);

    tabContext.addRemoveTabs(
      {
        Component: ImportUI,
        path: "ImportUI",
        title: "ImportUI",
        columnInfo: props.columnInfo,
        file: file,
        withHeader: withHeader,
        importarray: props.importarray,
      },
      "add"
    );
  };
  return (
    <>
      {modalShow && (
        <ImportCSVModal
          onHide={() => setModalShow(false)}
          show={modalShow}
          importSuccess={props.importSuccess}
          sampleUrl={props.sampleUrl}
          fileCheckURL={props.fileCheckURL}
          importURL={props.importURL}
          handleUIClick={handleUIClick}
          file={file}
          setFile={setFile}
          withHeader={withHeader}
          setwithheader={setWithHeader}
        />
      )}
      {window.innerWidth >= 700 ? (
        <Button
          className="csvBtn"
          title="importCSV"
          onClick={handleOpenModalCSV}
        >
          <fa.FaFileCsv />
        </Button>
      ) : (
        <MenuItem
          onClick={() => {
            handleOpenModalCSV();
            props.handleClose();
          }}
        >
          <fa.FaFileCsv />
          {t("importCSV")}
        </MenuItem>
      )}
    </>
  );
};

export default ImportCSV;
