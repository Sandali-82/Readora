import { loginSchema, registerSchema } from '@/features/auth/schemas';

const validRegisterValues = {
  firstName: 'Nimal',
  username: 'nimal01',
  email: 'user@example.com',
  password: 'readora123',
  confirmPassword: 'readora123',
};

function messagesFor(
  result: ReturnType<typeof registerSchema.safeParse>,
  field: string,
) {
  if (result.success) {
    return [];
  }
  return result.error.issues
    .filter(issue => issue.path[0] === field)
    .map(issue => issue.message);
}

describe('loginSchema', () => {
  it('accepts a username and a password', () => {
    const result = loginSchema.safeParse({
      username: 'emilys',
      password: 'secret',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a username that is only spaces', () => {
    const result = loginSchema.safeParse({ username: '   ', password: 'x' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Username is required');
    }
  });

  it('rejects an empty password', () => {
    const result = loginSchema.safeParse({ username: 'emilys', password: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password is required');
    }
  });
});

describe('registerSchema', () => {
  it('accepts valid values', () => {
    expect(registerSchema.safeParse(validRegisterValues).success).toBe(true);
  });

  it('rejects an invalid email address', () => {
    const result = registerSchema.safeParse({
      ...validRegisterValues,
      email: 'not-an-email',
    });
    expect(messagesFor(result, 'email')).toContain(
      'Enter a valid email address',
    );
  });

  it('rejects a username that contains spaces', () => {
    const result = registerSchema.safeParse({
      ...validRegisterValues,
      username: 'nimal kumara',
    });
    expect(messagesFor(result, 'username')).toContain(
      'Username cannot contain spaces',
    );
  });

  it('rejects a password without a number', () => {
    const result = registerSchema.safeParse({
      ...validRegisterValues,
      password: 'readoraapp',
      confirmPassword: 'readoraapp',
    });
    expect(messagesFor(result, 'password')).toContain(
      'Password must contain a number',
    );
  });

  it('rejects a password that is too short', () => {
    const result = registerSchema.safeParse({
      ...validRegisterValues,
      password: 'abc12',
      confirmPassword: 'abc12',
    });
    expect(messagesFor(result, 'password')).toContain(
      'Password must be at least 8 characters',
    );
  });

  it('rejects when the confirmation does not match', () => {
    const result = registerSchema.safeParse({
      ...validRegisterValues,
      confirmPassword: 'different123',
    });
    expect(messagesFor(result, 'confirmPassword')).toContain(
      'Passwords do not match',
    );
  });
});