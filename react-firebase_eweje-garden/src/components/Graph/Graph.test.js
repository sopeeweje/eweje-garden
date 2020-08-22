import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Graph from './Graph';

describe('<Graph />', () => {
  test('it should mount', () => {
    render(<Graph />);
    
    const graph = screen.getByTestId('Graph');

    expect(graph).toBeInTheDocument();
  });
});