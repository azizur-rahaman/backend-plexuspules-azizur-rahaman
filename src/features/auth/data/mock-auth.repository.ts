import { IAuthRepository } from '../domain/auth.repository';
import { User } from '../domain/user.entity';

export class MockAuthRepository implements IAuthRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@plexus.com',
      password: 'password',
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    this.users.push(newUser);
    return newUser;
  }
}
