import { Request, Response } from 'express';
import { LoginUseCase } from '../domain/login.usecase';
import { MockAuthRepository } from '../data/mock-auth.repository';

const authRepository = new MockAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await loginUseCase.execute(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message || 'Authentication failed' });
    }
  }
}
