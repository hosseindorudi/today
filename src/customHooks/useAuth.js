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
  const { app } = useContext(AppContext);
  const { os } = useContext(OsContext);
  const location = useGeoLocation();
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
       return 
      }
      return handleLogOut()
    }
    return handleLogOut()
    
  }
        
  return [verifyToken];
}

export default useAuth