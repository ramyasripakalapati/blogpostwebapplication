import { render, screen } from '@testing-library/react';
import App from './App';

test('renders create a post link', () => {
  render(<App />);
  const linkElement = screen.getByText(/create a post/i); // Update this with a text you expect to find in the app
  expect(linkElement).toBeInTheDocument();
});
