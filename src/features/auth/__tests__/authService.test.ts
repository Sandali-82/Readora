import { getCurrentUser, login } from '@/features/auth/authService';

const mockFetch = jest.fn();

function jsonResponse(body: unknown, ok = true) {
  return { ok, json: () => Promise.resolve(body) };
}

beforeEach(() => {
  mockFetch.mockReset();
  globalThis.fetch = mockFetch as unknown as typeof fetch;
});

describe('authService', () => {
  it('posts the credentials to the login endpoint and returns the tokens', async () => {
    mockFetch.mockResolvedValue(
      jsonResponse({ accessToken: 'token-1', firstName: 'Emily' }),
    );

    const result = await login('emilys', 'emilyspass');

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://dummyjson.com/auth/login');
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toMatchObject({
      username: 'emilys',
      password: 'emilyspass',
    });
    expect(result.accessToken).toBe('token-1');
  });

  it('throws the message sent by the server when login fails', async () => {
    mockFetch.mockResolvedValue(
      jsonResponse({ message: 'Invalid credentials' }, false),
    );

    await expect(login('emilys', 'wrong')).rejects.toThrow(
      'Invalid credentials',
    );
  });

  it('throws a friendly message when the network request fails', async () => {
    mockFetch.mockRejectedValue(new TypeError('Network request failed'));

    await expect(login('emilys', 'emilyspass')).rejects.toThrow(
      'Network error. Check your connection and try again.',
    );
  });

  it('sends the token as a bearer header when loading the current user', async () => {
    mockFetch.mockResolvedValue(jsonResponse({ firstName: 'Emily' }));

    await getCurrentUser('token-1');

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe('https://dummyjson.com/auth/me');
    expect(init.headers.Authorization).toBe('Bearer token-1');
  });
});