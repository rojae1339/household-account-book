'use client';

import { ITransactionResponse } from '@/app/api/(ledger)/_dto/transactionDtos';
import { makePriceWithComma } from '@/app/(dashboard)/ledger/_utils/priceUtils';
import React, { ReactElement, useRef, useState } from 'react';
import Button from '@/_component/Button';
import Pagination from '@/app/_component/Pagination';
import { FaRegEdit } from 'react-icons/fa';
import { BsRecycle } from 'react-icons/bs';
import { IoTrashBinOutline } from 'react-icons/io5';
import FetchTransactionSkeleton from '@/app/(dashboard)/ledger/loading';

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

interface IEditIcon {
    key: string;
    icon: ReactElement;
    action: () => void;
}

//todo 각 버튼 action만들기/ api 라우트로 하기
const editIconList: IEditIcon[] = [
    {
        key: 'editIcon_edit',
        icon: <FaRegEdit />,
        action: () => {},
    },
    { key: 'editIcon_cycle', icon: <BsRecycle />, action: () => {} },
    { key: 'editIcon_bin', icon: <IoTrashBinOutline />, action: () => {} },
];

export default function SimpleTransaction({
    isWidthEnough,
    isRangeDate,
    transactions,
}: {
    isWidthEnough: boolean;
    isRangeDate: boolean;
    transactions: ITransactionResponse[];
}) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState<number>(1);
    const isDragging = useRef(false);
    const dragSelected = useRef<Set<number>>(new Set());

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
        setSelectedIds((prev) => {
            return changeSetVisibility(prev, id);
        });
    };

    //마우스 클릭후 드래그 시 selectedId변경
    const handleMouseEnter = (id: number) => {
        if (!isDragging.current) return;
        dragSelected.current.add(id);
        setSelectedIds((prev) => {
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
        setSelectedIds((prev) => {
            return changeSetVisibility(prev, id);
        });
    };

    //width가 enough하지 않을때 simpleTransaction 컴포넌트
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
                <Button
                    type={'button'}
                    className={`flex items-center gap-4 rounded-md px-2 py-1 
                        ${selectedIds.size === 0 ? 'bg-gray-300' : 'bg-sky-200 active:bg-sky-300'}`}
                    action={() => {
                        setSelectedIds(new Set<number>());
                    }}
                    disabled={selectedIds.size === 0}
                >
                    <p className={'text-gray-800'}>선택 일괄 해제</p>
                </Button>
            </div>
            <div className="flex w-full px-8 py-4 rounded-2xl flex-col gap-2 justify-center items-start bg-sky-100">
                {visibleTransactions.map((t) => {
                    const date = new Date(t.date);
                    const isSelected = selectedIds.has(t.id);

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
                            <div className="flex justify-between xl:flex-1 flex-none">
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
                            {/*todo 수정 삭제 재입력(다중선택 혹은 단일 선택후 클릭시 바로 post요청 같은걸로 오늘날짜로)*/}
                            <div className={'flex-1 flex text-xl max-w-80'}>
                                {editIconList.map((o) => {
                                    return (
                                        <Button
                                            key={o.key}
                                            type={'button'}
                                            className={'flex-1'}
                                        >
                                            {o.icon}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

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
