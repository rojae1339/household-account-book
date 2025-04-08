import { ReactNode } from 'react';

export type baseProps = { children: ReactNode };

export type searchParamsProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type paramsProps = {
    params: Promise<{ slug: string }>;
};

export type allParamsProps = searchParamsProps & paramsProps;
