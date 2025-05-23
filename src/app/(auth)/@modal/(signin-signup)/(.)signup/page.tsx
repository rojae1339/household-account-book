'use client';

import EmailInput from '@/app/(auth)/@modal/_component/EmailInput';
import PasswordInput from '@/app/(auth)/@modal/_component/PasswordInput';
import React, { useTransition } from 'react';
import ModalAlly from '@/app/(auth)/@modal/(signin-signup)/_component/ModalA11y';
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';
import { useRouter } from 'next/navigation';
import FormSignupLoading from '@/app/(auth)/@modal/(signin-signup)/(.)signup/loading';
import { authMainDir } from '@/_constants/navigateConstants';
import { handlerFormSignup } from '@/app/api/users/_service/userService';

export default function SignupModal() {
    const { setEmailError, setPasswordError, resetError } = useFormErrorStore();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleAction = async (formData: FormData) => {
        resetError();

        startTransition(async () => {
            const result = await handlerFormSignup(formData);

            if (!result.success) {
                // Zustand 스토어 업데이트
                setEmailError(result.errors?.email);
                setPasswordError(result.errors?.password);
            } else {
                alert('이메일 인증을 완료해주세요.');
                router.push(authMainDir);
                return;
            }
        });
    };

    return (
        <form
            className={'w-full h-full flex flex-col gap-6'}
            action={handleAction}
            noValidate={true}
        >
            {/* EMAIL 입력 */}
            <EmailInput />

            {/* PW 입력 */}
            <PasswordInput />

            {/*account a11y*/}
            <ModalAlly />

            {/*continue button*/}
            <button
                type={'submit'}
                className={
                    'w-fit px-4 py-2 rounded-md text-white bg-blue-400 ml-auto hover:cursor-pointer hover:bg-sky-300'
                }
            >
                Continue
            </button>

            {isPending ? <FormSignupLoading /> : null}
        </form>
    );
}
