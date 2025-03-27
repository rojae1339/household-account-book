import React, { ReactNode } from 'react';
import ModalDefault from '@/_component/Modal';

type props = { children: ReactNode };

export default function SignModalLayout({ children }: props) {
    return <ModalDefault>{children}</ModalDefault>;
}
