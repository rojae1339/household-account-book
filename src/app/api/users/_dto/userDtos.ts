interface IUserResponseBase {
    userId: number;
    nickname: string;
    createdAt: Date;
}

export interface IOauthUserResponse extends IUserResponseBase {
    provider: string;
    providerId: string;
}

export interface IFormUserResponse extends IUserResponseBase {
    password?: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
}

export interface IFormUserRequest {
    email: string;
    password: string;
}
