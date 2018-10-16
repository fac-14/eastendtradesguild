import React, { Component } from "react";
import Map from "./Map";
import PostcodeForm from "./PostcodeForm";
import styled from "styled-components";
import Landing from "./Landing";
import Header from "./Header";

const FullScreenContainer = styled.div.attrs({
  className: "vh-100 vw-100 near-black avenir"
})``;

class App extends Component {
  state = {
    response: "",
    markers: false,
    loaded: false,
    postcode: "",
    center: [],
    postcodeInv: false
  };

  componentDidMount() {
    this.showLoadingScreen();
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
  // Check if status code is 404 --> if so return error string and if not create lat long array
  createLatLongArr = object => {
    if (object.status === 404) {
      this.setState({ postcodeInv: true })
      return defaultLocation
    } this.setState({ postcodeInv: false })
    return [Object.values(object.result)[7], Object.values(object.result)[6]];
  };

  handleInvalidPostcode = () => {
    if (this.state.postcodeInv) {
      return 'please enter a valid postcode'
    }
  }

  //Conditional Map render on location
  handleUserLocation = arr => {
    if (arr.length === 0) {
      return (
        <PostcodeForm
          onSubmit={this.handleSubmit}
          postcode={this.state.postcode}
          center={this.state.center}
          onChange={this.handleChange}
          handleInvalidPostcode={this.handleInvalidPostcode}
        />
      );
    }
    return <Map markers={this.state.markers} center={this.state.center} />;
  };

  // Loading Screen Function
  showLoadingScreen = () => {
    const loadingTime = 2000;
    setTimeout(() => this.setState({ loaded: true }), loadingTime);
  };

  render() {
    const { loaded, markers, center } = this.state;
    return (
      <FullScreenContainer>
        {(!loaded || !markers) && <Landing />}
        <Header />
        {markers &&
          loaded && (
            this.handleUserLocation(center)
          )}
      </FullScreenContainer>
    );
  }
}
//   render = () => {
//     return (
//       <div className="App">{this.handleUserLocation(this.state.center)}</div>
//     );
//   };
// }

export default App;
