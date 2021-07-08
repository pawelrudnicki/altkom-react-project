import React from "react";
import "leaflet/dist/leaflet.css";
import "./_map-location.scss";
import {CircleMarker, MapContainer, TileLayer} from "react-leaflet";
import _ from "lodash";

export default class MapLocation extends React.Component {
    render() {
        const {cords} = this.props;
        if (!cords || _.isEmpty(cords)) return "No history.";
        return (
            <MapContainer style={{height: "100%", width: "100%"}} center={cords} zoom={13} scrollWheelZoom={false}>
                <TileLayer attribution={""} url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                <CircleMarker center={cords}/>
            </MapContainer>
        );
    }
}