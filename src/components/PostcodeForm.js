import React, { Component } from "react";

export default class Form extends Component {
  // errorDiv = string => {
  //   if (string === 'Invalid postcode') {
  //     return "Please enter a valid postcode";
  //   }
  //   return "";
  // };
  render() {
    return (
      <form className='pa7' onSubmit={this.props.onSubmit}>
        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          value={this.props.postcode}
          onChange={this.props.onChange}
        />
        <button type="submit">Submit</button>
        <div>{this.props.handleInvalidPostcode()}</div>
      </form>
    );
  }
}
