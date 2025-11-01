export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  error?: string;
}

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
}
