import React from "react";

import Mapir from "mapir-react-component";
import { mapApiKey } from "../../data/constants";

const Map = Mapir.setToken({
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
const MapPlenty = ({ locations }) => {
  return (
    <div className="mapPlenty">
      <Mapir userLocation center={[51.42047, 35.729054]} Map={Map}>
        <Mapir.ZoomControl position={"top-left"} />
        {locations.map((l, i) => (
          <Mapir.Layer type="circle"  paint={{"circle-radius":l.value,"circle-color":"#CF9287","circle-opacity":0.5}}>
            <Mapir.Feature coordinates={[l.lng, l.lat]}></Mapir.Feature>
          </Mapir.Layer>
        ))}
      </Mapir>
    </div>
  );
};

export default MapPlenty;
