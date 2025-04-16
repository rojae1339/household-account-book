import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { authMainDir, non_authMainDir } from '@/_constants/navigateConstants';
import { sign } from '@/_utils/jwtUtils';
import { oauthUserRepository } from '@/app/api/(users)/_repository/oauthUserRepository';
import { IOAuthUser } from '@/_schema/userSchema';
import { generateShortNickname } from '@/_utils/dbUserUtils';
import { cookies } from 'next/headers';

const handler = NextAuth({
    pages: {
        signIn: authMainDir,
    },
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID as string,
            clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID as string,
            clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            const provider = account?.provider;
            const providerId = account?.providerAccountId;

            if (!provider || !providerId) {
                return authMainDir;
            }

            try {
                const existingUsers = await oauthUserRepository.getOauthUserByProviderAndProviderId(
                    provider,
                    providerId,
                );

                const existingUser = existingUsers[0];

                // 없으면 DB 저장
                const oauthUser: IOAuthUser = {
                    nickname: 'user-' + generateShortNickname(),
                    provider: provider,
                    providerId: providerId,
                    createdAt: new Date(),
                };
                const finalUser =
                    existingUser ?? (await oauthUserRepository.addOauthUser(oauthUser));

                // JWT 발급
                const token = await sign({
                    id: finalUser.userId,
                    nickname: oauthUser.nickname,
                    provider: oauthUser.provider,
                });

                // 응답 쿠키에 토큰 저장
                (await cookies()).set('token', token, { httpOnly: true, secure: true });

                return true;
            } catch (e) {
                throw new Error(`에러 발생: ${e}`);
            }
        },
        async redirect() {
            return non_authMainDir;
        },
    },
});

export { handler as GET, handler as POST };
