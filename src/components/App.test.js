import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, cleanup } from 'react-testing-library';

beforeEach(() => {
  // disable console as we're testing some error handling which should throw up errors
  global.console.error = jest.fn().mockImplementation(() => {});
  global.console.log = jest.fn().mockImplementation(() => {});
});
afterEach(() => {
  cleanup;
  global.console.error.mockRestore();
  global.console.log.mockRestore();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('makes an API call', () => {
  const mockResponse = { express: 'Hello From Express' };
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockResponse),
    })
  );
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

it('throws an error when receiving 500 status code', () => {
  const mockResponse = { message: 'Server Error' };
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      status: 500,
      message: 'Server Error',
      json: () => Promise.resolve(mockResponse),
    })
  );
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
