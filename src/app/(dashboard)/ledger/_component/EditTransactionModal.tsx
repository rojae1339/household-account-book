'use client';

import { ModalDefaultWithoutButton } from '@/_component/Modal';
import React, { useState } from 'react';
import {
    ITransactionResponse,
    IUpdateTransactionRequest,
} from '@/app/api/ledger/_dto/transactionDtos';

type props = {
    backgroundClick: () => void;
    transaction: ITransactionResponse; // 단일 트랜잭션 ID
};

//todo
export default function EditTransactionModal({ backgroundClick, transaction }: props) {
    const [editTransaction, setEditTransaction] = useState<IUpdateTransactionRequest>({
        title: transaction.title,
        date: new Date(transaction.date),
        memo: transaction.memo,
        price: transaction.price,
        transactionType: transaction.transactionType,
        displayName: transaction.displayName,
    });

    return (
        <>
            <div
                className={
                    'absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-400/60'
                }
                onClick={backgroundClick}
            />

            <ModalDefaultWithoutButton>
                <div className={`flex flex-col gap-4 items-center w-full`}>
                    <p className={'text-2xl bg-sky-100 w-full text-center rounded-md'}>
                        거래내역 변경
                    </p>
                    <form className={'w-full'}>
                        <div className={'flex gap-6 flex-1 justify-center items-center'}>
                            <p className={'text-xl'}>날짜</p>
                            <input
                                className={
                                    'outline rounded-md text-center px-1 py-1 outline-gray-400'
                                }
                                type={'date'}
                                value={editTransaction.date.toISOString().substring(0, 10)}
                                onChange={(e) =>
                                    setEditTransaction((prev) => ({
                                        ...prev,
                                        date: new Date(e.target.value),
                                    }))
                                }
                            />
                        </div>
                    </form>
                </div>
            </ModalDefaultWithoutButton>
        </>
    );
}
