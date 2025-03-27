'use client';

import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';
import { homeDir, pagesNavObject } from '@/navigateConstants';

export default function Header() {
    const pathname: string = usePathname();
    const [input, setInput] = useState('');

    return (
        <header
            className={
                'fixed left-0 top-0 text-gray-100 sm:py-0 py-2 w-full min-w-[300px] min-h-[50px] flex flex-row items-center justify-between bg-blue-300 gap-10 shadow-md shadow-gray-400'
            }
        >
            {/*로고*/}
            <div className={`lg:pl-10 pl-4 xs:block hidden`}>
                <Link
                    href={homeDir}
                    className={'flex flex-row items-center gap-4'}
                >
                    <FaQuestionCircle className={'text-2xl'} />
                    <h1 className={'text-xl'}>household</h1>
                </Link>
            </div>

            {/*서치바*/}
            <form className={'rounded-md w-2/5 sm:block hidden py-1'}>
                <input
                    placeholder={'검색어를 입력하세요'}
                    className={`w-full py-2 px-4 rounded-md focus:outline-0 bg-blue-500 focus:bg-blue-600 focus:rounded-xs`}
                    onChange={(e) => setInput(e.currentTarget.value)}
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
        </header>
    );
}
