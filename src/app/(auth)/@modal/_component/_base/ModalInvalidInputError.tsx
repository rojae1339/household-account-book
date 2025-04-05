'use client';

import { baseProps } from '@/_constants/props';
import React, { useEffect, useState } from 'react';

export function InvalidInputError({ children }: baseProps) {
    const [isScreenSizeEnough, setIsScreenSizeEnough] = useState<boolean>(window.innerWidth > 736);

    const minInnerWidth = 736;

    useEffect(() => {
        const handleResize = () => setIsScreenSizeEnough(window.innerWidth > minInnerWidth);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isScreenSizeEnough) {
        return (
            <div className="absolute -right-2 top-1/2 transform translate-x-full -translate-y-1/2">
                <div className="relative bg-red-500 text-white text-xs rounded py-1 px-2 max-w-[210px]">
                    <div className="absolute w-2 h-2 bg-red-500 transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
                    {children}
                </div>
            </div>
        );
    }

    return <div className={'absolute text-xs top-13 text-red-500 break-keep'}>{children}</div>;
}
