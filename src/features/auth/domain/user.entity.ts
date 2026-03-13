export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
