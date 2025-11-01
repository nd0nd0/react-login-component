import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from './App';
import { renderWithProviders, mockLoginSuccess, mockLoginError } from './test/test-utils';

// Mock the console.log to avoid output during tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

describe('App Integration with Login', () => {
  let mockFetch: any;

  beforeEach(() => {
    consoleSpy.mockClear();
    consoleErrorSpy.mockClear();
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully logs in with correct credentials', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response with a small delay to test loading state
    mockFetch.mockImplementation(() => 
      new Promise((resolve) => 
        setTimeout(() => resolve(mockLoginSuccess()), 100)
      )
    );
    
    renderWithProviders(<App />);

    // Fill in the login form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Check loading state appears
    await waitFor(() => {
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
    });

    // Wait for login to complete and welcome message to appear
    await waitFor(
      () => {
        expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
        expect(screen.getByText('admin@example.com')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify the API was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@example.com', password: 'password123' }),
      })
    );

    // Check logout button is present
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('shows error message with incorrect credentials', async () => {
    const user = userEvent.setup();
    
    // Mock failed API response
    mockFetch.mockResolvedValueOnce(mockLoginError('Invalid credentials'));
    
    renderWithProviders(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'wrong@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Wait for error message
    await waitFor(
      () => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify the API was called
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'wrong@example.com', password: 'wrongpassword' }),
      })
    );

    // Should still be on login page
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows logout and returns to login form', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response for login
    mockFetch.mockResolvedValueOnce(mockLoginSuccess());
    
    renderWithProviders(<App />);

    // Login first
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'admin@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Wait for login to complete
    await waitFor(
      () => {
        expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
        expect(screen.getByText('admin@example.com')).toBeInTheDocument();
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
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });
});