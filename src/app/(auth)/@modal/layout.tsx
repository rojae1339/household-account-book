import React from 'react';
import ModalDefault from '@/_component/Modal';
import { baseProps } from '@/_constants/props';

export default function AuthModalLayout({ children }: baseProps) {
    //return signin signup modal
    return <ModalDefault>{children}</ModalDefault>;
}
