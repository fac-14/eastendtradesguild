import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  state = {
    response: "",
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  };

  // componentDidMount() {
  //   this._mounted = true;
  //   this.callApi()
  //     .then(res => {
  //       this.setState({ response: res.express });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // componentWillUnmount() {
  //   this._mounted = false;
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
