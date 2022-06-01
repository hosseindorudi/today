import { useState, useEffect } from "react";


const useGeoLocation = () => {
    const [geoLocation, setGeoLocation] = useState({
        lat:undefined,
        lng:undefined
    })

    useEffect(()=> {

        const getLocation = () => {
            if (!navigator.geolocation) {
             console.log('Geolocation is not supported by your browser');
            } else {
              console.log('Locating...');
              navigator.geolocation.getCurrentPosition((position) => {
                  setGeoLocation({
                      lat:position.coords.latitude,
                      lng:position.coords.longitude
                  })
              }, () => {
                console.log('Unable to retrieve your location');
              });
            }
          }
        
        getLocation();

        



    },[])

    return geoLocation ;
    
}

export default useGeoLocation;