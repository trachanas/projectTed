import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Map , Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


class OpenMap extends Component {

  render() {

    const { Latitude, Longitude } = this.props.coords;

    let position = [Latitude, Longitude];
    
    return (
      <div>
        <Map
          style={{ height: "480px", width: "100%" }}
          zoom={2}
          center={[-0.09, 51.505]}
        >
        
        <TileLayer url = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
        <Marker position={position}>
            <Popup>Our location</Popup>
        </Marker>

        </Map>
      </div>
    );
  }
}

const mapStateToProps = state =>  ({coords : state.products.coords})


export default connect(mapStateToProps)(OpenMap);



