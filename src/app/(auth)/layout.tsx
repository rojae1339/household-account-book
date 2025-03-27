import React, { PropsWithChildren, ReactNode } from 'react';

type props = { children: ReactNode; modal: ReactNode };

export default function BeforeSignupLayout({ children, modal }: props) {
    return (
        <div>
            {children}
            {modal}
        </div>
    );
}
