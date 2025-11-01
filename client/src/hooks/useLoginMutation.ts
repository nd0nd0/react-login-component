import { useMutation } from '@tanstack/react-query';
import { loginUser, type LoginRequest, type LoginResponse } from '../api/auth';

export function useLoginMutation() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onError: (error) => {
      console.error('Login mutation error:', error);
    },
  });
}
