import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  state = {
    response: "",
    markers: [
      {
        ID: "marker1",
        geolocation: "[51.5, -0.1]",
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        price_sqft: "£14",
        use_class: "A1"
      },
      {
        ID: "marker2",
        geolocation: "[51.51, -0.1]",
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        price_sqft: "£14",
        use_class: "A2"
      },
      {
        ID: "marker3",
        geolocation: "[51.49, -0.05]",
        name: "Pure Cyprus",
        postcode: "N4 3HQ",
        address: "14 Goodwin Street, London",
        price_sqft: "£14",
        use_class: "A1"
      }
    ]
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ markers: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // componentWillUnmount() {
  //   this._mounted = false;
  // }

  callApi = async () => {
    const response = await fetch("/api/get_locations");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  render() {
    return (
      <div className="App">
        <Map markers={this.state.markers} />
      </div>
    );
  }
}

export default App;
