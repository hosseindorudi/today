import Mapir from "mapir-react-component";
import { useState } from "react";
import { mapApiKey } from "../../data/constants";
import "./map.css";

const Map = Mapir.setToken({
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "x-api-key": mapApiKey, //Mapir api key
        "Mapir-SDK": "reactjs"
      }
    };
  }
});
const MapComponent = (props) => {
  const [markerArray, setMarkerArray] = useState([]);
  const [coord, setCoord] = useState([35.7315788,51.407904]);
  function reverseFunction(map, e) {
    var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${
      e.lngLat.lng
    }`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": mapApiKey
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
    const array = [];
    array.push(
      <Mapir.Marker
        coordinates={[e.lngLat.lng, e.lngLat.lat]}
        anchor="bottom"
      />
    );
    setMarkerArray(array);
  }
  return (
    <div className="map">
      <Mapir
       center={coord} Map={Map} onClick={reverseFunction}
       userLocation
      >
        <Mapir.ZoomControl position={"top-left"} />
        {markerArray}
      </Mapir>
    </div>
  );
};
export default MapComponent;
