import { languages } from "../assets/languages/languages";
import useGeoLocation from "./useGeoLocation";

const useRequest = () => {
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();
  const lang=localStorage.getItem("i18nextLng")
  const langCode=lang?languages.find(l=>l.code===lang):undefined
  const requestBody = {
    Language: langCode?langCode.no:1,
    token: accessToken ? accessToken : "",
    Latitude: location.loaded ? location.coordinates.lat : 0,
    Longitude: location.loaded ? location.coordinates.lng : 0,
  };

  return requestBody;
};

export default useRequest;
