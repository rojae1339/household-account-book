'use client';

import { usePathname } from 'next/navigation';
import { pwFindDir, signinDir, signupDir } from '@/_constants/navigateConstants';
import Link from 'next/link';
import React from 'react';

export default function ModalAlly() {
    const pathname = usePathname();

    return (
        <Link
            className={'text-blue-500 absolute left-12 top-[91%] xs:text-sm'}
            href={pathname === signupDir ? signinDir : pwFindDir}
        >
            {pathname === signupDir ? '계정이 있으신가요?' : '비밀번호 찾기'}
        </Link>
    );
}
