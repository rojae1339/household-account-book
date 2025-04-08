'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { baseProps } from '@/_constants/props';

export default function AuthProvider({ children }: baseProps) {
    return <SessionProvider>{children}</SessionProvider>;
}
