import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Header";

import logo from "./assets/logo.png";

const LargeCenteredImage = styled.img.attrs({
  className: "h-75 "
})``;

class App extends Component {
  state = {
    response: ""
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
    const response = await fetch("/api/get_locations");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body);
    return body;
  };

  render() {
    return (
      <div className="App vh-100 vw-100">
        <Header />
        <div className=" debug flex justify-center items-center h-75 w-100 ">
          <LargeCenteredImage src={logo} alt="East End Trades Guild" />
        </div>
      </div>
    );
  }
}

export default App;
