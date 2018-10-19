import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './assets/logo.png';

const LargeCenteredImage = styled.img.attrs({
  className: 'w-40 w-70-l pv2 mb2',
})``;

const Form = styled.form.attrs({
  className:
    'w5 center flex flex-column items-center justify-center avenir bg-white pa3 br3 o-100 tc',
})``;

const Button = styled.button.attrs({
  className:
    'f6 grow no-underline br-pill ph3 pv2 mv2 dib white bg-hot-pink avenir button-reset b-none',
})`
box-shadow: none
border: none !important`;

const Warning = styled.div.attrs({
  className: 'mv2 dark-pink',
})``;

const Closer = styled.div.attrs({
  className: 'f4 mr0 ml-auto avenir',
})``;

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
