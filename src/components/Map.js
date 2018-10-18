import React from "react";
import ReactDOMServer from "react-dom/server";
import { Map, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Icon from "./MarkerIcon";
import L from "leaflet";
import styled from "styled-components";
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
                                        landlord_tenants_act: string
                                          |};

type MarkerData = {| ...Props, key: string |};

const useClassColor = {
  A1: "#ff80cc",
  A3: "#9eebcf",
  B1: "#96ccff",
  B2: "#fbf1a9",
  B8: "#ffb700",
  D1: "#a463f2",
  D2: "#ff6300",
  Other: "#fff"
};

const iconSelect = useClass =>
  L.divIcon({
    className: "custom-icon",
    html: ReactDOMServer.renderToString(<Icon useClass={useClass} />)
  });

const PopupLabel = styled.div.attrs({
  className: "b mb1"
})``;

const PopupInfo = styled.div.attrs({
  className: "mb1"
})``;

const CenteredSection = styled.div.attrs({
  className: "center w-90 tc bt bw1 pv3 mt3 ph2"
})``;

const Pill = styled.div.attrs({
  className: "f6 br-pill ph3 pv2 mb2 dib black b  ml-auto mr-auto"
})`
  background: ${props => useClassColor[props.use_class]};
`;

const Button = styled.a.attrs({
  className:
    "f6 grow no-underline br-pill ph3 pv2 mv2 dib link white bg-hot-pink avenir button-reset b-none"
})`
  color: white !important;
`;

// const Pill = styled.div.attrs({
//   className: "f6 br-pill ph3 pv2 mb2 dib white bg-hot-pink ml-auto mr-auto"
// })``;

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
  landlord_tenants_act
}: Props) => {
  const price = price_sqft.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  console.log(MarkerWithPopup)
  return (
    <Marker position={JSON.parse(geolocation)} icon={iconSelect(use_class)}>
      <Popup
        offset={[33, 15]}
        keepInView={true}
        maxHeight={300}
        className={"popup"}
      >
        <div className="pa0 avenir f5 tl mw5">
          {(address || postcode) &&
            <PopupLabel>Address:</PopupLabel>}
          <PopupInfo>
            {address}, {postcode}
          </PopupInfo>
          {(landlord_name) &&
            <PopupLabel>Landlord name</PopupLabel>}
          <PopupInfo>{landlord_name}</PopupInfo>
          {(use_class) &&
            <PopupLabel>Use Class: </PopupLabel>}
          <PopupInfo>
            <Pill use_class={use_class}>{use_class}</Pill>
          </PopupInfo>
          {(square_feet) &&
            <PopupLabel>Square Feet</PopupLabel>}
          <PopupInfo>{square_feet}</PopupInfo>
          {(yard_sqft) &&
            <PopupLabel>Yard square feet</PopupLabel>}
          <PopupInfo>{yard_sqft}</PopupInfo>
          {(yard_price_sqft) &&
            <PopupLabel>Yard price /sqft</PopupLabel>}
          <PopupInfo>{yard_price_sqft}</PopupInfo>
          {(lease_length) &&
            <PopupLabel>Lease Length</PopupLabel>}
          <PopupInfo>{lease_length}</PopupInfo>
          {(date_of_last_rent_review) &&
            <PopupLabel>Last rent review</PopupLabel>}
          <PopupInfo>{date_of_last_rent_review}</PopupInfo>
          {(date_of_next_rent_review) &&
            <PopupLabel>Next rent review</PopupLabel>}
          <PopupInfo>{date_of_next_rent_review}</PopupInfo>
          {(landlord_tenants_act) &&
            <PopupLabel>Landlord tennants act</PopupLabel>}
          <PopupInfo>{landlord_tenants_act}</PopupInfo>
          {(break_clauses) &&
            <PopupLabel>Break Clause</PopupLabel>}
          <PopupInfo>{break_clauses}</PopupInfo>
          {(restricted) &&
            <PopupLabel>Restricted</PopupLabel>}
          <PopupInfo>{restricted}</PopupInfo>
          {(specification) &&
            <PopupLabel>Specification</PopupLabel>}
          <PopupInfo>{specification}</PopupInfo>
          {(additional_comments) &&
            <PopupLabel>Additional comments</PopupLabel>}
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
  console.log('markers', markers[0])
  console.log('items', items)
  return <React.Fragment>{items}</React.Fragment>;
};

const createClusterCustomIcon = function (cluster) {
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
