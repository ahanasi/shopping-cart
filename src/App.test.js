import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('full app rendering/navigating', () => {
    const { container } = render(<App />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
  });
});
