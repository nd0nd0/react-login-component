import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import App from './App';

// Mock the console.log to avoid output during tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('App Integration with Login', () => {
  beforeEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  it('successfully logs in with correct credentials', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Fill in the login form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Check loading state
    expect(screen.getByText('Logging in...')).toBeInTheDocument();

    // Wait for login to complete and welcome message to appear
    await waitFor(
      () => {
        expect(screen.getByText(/welcome, admin@example.com!/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Check logout button is present
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('shows error message with incorrect credentials', async () => {
    const user = userEvent.setup();
    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Wait for error message
    await waitFor(
      () => {
        expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Should still be on login page
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('allows logout and returns to login form', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Login first
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Wait for login to complete
    await waitFor(
      () => {
        expect(screen.getByText(/welcome, admin@example.com!/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    await user.click(logoutButton);

    // Should return to login form
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });
});