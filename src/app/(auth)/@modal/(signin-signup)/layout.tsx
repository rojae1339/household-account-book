import { baseProps } from '@/_constants/props';
import ModalLogo from '@/app/(auth)/@modal/_component/_base/ModalLogo';
import ModalOAuthNav from '@/app/(auth)/@modal/_component/_base/ModalOAuthNav';
import React from 'react';

export default async function SigninSignupModalLayout({ children }: baseProps) {
    return (
        <div className={'flex flex-col h-full justify-center'}>
            {/*Logo & introduce*/}
            <ModalLogo />

            {/*Oauth nav*/}
            <ModalOAuthNav />

            {/*division line*/}
            <div className={'w-full flex items-center justify-between my-4'}>
                <hr className={'border w-2/5 border-gray-300 '} />
                <p className={'font-semibold'}>or</p>
                <hr className={'border w-2/5 border-gray-300 '} />
            </div>

            <div className={'flex flex-col gap-4'}>{children}</div>
        </div>
    );
}
