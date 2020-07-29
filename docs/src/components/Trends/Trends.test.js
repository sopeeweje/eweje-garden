import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Trends from './Trends';

describe('<Trends />', () => {
  test('it should mount', () => {
    render(<Trends />);
    
    const trends = screen.getByTestId('Trends');

    expect(trends).toBeInTheDocument();
  });
});