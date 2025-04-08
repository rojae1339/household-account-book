import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@/_utils/jwtUtils';
import {
    authMainDir,
    forumDir,
    non_authMainDir,
    profileDir,
    signinDir,
    signupDir,
} from '@/_constants/navigateConstants';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 토큰 확인
    const token = request.cookies.get('token')?.value;

    // 토큰이 있으면 검증
    if (token) {
        try {
            const payload = await verify(token);

            // 인증 경로에 접근했고 토큰이 유효하면 /ledger로 리다이렉트
            if ([signinDir, signupDir, authMainDir, '/'].includes(pathname) && payload) {
                return NextResponse.redirect(new URL(non_authMainDir, request.url));
            }
        } catch (error) {
            // JWT 만료된 경우 토큰 삭제 및 로그인 페이지로 리다이렉트
            const response = NextResponse.redirect(new URL(authMainDir, request.url));
            response.cookies.delete('token');
            return response;
        }
    } else {
        // 토큰이 없는데 보호된 경로에 접근하면 /signin으로 리다이렉트
        if (['/ledger', profileDir, forumDir].some((path) => pathname.startsWith(path))) {
            return NextResponse.redirect(new URL(signinDir, request.url));
        }
    }

    return NextResponse.next();
}

// 단순한 matcher로 테스트
export const config = {
    matcher: ['/(.*)', '/api/:path*'],
};
