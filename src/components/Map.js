import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Icon from './MarkerIcon';
import L from 'leaflet';
import './Map.css';

type Props = {|
  name: string,
  geolocation: string,
  postcode: string,
  address: string,
  price_sqft: number,
  use_class: string,
|};

type MarkerData = {| ...Props, key: string |};

const iconSelect = useClass =>
  L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />),
  });

const MarkerWithPopup = ({
  name,
  geolocation,
  postcode,
  address,
  price_sqft,
  use_class,
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
    <Tooltip
      offset={[-24, -23]}
      className="price-icon"
      direction="center"
      opacity={1}
      permanent
    >
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
    <Map
      className="h-100 w-100"
      center={props.center}
      zoom={16}
      maxZoom={18}
      preferCanvas={true}
    >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        <Markers markers={props.markers} />
      </MarkerClusterGroup>
    </Map>
  );
};
