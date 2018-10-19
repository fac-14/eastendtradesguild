import React from "react";
// import ReactDOM from "react-dom";
import Map from "./Map";
// import { formatDate } from "./Map";
import { render, cleanup } from "react-testing-library";

const markers = [
  {
    key: 2,
    postcode: "N4 3HH",
    address: "15 Something Street",
    price_sqft: 9.5,
    use_class: "A1",
    date_of_last_rent_review: "2018-05-23",
    name: "Wish Fashion",
    geolocation: "[51.564261,-0.108292]"
  },
  {
    key: 3,
    postcode: "N4 3HQ",
    address: "14 Goodwin Street, London",
    price_sqft: 15,
    use_class: "A3",
    date_of_last_rent_review: "2018-04-01",
    name: "Pure Cyprus",
    geolocation: "[51.564162,-0.107777]"
  }
];

const wrongDate = "12/25/2018";

it("Map renders without crashing", () => {
  render(<Map markers={markers} />);
});

// test("Format date", () => {
//   expect(formatDate(wrongDate)).toBe("25/12/2018");
// });
