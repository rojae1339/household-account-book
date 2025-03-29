import Header from '@/app/_component/Header';
import Sidebar from '@/app/_component/Sidebar';
import React from 'react';

export default function AfterSignupLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Header />

            <div className={'flex flex-row gap-4 pt-14'}>
                <Sidebar />
                <main className={`md:pl-64 sm:pl-56 pl-10`}>{children}</main>
            </div>
        </>
    );
}
