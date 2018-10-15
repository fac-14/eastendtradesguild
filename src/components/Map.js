import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import Icon from "./MarkerIcon";
import L from "leaflet";

// type Position = [number, number];

type Props = {|
  name: string,
    geolocation: string,
      postcode: string,
        address: string,
          price_sqft: number,
            use_class: string
              |};

type MarkerData = {| ...Props, key: string |};

const iconSelect = () =>
  L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<div className="blank-marker" />)
  });

const MarkerWithPopup = ({
  name,
  geolocation,
  postcode,
  address,
  price_sqft,
  use_class
}: Props) => (
    <Marker position={JSON.parse(geolocation)} icon={iconSelect()}>
      <Popup>
        <ul>
          <li>{name}</li>
          <li>{postcode}</li>
          <li>{address}</li>
          <li>{price_sqft}</li>
          <li>{use_class}</li>
        </ul>
      </Popup>
      <Tooltip className="price-icon" direction="center" opacity={1} permanent>
        <div>£{price_sqft}</div>
        <div>/sqft</div>
      </Tooltip>
    </Marker>
  );

const Markers = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MarkerWithPopup key={key} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

export default props => {
  return (
    <Map center={[51.564162, -0.107777]} zoom={16}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers markers={props.markers} />
    </Map>
  );
}
