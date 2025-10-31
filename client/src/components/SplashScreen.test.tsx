import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/test-utils';
import userEvent from '@testing-library/user-event';
import SplashScreen from './SplashScreen';

describe('SplashScreen Component', () => {
  it('renders the splash screen with main content', () => {
    const mockOnContinue = vi.fn();
    render(<SplashScreen onContinue={mockOnContinue} />);

  // Check for heading (allowing for line breaks between words)
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/earn rewards for\s*every step you take/i);
    
    // Check for description text
    expect(screen.getByText(/more than tracking transform/i)).toBeInTheDocument();
    expect(screen.getByText(/walking into winning/i)).toBeInTheDocument();
  });

  it('renders the log in button', () => {
    const mockOnContinue = vi.fn();
    render(<SplashScreen onContinue={mockOnContinue} />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('calls onContinue when log in button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnContinue = vi.fn();
    render(<SplashScreen onContinue={mockOnContinue} />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    await user.click(loginButton);

    expect(mockOnContinue).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes on the button', () => {
    const mockOnContinue = vi.fn();
    render(<SplashScreen onContinue={mockOnContinue} />);

    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton).toHaveAccessibleName();
  });
});
