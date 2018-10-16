import React, { Component } from 'react';
import styled from 'styled-components';
import Landing from './Landing';
import Header from './Header';
import Map from './Map';

const FullScreenContainer = styled.div.attrs({
  className: 'vh-100 vw-100 near-black avenir',
})``;

const ModalContainer = styled.div.attrs({
  className: 'vh-100 vw-100 near-black avenir fixed top-0 left-0 z-999',
})``;

class App extends Component {
  state = {
    markers: false,
    loaded: false,
    center: [51.564162, -0.107777],
    modal: false,
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
    const response = await fetch('/api/get_locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  showLoadingScreen = () => {
    const loadingTime = 2000;
    setTimeout(() => this.setState({ loaded: true }), loadingTime);
  };

  render() {
    const { loaded, markers, modal } = this.state;
    return (
      <React.Fragment>
        <FullScreenContainer>
          {(!loaded || !markers) && <Landing />}
          <Header />
          {markers &&
            loaded && (
              <Map
                modal={this.state.modal}
                markers={this.state.markers}
                center={this.state.center}
              />
            )}
        </FullScreenContainer>
      </React.Fragment>
    );
  }
}

export default App;
