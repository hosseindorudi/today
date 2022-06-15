
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

const useButtonAccess = () => {
  
  const { app } = useContext(AppContext);
    const AccessList=app.AccessList
  const havAccess=(key)=>{
    if(AccessList?.includes(key)){
        return true
    }
    return false
  }
        
  return [havAccess];
}

export default useButtonAccess