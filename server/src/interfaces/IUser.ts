export interface IUserModel {
  ID: number;
  Username: string;
  Email: string;
  NormalizedEmail: string;
  EmailVerified: boolean;
  Phone?: string;
  PhoneVerified: boolean;
  F2aEnabled: boolean;
  IsAdmin: boolean;
  PasswordHash: string;
  SecurityStamp: string;
  FirstName?: string;
  LastName?: string;
  DateOfBirth?: Date;
  Country?: string;
  State?: string;
  Street?: string;
  City?: string;
  PostalCode?: string;
  LastLogin?: Date;
  CreatedAt: Date;
  ModifiedAt?: Date;
  DeletedAt?: Date;
}

export interface IUserProfileUpdateRequest {
  FirstName?: string;
  LastName?: string;
  DateOfBirth?: string;
}

export interface IUserAddressUpdateRequest {
  Country?: string;
  State?: string;
  City?: string;
  Street?: string;
  PostalCode?: string;
}

export interface IUserEmailUpdateRequest {
  NewEmail: string;
  Password: string;
}

export interface IUserPhoneUpdateRequest {
  NewPhone: string;
  Password?: string;
}

export interface IPasswordUpdateRequest {
  OldPassword: string;
  NewPassword: string;
}
