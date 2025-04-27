'use client';

//비밀번호 인풋 + 검증 에러
import InputModal from '@/app/(auth)/@modal/_component/_base/ModalInput';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { InvalidInputError } from '@/app/(auth)/@modal/_component/_base/ModalInvalidInputError';
import React, { useEffect, useRef, useState } from 'react';
import { useFormErrorStore } from '@/app/(auth)/@modal/_states/errorState';
import { usePathname } from 'next/navigation';

export default function PasswordInput() {
    const pathname = usePathname();
    const [passwordInput, setPasswordInput] = useState<string>('');

    const { errors, setPasswordError, resetError } = useFormErrorStore();
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const [isPwVisible, setIsPwVisible] = useState<boolean>(false);

    const pwInputRef = useRef(null);

    //비밀번호 보이기 안보이기 설정
    useEffect(() => {
        if (passwordInput === '') {
            setInputType('password');
            setIsPwVisible(false);
        }
    }, [passwordInput]);

    //에러 초기화
    useEffect(() => {
        resetError();
        setPasswordInput('');
    }, [pathname, resetError, setPasswordInput]);

    const onClickChangeVisibilityPW = () => {
        if (!pwInputRef.current) return;

        const newVisibility = !isPwVisible;
        setInputType(inputType === 'password' ? 'text' : 'password');
        setIsPwVisible(newVisibility);
    };

    return (
        <div className="relative">
            {/*pw 입력 인풋*/}
            <InputModal
                ref={pwInputRef}
                errors={errors}
                placeholder={'password'}
                type={inputType}
                value={passwordInput}
                name={'password'}
                onChangeAction={(e) => {
                    setPasswordInput(e.currentTarget.value);
                    if (errors.password) {
                        setPasswordError(undefined);

                        if (passwordInput === '') setInputType('password');
                    }
                }}
            />

            {/*pw change visibility*/}
            <button
                onClick={onClickChangeVisibilityPW}
                type={'button'}
                className={'absolute top-1 py-3 text-xl right-2 text-gray-600'}
                disabled={!passwordInput}
            >
                {!isPwVisible || !passwordInput ? <IoEyeOff /> : <IoEye />}
            </button>

            {/*pw error*/}
            {errors.password && <InvalidInputError>{errors.password}</InvalidInputError>}
        </div>
    );
}
