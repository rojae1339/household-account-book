import { BuiltInProviderType } from 'next-auth/providers/index';

interface IBaseUser {
    nickname: string;
    createdAt: Date;
}

export interface IFormUser extends IBaseUser {
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string;
}

export interface IFormUserRequest {
    email: string;
    password: string;
}

export interface IFormUserResponse {
    id: number;
    password?: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
    nickname: string;
    createdAt: Date;
}

export interface IOAuthUser extends IBaseUser {
    provider: string;
    providerId: string;
}

export interface IOauthUserResponse {
    id: number;
    provider: string;
    providerId: string;
    nickname: string;
    createdAt: Date;
}
