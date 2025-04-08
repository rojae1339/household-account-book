'use client';

import { redirect, usePathname } from 'next/navigation';
import { authMainDir, pwResetDir, tokenErrorDir } from '@/_constants/navigateConstants';

export default function Default() {
    const s = usePathname();

    if (s.includes(tokenErrorDir) || s.includes(pwResetDir)) {
        return null;
    }

    redirect(authMainDir);
}
