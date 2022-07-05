import Mapir from "mapir-react-component";
import { useState } from "react";
import { mapApiKey } from "../../data/constants";
import "./map.css";

const Map = Mapir.setToken({
  //factory parameters
  hash: true,
  logoPosition: "top-left",
  maxZoom: [16],
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key": mapApiKey, //Mapir api key
        "Mapir-SDK": "reactjs",
      },
    };
  },
});
const MapComponent = (props) => {
  const [lat, setLat] = useState(51.42047)
  const [lng, setLng] = useState(35.729054)
  const reverseFunction=(map, e)=>{
  var url = `https://map.ir/reverse/no?lat=${lat}&lon=${lng}`
  fetch(url,
      {
          headers: {
              'Content-Type': 'application/json',
              'x-api-key': mapApiKey
          }
      })
      .then(response => response.json())
      .then(data => {
        setLat(e.lngLat.lat)
        setLng(e.lngLat.lng)
      })
    }
  return (
    <div className="map">
      <Mapir
        center={[lat, lng]}
        Map={Map}
        onClick={reverseFunction}
        userLocation
        // minZoom={[13]}
        // scrollZoom={true}
        // zoom={[12]}
        // interactive={true}
        // attributionControl={false}
      >
        <Mapir.ZoomControl position={"top-left"} />
        <Mapir.Marker
          coordinates={[lat, lng]}
          anchor="bottom"
         
        ></Mapir.Marker>
      </Mapir>
    </div>
  );
};
export default MapComponent;
