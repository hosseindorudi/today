
import { languages } from "../assets/languages/languages";
import { checkBoolean } from "../validation/validation";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const SafeMode=localStorage.getItem("SafeMode")?checkBoolean(localStorage.getItem("SafeMode")):false
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();
  const lang=localStorage.getItem("i18nextLng")
  const langCode=lang?languages.find(l=>l.code===lang):undefined
  const requestBody = {
    Language: langCode?langCode.no:1,
    token: accessToken ? accessToken : "",
    Latitude: location.loaded ? location.coordinates.lat : 0,
    Longitude: location.loaded ? location.coordinates.lng : 0,
    SafeMode:SafeMode
  };

  return requestBody;
};

export default useRequest;
