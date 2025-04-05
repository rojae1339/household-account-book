import { z } from 'zod';

// 이메일 형식 검증 정규식 (@ 다음 도메인 형태 체크)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;

// 비밀번호 검증 (영어 대소문자 + 숫자 + 특수기호 포함, 8~20자)
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;

// 회원가입 스키마
export const signupSchema = z.object({
    email: z
        .string()
        .email('이메일 형식: example@domain.com')
        .regex(emailRegex, '이메일 형식: example@domain.com'),
    password: z
        .string()
        .min(8, '비밀번호는 최소 8글자입니다.')
        .max(20, '비밀번호는 최대 20글자입니다.')
        .regex(passwordRegex, '비밀번호: 영어, 숫자, 특수기호가 반드시 포함'),
});

// 로그인 스키마
export const signinSchema = z.object({
    email: z
        .string()
        .email('올바르지 않은 이메일 형식')
        .min(1, '올바른 이메일을 입력하세요.')
        .regex(emailRegex, '이메일 형식: example@domain.com'),
    password: z
        .string()
        .nullable()
        .refine((val) => val !== null, '비밀번호를 입력하세요.'),
});

// PW 찾기 스키마
export const pwFindSchema = z.object({
    email: z
        .string()
        .email('올바르지 않은 이메일 형식')
        .min(1, '올바른 이메일을 입력하세요.')
        .regex(emailRegex, '이메일 형식: example@domain.com'),
});

// PW 변경 스키마
export const pwResetSchema = z.object({
    password: z
        .string()
        .min(8, '비밀번호는 최소 8글자입니다.')
        .max(20, '비밀번호는 최대 20글자입니다.')
        .regex(passwordRegex, '비밀번호: 영어, 숫자, 특수기호가 반드시 포함'),
});
