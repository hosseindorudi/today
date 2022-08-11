import React, { useCallback, useContext, useEffect } from "react";
import "./opratorDashboard.css";
import { useState } from "react";
import Modal from "./modal/Modal";
import useGeoLocation from "../../customHooks/useGeoLocation";
import {
  homeDashboard,
  deleteNoteDashboard,
  updateDashboard,
  deleteFavorite,
} from "../../services/dashboardServices";
import useAxios from "../../customHooks/useAxios";
import BackDrop from "../../Components/backDrop/BackDrop";
import { useTranslation } from "react-i18next";
import { TabContext } from "../../contexts/TabContextProvider";
import * as fa from "react-icons/fa";

import { Routes } from "../../Routes";
import Swal from "sweetalert2";
import {
  dateOfLogTable,
  findBrowserIcon,
  findGeoLocation,
  findOsIcon,
} from "../../validation/functions";
import DescModal from "../../Components/Table/descriptionModal/DescModal";
import { Table } from "react-bootstrap";
import useRequest from "../../customHooks/useRequest";
import MapShowLocation from "../../Components/map/MapShowLocation";

const OperatorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const request = useRequest();
  const location = useGeoLocation();
  const abortController = new AbortController();
  const [response, loading, fetchData] = useAxios();
  const [dashboardInfoData, setDashboardInfoData] = useState({});
  const [extraInfo, setExtraInfo] = useState([]);
  const [notes, setNotes] = useState([]);
  const [faileds, setFaileds] = useState([]);
  const [logins, setLogins] = useState([]);
  const [events, setEvents] = useState([]);
  const [requestType, setRequestType] = useState("");
  const [isNote, setIsNote] = useState(false);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [desc, setDesc] = useState("");
  const { t } = useTranslation();
  const tabContext = useContext(TabContext);
  let begins = false
  const filtredColumn = [
    "Id",
    "SourceType",
    "CodePage_EId",
    "Operator_Id",
    "OperatorName",
    "Registrar",
  ];
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
      headers: request,
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
          headers: request,

          data: {
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
          headers: request,

          data: {
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
      headers: request,
      data: {
        Operator_Id: localStorage.getItem("Id"),
        Id: note.Id,
        Title: note.Title,
        Body: note.Body,
        IsAlarm: bol,
      },

      signal: abortController.signal,
    });
  };

  useEffect(() => {
    getDashboardData();

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [begins]);

  useEffect(() => {
    response && handleResponse(response, requestType);
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
        <div className="Row">
          <div className="operatorDashboardInformation">
            <div className="dashInformationDiv">
              <MapShowLocation value={dashboardInfoData.IP} isIP={true} />
              <span>:IP</span>
            </div>

            <div className="dashInformationDiv">
              <span>
                {dashboardInfoData.OS && findOsIcon(dashboardInfoData.OS)}
              </span>
              <span>:OS</span>
            </div>

            <div className="dashInformationDiv">
              <span>
                {dashboardInfoData.Browser &&
                  findBrowserIcon(dashboardInfoData.Browser)}
              </span>
              <span>:Browser</span>
            </div>

            <div className="dashInformationDiv">
              <span>
                {location.loaded ? (
                  <MapShowLocation
                    value={[location.coordinates.lng, location.coordinates.lat]}
                    isIP={false}
                  />
                ) : (
                  "-"
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
            {extraInfo.length > 0 &&
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
          {notes?.length > 0 &&
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

        {events?.length > 0 && (
          <>
            <b>لیست رخدادها</b>
            <Table responsive="sm" size="sm" className="tableDashboard">
              <thead>
                <tr>
                  {Object.keys(events[0])
                    .filter((p) => !filtredColumn.includes(p))
                    .map((failed, i) => {
                      return <th key={i}>{t(failed)}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {events.map((failed) => (
                  <tr>
                    {Object.keys(failed)
                      .filter((p) => !filtredColumn.includes(p))
                      .map((f, i) => {
                        return (
                          <td key={i}>
                            {f === "DateSet" ? (
                              dateOfLogTable(failed[f])
                            ) : f === "IP" ? (
                              <MapShowLocation value={failed[f]} isIP={true} />
                            ) : f === "Geolocation" ? (
                              findGeoLocation(failed[f]) === 0 ? (
                                "-"
                              ) : (
                                <MapShowLocation
                                  value={findGeoLocation(failed[f])}
                                  isIP={false}
                                />
                              )
                            ) : f === "OS" ? (
                              findOsIcon(failed[f])
                            ) : f === "Browser" ? (
                              findBrowserIcon(failed[f])
                            ) : (f === "Description") &
                              (failed[f].length > 0) ? (
                              <span
                                className="Link"
                                onClick={() => {
                                  setDescriptionShow(true);
                                  setDesc(failed[f]);
                                }}
                              >
                                {t("logview")}
                              </span>
                            ) : (
                              t(failed[f])
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {logins?.length > 0 && (
          <>
            <b>لیست ورود های مجاز</b>
            <Table responsive="sm" size="sm" className="tableDashboard">
              <thead>
                <tr>
                  {Object.keys(logins[0])
                    .filter((p) => !filtredColumn.includes(p))
                    .map((failed, i) => {
                      return <th key={i}>{t(failed)}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {logins.map((failed) => (
                  <tr>
                    {Object.keys(failed)
                      .filter((p) => !filtredColumn.includes(p))
                      .map((f, i) => {
                        return (
                          <td key={i}>
                            {f === "DateSet" ? (
                              dateOfLogTable(failed[f])
                            ) : f === "IP" ? (
                              <MapShowLocation value={failed[f]} isIP={true} />
                            ) : f === "Geolocation" ? (
                              findGeoLocation(failed[f]) === 0 ? (
                                "-"
                              ) : (
                                <MapShowLocation
                                  value={findGeoLocation(failed[f])}
                                  isIP={false}
                                />
                              )
                            ) : f === "Browser" ? (
                              findBrowserIcon(failed[f])
                            ) : f === "OS" ? (
                              findOsIcon(failed[f])
                            ) : (
                              failed[f]
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
        {faileds?.length > 0 && (
          <>
            <b>لیست ورود های غیر مجاز</b>
            <Table responsive="sm" size="sm" className="tableDashboard">
              <thead>
                <tr>
                  {Object.keys(faileds[0])
                    .filter((p) => !filtredColumn.includes(p))
                    .map((failed, i) => {
                      return <th key={i}>{t(failed)}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {faileds.map((failed) => (
                  <tr>
                    {Object.keys(failed)
                      .filter((p) => !filtredColumn.includes(p))
                      .map((f, i) => {
                        return (
                          <td key={i}>
                            {f === "DateSet" ? (
                              dateOfLogTable(failed[f])
                            ) : f === "IP" ? (
                              <MapShowLocation value={failed[f]} isIP={true} />
                            ) : f === "Geolocation" ? (
                              findGeoLocation(failed[f]) === 0 ? (
                                "-"
                              ) : (
                                <MapShowLocation
                                  value={findGeoLocation(failed[f])}
                                  isIP={false}
                                />
                              )
                            ) : f === "Browser" ? (
                              findBrowserIcon(failed[f])
                            ) : f === "OS" ? (
                              findOsIcon(failed[f])
                            ) : (
                              failed[f]
                            )}
                          </td>
                        );
                      })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default OperatorDashboard;
