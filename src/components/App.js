import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Map from './Map';

const FullScreenContainer = styled.div.attrs({
  className: 'vh-100 vw-100 near-black avenir',
})``;

class App extends Component {
  state = {
    response: '',
    markers: [],
    center: [51.564162, -0.107777],
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
    const response = await fetch('/api/get_locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <FullScreenContainer>
        <Header />
        <Map markers={this.state.markers} center={this.state.center} />
      </FullScreenContainer>
    );
  }
}

export default App;
