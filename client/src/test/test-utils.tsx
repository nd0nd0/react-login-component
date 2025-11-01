import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Create a new QueryClient for each test to avoid shared state
 */
export const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry failed queries in tests
        gcTime: 0, // Don't cache query results in tests
      },
      mutations: {
        retry: false, // Don't retry failed mutations in tests
      },
    },
  });
};

/**
 * Custom render function for testing that includes QueryClient provider
 */
export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const testQueryClient = createTestQueryClient();
  
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>,
    { ...options }
  );
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

/**
 * Mock fetch responses for API testing
 */
export const mockFetchResponse = (data: any, status = 200, ok = true) => {
  return {
    ok,
    status,
    json: async () => data,
  } as Response;
};

/**
 * Mock successful login response
 */
export const mockLoginSuccess = () => {
  return mockFetchResponse({
    ok: true,
    user: {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin',
    },
  });
};

/**
 * Mock failed login response
 */
export const mockLoginError = (errorMessage = 'Invalid credentials') => {
  return mockFetchResponse(
    { ok: false, error: errorMessage },
    401,
    false
  );
};

/**
 * Setup fetch mock for tests
 */
export const setupFetchMock = (vi: any) => {
  const mockFetch = vi.fn();
  globalThis.fetch = mockFetch;
  return mockFetch;
};

// Re-export everything from testing library for convenience
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';