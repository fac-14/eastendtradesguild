import React, { Component } from 'react';
import './App.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class App extends Component {
  state = {
    response: '',
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
    const position = [this.state.lat, this.state.lng]
    return (
      <div className="App">
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
