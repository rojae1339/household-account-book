interface IBaseUser {
    nickname: string;
    created_at: Date;
}

export interface IFormUser extends IBaseUser {
    email: string;
    password: string;
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
