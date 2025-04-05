'use client';

import React, { ReactNode } from 'react';
import { baseProps } from '@/_constants/props';

type buttonProps = baseProps & {
    action?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type: 'submit' | 'button' | 'reset' | undefined;
    className: string;
    disabled?: boolean;
};

//todo button style 지정

export default function Button({
    children,
    action,
    type,
    className,
    disabled = false,
}: buttonProps) {
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
