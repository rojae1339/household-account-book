'use client';

import DateInput from '@/app/(dashboard)/ledger/_component/form/DateInput';
import ItemInput from '@/app/(dashboard)/ledger/_component/form/ItemInput';
import PriceInput from '@/app/(dashboard)/ledger/_component/form/PriceInput';
import TransactionTypeSelectBox from '@/app/(dashboard)/ledger/_component/form/TransactionTypeSelectBox';
import { useRef } from 'react';
import TransactionClassificationInput from '@/app/(dashboard)/ledger/_component/form/TransactionClassificationInput';
import Button from '@/_component/Button';

export default function TransactionForm({ isWidthEnough }: { isWidthEnough: boolean }) {
    const formRef = useRef<HTMLFormElement>(null);

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
        </div>
    );
}
