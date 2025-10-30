# Login Component with React Testing Library

A React TypeScript project featuring a comprehensive login component with extensive testing using React Testing Library and Vitest.

## Features

### Login Component
- **Form Validation**: Client-side validation for email format and password requirements
- **Loading States**: Displays loading spinner and disables form during submission
- **Error Handling**: Shows validation errors and server-side error messages
- **Accessibility**: ARIA labels, proper form semantics, and keyboard navigation
- **TypeScript**: Fully typed with interfaces for props and form data
- **Responsive Design**: Clean, modern CSS with responsive layout

### Testing
- **Unit Tests**: Comprehensive test suite covering all component functionality
- **Integration Tests**: Full app testing including login flow and navigation
- **Accessibility Testing**: Verification of proper ARIA attributes and roles
- **User Interaction Testing**: Real user interaction simulation with user-event
- **Error State Testing**: Validation of error messages and loading states

## Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Main login component
│   ├── Login.css          # Component styles
│   └── Login.test.tsx     # Component unit tests
├── test/
│   └── setup.ts           # Test environment setup
├── App.tsx                # Main app with login integration
├── App.test.tsx           # Integration tests
└── main.tsx               # App entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Build for production
pnpm build
```

## Testing

The project includes two types of tests:

### Unit Tests (`Login.test.tsx`)
- Form rendering and element presence
- Input value updates and validation
- Error message display and clearing
- Form submission with valid/invalid data
- Loading state behavior
- Accessibility attributes verification

### Integration Tests (`App.test.tsx`)
- Complete login flow with simulated API calls
- Success and error scenarios
- Navigation between login and authenticated states
- Logout functionality

### Test Commands

```bash
# Run all tests once
pnpm test

# Run tests in watch mode for development
pnpm test --watch

# Run tests with coverage report
pnpm test --coverage

# Run tests with UI interface
pnpm test:ui
```

## Usage

### Basic Login Component

```tsx
import Login from './components/Login';

function App() {
  const handleLogin = async (data) => {
    try {
      // Your login logic here
      console.log('Login data:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Login
      onSubmit={handleLogin}
      isLoading={false}
      error=""
    />
  );
}
```

### Demo Credentials

For the demo application:
- **Email**: `admin@example.com`
- **Password**: `password123`

## Component API

### Login Component Props

```typescript
interface LoginProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}
```

### Props Description

- `onSubmit`: Callback function called when form is submitted with valid data
- `isLoading`: Optional boolean to show loading state
- `error`: Optional error message to display

## Validation Rules

- **Email**: Must be a valid email format
- **Password**: Minimum 6 characters required
- **Real-time validation**: Errors clear as user types
- **Submit validation**: Prevents submission with invalid data

## Technologies Used

- **React 19** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Additional matchers for testing

## Development

### Code Structure
- Components are fully typed with TypeScript interfaces
- CSS modules for scoped styling
- Comprehensive error handling and validation
- Accessibility-first approach with proper ARIA attributes

### Testing Strategy
- Test user interactions rather than implementation details
- Use semantic queries (getByRole, getByLabelText) for robust tests
- Mock external dependencies and async operations
- Test both success and error scenarios

## Contributing

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Create a feature branch
4. Make your changes
5. Add tests for new functionality
6. Run tests: `pnpm test`
7. Submit a pull request

## License

This project is created for educational purposes and testing React components with React Testing Library.
