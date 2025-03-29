'use client';

import React, { ReactNode } from 'react';

type props = {
    children?: ReactNode;
    action: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type: 'submit' | 'button' | 'reset' | undefined;
    className: string;
    disabled?: boolean;
};

export default function Button({ children, action, type, className, disabled = false }: props) {
    return (
        <button
            className={className}
            onClick={action}
            type={type}
            disabled={disabled}
        >
            {children ? children : null}
        </button>
    );
}
