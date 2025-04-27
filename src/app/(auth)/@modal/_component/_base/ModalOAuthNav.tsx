'use client';

import { OAuthNavObject } from '@/_constants/navigateConstants';
import React from 'react';
import { handleOauthSignin } from '@/_utils/oauthUtils';

export default function ModalOAuthNav() {
    return (
        <div className={'flex flex-col gap-4 w-full'}>
            {Object.values(OAuthNavObject).map((nav) => {
                return (
                    //버튼?
                    <button
                        key={`oauth_${nav.displayName}`}
                        type={'button'}
                        className={
                            'flex flex-row items-center hover:cursor-pointer gap-6 oauth-nav justify-center xl:text-lg md:text-base text-sm' +
                            ` ${nav.bg_color} ${nav.hoverBgColor}`
                        }
                        onClick={() => handleOauthSignin(nav.provider, nav.callbackUrl)}
                    >
                        {nav.icon}
                        <p>{nav.displayName}</p>
                    </button>
                );
            })}
        </div>
    );
}
