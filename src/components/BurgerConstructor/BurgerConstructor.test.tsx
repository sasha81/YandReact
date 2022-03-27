import React from 'react';
import { render, screen } from '@testing-library/react';
import {getSortedData} from './BurgerConstructor';

test('renders BUrgerConstructor with test data', () => {
  //render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});