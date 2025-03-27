'use client';

import React, { ReactNode } from 'react';

type props = { children?: ReactNode; onClick: () => void; className: string };

export default function Button({ children, onClick, className }: props) {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {children ? children : null}
        </button>
    );
}
