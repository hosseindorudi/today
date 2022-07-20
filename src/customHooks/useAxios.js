import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ResultCodeEnum } from "../data/ResultCodeEnum";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const navigate = useNavigate();
  const sendToLogin = [
    ResultCodeEnum.Token_Empty,
    ResultCodeEnum.Token_Type,
    ResultCodeEnum.Token_Unauthorized,
    ResultCodeEnum.Token_Expired,
    ResultCodeEnum.Unauthorized_Os,
    ResultCodeEnum.Unauthorized_Ip,
    ResultCodeEnum.Unauthorized_Browser,
    ResultCodeEnum.Unauthorized_Location,
  ];
  const [loading, setLoading] = useState(false);
  const toastError = (error) => {
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setResponse(null);
  };
  const fetchData = async (params) => {
    try {
      setLoading(true);
      const result = await axios.request(params);
      const data=result.data
      const resultCode=result.data.Result
      if (resultCode === ResultCodeEnum.Ok) {
        setResponse(data);
      } else if (sendToLogin.includes(resultCode)) {
        toastError(data.Message);
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      } else {
        toastError(data.Message);
      }
    } catch (error) {
      toastError(error.message);
    } finally {
      setLoading(false);
     
    }
  };

  return [response, loading, fetchData, setResponse];
};
export default useAxios;
