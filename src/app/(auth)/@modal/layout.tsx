'use client';

import React, { ReactNode } from 'react';
import ModalDefault from '@/_component/Modal';
import { usePathname } from 'next/navigation';
import { signinDir, signupDir } from '@/navigateConstants';

//todo
export default function AuthModalLayout() {
    const pathname = usePathname();

    switch (pathname) {
        case signupDir:
            return (
                <ModalDefault>
                    <hr />
                    siunup dladlal
                </ModalDefault>
            );
        case signinDir:
            return (
                <ModalDefault>
                    <hr />
                    siunin modaldldl
                </ModalDefault>
            );
    }
}
