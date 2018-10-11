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

const iconSelect = useClass =>
  L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<Icon iconText={useClass} />)
  });

const MyPopupMarker = ({
  name,
  geolocation,
  postcode,
  address,
  price_sqft,
  use_class
}: Props) => (
  <Marker position={JSON.parse(geolocation)} icon={iconSelect(use_class)}>
    <Popup>
      <ul>
        <li>{name}</li>
        <li>{postcode}</li>
        <li>{address}</li>
        <li>{price_sqft}</li>
        <li>{use_class}</li>
      </ul>
    </Popup>
    <Tooltip direction="center" offset={[-3, -45]} opacity={1} permanent>
      <span>{price_sqft}</span>
    </Tooltip>
  </Marker>
);

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

type State = {
  markers: Array<MarkerData>
};

export default class CustomComponent extends Component<{}, State> {
  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList markers={this.props.markers} />
      </Map>
    );
  }
}
