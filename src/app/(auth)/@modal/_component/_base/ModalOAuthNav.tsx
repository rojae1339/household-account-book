import { OAuthNavObject } from '@/_constants/navigateConstants';
import Link from 'next/link';
import React from 'react';

export default function ModalOAuthNav() {
    return (
        <div className={'flex flex-col gap-4 w-full'}>
            {Object.values(OAuthNavObject).map((nav) => {
                return (
                    //버튼?
                    <Link
                        key={`oauth_${nav.displayName}`}
                        href={nav.url}
                        className={
                            'flex flex-row items-center gap-6 oauth-nav justify-center xl:text-lg md:text-base text-sm' +
                            ` ${nav.bg_color}`
                        }
                    >
                        {nav.icon}
                        <p>{nav.displayName}</p>
                    </Link>
                );
            })}
        </div>
    );
}
