export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  message: string;
  token?: string;
}