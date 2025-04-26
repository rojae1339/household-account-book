'use client';

import TransactionForm from '@/app/(dashboard)/ledger/_component/TransactionForm';
import SimpleTransaction from '@/app/(dashboard)/ledger/_component/SimpleTransac';
import { Suspense, useRef } from 'react';
import FetchTransactionSkeleton from '@/app/(dashboard)/ledger/loading';
import { useWidthEnough } from '@/app/(dashboard)/ledger/_hooks/useWidthEnough';
import { useTransaction } from '@/app/(dashboard)/ledger/_lib/useTransaction';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

// 컴포넌트 외부에서 QueryClient 인스턴스 생성
const queryClient = new QueryClient({});

// 실제 컨텐츠를 표시하는 내부 컴포넌트
function LedgerContent() {
    const enoughWidth = 850;
    const ref = useRef(null);
    const { isWidthEnough } = useWidthEnough(enoughWidth, ref);
    const { transactions, isLoading, isError } = useTransaction(); // 여기서 안전하게 사용

    console.log('data');

    if (isError) {
        notFound();
    }

    return (
        <div
            className={'w-full h-full flex flex-col gap-4'}
            ref={ref}
        >
            <TransactionForm isWidthEnough={isWidthEnough} />

            {isLoading ? (
                <FetchTransactionSkeleton />
            ) : (
                <SimpleTransaction
                    transactions={transactions || []}
                    isWidthEnough={isWidthEnough}
                    isRangeDate={false}
                />
            )}
        </div>
    );
}

// 메인 컴포넌트는 QueryClientProvider만 제공
export default function LedgerTransactionInside() {
    return (
        <QueryClientProvider client={queryClient}>
            <LedgerContent />
        </QueryClientProvider>
    );
}
