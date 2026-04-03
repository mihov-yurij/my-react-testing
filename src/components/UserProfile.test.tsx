import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
  describe('Static Content', () => {
    test('renders Vite + React heading', () => {
      render(<UserProfile />);
      const linkElement = screen.getByText(/Vite \+ React/i);
      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    test('counter increments when button is clicked', () => {
      render(<UserProfile />);
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('count is 0');
      fireEvent.click(button);
      expect(button).toHaveTextContent('count is 1');
    });
  });
});

