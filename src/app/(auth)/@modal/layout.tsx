'use client';

import React, { useEffect, useRef, useState } from 'react';
import { signinSchema, signupSchema } from '@/_API/authSchema';
import ModalDefault from '@/_component/Modal';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import { OAuthNavObject, pwFindDir, signinDir, signupDir } from '@/_constants/navigateConstants';
import Link from 'next/link';
import LogoIcon from '@/_component/LocoIcon';
import Button from '@/_component/Button';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { baseProps } from '@/_constants/props';

//todo
export default function AuthModalLayout() {
    const pathname: string = usePathname();
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

    //todo continue 누를시 핸들링
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 기본 제출 동작 방지

        const schema = isPathnameSignup ? signupSchema : signinSchema;
        const formData = isPathnameSignup
            ? { email: idInput, password: pwInput }
            : { email: idInput, password: pwInput };

        const result = schema.safeParse(formData);

        // todo 로그인 시 특정 이메일이 아니라면 회원가입 페이지로 리디렉션
        if (!isPathnameSignup && idInput !== 'aa@aa.aa') {
            setPwInput('');
            redirect(signupDir, RedirectType.replace);
        }

        // Zod 검증
        if (isPathnameSignup) {
            if (!result.success) {
                const formattedErrors = result.error.format();
                setErrors({
                    email: formattedErrors.email?._errors[0],
                    password: formattedErrors.password?._errors[0],
                });
                return;
            }

            //todo signup 성공시
        }

        //todo signin일때 pw검증
        if (pwInput === '') {
            setErrors({ password: result.error?.format().password?._errors[0] });
            return;
        }

        if (pwInput !== 'aa') {
            setErrors({ password: '올바르지 않은 비밀번호입니다.' });
            return;
        }
        redirect('/ledger');
    };

    //비밀번호 visibility 변경
    const onClickChangeVisibilityPW = () => {
        if (!pwInputRef.current) return;

        const newVisibility = !isPwVisible;
        setInputType(inputType === 'password' ? 'text' : 'password');
        setIsPwVisible(newVisibility);
    };

    useEffect(() => {
        if (pwInput === '') {
            setInputType('password');
            setIsPwVisible(false);
        }
    }, [pwInput]);

    if (pathname === pwFindDir) {
        return (
            /*todo*/
            <ModalDefault>
                <div>pwfind</div>
            </ModalDefault>
        );
    }

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

                {/*form관련*/}
                <div className={'flex flex-col gap-4'}>
                    {/*form*/}
                    <form
                        className={'w-full flex flex-col gap-6'}
                        onSubmit={handleSubmit}
                    >
                        {/* ID 입력 */}
                        <div className="relative">
                            <input
                                className={`oauth-nav border focus:outline-0 focus:ring ring-blue-100 w-full ${errors.email ? 'border-red-500' : 'border-gray-100'}`}
                                placeholder="email"
                                value={idInput}
                                onChange={(e) => {
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
                            <input
                                ref={pwInputRef}
                                className={`oauth-nav border focus:outline-0 focus:ring ring-blue-100 w-full ${errors.password ? 'border-red-500' : 'border-gray-100'}`}
                                placeholder="password"
                                type={inputType}
                                value={pwInput}
                                onChange={(e) => {
                                    setPwInput(e.currentTarget.value);
                                    if (errors.password) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            password: undefined,
                                        }));
                                        console.log(pwInput);
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

                            {/*account a11y*/}
                            <Link
                                className={'text-blue-500 absolute left-2 top-16'}
                                href={isPathnameSignup ? signinDir : pwFindDir}
                            >
                                {isPathnameSignup ? '계정이 있으신가요?' : '비밀번호 찾기'}
                            </Link>

                            {/*pw error*/}
                            {errors.password && (
                                <InvalidInputError>{errors.password}</InvalidInputError>
                            )}
                        </div>

                        {/*continue button*/}
                        <Button
                            type={'submit'}
                            action={() => {}}
                            className={
                                'w-fit px-4 py-2 rounded-md bg-sky-200 ml-auto hover:cursor-pointer hover:bg-sky-300'
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
