const { render, cleanup } = require('react-testing-library');
import React from 'react';
import Map from './Map';

afterAll(cleanup);

describe('Map', () => {
    it('renders without crashing', () => {
        render(<Map />);
    });
});
