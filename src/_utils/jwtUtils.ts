import { jwtVerify, SignJWT } from 'jose';

export interface JwtPayload {
    id: number;
    nickname: string;
    provider?: string;
    isFormUser?: boolean;
}

const JwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function sign(payload: JwtPayload) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; //jwt 만료 시간

    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(JwtSecret);
}

export async function verify(token: string) {
    const { payload } = await jwtVerify(token, JwtSecret);
    return payload;
}
