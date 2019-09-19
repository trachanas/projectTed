import React, { Component } from 'react';
import { connect } from 'react-redux'

import { setCoords } from "../actions/product-actions";


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


const MyMarker = props => {

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    }

    return <Marker ref={initMarker} {...props}/>
}



class GetCoordsFromMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPos: null
        };
    }

    handleClick = (e) => {
        this.props.setCoords(e.latlng);
        this.setState({currentPos: e.latlng})
    }
    render() {

        return (
            <div>
                <Map
                    style={{ height: "480px", width: "100%" }}
                    zoom = {2}
                    center={[-0.09, 51.505]}
                    onClick={this.handleClick}
                >

                    <TileLayer url = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                    { this.state.currentPos && <MyMarker position={this.state.currentPos}>
                        <Popup position={this.state.currentPos}>
                            Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                        </Popup>
                    </MyMarker>}

                </Map>
            </div>
        );
    }
}


const mapDispatchToProps = { setCoords };

export default connect(null,  mapDispatchToProps)(GetCoordsFromMap);



