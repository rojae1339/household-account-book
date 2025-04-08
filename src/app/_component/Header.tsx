'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    non_authMainDir,
    authMainDir,
    pagesNavObject,
    pwFindDir,
    pwResetDir,
    signinDir,
    signupDir,
    tokenErrorDir,
} from '@/_constants/navigateConstants';
import LogoIcon from '@/_component/LocoIcon';
import Button from '@/_component/Button';

export default function Header() {
    const pathname: string = usePathname();

    let isAuthDirMatchingPath = false;
    const dirArr = [signinDir, signupDir, pwFindDir, tokenErrorDir, pwResetDir]; //mainDir '/'

    for (const dir of dirArr) {
        if (pathname === authMainDir || pathname === '') {
            isAuthDirMatchingPath = true;
            break;
        }
        if (pathname.includes(dir)) {
            isAuthDirMatchingPath = true;
            break;
        }
    }
    return (
        <header
            className={
                'fixed left-0 top-0 text-gray-100 sm:py-0 py-2 w-full min-w-[300px] min-h-[50px] flex flex-row items-center justify-between bg-blue-300 gap-10 shadow-md shadow-gray-400'
            }
        >
            {/*로고*/}
            <div className={`lg:pl-10 pl-4 xs:block hidden`}>
                <Link
                    href={isAuthDirMatchingPath ? authMainDir : non_authMainDir}
                    className={'flex flex-row items-center gap-4'}
                >
                    <LogoIcon className={'text-2xl'} />
                    <h1 className={'text-xl'}>household</h1>
                </Link>
            </div>

            {isAuthDirMatchingPath ? <AuthHeader /> : <NavHeader pathname={pathname} />}
        </header>
    );
}

export function AuthHeader() {
    const router = useRouter();

    //todo 뭘 넣어야할까
    return (
        <div className={'w-full'}>
            <div className={'flex gap-6 px-6 w-full xs:w-auto xs:justify-end justify-between'}>
                <Button
                    action={() => {
                        router.push(signinDir);
                    }}
                    className={'bg-blue-300/30 hover:cursor-pointer'}
                    type={'button'}
                >
                    {<p>Login</p>}
                </Button>
                <Button
                    action={() => router.push(signupDir)}
                    className={'bg-blue-300/30 hover:cursor-pointer'}
                    type={'button'}
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
}

export function NavHeader({ pathname }: { pathname: string }) {
    const [searchBarInput, setSearchBarInput] = useState<string>('');

    return (
        <>
            {/*서치바*/}
            <form className={'rounded-md w-2/5 sm:block hidden py-1'}>
                <input
                    placeholder={'검색어를 입력하세요'}
                    className={`w-full py-2 px-4 rounded-md focus:outline-0 bg-blue-500 focus:bg-blue-600 focus:rounded-xs`}
                    onChange={(e) => setSearchBarInput(e.currentTarget.value)}
                />
            </form>

            {/*todo search dropdown*/}
            {/*네비게이션*/}
            <nav
                className={
                    'w-full xs:w-auto flex flex-row items-center justify-between xs:gap-7 px-6 align'
                }
            >
                {Object.values(pagesNavObject).map((page) => {
                    return (
                        <Link
                            key={`link_${page.displayName}`}
                            href={page.url}
                            className={`min-w-10 transition-all duration-100 ease-linear hover:text-shadow ${page.url === pathname ? 'border-t-8 text-shadow -mt-3 pt-1' : ''}`}
                        >
                            {page.displayName}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
