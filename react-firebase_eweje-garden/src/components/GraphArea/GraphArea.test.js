import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GraphArea from './GraphArea';

describe('<GraphArea />', () => {
  test('it should mount', () => {
    render(<GraphArea />);
    
    const grapharea = screen.getByTestId('GraphArea');

    expect(grapharea).toBeInTheDocument();
  });
});