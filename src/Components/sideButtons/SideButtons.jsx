import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../customHooks/useAxios";
import useButtonAccess from "../../customHooks/useButtonAccess";
import AccessListModal from "../Table/AccessListModal/AccessListModal";
import LogModal from "../Table/LogModal/LogModal";
import * as fa from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useRequest from "../../customHooks/useRequest";
import BackDrop from "../backDrop/BackDrop";
const styles={
    sideButtons:{
        display:"flex",
        flexDirection:"column",
        border:"1px solid black",
        padding:10
    }
}
const SideButtons = (props) => {
    const {t}=useTranslation()
    const request=useRequest()
  const [response, loading, fetchData] = useAxios();
  const [accessLists, setAccessLists] = useState(undefined);
  const [showAccessListModal, setAccessListModal] = useState(false);
  const [log, setLog] = useState(null);
  const { logApi, favApi, accessListApi, logAccess, accessListAccess,IsFavorite,setIsFavorite } = props;
  const [showLogModal, setShowLogModal] = useState(false);
  const [haveAccess] = useButtonAccess();
  const [type, setType] = useState("");
  const handleClickLog = () => {
    setType("LOG");
    fetchData({
      method: "POST",
      url: logApi,
      headers: request,
    });
  };
  const handleClickFav = () => {
    setType("FAVORITE");
    fetchData({
      method: "POST",
      url: favApi,
      headers: request,
    });
  };
  const handleClickAccessList = () => {
    setType("ACCESSLIST");
    fetchData({
      method: "POST",
      url: accessListApi,
      headers: request,
    });
  };
  useEffect(() => {
    response && handleResponse(response, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "LOG":
          logResponse(response);
          break;
        case "FAVORITE":
          favorited();
          break;
          case "ACCESSLIST":
            handleAccessListModal(response);
            break;
        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const logResponse = (res) => {
    if (res.Log.length === 0) {
      return toast.info(t("noDataFound.table"), {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLog(res.Log);
    setShowLogModal(true);
  };
  const favorited = () => {
    setIsFavorite(true);
    toast.success(t("favorited"), {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const handleAccessListModal = (response) => {
    setAccessLists(response.AccessList);
    setAccessListModal(true);
  };
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
       {showAccessListModal && (
        <AccessListModal
          accessList={accessLists}
          show={showAccessListModal}
          onHide={() => setAccessListModal(false)}
        />
      )}
      <div style={styles.sideButtons}>
        {haveAccess(logAccess) && (
          <button
            className="reactTableParentLogButton"
            title="log"
            onClick={handleClickLog}
          >
            <fa.FaHistory />
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
        {haveAccess(accessListAccess) && (
          <button
            className="reactTableParentAccessButton"
            onClick={handleClickAccessList}
          >
            <fa.FaUserLock />
          </button>
        )}
      </div>
    </>
  );
};

export default SideButtons;
