import { useNavigate } from 'react-router'
import Register, { type RegisterFormData } from '../components/Register'
import { useRegisterMutation } from '../hooks/useRegisterMutation'

export default function RegisterPage() {
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()

  const handleRegister = async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (response.ok && response.user) {
        // Navigate to dashboard; pass user in navigation state for now
        navigate('/dashboard', { state: { user: response.user } })
      }
    } catch (err) {
      // Error already surfaced via mutation.error
      // No-op
    }
  }

  return (
    <Register
      onSubmit={handleRegister}
      onNavigateToLogin={() => navigate('/login')}
      isLoading={registerMutation.isPending}
      error={registerMutation.error?.message || ''}
    />
  )
}
