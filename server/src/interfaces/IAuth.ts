export interface IRegisterRequest {
    Username: string;
    Email: string;
    Password: string;
}

export interface ILoginRequest {
    Email: string;
    Password: string;
}

export interface ILoginResponse {
    Token: string;
    User: IUserResponse;
}

export interface IRegisterResponse {
    Token: string;
    User: IUserResponse;
}

export interface IVerifyEmailRequest {
    Token: string;
}

export interface IResendEmailVerificationRequest {
    Email: string;
}

export interface IForgotPasswordRequest {
    Email: string;
}

export interface IResetPasswordRequest {
    Token: string;
    NewPassword: string;
}

export interface IUserResponse {
    ID: number;
    Username: string;
    Email: string;
    IsAdmin?: boolean;
}

export interface IRefreshTokenRequest {
    RefreshToken: string;
}

export interface IRefreshTokenResponse {
    Token: string;
    RefreshToken: string;
}
