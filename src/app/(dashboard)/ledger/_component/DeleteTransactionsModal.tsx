import { ModalDefaultWithoutButton } from '@/_component/Modal';
import React from 'react';
import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';

type props = {
    backgroundClick: () => void;
    selectedTransactionsIds: Set<number>;
};

export default function DeleteTransactionsModal({
    backgroundClick,
    selectedTransactionsIds,
}: props) {
    return (
        <>
            <div
                className={
                    'absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-400/60'
                }
                onClick={backgroundClick}
            />
            <ModalDefaultWithoutButton>delete</ModalDefaultWithoutButton>
        </>
    );
}
