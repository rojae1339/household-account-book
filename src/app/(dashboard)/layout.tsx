import Sidebar from '@/app/_component/Sidebar';
import React from 'react';
import { baseProps } from '@/_constants/props';

export default function AfterSignupLayout({ children }: baseProps) {
    return (
        <>
            <div className={'flex flex-row gap-4 w-full h-full'}>
                <Sidebar />
                <main className={`md:pl-56 pl-10 w-full h-full`}>{children}</main>
            </div>
        </>
    );
}
