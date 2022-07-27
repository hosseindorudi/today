import { useContext } from "react";
import { languages } from "../assets/languages/languages";
import AppContext from "../contexts/AppContext";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const {app} = useContext(AppContext)
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();
  const lang=localStorage.getItem("i18nextLng")
  const langCode=lang?languages.find(l=>l.code===lang):undefined
  const requestBody = {
    Language: langCode?langCode.no:1,
    token: accessToken ? accessToken : "",
    Latitude: location.loaded ? location.coordinates.lat : 0,
    Longitude: location.loaded ? location.coordinates.lng : 0,
    SafeMode:app.SafeMode ? app.SafeMode : false
  };

  return requestBody;
};

export default useRequest;
