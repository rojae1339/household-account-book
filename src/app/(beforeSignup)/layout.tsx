import React, { PropsWithChildren, ReactNode } from 'react';

export type HomeLayoutProps = Readonly<
    PropsWithChildren<{
        modal: ReactNode;
    }>
>;

export default function BeforeSignupLayout({ children, modal }: HomeLayoutProps) {
    return (
        <div>
            {children}
            {modal}
        </div>
    );
}
