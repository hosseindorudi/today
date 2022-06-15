import axios from "axios";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { OsContext } from "../contexts/OsInformationProvider";
import { verify } from "../services/authService";
import useGeoLocation from "./useGeoLocation";
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'https://api.ctelecom.ir';
const useAuth = () => {
  const navigate=useNavigate()
  const { app,setApp } = useContext(AppContext);
  const { os } = useContext(OsContext);
  const location = useGeoLocation();
  const roles=[109102,110101,110102,108102,107101,107102,105102,104102,103102,102102,102101,107106]
  const verifyToken=async()=>{
    const handleLogOut=()=>{
      localStorage.removeItem("token")
      navigate("/", { replace: true });
    }
    const accessToken=localStorage.getItem("token")
    const params={
      method: "POST",
      url: verify,
      headers: {
        accept: "*/*",
      },
      data:{
        language: app.langCode,
        os: os.os,
        browser: os.browser,
        ip: os.ip,
        token: accessToken ? accessToken : "",
        latitude: location.loaded ? location.coordinates.lat : 0,
        longitude: location.loaded ? location.coordinates.lng : 0,
      }
    }
    const result = await axios.request(params);
    if(result.data){
      if(result.data.Result){
       return   setApp((prev) => ({
        ...prev,
        roles
      }));
      }
      return handleLogOut()
    }
    return handleLogOut()
    
  }
        
  return [verifyToken];
}

export default useAuth