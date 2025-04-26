import type { UserModel } from "./User";


export interface RegisterForm {
    Username: string;
    Email: string;
    Password: string;
}

export interface LoginForm {
    Email: string;
    Password: string;
}

export interface AuthResponse {
  User: UserModel;
  Message?: string;
  Token?: string;
}