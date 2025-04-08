'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { handlerPwFind, handlerPwReset } from '@/app/api/(users)/_service/UserService';
import { ReadonlyURLSearchParams, redirect, useRouter, useSearchParams } from 'next/navigation';
import { authMainDir } from '@/_constants/navigateConstants';

// 재사용 컴포넌트 사용 안함
// 단순한 이 역할만 할 페이지이기 때문에,
// 이 페이지만을 위해 기존 컴포넌트를 수정하는건 좀 오버인것같음
export default function PasswordResetPage() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);
    const [isPwVisible, setIsPwVisible] = useState(false);
    const [isPwConfirmVisible, setIsPwConfirmVisible] = useState(false);
    const [isPending, startTransition] = useTransition();
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get('token');

    // 컴포넌트 마운트 시 토큰 확인
    useEffect(() => {
        setError(undefined);
    }, [password, passwordConfirm]);

    const handleAction = async (formData: FormData) => {
        setError(undefined);

        startTransition(async () => {
            try {
                // 토큰을 formData에 추가

                const result = await handlerPwReset(formData, token ?? '');

                if (!result.success) {
                    // 에러 메시지 표시
                    setError(
                        result.errors?.password || result.errors?.general || '오류가 발생했습니다.',
                    );
                } else {
                    alert('성공적으로 초기화되었습니다. 다시 로그인 해주세요.');
                    router.push(authMainDir);
                }
            } catch (err) {
                console.error('Password reset error:', err);
                setError('비밀번호 재설정 중 오류가 발생했습니다.');
            }
        });
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <p className="text-lg font-bold">Reset Password</p>
            <form
                className="w-96 flex flex-col gap-4 mt-4"
                action={handleAction}
            >
                {/* 비밀번호 입력 */}
                <div className="relative">
                    <input
                        className="oauth-nav focus:outline-0 focus:ring ring-blue-100 w-full px-3 py-2 rounded"
                        placeholder="새 비밀번호"
                        type={isPwVisible ? 'text' : 'password'}
                        value={password}
                        name={'new-password'}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                    <button
                        type="button"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:cursor-pointer"
                        onClick={() => setIsPwVisible(!isPwVisible)}
                    >
                        {isPwVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                </div>

                {/* 비밀번호 재입력 */}
                <div className="relative">
                    <input
                        className="oauth-nav focus:outline-0 focus:ring ring-blue-100 w-full px-3 py-2 rounded"
                        placeholder="비밀번호 확인"
                        type={isPwConfirmVisible ? 'text' : 'password'}
                        value={passwordConfirm}
                        name={'re-password'}
                        onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
                    />
                    <button
                        type="button"
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:cursor-pointer"
                        onClick={() => setIsPwConfirmVisible(!isPwConfirmVisible)}
                    >
                        {isPwConfirmVisible ? <IoEyeOff /> : <IoEye />}
                    </button>
                </div>

                {/* 에러 메시지 */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                    disabled={isPending || !password || !passwordConfirm}
                >
                    {isPending ? '처리 중...' : '비밀번호 재설정'}
                </button>
            </form>
        </div>
    );
}
