'use client';

import InputModal from '@/app/(auth)/@modal/_component/_base/ModalInput';
import { InvalidInputError } from '@/app/(auth)/@modal/_component/_base/ModalInvalidInputError';
import React, { useEffect, useState } from 'react';
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';
import { usePathname } from 'next/navigation';

//이메일 인풋 + 검증에러
export default function EmailInput() {
    const pathname = usePathname();
    const [emailInput, setEmailInput] = useState<string>('');

    const { errors, setEmailError, resetError } = useFormErrorStore();

    //에러 초기화
    useEffect(() => {
        resetError();
        setEmailInput('');
    }, [pathname, resetError, setEmailInput]);

    return (
        <div className={'relative'}>
            <InputModal
                errors={errors}
                placeholder={'email'}
                name={'email'}
                type={'email'}
                value={emailInput}
                onChangeAction={(e) => {
                    setEmailInput(e.currentTarget.value);
                    if (errors.email) {
                        setEmailError(undefined);
                    }
                }}
            />
            {errors.email && <InvalidInputError>{errors.email}</InvalidInputError>}
        </div>
    );
}
