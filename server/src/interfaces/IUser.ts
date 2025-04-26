export interface IUserModel {
  ID: number;
  Username: string;
  Email: string;
  NormalizedEmail: string;
  EmailVerified: boolean;
  Phone?: string | null;
  PhoneVerified: boolean;
  F2aEnabled: boolean;
  IsAdmin: boolean;
  SecurityStamp: string;
  FirstName?: string | null;
  LastName?: string | null;
  DateOfBirth?: Date | null;
  Country?: string | null;
  State?: string | null;
  Street?: string | null;
  City?: string | null;
  ZipCode?: string | null;
  LastLogin?: Date | null;
  CreatedAt: Date;
  ModifiedAt?: Date | null;
  DeletedAt?: Date | null;
}

export interface IUserCreateRequest {
  Username: string;
  Email: string;
  PasswordHash: string;
  SecurityStamp: string;
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
  ZipCode?: string;
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
