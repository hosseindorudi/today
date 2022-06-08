import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import useGeoLocation from "./useGeoLocation";
import useOsInformation from "./useOSInformation";

const useRequest = () => {
    const { app } = useContext(AppContext);
    const { ip, os, browser } = useOsInformation();
    const accessToken=localStorage.getItem("token");
    const location = useGeoLocation();
    const requestBody={
            language: app.langCode,
            os: os,
            browser: browser,
            ip: ip,
            token: accessToken?accessToken:"",
            latitude: location.loaded?location.coordinates.lat:'',
            longitude: location.loaded?location.coordinates.lng:'',
    }

  
  
          
    return requestBody;
  }
  
  export default useRequest