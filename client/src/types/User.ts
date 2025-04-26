export interface Address {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}

export interface User {
  ID: number;
  Username: string;
  Email: string;
  CreatedAt?: string;
  
  // Informations personnelles
  FirstName?: string;
  LastName?: string;
  BirthDate?: string;
  
  // Adresse
  Address?: Address;
  
  // Informations de contact étendues
  Phone?: string;
  EmailVerified?: boolean;
  PhoneVerified?: boolean;
  IsAdmin?: boolean;
}

export interface UserCredentials {
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