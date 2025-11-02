import { useMutation } from '@tanstack/react-query';
import { registerUser, type RegisterRequest, type RegisterResponse } from '../api/auth';

export function useRegisterMutation() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('Registration successful:', data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
}
