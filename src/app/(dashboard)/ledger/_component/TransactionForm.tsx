'use client';

import DateInput from '@/app/(dashboard)/ledger/_component/DateInput';
import ItemInput from '@/app/(dashboard)/ledger/_component/ItemInput';
import PriceInput from '@/app/(dashboard)/ledger/_component/PriceInput';
import TransactionTypeSelectBox from '@/app/(dashboard)/ledger/_component/TransactionTypeSelectBox';
import { useEffect, useRef, useState } from 'react';
import TransactionClassificationInput from '@/app/(dashboard)/ledger/_component/TransactionClassificationInput';
import SimpleTransaction from '@/app/(dashboard)/ledger/_component/SimpleTransac';
import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';
import { notFound } from 'next/navigation';
import Button from '@/_component/Button';

export default function TransactionForm() {
    const enoughWidth = 800;
    const [isWidthEnough, setIsWidthEnough] = useState<boolean>(true);
    const formRef = useRef<HTMLFormElement>(null);

    const [transactions, setTransactions] = useState<ITransactionResponse[] | null>(null);

    useEffect(() => {
        const handle = () => {
            const width = formRef.current?.offsetWidth ?? 0;
            setIsWidthEnough(width >= enoughWidth);
        };

        handle(); // 최초 실행
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [isWidthEnough]);

    //transactions fetch
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const res = await fetch('/api/transactions');
                if (!res.ok) {
                    notFound();
                }

                const data = await res.json();

                setTransactions(data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchTransaction();
    }, []);

    return (
        <div className={'flex flex-col gap-5 w-full min-w-[260px]'}>
            <div
                className={'w-full  h-2/5 min-h-[250px] px-8 py-4 bg-sky-100 rounded-2xl relative'}
            >
                {/*입력창*/}
                <form
                    ref={formRef}
                    className={'flex gap-4 flex-wrap w-full h-full'}
                >
                    <DateInput
                        title={'날짜'}
                        isRangeDate={false}
                    />
                    <ItemInput title={'항목'} />
                    <PriceInput />
                    <div className={`flex gap-4 ${!isWidthEnough ? 'flex-wrap w-full' : ''}`}>
                        <TransactionTypeSelectBox />
                        <TransactionClassificationInput />
                    </div>

                    {/* 버튼을 항상 오른쪽에 고정 */}
                    <div className={'w-full flex justify-end mt-auto'}>
                        <Button
                            type={'submit'}
                            className={
                                'bg-emerald-200 rounded-md lg:w-fit w-full px-4 py-2 text-sm'
                            }
                        >
                            입력
                        </Button>
                    </div>
                </form>
            </div>

            {/*todo 단순거래내역*/}
            <SimpleTransaction
                isWidthEnough={isWidthEnough}
                transactions={transactions}
                isRangeDate={false}
            />
        </div>
    );
}
