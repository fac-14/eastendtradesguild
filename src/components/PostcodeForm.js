import React, { Component } from 'react';
import {
  Form,
  Closer,
  LargeCenteredImage,
  Warning,
  Button,
} from './PostcodeForm.styles';
import logo from './assets/logo.png';

export default class SearchForm extends Component {
  render() {
    let inputClasses;
    if (this.props.showWarning) {
      inputClasses = 'input-reset ba b--black-20 pa2 db mt2 dark-pink';
    } else {
      inputClasses = 'input-reset ba b--black-20 pa2 db mt2';
    }
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Closer onClick={this.props.closeSearch}>&times;</Closer>
        <LargeCenteredImage src={logo} />
        <label htmlFor="postcode">
          Enter your postcode to compare business rental prices
        </label>
        <input
          className={inputClasses}
          type="text"
          id="postcode"
          name="postcode"
          value={this.props.postcode}
          onChange={this.props.onChange}
        />
        <Warning>{this.props.showWarning}</Warning>
        <Button type="submit">Show me</Button>
      </Form>
    );
  }
}
