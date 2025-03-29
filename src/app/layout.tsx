import type { Metadata } from 'next';
import './globals.css';
import React, { ReactNode } from 'react';
import Header from '@/app/_component/Header';
import Sidebar from '@/app/_component/Sidebar';
import { baseProps } from '@/_constants/props';

export const metadata: Metadata = {
    title: 'Hold House!',
    description: 'manage your ledger',
};

export default function RootLayout({ children }: baseProps) {
    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
        >
            <body
                className={'bg-sky-50 overflow-y-scroll px-6 py-4 max-w-full w-screen h-screen'}
                cz-shortcut-listen="true"
            >
                {children}
            </body>
        </html>
    );
}
