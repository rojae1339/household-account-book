import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/app/_component/Header';
import Sidebar from '@/app/_component/Sidebar';

export const metadata: Metadata = {
    title: 'Hold House!',
    description: 'manage your ledger',
};

type props = { children: React.ReactNode; modal: ReactNode };
export default function RootLayout({ children, modal }: props) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={'bg-sky-50 overflow-y-scroll px-6 py-4 max-w-full pt-16'} cz-shortcut-listen="true">
                {children}
                {modal}
            </body>
        </html>
    );
}
