import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  state = {
    response: "",
    markers: []
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
    console.log(body);
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
