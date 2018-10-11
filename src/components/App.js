import React, { Component } from 'react';
import Header from './Header';

class App extends Component {
  state = {
    response: '',
  };

  componentDidMount() {
    this._mounted = true;
    this.callApi()
      .then(res => {
        this.setState({ response: res.express });
      })
      .catch(err => {
        console.log(err);
      });
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
      <div className="App">
        <Header />
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
