'use client';

import React, { Ref, useEffect, useRef, useState } from 'react';
import { pwFindSchema, signinSchema, signupSchema } from '@/_API/authSchema';
import ModalDefault from '@/_component/Modal';
import { redirect, RedirectType, usePathname, useRouter } from 'next/navigation';
import { OAuthNavObject, pwFindDir, signinDir, signupDir } from '@/_constants/navigateConstants';
import Link from 'next/link';
import LogoIcon from '@/_component/LocoIcon';
import Button from '@/_component/Button';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { baseProps } from '@/_constants/props';
import { insertFormUser } from '@/_lib/_user/actions';

//todo
export default function AuthModalLayout() {
    const pathname: string = usePathname();
    const router = useRouter();
    const [idInput, setIdInput] = useState<string>('');
    const [pwInput, setPwInput] = useState<string>('');
    const [isPwVisible, setIsPwVisible] = useState<boolean>(false);
    const [inputType, setInputType] = useState<'password' | 'text'>('password');
    const pwInputRef = useRef(null);

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const isPathnameSignup: boolean = pathname === signupDir;
    const introduce: Record<'signup' | 'signin', string> = {
        signup: 'Create your own ledger and manage money!',
        signin: 'Login to your own ledger and manage money!',
    };

    //todo email verification 핸들링
    const handleEmailVerificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //todo
    };

    //비밀번호 visibility 변경
    const onClickChangeVisibilityPW = () => {
        if (!pwInputRef.current) return;

        const newVisibility = !isPwVisible;
        setInputType(inputType === 'password' ? 'text' : 'password');
        setIsPwVisible(newVisibility);
    };

    //password visibility initialize
    useEffect(() => {
        if (pwInput === '') {
            setInputType('password');
            setIsPwVisible(false);
        }
    }, [pwInput]);

    //error state initialize
    useEffect(() => {
        setErrors({});
    }, [pathname]);

    //return pwfind modal
    if (pathname === pwFindDir) {
        return (
            /*todo also email verification*/
            <ModalDefault>
                <div className={'flex flex-col w-full h-full items-center justify-center'}>
                    <p className={'text-2xl font-semibold'}>비밀번호를 까먹으셨나요?</p>
                    <div className={'pt-10 flex flex-col gap-4 w-full items-start'}>
                        <p className={'font-semibold text-sm'}>이메일 주소를 입력하세요</p>
                        <form
                            className={'w-full flex flex-col gap-6'}
                            onSubmit={handleEmailVerificationSubmit}
                            noValidate={true}
                        >
                            <div className={'relative'}>
                                <FormInput
                                    errors={errors}
                                    placeholder={'email'}
                                    type={'email'}
                                    value={idInput}
                                    onChangeAction={(e) => {
                                        setIdInput(e.currentTarget.value);
                                        if (errors.email) {
                                            setErrors((prev) => ({
                                                ...prev,
                                                email: undefined,
                                            }));
                                        }
                                    }}
                                />
                                {errors.email && (
                                    <InvalidInputError>{errors.email}</InvalidInputError>
                                )}
                            </div>
                            <Button
                                action={() => {}}
                                type={'submit'}
                                className={'text-white bg-blue-400 oauth-nav'}
                            >
                                Password Reset Request
                            </Button>
                            <Button
                                action={() => router.back()}
                                type={'button'}
                                className={''}
                            >
                                뒤로 가기
                            </Button>
                        </form>
                    </div>
                </div>
            </ModalDefault>
        );
    }

    //return signin signup modal
    return (
        <ModalDefault>
            <div className={'flex flex-col h-full justify-center'}>
                {/*introduce*/}
                <div
                    className={
                        'flex flex-row items-center pt-4 pb-8 gap-4 w-full h-fit justify-center'
                    }
                >
                    <LogoIcon className={''} />
                    <div className={'xl:text-lg md:text-base xs:text-sm 2xs:text-lg'}>
                        {isPathnameSignup ? introduce.signup : introduce.signin}
                    </div>
                </div>

                {/*Oauth nav*/}
                <div className={'flex flex-col gap-4 w-full'}>
                    {Object.values(OAuthNavObject).map((nav) => {
                        return (
                            //버튼?
                            <Link
                                key={`oauth_${nav.displayName}`}
                                href={nav.url}
                                className={
                                    'flex flex-row items-center gap-6 oauth-nav justify-center xl:text-lg md:text-base text-sm' +
                                    ` ${nav.bg_color}`
                                }
                            >
                                {nav.icon}
                                <p>{nav.displayName}</p>
                            </Link>
                        );
                    })}
                </div>

                {/*division line*/}
                <div className={'w-full flex items-center justify-between my-4'}>
                    <hr className={'border w-2/5 border-gray-300 '} />
                    <p className={'font-semibold'}>or</p>
                    <hr className={'border w-2/5 border-gray-300 '} />
                </div>

                {/*todo form관련*/}
                <div className={'flex flex-col gap-4'}>
                    {/*form*/}
                    <form
                        className={'w-full flex flex-col gap-6'}
                        onSubmit={handleContinueSubmit}
                        noValidate={true}
                    >
                        {/* ID 입력 */}
                        <div className="relative">
                            <FormInput
                                errors={errors}
                                placeholder={'email'}
                                type={'email'}
                                value={idInput}
                                onChangeAction={(e) => {
                                    setIdInput(e.currentTarget.value);
                                    if (errors.email) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            email: undefined,
                                        }));
                                    }
                                }}
                            />

                            {/*Id 입력 에러*/}
                            {errors.email && <InvalidInputError>{errors.email}</InvalidInputError>}
                        </div>

                        {/* PW 입력 */}
                        <div className="relative">
                            {/*pw 입력 인풋*/}
                            <FormInput
                                ref={pwInputRef}
                                errors={errors}
                                placeholder={'password'}
                                type={inputType}
                                value={pwInput}
                                onChangeAction={(e) => {
                                    setPwInput(e.currentTarget.value);
                                    if (errors.password) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            password: undefined,
                                        }));

                                        if (pwInput === '') setInputType('password');
                                    }
                                }}
                            />

                            {/*pw change visibility*/}
                            <Button
                                action={onClickChangeVisibilityPW}
                                type={'button'}
                                className={'absolute top-1 py-3 text-xl right-2 text-gray-600'}
                                disabled={!pwInput}
                            >
                                {!isPwVisible || !pwInput ? <IoEyeOff /> : <IoEye />}
                            </Button>

                            {/*pw error*/}
                            {errors.password && (
                                <InvalidInputError>{errors.password}</InvalidInputError>
                            )}
                        </div>

                        {/*account a11y*/}
                        <Link
                            className={
                                'text-blue-500 absolute left-12 2xs:top-[78%] xs:top-[91%] xs:text-sm'
                            }
                            href={isPathnameSignup ? signinDir : pwFindDir}
                        >
                            {isPathnameSignup ? '계정이 있으신가요?' : '비밀번호 찾기'}
                        </Link>

                        {/*continue button*/}
                        <Button
                            type={'submit'}
                            action={() => {}}
                            className={
                                'w-fit px-4 py-2 rounded-md text-white bg-blue-400 ml-auto hover:cursor-pointer hover:bg-sky-300'
                            }
                        >
                            Continue
                        </Button>
                    </form>
                </div>
            </div>
        </ModalDefault>
    );
}

