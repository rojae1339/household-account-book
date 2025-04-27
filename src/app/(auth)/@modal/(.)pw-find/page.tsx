'use client';

import React, { useTransition } from 'react';
import EmailInput from '@/app/(auth)/@modal/_component/EmailInput';
import { redirect, useRouter } from 'next/navigation';
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';
import { handlerPwFind } from '@/app/api/(users)/_service/userService';
import { authMainDir } from '@/_constants/navigateConstants';
import PwFindLoading from '@/app/(auth)/pw-reset/loading';

export default function PwFindModal() {
    const { setEmailError, resetError } = useFormErrorStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAction = async (formData: FormData) => {
        resetError();

        startTransition(async () => {
            const result = await handlerPwFind(formData);

            if (!result.success) {
                // Zustand 스토어 업데이트
                setEmailError(result.errors?.email);
            } else {
                alert('이메일을 확인해주세요');
                router.push(authMainDir);
                return;
            }
        });
    };

    return (
        <div className={'flex flex-col w-full h-full items-center justify-center'}>
            <p className={'text-2xl font-semibold'}>비밀번호를 까먹으셨나요?</p>
            <div className={'pt-10 flex flex-col gap-4 w-full items-start'}>
                <p className={'font-semibold text-sm'}>이메일 주소를 입력하세요</p>
                <form
                    className={'w-full flex flex-col gap-6'}
                    action={handleAction}
                    noValidate={true}
                >
                    {/*Email 인풋*/}
                    <EmailInput />

                    <button
                        onClick={() => {}}
                        type={'submit'}
                        className={'text-white bg-blue-400 oauth-nav hover:cursor-pointer'}
                    >
                        Password Reset Request
                    </button>
                    <button
                        onClick={() => redirect('/')}
                        type={'button'}
                        className={'hover:cursor-pointer'}
                    >
                        메인화면으로
                    </button>

                    {isPending ? <PwFindLoading /> : null}
                </form>
            </div>
        </div>
    );
}
