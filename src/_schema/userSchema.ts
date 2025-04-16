export interface IBaseUser {
    id?: number;
    nickname: string;
    createdAt: Date;
}

export interface IFormUser extends IBaseUser {
    email: string;
    password: string;
    isVerified: boolean;
    verificationToken: string;
}

export interface IOAuthUser extends IBaseUser {
    provider: string;
    providerId: string;
}
