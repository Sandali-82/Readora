import type { RegisterFormValues } from '@/features/auth/schemas';
import { DUMMYJSON_BASE_URL } from '@/shared/constants/apiEndpoints';

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = Pick<
  LoginResponse,
  'id' | 'username' | 'email' | 'firstName' | 'lastName'
>;

const NETWORK_ERROR_MESSAGE =
  'Network error. Check your connection and try again.';
const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

// Plain fetch wrapper: turns network failures and API errors into Error objects with a readable message.
async function request<T>(path: string, init: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${DUMMYJSON_BASE_URL}${path}`, init);
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body && typeof body.message === 'string'
        ? body.message
        : DEFAULT_ERROR_MESSAGE;
    throw new Error(message);
  }

  return body as T;
}

export function login(username: string, password: string) {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });
}

export function getCurrentUser(token: string) {
  return request<CurrentUser>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// DummyJSON does not really save new users, so this only simulates registration.
export function registerUser(values: RegisterFormValues) {
  return request<{ id: number }>('/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: values.firstName,
      username: values.username,
      email: values.email,
      password: values.password,
    }),
  });
}