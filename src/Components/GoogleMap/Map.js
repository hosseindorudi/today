import React from "react";
import Mapir from "mapir-react-component";
import './mapStyles.css'
const Map = Mapir.setToken({
  transformRequest: url => {
    return {
      url: url,
      headers: {
        "x-api-key": 'your-api-key', //Mapir api key
        "Mapir-SDK": "reactjs"
      }
    };
  }
});
const MapIr = () => {
  return (
    <div className="map">
      <Mapir center={[51.42047, 35.729054]} Map={Map} />
    </div>
  );
};
export default MapIr;