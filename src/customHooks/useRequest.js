import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { OsContext } from "../contexts/OsInformationProvider";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const { app } = useContext(AppContext);
  const { os } = useContext(OsContext);
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();

  const requestBody = {
    language: app.langCode,
    os: os.os,
    browser: os.browser,
    ip: os.ip,
    token: accessToken ? accessToken : "",
    latitude: location.loaded ? location.coordinates.lat : 0,
    longitude: location.loaded ? location.coordinates.lng : 0,
  };

  return requestBody;
};

export default useRequest;
