'use server';

import { IFormUser } from '@/_schema/userSchema';
import {
    generateShortNickname,
    generateVerificationToken,
    hashPassword,
} from '@/_utils/dbUserUtils';
import { formUserRepository } from '@/app/api/users/_repository/formUserRepository';
import { pwFindSchema, pwResetSchema, signinSchema, signupSchema } from '@/_schema/authSchema';
import bcrypt from 'bcryptjs';
import { sendPwFindEmail, sendVerificationEmail } from '@/app/api/users/_service/emailVerification';
import { sign } from '@/_utils/jwtUtils';
import { cookies } from 'next/headers';
import { IFormUserResponse } from '@/app/api/users/_dto/userDtos';

export interface ISignupResponse {
    success: boolean;
    errors?: {
        email?: string;
        password?: string;
    };
    user?: IFormUserResponse;
}

//로그인 핸들러
export const handlerFormSignin = async (formData: FormData): Promise<ISignupResponse> => {
    try {
        const formEmail = formData.get('email');
        const formPassword = formData.get('password');

        if (typeof formEmail !== 'string' || typeof formPassword !== 'string') {
            return {
                success: false,
                errors: {
                    email: '잘못된 입력값 입니다.',
                    password: '잘못된 입력값 입니다.',
                },
            };
        }

        const result = signinSchema.safeParse({ email: formEmail, password: formPassword });

        if (!result.success) {
            // 에러 정보를 클라이언트에 반환
            const errorMap = result.error.formErrors.fieldErrors;
            return {
                success: false,
                errors: {
                    email: errorMap.email?.[0],
                    password: errorMap.password?.[0],
                },
            };
        }

        const email = result.data.email;
        const password = result.data.password;
        const userResponses = await formUserRepository.getUserByEmail(email);
        const user = userResponses[0];

        if (user === undefined) {
            return {
                success: false,
                errors: {
                    email: 'Email 혹은 비밀번호가 잘못되었습니다.',
                    password: 'Email 혹은 비밀번호가 잘못되었습니다.',
                },
            };
        }
        const isSame = await bcrypt.compare(password, user.password ?? '');

        if (!isSame) {
            return {
                success: false,
                errors: {
                    email: 'Email 혹은 비밀번호가 잘못되었습니다.',
                    password: 'Email 혹은 비밀번호가 잘못되었습니다.',
                },
            };
        }

        if (!user.isVerified) {
            return {
                success: false,
                errors: {
                    email: '이메일 인증이 필요합니다.',
                },
            };
        }

        //jwt
        const token = await sign({
            id: user.userId,
            nickname: user.nickname,
            isFormUser: true,
        });

        // 쿠키에 저장
        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
        });

        return {
            success: true,
            user: user,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            errors: {
                email: 'Email 혹은 비밀번호가 잘못되었습니다.',
                password: 'Email 혹은 비밀번호가 잘못되었습니다.',
            },
        };
    }
};

//회원가입 핸들러
export const handlerFormSignup = async (formData: FormData): Promise<ISignupResponse> => {
    try {
        const formEmail = formData.get('email');
        const formPassword = formData.get('password');

        if (typeof formEmail !== 'string' || typeof formPassword !== 'string') {
            return {
                success: false,
                errors: {
                    email: '잘못된 입력값 입니다.',
                    password: '잘못된 입력값 입니다.',
                },
            };
        }

        const result = signupSchema.safeParse({ email: formEmail, password: formPassword });

        if (!result.success) {
            // 에러 정보를 클라이언트에 반환
            const errorMap = result.error.formErrors.fieldErrors;
            return {
                success: false,
                errors: {
                    email: errorMap.email?.[0],
                    password: errorMap.password?.[0],
                },
            };
        }

        const email = result.data.email;
        const password = result.data.password;

        const existingUser = await formUserRepository.getUserByEmail(email);

        if (existingUser.length > 0) {
            return {
                success: false,
                errors: {
                    email: '이미 존재하는 유저입니다.',
                },
            };
        }

        const pw = await hashPassword(password);
        const verificationToken = generateVerificationToken();
        const isVerified = false;
        const nickname = 'user-' + generateShortNickname();
        const createdAt = new Date();

        const newUser: IFormUser = {
            email: email,
            password: pw,
            isVerified: isVerified,
            verificationToken: verificationToken,
            nickname: nickname,
            createdAt: createdAt,
        };

        await formUserRepository.addFormUser(newUser);

        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        return {
            success: true,
        }; // 추가된 유저 정보 반환
    } catch (e) {
        console.log(e);
        return {
            success: false,
            errors: {
                email: '이미 존재하는 이메일입니다.',
            },
        };
    }
};

export const handlerPwFind = async (formData: FormData) => {
    try {
        const formEmail = formData.get('email');

        if (typeof formEmail !== 'string') {
            return {
                success: false,
                errors: {
                    email: '잘못된 입력값 입니다.',
                },
            };
        }

        const result = pwFindSchema.safeParse({ email: formEmail });

        if (!result.success) {
            // 에러 정보를 클라이언트에 반환
            const errorMap = result.error.formErrors.fieldErrors;
            return {
                success: false,
                errors: {
                    email: errorMap.email?.[0],
                },
            };
        }

        const email = result.data.email;

        const userResponses = await formUserRepository.getUserByEmail(email);

        if (userResponses[0] === undefined) {
            return {
                success: false,
                errors: {
                    email: 'Email 혹은 비밀번호가 잘못되었습니다.',
                },
            };
        }
        const user = userResponses[0];

        await sendPwFindEmail(user.email, user.verificationToken);
        return {
            success: true,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            errors: {
                email: '존재하지 않는 이메일입니다.',
            },
        };
    }
};

export const handlerPwReset = async (formData: FormData, token: string) => {
    try {
        const formPw = formData.get('new-password');
        const formRePw = formData.get('re-password');

        // 토큰 콘솔 출력

        if (typeof formPw !== 'string' || typeof formRePw !== 'string') {
            return {
                success: false,
                errors: {
                    password: '잘못된 입력값 입니다.',
                },
            };
        }

        // 비밀번호가 비어있는 경우
        if (!formPw.trim() || !formRePw.trim()) {
            return {
                success: false,
                errors: {
                    password: '비밀번호를 입력하세요.',
                },
            };
        }

        if (formPw !== formRePw) {
            return {
                success: false,
                errors: { password: '비밀번호가 일치하지 않습니다.' },
            };
        }

        // zod 스키마 검증
        const validationResult = pwResetSchema.safeParse({ password: formPw });

        if (!validationResult.success) {
            return {
                success: false,
                errors: { password: validationResult.error.errors[0].message },
            };
        }

        //token validation
        const userByToken = await formUserRepository.getUserByToken(token);

        if (userByToken[0] === undefined) {
            return {
                success: false,
                errors: { general: '비밀번호 재설정 중 오류가 발생했습니다.' },
            };
        }

        // 성공 응답
        const pw = await hashPassword(validationResult.data.password);
        const re_token = generateVerificationToken();

        const user = userByToken[0];

        await formUserRepository.updatePassword(user.userId, pw);
        await formUserRepository.changeVerificationTokenCode(user.userId, re_token);

        return {
            success: true,
            message: '비밀번호가 성공적으로 변경되었습니다.',
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            errors: { general: '비밀번호 재설정 중 오류가 발생했습니다.' },
        };
    }
};
