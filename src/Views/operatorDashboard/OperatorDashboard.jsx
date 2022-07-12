import React, { useCallback, useContext, useEffect } from "react";
import "./opratorDashboard.css";
import { useState } from "react";
import Modal from "./modal/Modal";
import useGeoLocation from "../../customHooks/useGeoLocation";
import { OsContext } from "../../contexts/OsInformationProvider";
import { toast } from "react-toastify";
import {
  homeDashboard,
  deleteNoteDashboard,
  updateDashboard,
  deleteFavorite,
} from "../../services/dashboardServices";
import useAxios from "../../customHooks/useAxios";
import AppContext from "../../contexts/AppContext";
import BackDrop from "../../Components/backDrop/BackDrop";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";
import * as fa from "react-icons/fa";

import { Routes } from "../../Routes";
import Swal from "sweetalert2";
import { dateOfLogTable } from "../../validation/functions";
import DescModal from "../../Components/Table/descriptionModal/DescModal";
const OperatorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useGeoLocation();
  const { loaded } = useContext(OsContext);
  const abortController = new AbortController();
  const [response, loading, fetchData, setResponse] = useAxios();
  const [dashboardInfoData, setDashboardInfoData] = useState({});
  const accessToken = localStorage.getItem("token");
  const [extraInfo, setExtraInfo] = useState([]);
  const [notes, setNotes] = useState([]);
  const [faileds, setFaileds] = useState([]);
  const [logins, setLogins] = useState([]);
  const [events, setEvents] = useState([]);
  const [requestType, setRequestType] = useState("");
  const [isNote, setIsNote] = useState(false);
  const { app } = useContext(AppContext);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [desc, setDesc] = useState("");
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  const handleError = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  const handleChangeFavoritPage = (type) => {
    Routes.map((route) => {
      return route.subNav
        ? route.subNav.map((r) => {
            return (
              r.path === type &&
              tabContext.addRemoveTabs(
                {
                  title: r.title,
                  path: type,
                  Component: r.Component,
                  access: r.access,
                },
                "add"
              )
            );
          })
        : route.path === type &&
            tabContext.addRemoveTabs(
              {
                title: route.title,
                path: type,
                Component: route.Component,
                access: route.access,
              },
              "add"
            );
    });
  };

  const getDashboardData = () => {
    setRequestType("READ");
    fetchData({
      method: "POST",
      url: homeDashboard,
      headers: {
        accept: "*/*",
      },

      data: {
        Language: app.langCode,
        Token: accessToken ? accessToken : "",
        Latitude: location.loaded ? location.coordinates.lat : 0,
        Longitude: location.loaded ? location.coordinates.lng : 0,
      },

      signal: abortController.signal,
    });
  };
  const setData = (response) => {
    setDashboardInfoData(response);
    setExtraInfo(response.Favorite);
    setNotes(response.Note);
    setIsNote(true);
    setFaileds(response.Failed);
    setLogins(response.Login);
    setEvents(response.Event);
  };

  const noteSwal = (notes, id) => {
    if (notes[id]?.IsAlarm & (notes[id] !== undefined)) {
      Swal.fire({
        title: notes[id].Title,
        text: notes[id].Body,
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "تایید",
      }).then((result) => {
        if (result.isConfirmed) {
          noteSwal(notes, id + 1);
        }
      });
    } else if (id < notes.length) {
      noteSwal(notes, id + 1);
    }
  };

  useEffect(() => {
    if (isNote) {
      noteSwal(notes, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNote]);

  const handleResponse = useCallback(
    (response, type) => {
      switch (type) {
        case "DELETE":
          handleDeleted();
          break;
        case "READ":
          setData(response);
          break;
        case "DELETEFAVORITE":
          handleDeletedFavorite();
          break;
        case "UPDATE":
          handleUpdate();
          break;

        default:
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [response, requestType]
  );

  // useEffect(() => {
  //   if (loaded) {

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loaded]);

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
        setRequestType("DELETE");
        fetchData({
          method: "POST",
          url: deleteNoteDashboard,
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
  const deleteFavoriteItem = (id) => {
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
        setRequestType("DELETEFAVORITE");
        fetchData({
          method: "POST",
          url: deleteFavorite,
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

  const handleDeleted = () => {
    Swal.fire(
      t("sweetAlert.deleted"),
      t("sweetAlert.recordDeleted"),
      "success"
    );

    getDashboardData();
  };
  const handleDeletedFavorite = () => {
    Swal.fire(
      t("sweetAlert.deleted"),
      t("sweetAlert.recordDeleted"),
      "success"
    );

    getDashboardData();
  };

  const handleUpdate = () => {
    getDashboardData();
  };

  const updateOneRecord = (note, bol) => {
    setRequestType("UPDATE");
    fetchData({
      method: "POST",
      url: updateDashboard,
      headers: {
        accept: "*/*",
      },

      data: {
        Id: note.Id,
        Title: note.Title,
        Body: note.Body,
        IsAlarm: bol,
        Request: {
          Language: app.langCode,
          Token: accessToken ? accessToken : "",
          Latitude: location.loaded ? location.coordinates.lat : 0,
          Longitude: location.loaded ? location.coordinates.lng : 0,
        },
      },

      signal: abortController.signal,
    });
  };

  useEffect(() => {
    if (loaded) {
      getDashboardData();
    }

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    if (response) {
      response.Result
        ? handleResponse(response, requestType)
        : handleError(response.Message);
    }
    setResponse(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, requestType]);

  return (
    <>
      {loading && <BackDrop open={loading} />}

      {descriptionShow && (
        <DescModal
          onHide={() => setDescriptionShow(false)}
          show={descriptionShow}
          value={desc}
        />
      )}
      {isOpen && (
        <Modal setIsOpen={setIsOpen} getDashboardData={getDashboardData} />
      )}
      <div className="mainOperatorDash">
        <div className="firstOperatorColumn">
          <div className="operatorDashboardInformation">
            <div className="dashInformationDiv">
              <span>{dashboardInfoData.IP}</span>
              <span>:IP</span>
            </div>

            <div className="dashInformationDiv">
              {/* {Platform.OSVersion} */}
              <span>{dashboardInfoData.OS}</span>
              <span>:OS</span>
            </div>

            <div className="dashInformationDiv">
              <span>{dashboardInfoData.Browser}</span>
              <span>:Browser</span>
            </div>

            <div className="dashInformationDiv">
              <span>
                {location.loaded ? (
                  <>{`${location.coordinates.lat},${location.coordinates.lng}`}</>
                ) : (
                  "not supported"
                )}
              </span>
              <span>:GeoLocation</span>
            </div>

            <div className="dashInformationDiv">
              <span>{dashboardInfoData.Operator}</span>
              <span>:Operator</span>
            </div>
          </div>
          <div className="operatorDashboardFavarot">
            {extraInfo &&
              extraInfo.map((dashboard, i) => (
                <>
                  <div className="favarotContainer" key={i}>
                    <div className="favarotClose">
                      <button
                        className="destroyFavarot"
                        onClick={() => deleteFavoriteItem(dashboard.Id)}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div
                      className="favarotIcon"
                      onClick={() => handleChangeFavoritPage(dashboard.Link)}
                    >
                      <i className={dashboard.Icon} aria-hidden="true"></i>
                    </div>
                    <div className="TitleAndDestroy">
                      <span>{t(`${dashboard.Link}`)}</span>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>

        <div className="opratorDashNoteBefore">
          {notes.length > 0 &&
            notes.map((note) => (
              <div className="opratorDashNote">
                <div className="opratorDashNoteContainer">
                  <div className="opratorDashNoteContainerInner">
                    <div className="opratorDashNoteContainerInnerFront">
                      <h5 className="opratorDashNoteTitle">{note.Title}</h5>
                    </div>
                    <div className="opratorDashNoteContainerInnerBack">
                      <div className="dashboardDirectionSet">
                        <button
                          className="opratorDashNoteContainerInnerBackClose"
                          onClick={() => deleteOneRecord(note.Id)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>{" "}
                        </button>
                        <button
                          className="opratorDashNoteContainerInnerBackClose1"
                          onClick={() => {
                            updateOneRecord(note, !note.IsAlarm);
                          }}
                        >
                          {note.IsAlarm ? <fa.FaBell /> : <fa.FaRegBell />}
                        </button>
                      </div>
                      <p className="opratorDashNoteDescription">{note.Body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <button
            className="opratorDashNotePlusBTN"
            onClick={() => setIsOpen(true)}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>

        {events.length > 0 && (
          <div className="opratorDashAlert">
            <h3>لیست رخدادها</h3>

            <table className="opratorDashActivityTable">
              <thead className="opratorDashActivityTableThead">
                <tr>
                  {Object.keys(events[0]).map((failed, i) => {
                    if (
                      (failed !== "Id") &
                      (failed !== "SourceType") &
                      (failed !== "CodePage_EId") &
                      (failed !== "Operator_Id") &
                      (failed !== "OperatorName")
                    ) {
                      return (
                        <th
                          key={i}
                          className="opratorDashActivityTableTheadTrTh"
                        >
                          {t(failed)}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody className="opratorDashActivityTableTbody">
                {events.length > 0 &&
                  events.map((failed) => (
                    <tr>
                      {Object.keys(failed).map((f, i) => {
                        if (
                          (f !== "Id") &
                          (f !== "SourceType") &
                          (f !== "CodePage_EId") &
                          (f !== "Operator_Id") &
                          (f !== "OperatorName")
                        ) {
                          return (
                            <td
                              key={i}
                              className="opratorDashActivityTableTbodyTrTd"
                            >
                              {f === "DateSet" ? (
                                dateOfLogTable(failed[f])
                              ) : (f === "Description") &
                                (failed[f].length > 0) ? (
                                <span
                                  onClick={() => {
                                    setDescriptionShow(true);
                                    setDesc(failed[f]);
                                  }}
                                >
                                  {t("logview")}
                                </span>
                              ) : (
                                failed[f]
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {logins.length > 0 && (
          <div className="opratorDashListOfLogin">
            <h3>لیست ورود های مجاز</h3>

            <table className="opratorDashActivityTable">
              <thead className="opratorDashActivityTableThead">
                <tr>
                  {Object.keys(logins[0]).map((failed, i) => {
                    if (
                      (failed !== "Id") &
                      (failed !== "SourceType") &
                      (failed !== "Operator_Id") &
                      (failed !== "OperatorName")
                    ) {
                      return (
                        <th
                          key={i}
                          className="opratorDashActivityTableTheadTrTh"
                        >
                          {t(failed)}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody className="opratorDashActivityTableTbody">
                {logins.length > 0 &&
                  logins.map((failed) => (
                    <tr>
                      {Object.keys(failed).map((f, i) => {
                        if (
                          (f !== "Id") &
                          (f !== "SourceType") &
                          (f !== "Operator_Id") &
                          (f !== "OperatorName")
                        ) {
                          return (
                            <td
                              key={i}
                              className="opratorDashActivityTableTbodyTrTd"
                            >
                              {f === "DateSet"
                                ? dateOfLogTable(failed[f])
                                : failed[f]}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {faileds.length > 0 && (
          <div className="opratorDashListOfFailed">
            <h3>لیست ورود های غیر مجاز</h3>

            <table className="opratorDashActivityTable">
              <thead className="opratorDashActivityTableThead">
                <tr>
                  {Object.keys(faileds[0]).map((failed, i) => {
                    if (
                      (failed !== "Id") &
                      (failed !== "SourceType") &
                      (failed !== "OperatorName")
                    ) {
                      return (
                        <th
                          key={i}
                          className="opratorDashActivityTableTheadTrTh"
                        >
                          {t(failed)}
                        </th>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody className="opratorDashActivityTableTbody">
                {faileds.length > 0 &&
                  faileds.map((failed) => (
                    <tr>
                      {Object.keys(failed).map((f, i) => {
                        if (
                          (f !== "Id") &
                          (f !== "SourceType") &
                          (f !== "OperatorName")
                        ) {
                          return (
                            <td
                              key={i}
                              className="opratorDashActivityTableTbodyTrTd"
                            >
                              {f === "DateSet"
                                ? dateOfLogTable(failed[f])
                                : failed[f]}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OperatorDashboard;
