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
  clickFunction,
}: Props) => {
  const price = price_sqft.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return (
    <Marker position={JSON.parse(geolocation)} icon={iconSelect(use_class)}>
      <Popup>
        <ul>
          <li>{address}</li>
          <li>{postcode}</li>
          <li>£{price} /sqft</li>
          <li>{use_class}</li>
          <li onClick={() => console.log('clicked')}>See More</li>
        </ul>
      </Popup>
      <Tooltip
        offset={[-20, -25]}
        className="price-icon avenir"
        direction="center"
        opacity={1}
        permanent
      >
        <div className="f6 b {price.length < 4 && ml2}">£{price}</div>
        <div className="f7 ml3">/sqft</div>
      </Tooltip>
    </Marker>
  );
};

const Markers = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MarkerWithPopup key={key} {...props} />
  ));
  return <React.Fragment>{items}</React.Fragment>;
};

const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'f6 link dim br-pill w2 h2 pt2 dib white bg-dark-pink tc b',
    iconSize: L.point(40, 40, true),
  });
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
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        spiderLegPolyLineOptions={{ opacity: 0 }}
      >
        <Markers markers={props.markers} />
      </MarkerClusterGroup>
    </Map>
  );
};
