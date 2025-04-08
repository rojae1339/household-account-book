import { signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

export const handleOauthSignin = async (provider: BuiltInProviderType, callbackUrl?: string) =>
    signIn(provider, { callbackUrl: callbackUrl });
