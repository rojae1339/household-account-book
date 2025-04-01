import Header from '@/app/_component/Header';
import Sidebar from '@/app/_component/Sidebar';
import React from 'react';
import { pagesNavObject } from '@/_constants/navigateConstants';
import Link from 'next/link';
import { baseProps } from '@/_constants/props';

export default function AfterSignupLayout({ children }: baseProps) {
    return (
        <>
            <div className={'flex flex-row gap-4'}>
                <Sidebar />
                <main className={`md:pl-64 sm:pl-56 pl-10`}>{children}</main>
            </div>
        </>
    );
}
