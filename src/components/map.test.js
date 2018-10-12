import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map";
import { render, cleanup } from "react-testing-library";

it("Map renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<Map />, div);
  ReactDOM.unmountComponentAtNode(div);
});
