import React, { Component } from "react";
import Map from "./Map";
import PostcodeForm from "./PostcodeForm";
import styled from "styled-components";
import Landing from "./Landing";
import Header from "./Header";
import Modal from 'react-responsive-modal';

const FullScreenContainer = styled.div.attrs({
  className: "vh-100 vw-100 near-black avenir"
})``;
const defaultLocation = [51.564162, -0.107777];

class App extends Component {
  state = {
    response: "",
    markers: false,
    loaded: false,
    postcode: "",
    center: defaultLocation,
    postcodeInv: false,
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
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
    this.setState({ postcode: value });
  };

  // grab postcode and make api call to postcodesIo to get lat Long
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

  // function to create lat long array to update the center key in state
  // Check if postcode exists or not depending on status code
  // if status code 404 update status and keep center at default location, otherwise return lat long array
  createLatLongArr = object => {
    if (object.status === 404) {
      this.setState({ postcodeInv: true })
      return defaultLocation
    } this.setState({ postcodeInv: false })
    return [Object.values(object.result)[7], Object.values(object.result)[6]];
  };

  // if invalid postcode show div with message
  handleInvalidPostcode = () => {
    if (this.state.postcodeInv) {
      return 'please enter a valid postcode'
    }
  }

  //function to either render form or map
  // if the center is default then render form to put in postcode
  handleUserLocation = arr => {
    if (this.state.center === defaultLocation) {
      return (
        <div>
          <button className='ma5' onClick={this.onOpenModal}>Enter Postcode</button>
          <Modal open={this.state.open} onClose={this.onCloseModal} center>
            <PostcodeForm
              onSubmit={this.handleSubmit}
              postcode={this.state.postcode}
              center={this.state.center}
              onChange={this.handleChange}
              handleInvalidPostcode={this.handleInvalidPostcode}
            />
          </Modal>
        </div>
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
        <Header onOpenModal={this.onOpenModal} />
        {markers &&
          loaded && (
            this.handleUserLocation(center)
          )}
      </FullScreenContainer>
    );
  }
}

export default App;
