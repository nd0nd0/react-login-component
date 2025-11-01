import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { renderWithProviders } from '../test/test-utils';

describe('Login Component', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with all required elements', () => {
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('updates input values when user types', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for password shorter than 6 characters', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(passwordInput, '12345');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('clears field errors when user starts typing', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Trigger validation error
    await user.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    // Start typing to clear error
    await user.type(emailInput, 'test@example.com');
    
    await waitFor(() => {
      expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('disables form inputs and button when loading', () => {
    renderWithProviders(<Login onSubmit={mockOnSubmit} isLoading={true} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /signing in/i });

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Invalid credentials';
    renderWithProviders(<Login onSubmit={mockOnSubmit} error={errorMessage} />);

    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });

  it('prevents form submission when loading', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} isLoading={true} />);

    const submitButton = screen.getByRole('button', { name: /signing in/i });
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<Login onSubmit={mockOnSubmit} error="Test error" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('autoComplete', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    
    // Check for error message alert
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('handles form submission with Enter key', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('validates email format correctly', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    // Test valid email formats
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+tag@example.org',
    ];

    for (const email of validEmails) {
      await user.clear(emailInput);
      await user.clear(passwordInput);
      await user.type(emailInput, email);
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          email,
          password: 'password123',
        });
      });

      mockOnSubmit.mockClear();
    }
  });

  it('shows appropriate CSS classes for error states', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveClass('border-red-500');
      expect(emailInput).toHaveClass('bg-red-900/20');
    });
  });
});