'use client';

import { ModalDefaultWithoutButton } from '@/_component/Modal';
import React from 'react';
import { modalType } from '@/app/(dashboard)/ledger/_component/SimpleTransac';
import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';

type props = {
    modalType: modalType;
    backgroundClick: () => void;
    transaction?: ITransactionResponse; // 단일 트랜잭션 ID
    selectedIds?: Set<number>;
};

//todo
export const EditingModal = ({ modalType, backgroundClick, transaction, selectedIds }: props) => {
    if (modalType === '') return null;

    if (modalType === 'edit') {
        console.log('edit');
        console.log('trans: ', transaction);
        console.log('ids: ', selectedIds);
        return (
            <>
                <div
                    className={
                        'absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-400/60'
                    }
                    onClick={backgroundClick}
                />

                <ModalDefaultWithoutButton>
                    <p>{transaction?.date}</p>
                    <form>
                        <input />
                    </form>
                </ModalDefaultWithoutButton>
            </>
        );
    }

    if (modalType === 'delete') {
        console.log('delete');
        console.log('trans: ', transaction);
        console.log('ids: ', selectedIds);
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

    if (modalType === 'recycle') {
        console.log('recycle');
        console.log('trans: ', transaction);
        console.log('ids: ', selectedIds);
        return (
            <>
                <div
                    className={
                        'absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-gray-400/60'
                    }
                    onClick={backgroundClick}
                />
                <ModalDefaultWithoutButton>recycle</ModalDefaultWithoutButton>
            </>
        );
    }
};
