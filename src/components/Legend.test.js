const { render, cleanup } = require('react-testing-library');
import React from 'react';
import Legend from './Legend';

afterAll(cleanup);

describe('Legend', () => {
    it('renders without crashing', () => {
        render(<Legend />);
    });
});
