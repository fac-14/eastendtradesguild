import React, { Component } from "react";
import Map from "./Map";
import PostcodeForm from "./PostcodeForm";
import styled from "styled-components";
import Landing from "./Landing";
import Header from "./Header";

const FullScreenContainer = styled.div.attrs({
  className: "vh-100 vw-100 near-black avenir"
})``;

const ModalContainer = styled.div.attrs({
  className: "vh-100 w-100 fixed top-0 left-0 z-max flex items-center justify-center"
})``;

const ModalOverlay = styled.div.attrs({
  className: "vh-100 w-100 fixed top-0 left-0 z-9999 o-70 bg-white"
})``;

class App extends Component {
  state = {
    markers: false,
    loaded: false,
    searchInput: "",
    center: false,
    showFormWarning: false,
  };

  defaultLocation = [51.5197507, -0.0775895];

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
  // api call made to backend to fetch airtable object
  callApi = async () => {
    const response = await fetch("/api/get_locations");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // FORM FUNCTIONS

  // handle input value in postcode field and update state
  handleChange = event => {
    const value = event.target.value;
    this.setState({ searchInput: value, showFormWarning: false });
  };

  // grab postcode and make api call to postcodesIo to get lat Long
  handleSubmit = event => {
    event.preventDefault();
    const postcode = this.state.searchInput;
    if (postcode.length === 0) {
      return this.setState({ showFormWarning: "Please enter a postcode" })
    } else {
      this.apiCallGeo(postcode);
    }
  };

  apiCallGeo = postcode => {
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
      .then(res => res.json())
      .then(res => this.checkResponse(res))
  };

  // function to create lat long array to update the center key in state
  // Check if postcode exists or not depending on status code
  // if status code 404 update status and keep center at default location, otherwise return lat long array
  checkResponse = res => {
    if (res.status === 404) {
      return this.setState({ showFormWarning: "Please enter a valid postcode", center: false })
    }
    const location = [Object.values(res.result)[7], Object.values(res.result)[6]];
    return this.setState({ showFormWarning: false, center: location })
  };


  //function to either render form or map
  // if the center is default then render form to put in postcode
  showPostcodeSearch = arr => {
    if (this.state.center === false) {
      return (
        <div>
          <PostcodeForm
            onSubmit={this.handleSubmit}
            postcode={this.state.searchInput}
            onChange={this.handleChange}
            showWarning={this.state.showFormWarning}
          />
        </div>
      );
    }
    //return <Map markers={this.state.markers} center={this.state.center} />;
  };

  // Loading Screen Function
  showLoadingScreen = () => {
    const loadingTime = 2000;
    setTimeout(() => this.setState({ loaded: true }), loadingTime);
  };

  render() {
    const { loaded, markers, center } = this.state;
    const modal = < ModalContainer>{this.showPostcodeSearch(center)}</ModalContainer>
    return (
      <React.Fragment>
        <FullScreenContainer>
          {(!loaded || !markers) && <Landing />}
          <Header />
          {markers &&
            loaded && (
              <Map markers={this.state.markers} center={this.state.center || this.defaultLocation} />
            )}
        </FullScreenContainer>
        {loaded && markers && !center && <ModalOverlay />}
        {loaded && markers && !center && modal}
      </React.Fragment>
    );
  }
}

export default App;
