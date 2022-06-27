import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const { app } = useContext(AppContext);
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();

  const requestBody = {
    language: app.langCode,
    token: accessToken ? accessToken : "",
    latitude: location.loaded ? location.coordinates.lat : 0,
    longitude: location.loaded ? location.coordinates.lng : 0,
  };

  return requestBody;
};

export default useRequest;
