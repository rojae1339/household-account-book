'use client';

import React, { ReactNode } from 'react';
import Button from '@/_component/Button';
import { MdCloseFullscreen } from 'react-icons/md';

type props = {
    children: ReactNode;
};

const className = {
    base:
        'flex justify-center absolute top-5/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' +
        'bg-white w-2/5 h-2/3 rounded-md px-5 py-4',
};

export default function ModalDefault({ children }: props) {
    return (
        <>
            <div
                className={
                    'absolute top-1/2 left-1/2 w-screen h-screen -translate-x-1/2 -translate-y-1/2 bg-gray-500/70'
                }
            />
            <div className={className['base']}>
                <div className={'border w-[90%]'}>{children}</div>
                <Button
                    onClick={() => console.log()}
                    className={''}
                >
                    {<MdCloseFullscreen />}
                </Button>
            </div>
        </>
    );
}
