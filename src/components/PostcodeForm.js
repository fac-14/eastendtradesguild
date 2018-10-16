import React from "react";

export default class Form extends React.Component {
  errorDiv = string => {
    if (string === "Invalid postcode") {
      return "Sorry that postcode was not valid, please enter a valid postcode";
    }
    return "";
  };
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <label htmlFor="postcode">Postcode:</label>
        <input
          type="text"
          id="postcode"
          name="postcode"
          value={this.props.postcode}
          onChange={this.props.onChange}
        />
        <button type="submit">Submit</button>
        <div>{this.errorDiv(this.props.center)}</div>
      </form>
    );
  }
}
