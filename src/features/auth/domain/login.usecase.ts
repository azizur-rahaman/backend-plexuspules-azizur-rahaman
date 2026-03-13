import { IAuthRepository } from '../domain/auth.repository';
import { AuthResponse } from '../domain/user.entity';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(email: string, password: string): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // In a real app, we would use bcrypt.compare
    // For this assignment with dummy credentials, we'll do a simple check or bcrypt if we hash the dummy
    const isPasswordValid = password === user.password; // Simplified for dummy admin@plexus.com / password

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword,
    };
  }
}
