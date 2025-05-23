import React, { ReactNode } from 'react';
import { baseProps } from '@/_constants/props';

type modalLayoutProps = baseProps & { modal: ReactNode };

export default function BeforeSignupLayout({ children, modal }: modalLayoutProps) {
    return (
        <div className={'w-full h-full'}>
            {children}
            {modal}
        </div>
    );
}
