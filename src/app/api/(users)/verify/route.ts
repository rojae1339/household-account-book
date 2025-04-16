import { NextResponse } from 'next/server';
import { non_authMainDir, tokenErrorDir } from '@/_constants/navigateConstants';
import { formUserRepository } from '@/app/api/(users)/_repository/formUserRepository';
import { generateVerificationToken } from '@/_utils/dbUserUtils';
import { sign } from '@/_utils/jwtUtils';

export async function GET(req: Request) {
    const expiredMin: number = 10 * 60 * 1000; // verificationToken 만료 시간 -> 원하는 분 * 60초 * 1000ms
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

        //jwt not matched error
        if (users.length === 0) {
            return NextResponse.redirect(
                new URL(`${tokenErrorDir}?message=${encodeMessage('Wrong jwt access.')}`, req.url),
            );
        }

        const user = users[0];

        //jwt already verified error
        if (user.isVerified) {
            return NextResponse.redirect(
                new URL(
                    `${tokenErrorDir}?message=${encodeMessage('Already verified User.')}`,
                    req.url,
                ),
            );
        }

        const now = new Date();
        const expiredTime = new Date(user.createdAt.getTime() + expiredMin);

        //jwt expired error
        if (now > expiredTime) {
            await formUserRepository.deleteUserById(user.userId);

            return NextResponse.redirect(
                new URL(
                    `${tokenErrorDir}?message=${encodeMessage('Expired jwt. Try again sign-up.')}.`,
                    req.url,
                ),
            );
        }

        //jwt successfully verified
        await formUserRepository.updateFormUserVerified(user.userId);
        const re_token = generateVerificationToken();
        await formUserRepository.changeVerificationTokenCode(user.userId, re_token);

        const jwt = await sign({
            id: user.userId,
            nickname: user.nickname,
            isFormUser: true,
        });

        // 쿠키에 저장하고 리다이렉트
        const response = NextResponse.redirect(
            new URL(
                `${non_authMainDir}?message=${encodeMessage('Email Verification Succeed!')}`,
                req.url,
            ),
        );

        // 쿠키 설정 - 토큰을 쿠키에 저장
        response.cookies.set({
            name: 'token',
            value: jwt,
            httpOnly: true,
            secure: true,
        });

        return response;
    } catch (error) {
        return NextResponse.redirect(
            new URL(`${tokenErrorDir}?message=${encodeMessage('Server Error')}: ${error}`, req.url),
        );
    }
}
