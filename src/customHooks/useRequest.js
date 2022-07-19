import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const { app } = useContext(AppContext);
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();

  const requestBody = {
    Language: app.langCode,
    token: accessToken ? accessToken : "",
    Latitude: location.loaded ? location.coordinates.lat : 0,
    Longitude: location.loaded ? location.coordinates.lng : 0,
  };

  return requestBody;
};

export default useRequest;
