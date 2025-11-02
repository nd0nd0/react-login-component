import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './Register'

describe('Register', () => {
  it('renders register form with all fields', () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument()
    expect(screen.getByText('Sign up to get started')).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('displays validation errors for empty fields', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /create account/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('displays email validation error for invalid email', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const emailInput = screen.getByLabelText(/^email$/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(emailInput, 'invalidemail')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('displays password validation error for short password', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const passwordInput = screen.getByLabelText(/^password$/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(passwordInput, '12345')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters long')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('displays error when passwords do not match', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password456')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'password123')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      })
    })
  })

  it('displays error message when error prop is provided', () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
        error="Email already registered"
      />
    )
    
    expect(screen.getByText('Email already registered')).toBeInTheDocument()
  })

  it('disables form when isLoading is true', () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
        isLoading={true}
      />
    )
    
    const nameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/^email$/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /creating account/i })
    
    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(passwordInput).toBeDisabled()
    expect(confirmPasswordInput).toBeDisabled()
    expect(submitButton).toBeDisabled()
    expect(screen.getByText('Creating account...')).toBeInTheDocument()
  })

  it('calls onNavigateToLogin when sign in link is clicked', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
      />
    )
    
    const signInLink = screen.getByRole('button', { name: /sign in/i })
    await user.click(signInLink)
    
    expect(mockOnNavigateToLogin).toHaveBeenCalledTimes(1)
  })

  it('prevents form submission when loading', async () => {
    const mockOnSubmit = vi.fn()
    const mockOnNavigateToLogin = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Register 
        onSubmit={mockOnSubmit} 
        onNavigateToLogin={mockOnNavigateToLogin}
        isLoading={true}
      />
    )
    
    const submitButton = screen.getByRole('button', { name: /creating account/i })
    await user.click(submitButton)
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
