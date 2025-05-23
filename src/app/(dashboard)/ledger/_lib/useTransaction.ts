'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ITransactionResponse } from '@/app/api/ledger/_dto/transactionDtos';
import { notFound } from 'next/navigation';

//todo update delete create 만들기

const getTransactions = async (): Promise<ITransactionResponse[]> => {
    const res = await fetch(`http://localhost:3000/api/transactions`);

    if (!res.ok) {
        notFound();
    }

    return await res.json();
};

export const useTransaction = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const query = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

    return {
        transactions: data,
        isLoading,
        isError,
    };
};
