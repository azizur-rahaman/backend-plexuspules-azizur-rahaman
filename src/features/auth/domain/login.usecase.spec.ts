import { LoginUseCase } from '../domain/login.usecase';
import { IAuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockAuthRepository: jest.Mocked<IAuthRepository>;

  const mockUser: User = {
    id: '1',
    email: 'admin@plexus.com',
    password: 'password',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockAuthRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };
    loginUseCase = new LoginUseCase(mockAuthRepository);
  });

  it('should return a token and user on successful login', async () => {
    mockAuthRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await loginUseCase.execute('admin@plexus.com', 'password');

    expect(result).toHaveProperty('token');
    expect(result.user.email).toBe('admin@plexus.com');
  });

  it('should throw an error for invalid email', async () => {
    mockAuthRepository.findByEmail.mockResolvedValue(null);

    await expect(loginUseCase.execute('wrong@email.com', 'password')).rejects.toThrow('Invalid credentials');
  });

  it('should throw an error for invalid password', async () => {
    mockAuthRepository.findByEmail.mockResolvedValue(mockUser);

    await expect(loginUseCase.execute('admin@plexus.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
  });
});
