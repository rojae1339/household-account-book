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
        'flex justify-center absolute 2xs:top-6/12 xs:top-5/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' +
        'bg-white 2xs:w-full 2xs:h-full xs:w-3/6 xs:h-2/3 rounded-md px-5 py-6 2xs:min-w-2xs xs:min-w-lg xs:min-w-xs' +
        '',
};

export default function ModalDefault({ children }: props) {
    const router = useRouter();

    return (
        <>
            <div
                className={
                    'absolute  top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-400/60'
                }
                onClick={() => router.back()}
            />
            <div className={className['base']}>
                <div className={'w-[90%]'}>{children}</div>
                <Button
                    type={undefined}
                    action={() => router.back()}
                    className={'fixed left-[90%] lg:left-[93%] top-3 text-xl hover:cursor-pointer'}
                >
                    {<MdCloseFullscreen />}
                </Button>
            </div>
        </>
    );
}
