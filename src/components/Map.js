import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Icon from './MarkerIcon';
import L from 'leaflet';
import styled from 'styled-components';
import './Map.css';

type Props = {|
  name: string,
  geolocation: string,
  postcode: string,
  address: string,
  price_sqft: number,
  use_class: string,
  lease_length: string,
  date_of_last_rent_review: number,
  date_of_next_rent_review: number,
  square_feet: number,
  break_clauses: string,
|};

type MarkerData = {| ...Props, key: string |};

const iconSelect = useClass =>
  L.divIcon({
    className: 'custom-icon',
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />),
  });

const PopupLabel = styled.div.attrs({
  className: 'b mb1',
})``;

const PopupInfo = styled.div.attrs({
  className: 'mb1',
})``;

const CenteredSection = styled.div.attrs({
  className: 'w-100 tc bt bw1 pv3 mt3 ph2',
})``;

const Pill = styled.div.attrs({
  className: 'f6 br-pill ph3 pv2 mb2 dib white bg-hot-pink ml-auto mr-auto',
})``;

const MarkerWithPopup = ({
  geolocation,
  postcode,
  address,
  price_sqft,
  use_class,
  lease_length,
  date_of_last_rent_review,
  date_of_next_rent_review,
  square_feet,
  break_clauses,
}: Props) => {
  const price = price_sqft.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return (
    <Marker position={JSON.parse(geolocation)} icon={iconSelect(use_class)}>
      <Popup
        offset={[33, 15]}
        keepInView={true}
        maxHeight={300}
        className={'popup'}
      >
        <div className="pa0 avenir f5 tl mw5">
          <PopupLabel>Address:</PopupLabel>
          <PopupInfo>
            {address}, {postcode}
          </PopupInfo>

          <PopupLabel>Use Class: </PopupLabel>
          <PopupInfo>
            <Pill>{use_class}</Pill>
          </PopupInfo>

          <PopupLabel>Square Feet</PopupLabel>
          <PopupInfo>{square_feet}</PopupInfo>

          <PopupLabel>Lease Length</PopupLabel>
          <PopupInfo>{lease_length}</PopupInfo>

          <PopupLabel>Last rent review</PopupLabel>
          <PopupInfo>{date_of_last_rent_review}</PopupInfo>

          <PopupLabel>Next rent review</PopupLabel>
          <PopupInfo>{date_of_next_rent_review}</PopupInfo>

          <PopupLabel>Break Clause</PopupLabel>
          <PopupInfo>{break_clauses}</PopupInfo>

          <CenteredSection>
            <PopupLabel>Was this useful?</PopupLabel>
            <PopupInfo>
              Help strengthen your community by adding your data
            </PopupInfo>
            <a
              href={'https://airtable.com/shrE0QRpUy9UH8Bor'}
              target={'_blank'}
            >
              <Pill>Add my data</Pill>
            </a>
          </CenteredSection>
        </div>
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

const createClusterCustomIcon = function(cluster) {
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
      zoom={13}
      maxZoom={18}
      preferCanvas={true}
    >
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        iconCreateFunction={createClusterCustomIcon}
        spiderLegPolylineOptions={{ opacity: 0 }}
        spiderfyDistanceMultiplier={2.2}
      >
        <Markers markers={props.markers} />
      </MarkerClusterGroup>
    </Map>
  );
};
