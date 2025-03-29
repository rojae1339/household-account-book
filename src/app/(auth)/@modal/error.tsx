'use client';

import React, { ReactNode } from 'react';

type props = { children: ReactNode };

export default function AuthError({ children }: props) {
    return (
        <div className="absolute -right-2 top-1/2 transform translate-x-full -translate-y-1/2">
            <div className="relative bg-red-500 text-white text-xs rounded py-1 px-2 max-w-[210px]">
                <div className="absolute w-2 h-2 bg-red-500 transform rotate-45 -left-1 top-1/2 -translate-y-1/2"></div>
                {children}
            </div>
        </div>
    );
}
