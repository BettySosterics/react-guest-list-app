import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import AppTest from './AppTest';

test('renders learn react link', () => {
  render(<AppTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
