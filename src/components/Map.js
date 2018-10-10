import React, { Component } from "react";
import ReactDOMServer from 'react-dom/server';
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import Icon from "./MarkerIcon";
import L from 'leaflet';

type Position = [number, number];

type Props = {|
  name: string,
    position: Position,
      postcode: string,
        address: string,
          priceSQFT: string,
            useClass: string
              |};

type MarkerData = {| ...Props, key: string |};

const iconSelect = useClass => (
  L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon iconText={useClass} />)
  })
);

const MyPopupMarker = ({
  name,
  position,
  postcode,
  address,
  priceSQFT,
  useClass
}: Props) => (
    <Marker position={position} icon={iconSelect(useClass)}>
      <Popup>
        <ul>
          <li>{name}</li>
          <li>{postcode}</li>
          <li>{address}</li>
          <li>{priceSQFT}</li>
          <li>{useClass}</li>
        </ul>
      </Popup>
      <Tooltip direction="center" offset={[-3, -45]} opacity={1} permanent>
        <span>{priceSQFT}</span>
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
  state = {
    markers: [
      {
        key: "marker1",
        position: [51.5, -0.1],
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        priceSQFT: "£14",
        useClass: 'A1'
      },
      {
        key: "marker2",
        position: [51.51, -0.1],
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        priceSQFT: "£14",
        useClass: 'A2'
      },
      {
        key: "marker3",
        position: [51.49, -0.05],
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        priceSQFT: "£14",
        useClass: 'A1'
      }
    ]
  };

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList markers={this.state.markers} />
      </Map>
    );
  }
}
