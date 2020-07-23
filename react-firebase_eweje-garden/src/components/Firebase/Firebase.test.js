import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Firebase from './Firebase';

describe('<Firebase />', () => {
  test('it should mount', () => {
    render(<Firebase />);
    
    const firebase = screen.getByTestId('Firebase');

    expect(firebase).toBeInTheDocument();
  });
});