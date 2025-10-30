import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

/**
 * Custom render function for testing that includes common providers
 * and setup that would be used across multiple tests
 */
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  // If you need to add global providers (like Redux, Router, Theme, etc.)
  // you can wrap them here. For now, we'll just use the default render.
  return render(ui, { ...options });
};

/**
 * Common test data for login forms
 */
export const testData = {
  validCredentials: {
    email: 'test@example.com',
    password: 'password123',
  },
  invalidCredentials: {
    email: 'invalid-email',
    password: '123',
  },
  adminCredentials: {
    email: 'admin@example.com',
    password: 'password123',
  },
};

/**
 * Helper function to fill login form with provided credentials
 */
export const fillLoginForm = async (
  user: any,
  credentials: { email: string; password: string },
  screen: any
) => {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, credentials.email);
  await user.type(passwordInput, credentials.password);

  return { emailInput, passwordInput };
};

/**
 * Helper function to submit the login form
 */
export const submitLoginForm = async (user: any, screen: any) => {
  const submitButton = screen.getByRole('button', { name: /login/i });
  await user.click(submitButton);
  return submitButton;
};

// Re-export everything from testing library for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';