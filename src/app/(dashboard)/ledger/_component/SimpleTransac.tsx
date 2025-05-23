'use client';

import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';
import { makePriceWithComma } from '@/app/(dashboard)/ledger/_utils/priceUtils';
import React, { ReactElement, useRef, useState } from 'react';
import Pagination from '@/app/_component/Pagination';
import { FaRegEdit } from 'react-icons/fa';
import { BsRecycle } from 'react-icons/bs';
import { IoTrashBinOutline } from 'react-icons/io5';
import EditTransactionModal from '@/app/(dashboard)/ledger/_component/EditTransactionModal';
import RecycleTransactionModal from '@/app/(dashboard)/ledger/_component/RecycleTransactionModal';
import DeleteTransactionsModal from '@/app/(dashboard)/ledger/_component/DeleteTransactionsModal';

const makeDay = (date: Date) => {
    const day = date.getDay();
    return ['일', '월', '화', '수', '목', '금', '토'][day];
};

const makeFormattedDate = (date: Date): string => {
    const localeDate = date.toLocaleDateString();
    const [year, month, day] = localeDate
        .replaceAll(' ', '')
        .replaceAll('.', '-')
        .split('-')
        .filter(Boolean);
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
};

function changeSetVisibility(prev: Set<number>, id: number) {
    const newSet = new Set(prev);
    if (newSet.has(id)) {
        newSet.delete(id);
    } else {
        newSet.add(id);
    }
    return newSet;
}

interface IFunctionIcon {
    key: string;
    icon: ReactElement;
}

const functionIcons: IFunctionIcon[] = [
    {
        key: 'editIcon_edit',
        icon: <FaRegEdit />,
    },
    {
        key: 'editIcon_recycle',
        icon: <BsRecycle />,
    },
    {
        key: 'editIcon_delete',
        icon: <IoTrashBinOutline />,
    },
];

export type modalType = 'edit' | 'recycle' | 'delete' | '';