type formInputTypes = {
    ref?: Ref<HTMLInputElement>;
    errors: { email?: string; password?: string };
    placeholder: 'email' | 'password';
    type: 'email' | 'password' | 'text';
    value: string;
    onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormInput({
    ref = null,
    errors,
    placeholder,
    type = 'email',
    value,
    onChangeAction,
}: formInputTypes) {
    return (
        <input
            ref={ref}
            className={`oauth-nav border focus:outline-0 focus:ring ring-blue-100 w-full ${errors?.[placeholder] ? 'border-red-500' : 'border-gray-100'}`}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChangeAction}
        />
    );
}

export function InvalidInputError({ children }: baseProps) {
    const [isScreenSizeEnough, setIsScreenSizeEnough] = useState<boolean>(window.innerWidth > 736);

    const minInnerWidth = 736;

    useEffect(() => {
        const handleResize = () => setIsScreenSizeEnough(window.innerWidth > minInnerWidth);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isScreenSizeEnough) {
        return (
            <div className="absolute -right-2 top-1/2 transform translate-x-full -translate-y-1/2">
                <div className="relative bg-red-500 text-white text-xs rounded py-1 px-2 max-w-[210px]">
                    <div className="absolute w-2 h-2 bg-red-500 transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
                    {children}
                </div>
            </div>
        );
    }

    return <div className={'absolute text-xs top-13 text-red-500 break-keep'}>{children}</div>;
}
