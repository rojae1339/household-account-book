'use client';

import LogoIcon from '@/_component/LocoIcon';
import React from 'react';
import { usePathname } from 'next/navigation';
import { signupDir } from '@/_constants/navigateConstants';

export default function ModalLogo() {
    const pathname = usePathname();

    const introduce: Record<'signup' | 'signin', string> = {
        signup: 'Create your own ledger and manage money!',
        signin: 'Login to your own ledger and manage money!',
    };

    return (
        //introduce
        <div className={'flex flex-row items-center pt-4 pb-8 gap-4 w-full h-fit justify-center'}>
            <LogoIcon className={''} />
            <div className={'xl:text-lg md:text-base xs:text-sm 2xs:text-lg'}>
                {pathname === signupDir ? introduce.signup : introduce.signin}
            </div>
        </div>
    );
}
