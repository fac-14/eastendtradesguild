const { render, cleanup } = require('react-testing-library');
import React from 'react';
import PostcodeForm from './PostcodeForm';

afterAll(cleanup);

describe('PostcodeForm', () => {
  let searchInput = '';
  it('renders without crashing', () => {
    render(<PostcodeForm
      onSubmit={jest.fn()}
      postcode={searchInput}
      onChange={jest.fn()}
      showWarning={false} />);
  });
  it('renders with a warning', () => {
    render(<PostcodeForm
      onSubmit={jest.fn()}
      postcode={searchInput}
      onChange={jest.fn()}
      showWarning="Test Warning" />);
  });
});
