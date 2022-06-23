import axios from "axios";
import React, { useEffect, useState } from "react";
import Platform from 'react-platform-js'
export const OsContext = React.createContext({
  os: [],
  setOs: () => [],
});

const OsInformationProvider = (props) => {
  const [os, setOs] = useState({os:undefined,browser:undefined,ip:undefined});
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const getData = async()=>{
      const res = await axios.get('https://geolocation-db.com/json/')
      setOs({
          ip:res.data.IPv4,
          os:Platform.OS,
          browser:Platform.Browser
      })
      setLoading(false)
  }
  getData();
  }, [])

  return (
    <OsContext.Provider value={{ os: os,loadingg:loading, setOs: setOs }}>
      {props.children}
    </OsContext.Provider>
  );
};

export default OsInformationProvider;
