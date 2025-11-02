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
        // Navigate to Home and pass the user for now (zustand/store will replace this)
        navigate('/', { state: { user: response.user } })
      }
    } catch (err) {
      // Error surfaced via mutation.error
      console.error('Registration failed:', err)
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
