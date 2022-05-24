import { useState, useEffect } from "react";
import axios from 'axios';
import Platform from 'react-platform-js'


const useOsInformation = () => {
    const [osInfo, setOsInfo] = useState({
        ip:undefined,
        os:undefined,
        browser:undefined
    })

    useEffect(()=> {

        const getData = async()=>{
            const res = await axios.get('https://geolocation-db.com/json/')
            setOsInfo({
                ip:res.data.IPv4,
                os:Platform.OS,
                browser:Platform.Browser
            })
        }

        
       

        getData();

        



    },[])

    return osInfo ;
    
}

export default useOsInformation;