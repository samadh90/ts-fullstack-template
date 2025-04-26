export interface User {
  ID: number;
  Username: string;
  Email: string;
  IsAdmin?: boolean;
  LastLogin?: string;
  
  FirstName?: string;
  LastName?: string;
  BirthDate?: string;
  
  Country?: string;
  State?: string;
  Street?: string;
  City?: string;
  ZipCode?: string;
  
  Phone?: string;
  EmailVerified?: boolean;
  PhoneVerified?: boolean;

  CreatedAt?: string;
  ModifiedAt?: string;
  DeletedAt?: string;
}

export interface LoginForm {
  Email: string;
  Password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  User: User;
  Message?: string;
  Token?: string;
}