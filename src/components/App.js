import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  state = {
    response: ""
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

  callApi = async () => {
    const response = await fetch('/api/g');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
