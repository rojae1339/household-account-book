'use client';

import { OAuthNavObject } from '@/_constants/navigateConstants';
import React from 'react';
import Button from '@/_component/Button';
import { handleOauthSignin } from '@/_utils/oauthUtils';

export default function ModalOAuthNav() {
    return (
        <div className={'flex flex-col gap-4 w-full'}>
            {Object.values(OAuthNavObject).map((nav) => {
                return (
                    //버튼?
                    <Button
                        key={`oauth_${nav.displayName}`}
                        type={'button'}
                        className={
                            'flex flex-row items-center hover:cursor-pointer gap-6 oauth-nav justify-center xl:text-lg md:text-base text-sm' +
                            ` ${nav.bg_color} ${nav.hoverBgColor}`
                        }
                        action={() => handleOauthSignin(nav.provider, nav.callbackUrl)}
                    >
                        {nav.icon}
                        <p>{nav.displayName}</p>
                    </Button>
                );
            })}
        </div>
    );
}
