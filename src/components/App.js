import React, { Component } from "react";
// import Map from "./Map";
import PostcodeForm from "./PostcodeForm";

class App extends Component {
  state = {
    response: "",
    markers: [],
    centerPostcode: '',
    center: [51.564162, -0.107777]
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

  render = () => {
    return (
      <div className="App">
        {/* <Map markers={this.state.markers} center={this.state.center} /> */}
        <PostcodeForm value={this.state.centerPostcode} />
      </div>
    );
  }
}

export default App;
