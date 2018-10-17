import React, { Component } from "react";
import styled from 'styled-components';
import logo from './assets/logo.png';

const LargeCenteredImage = styled.img.attrs({
  className: 'w4 h4 pv2 mb2',
})``;

const Form = styled.form.attrs({
  className: 'w5 center flex flex-column items-center justify-center avenir bg-yellow pa2 br3'
})``;

const Button = styled.button.attrs({
  className: 'f6 grow no-underline br-pill ph3 pv2 mv2 dib white bg-hot-pink avenir button-reset b-none'
})``;

const Warning = styled.div.attrs({
  className: 'mv2 dark-pink'
})``

export default class SearchForm extends Component {
  render() {
    let inputClasses;
    if (this.props.showWarning) {
      inputClasses = 'mt2 dark-pink'
    } else {
      inputClasses = 'mt2'
    }
    return (
      <Form onSubmit={this.props.onSubmit}>
        <LargeCenteredImage src={logo} />
        <label htmlFor="postcode">Enter your postcode to compare business rental prices</label>
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
