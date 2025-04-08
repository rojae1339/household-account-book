import { getDbConnection } from '@/_lib/db';
import { IFormUserResponse } from '@/_schema/userSchema';
import { NextResponse } from 'next/server';
import { non_authMainDir, tokenErrorDir } from '@/_constants/navigateConstants';
import { formUserRepository } from '@/app/api/(users)/_repository/FormUserRepository';
import { generateVerificationToken } from '@/_utils/dbUserUtils';

export async function GET(req: Request) {
    const expiredMin: number = 3 * 60 * 1000; // 만료 시간 설정
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    const encodeMessage = (message: string) => {
        return Buffer.from(message).toString('base64');
    };

    //todo delete after test all
    if (token === '1') {
        return NextResponse.redirect(
            new URL(
                `${non_authMainDir}?message=${encodeMessage('Email Verification Succeed!')}`,
                req.url,
            ),
        );
    }

    //token invalid error
    if (!token) {
        return NextResponse.redirect(
            new URL(`${tokenErrorDir}?message=${encodeMessage('Invalid Token.')}`, req.url),
        );
    }

    try {
        const users = await formUserRepository.getUserByToken(token);

        //token not matched error
        if (users.length === 0) {
            return NextResponse.redirect(
                new URL(
                    `${tokenErrorDir}?message=${encodeMessage('Wrong token access.')}`,
                    req.url,
                ),
            );
        }

        const user = users[0];

        //token already verified error
        if (user.isVerified) {
            return NextResponse.redirect(
                new URL(
                    `${tokenErrorDir}?message=${encodeMessage('Already verified User.')}`,
                    req.url,
                ),
            );
        }

        const now = new Date();
        const createdAt = user.createdAt ? new Date(user.createdAt) : new Date();
        const expiredTime = new Date(createdAt.getTime() + expiredMin);

        //token expired error
        if (now > expiredTime) {
            await formUserRepository.deleteUserById(user.id);

            return NextResponse.redirect(
                new URL(
                    `${tokenErrorDir}?message=${encodeMessage('Expired token. Try again sign-up.')}.`,
                    req.url,
                ),
            );
        }

        //token successfully verified
        await formUserRepository.updateFormUserVerified(user.id);
        const re_token = generateVerificationToken();
        await formUserRepository.changeVerificationTokenCode(user.id, re_token);

        return NextResponse.redirect(
            new URL(
                `${non_authMainDir}?message=${encodeMessage('Email Verification Succeed!')}`,
                req.url,
            ),
        );
    } catch (error) {
        return NextResponse.redirect(
            new URL(`${tokenErrorDir}?message=${encodeMessage('Server Error')}: ${error}`, req.url),
        );
    }
}
