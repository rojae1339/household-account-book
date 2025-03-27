'use client';

import { redirect, RedirectType } from 'next/navigation';
import Button from '@/_component/Button';

export default function HomePage() {
    const handleF = () => redirect('/signup', RedirectType.push);
    const handleS = () => {
        redirect('/signin', RedirectType.push);
    };

    //todo 회원 인증후 라우팅 (ledger로 라우팅)

    return (
        <div className={'flex flex-col'}>
            main
            <Button
                onClick={handleF}
                className={'bg-blue-300/30 hover:cursor-pointer'}
            >
                modal bttn
            </Button>
            <Button
                onClick={handleS}
                className={'bg-blue-300/30 hover:cursor-pointer'}
            >
                modal signin
            </Button>
        </div>
    );
}