export default function SimpleTransaction({
    isWidthEnough,
    isRangeDate,
    transactions,
}: {
    isWidthEnough: boolean;
    isRangeDate: boolean;
    transactions: ITransactionResponse[];
}) {
    const [selectedTransaction, setSelectedTransaction] = useState<ITransactionResponse>();
    const [selectedTransactionsIds, setSelectedTransactionsIds] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const isDragging = useRef(false);
    const dragSelected = useRef<Set<number>>(new Set());
    const [showModalType, setShowModalType] = useState<modalType>('');

    // 페이지네이션 계산
    const ITEMS_PER_PAGE = 30;
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const visibleTransactions = transactions.slice(startIndex, endIndex);

    //마우스 클릭후 드래그 시 selectedId변경
    const handleMouseDown = (e: React.MouseEvent, id: number) => {
        // 클릭된 요소가 체크박스인 경우 드래그 이벤트를 시작하지 않음
        if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
            return;
        }

        isDragging.current = true;
        dragSelected.current = new Set([id]);
        setSelectedTransactionsIds((prev) => {
            return changeSetVisibility(prev, id);
        });
    };

    //마우스 클릭후 드래그 시 selectedId변경
    const handleMouseEnter = (id: number) => {
        if (!isDragging.current) return;
        dragSelected.current.add(id);
        setSelectedTransactionsIds((prev) => {
            return changeSetVisibility(prev, id);
        });
    };

    //마우스 클릭후 드래그 시 selectedId변경
    const handleMouseUp = () => {
        isDragging.current = false;
        dragSelected.current.clear();
    };

    //선택된 transactions 들을 재클릭시 해제하거나, 클릭하기
    const toggleSelection = (id: number) => {
        setSelectedTransactionsIds((prev) => {
            return changeSetVisibility(prev, id);
        });
    };

    //todo 너비에 따른 컴포넌트
    if (!isWidthEnough) {
        return <div>todo</div>;
    }

    return (
        <div
            className="flex flex-col w-full"
            onMouseUp={handleMouseUp}
        >
            <div className="flex items-center pl-10 pb-3 gap-4">
                <p className="">거래 내역</p>

                {/*일괄 선택 해제 버튼*/}
                <button
                    type={'button'}
                    className={`flex items-center gap-4 rounded-md px-2 py-1 
                        ${selectedTransactionsIds.size === 0 ? 'bg-gray-300' : 'bg-sky-200 active:bg-sky-300'}`}
                    onClick={() => {
                        setSelectedTransactionsIds(new Set<number>());
                    }}
                    disabled={selectedTransactionsIds.size === 0}
                >
                    <p className={'text-gray-800'}>선택 일괄 해제</p>
                </button>
            </div>
            <div className="flex w-full px-8 py-4 rounded-2xl flex-col gap-2 justify-center items-start bg-sky-100">
                {visibleTransactions.map((t) => {
                    const date = new Date(t.date);
                    const isSelected = selectedTransactionsIds.has(t.id);

                    return (
                        <div
                            key={t.id}
                            onMouseDown={(e) => handleMouseDown(e, t.id)}
                            onMouseEnter={() => handleMouseEnter(t.id)}
                            className={`flex gap-6 w-full px-2 border-b py-2 border-gray-400 transition-colors duration-100 rounded-md ${
                                isSelected ? 'bg-yellow-100' : 'bg-transparent'
                            } select-none`}
                        >
                            {/*체크박스/날짜 및 요일*/}
                            <div className="flex items-center gap-4">
                                <input
                                    className="w-4 h-4"
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelection(t.id)}
                                />
                                <div className="flex gap-2 items-center">
                                    <p>{makeFormattedDate(date)}</p>
                                    <p className="text-sm text-gray-600">{makeDay(date)}</p>
                                </div>
                            </div>

                            {/*거래 내용 및 금액*/}
                            {/*todo 여기 클릭시 memo 띄우기*/}
                            <div className="flex justify-between xl:flex-1 flex-none hover:cursor-pointer">
                                <p className="w-40 truncate">{t.title}</p>
                                <p className="w-32 text-right">
                                    {makePriceWithComma(Number(t.price))}
                                </p>
                            </div>

                            {/*거래 타입 및 거래 내역 타입*/}
                            <div className="flex lg:gap-10 md:gap-4 min-w-fit">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs">
                                        {t.transactionType === 'INCOME' ? '🟢' : '🔴'}
                                    </p>
                                    <p>{t.transactionType === 'INCOME' ? '수입' : '지출'}</p>
                                </div>
                                <p className={'w-20'}>{t.displayName}</p>
                            </div>

                            {/*edit 아이콘*/}
                            <div
                                className={
                                    'flex-1 flex justify-between xl:pr-20 pr-6 text-xl max-w-80 '
                                }
                            >
                                {functionIcons.map((o) => {
                                    const mdType = o.key.split('_')[1] as modalType;

                                    return (
                                        <button
                                            key={o.key}
                                            type="button"
                                            data-type={mdType}
                                            className="flex hover:cursor-pointer max-w-fit"
                                            onClick={() => {
                                                if (mdType === 'delete') {
                                                    // delete 눌렀을 때, 선택 안되어 있으면 추가
                                                    if (!selectedTransactionsIds.has(t.id)) {
                                                        setSelectedTransactionsIds((prev) => {
                                                            const newSet = new Set(prev);
                                                            newSet.add(t.id);
                                                            return newSet;
                                                        });
                                                    }
                                                } else if (
                                                    mdType === 'edit' ||
                                                    mdType === 'recycle'
                                                ) {
                                                    // edit이나 recycle 버튼을 누르면 모든 selectedIds를 지우고 현재 transaction만 선택
                                                    setSelectedTransactionsIds(new Set([t.id]));
                                                    setSelectedTransaction(t);
                                                } else if (mdType !== '') {
                                                    setSelectedTransaction(t);
                                                }
                                                setShowModalType(mdType);
                                            }}
                                            onMouseDown={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            {o.icon}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {showModalType === 'edit' && selectedTransaction && (
                    <EditTransactionModal
                        backgroundClick={() => setShowModalType('')}
                        transaction={selectedTransaction}
                    />
                )}

                {showModalType === 'recycle' && selectedTransaction && (
                    <RecycleTransactionModal
                        backgroundClick={() => setShowModalType('')}
                        transaction={selectedTransaction}
                    />
                )}

                {showModalType === 'delete' && (
                    <DeleteTransactionsModal
                        backgroundClick={() => setShowModalType('')}
                        selectedTransactionsIds={selectedTransactionsIds}
                    />
                )}

                {/* 페이지네이션 컴포넌트 */}
                {!isRangeDate && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        maxPageButtons={5} // 원하는 페이지 버튼 개수 설정
                        onPageChange={(page: number) => {
                            if (totalPages < page || page < 1) return;
                            setCurrentPage(page);
                        }}
                    />
                )}

                {/* 현재 페이지 정보 표시 */}
                {!isRangeDate && totalPages > 1 && (
                    <div className="w-full text-center text-sm text-gray-500 mt-2">
                        {currentPage} / {totalPages} 페이지 (총 {transactions.length}개 항목)
                    </div>
                )}
            </div>
        </div>
    );
}
