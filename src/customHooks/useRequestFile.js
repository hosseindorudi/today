import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { OsContext } from "../contexts/OsInformationProvider";
import useGeoLocation from "./useGeoLocation";

const useRequestFile = () => {
  const { app } = useContext(AppContext);
  const { os } = useContext(OsContext);
  const accessToken = localStorage.getItem("token");
  const location = useGeoLocation();
 
    const fetch=(file)=>{
        var formData = new FormData();
        formData.append('Request.Language', app.langCode);
        formData.append('Request.OS',  os.os,);
        formData.append('Request.IP', os.ip);
        formData.append('Request.Browser', os.browser);
        formData.append('Request.Latitude', location.loaded ? location.coordinates.lat : 0);
        formData.append('Request.Longitude', location.loaded ? location.coordinates.lng : 0);
        formData.append('Request.Token', accessToken ? accessToken : "");
        formData.append('File', file);
        return formData
    }
  


  return [fetch];
};

export default useRequestFile;
