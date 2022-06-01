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
        const getLocation = () => {
            if (!navigator.geolocation) {
             console.log('Geolocation is not supported by your browser');
            } else {
              console.log('Locating...');
              navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
              }, () => {
                console.log('Unable to retrieve your location');
              });
            }
          }
        
       

        getData();
        getLocation();

        



    },[])

    return osInfo ;
    
}

export default useOsInformation;