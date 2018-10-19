import React from "react";
import ReactDOMServer from "react-dom/server";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Icon from "./MarkerIcon";
import L from "leaflet";
import {
  PopupInfo,
  PopupLabel,
  CenteredSection,
  Pill,
  Button
} from "./map.styles";
// import styled from "styled-components";
import "./Map.css";

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
  useColor: object,
  annual_rent: number,
  yard_sqft: number,
  yard_price_sqft: number,
  restricted: string,
  specification: string,
  landlord_name: string,
  additional_comments: string,
  landlord_tenants_act: string,
  service_charge: number
|};

type MarkerData = {| ...Props, key: string |};

// Date formatter //
export function formatDate(input) {
  if (input === undefined) {
    return input;
  }
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + "/" + month + "/" + year;
}
//

const iconSelect = useClass =>
  L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />)
  });

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
  yard_sqft,
  yard_price_sqft,
  restricted,
  specification,
  landlord_name,
  additional_comments,
  landlord_tenants_act,
  service_charge
}: Props) => {
  const price = price_sqft.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  return (
    <Marker position={JSON.parse(geolocation)} icon={iconSelect(use_class)}>
      <Popup
        offset={[33, 15]}
        keepInView={true}
        maxHeight={300}
        className={"popup"}
      >
        <div className="pa0 avenir f5 tl mw5">
          {(address || postcode) && <PopupLabel>Address:</PopupLabel>}
          <PopupInfo>
            {address}, {postcode}
          </PopupInfo>

          {landlord_name && <PopupLabel>Landlord name</PopupLabel>}
          <PopupInfo>{landlord_name}</PopupInfo>

          {use_class && <PopupLabel>Use Class: </PopupLabel>}
          <PopupInfo>
            <Pill use_class={use_class}>{use_class}</Pill>
          </PopupInfo>

          {square_feet && <PopupLabel>Square Feet</PopupLabel>}
          <PopupInfo>{square_feet}</PopupInfo>

          {yard_sqft && <PopupLabel>Yard square feet</PopupLabel>}
          <PopupInfo>{yard_sqft}</PopupInfo>

          {yard_price_sqft && <PopupLabel>Yard price /sqft</PopupLabel>}
          <PopupInfo>{yard_price_sqft}</PopupInfo>

          {lease_length && <PopupLabel>Lease Length</PopupLabel>}
          <PopupInfo>{lease_length}</PopupInfo>

          {date_of_last_rent_review && (
            <PopupLabel>Last rent review</PopupLabel>
          )}
          <PopupInfo>{formatDate(date_of_last_rent_review)}</PopupInfo>

          {date_of_next_rent_review && (
            <PopupLabel>Next rent review</PopupLabel>
          )}
          <PopupInfo>{formatDate(date_of_next_rent_review)}</PopupInfo>

          {landlord_tenants_act && (
            <PopupLabel>Landlord tennants act</PopupLabel>
          )}
          <PopupInfo>{landlord_tenants_act}</PopupInfo>

          {service_charge && <PopupLabel>Service charge</PopupLabel>}
          <PopupInfo>£{service_charge}</PopupInfo>

          {break_clauses && <PopupLabel>Break Clause</PopupLabel>}
          <PopupInfo>{break_clauses}</PopupInfo>

          {restricted && <PopupLabel>Restricted</PopupLabel>}
          <PopupInfo>{restricted}</PopupInfo>

          {specification && <PopupLabel>Specification</PopupLabel>}
          <PopupInfo>{specification}</PopupInfo>

          {additional_comments && <PopupLabel>Additional comments</PopupLabel>}
          <PopupInfo>{additional_comments}</PopupInfo>

          <CenteredSection>
            <PopupLabel>Was this useful?</PopupLabel>
            <PopupInfo>
              Help strengthen your community by adding your data
            </PopupInfo>

            <Button
              href={"https://airtable.com/shrE0QRpUy9UH8Bor"}
              target={"_blank"}
            >
              Add my data
            </Button>
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
    className: "f6 link dim br-pill w2 h2 pt2 dib white bg-dark-pink tc b",
    iconSize: L.point(40, 40, true)
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
        spiderLegPolylineOptions={{ opacity: 0 }}
        spiderfyDistanceMultiplier={2.2}
      >
        <Markers markers={props.markers} />
      </MarkerClusterGroup>
    </Map>
  );
};
