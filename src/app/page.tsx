import { redirect, RedirectType } from 'next/navigation';
import { authMainDir } from '@/_constants/navigateConstants';
import { searchParamsProps } from '@/_constants/props';

export default async function HomePage({ searchParams }: searchParamsProps) {
    const searchP = await searchParams;

    //todo oauth callbackUrl 에러 발생시 해결방법 몰라서 해당 url시에 리다이렉트
    if (searchP.error) {
        redirect(authMainDir, RedirectType.push);
    }

    return <div className={'flex flex-col w-full h-full'}></div>;
}
