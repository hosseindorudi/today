
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

const useButtonAccess = () => {
  
  const { app } = useContext(AppContext);
    const roles=app.roles
  const isDisabled=(key)=>{
    if(roles?.includes(key)){
        return false
    }
    return true
  }
        
  return [isDisabled];
}

export default useButtonAccess