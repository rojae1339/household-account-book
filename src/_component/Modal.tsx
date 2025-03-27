'use client';

import React, { ReactNode } from 'react';
import Button from '@/_component/Button';
import { MdCloseFullscreen } from 'react-icons/md';
import { useRouter } from 'next/navigation';

type props = {
    children: ReactNode;
};

const className = {
    base:
        'flex justify-center absolute top-5/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' +
        'bg-white w-2/5 h-2/3 rounded-md px-5 py-4 min-w-md' +
        '',
};

export default function ModalDefault({ children }: props) {
    const router = useRouter();

    return (
        <>
            <div
                className={
                    'absolute top-1/2 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2 bg-gray-500/70'
                }
                onClick={() => router.back()}
            />
            <div className={className['base']}>
                <div className={'flex flex-col w-[90%] items-center'}>
                    {children}
                </div>
                <Button
                    onClick={() => router.back()}
                    className={'fixed left-[93%] text-xl hover:cursor-pointer'}
                >
                    {<MdCloseFullscreen />}
                </Button>
            </div>
        </>
    );
}
