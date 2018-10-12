import React, { Component } from 'react';
import styled from 'styled-components';
import Header from './Header';
import appTitle from './assets/app_title.png';

import logo from './assets/logo.png';

const LargeCenteredImage = styled.img.attrs({
  className: 'w-100 h-auto pv2',
})``;

const HeaderTitle = styled.img.attrs({
  className: 'w-70 mw5',
})``;

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    // this._mounted = true;
    // this.callApi()
    //   .then(res => {
    //     this.setState({ response: res.express });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  callApi = async () => {
    const response = await fetch('/api/get_locations');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App vh-100 vw-100">
        <div className="w-70 w-40-ns h-100 mw5 center flex flex-column items-center justify-center">
          <LargeCenteredImage src={logo} />
          <HeaderTitle src={appTitle} />
        </div>
      </div>
    );
  }
}

export default App;
