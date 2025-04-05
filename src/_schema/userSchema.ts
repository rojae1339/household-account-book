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

export interface IUserResponse {
    id: number;
    password?: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
    nickname: string;
    createdAt: Date;
}

enum OAuthProvider {
    'google',
    'facebook',
    'kakao',
    'naver',
}

export interface IOAuthUser extends IBaseUser {
    provider: OAuthProvider;
    provider_id: number;
}
