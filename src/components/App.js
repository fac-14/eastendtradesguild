import React, { Component } from "react";
import Map from "./Map";
import PostcodeForm from "./PostcodeForm";

class App extends Component {
  state = {
    response: "",
    markers: [],
    postcode: "",
    center: [] || ""
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

  callApi = async () => {
    const response = await fetch("/api/get_locations");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // FORM FUNCTIONS

  handleChange = event => {
    const value = event.target.value;
    this.setState({ postcode: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const postcode = this.state.postcode;
    this.apiCallGeo(postcode);
  };

  apiCallGeo = postcode => {
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
      .then(res => res.json())
      .then(json => this.createLatLongArr(json))
      .then(array => this.setState({ center: array }));
  };

  createLatLongArr = object => {
    if (object.status === 404) {
      return object.error;
    }
    return [Object.values(object.result)[7], Object.values(object.result)[6]];
  };

  //Conditional Map render on location

  handleUserLocation = arr => {
    if (arr.length === 2) {
      console.log("Hello");
      return <Map markers={this.state.markers} center={this.state.center} />;
    }
    return (
      <PostcodeForm
        onSubmit={this.handleSubmit}
        postcode={this.state.postcode}
        center={this.state.center}
        onChange={this.handleChange}
      />
    );
  };

  render = () => {
    return (
      <div className="App">{this.handleUserLocation(this.state.center)}</div>
    );
  };
}

export default App;
