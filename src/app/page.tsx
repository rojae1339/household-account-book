'use client';

import { redirect, RedirectType } from 'next/navigation';
import Button from '@/_component/Button';

export default function HomePage() {
    const handleF = () => redirect('/signup', RedirectType.push);
    const handleS = () => redirect('/signin', RedirectType.push);
    const handleP = () => redirect('/pw-find', RedirectType.push);

    //todo 회원 인증후 라우팅 (ledger로 라우팅)

    return (
        <div className={'flex flex-col border w-full h-full'}>
            <Button
                action={handleF}
                className={'bg-blue-300/30 hover:cursor-pointer'}
                type={'button'}
            >
                modal signup
            </Button>
            <Button
                action={handleS}
                className={'bg-blue-300/30 hover:cursor-pointer'}
                type={'button'}
            >
                modal signin
            </Button>
            <Button
                action={handleP}
                className={'bg-blue-300/30 hover:cursor-pointer'}
                type={'button'}
            >
                modal pwfind
            </Button>
        </div>
    );
}
