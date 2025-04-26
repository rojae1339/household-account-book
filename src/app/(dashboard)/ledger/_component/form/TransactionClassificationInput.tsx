import { useEffect, useRef, useState } from 'react';
import { checkMouseOnComponent } from '@/app/(dashboard)/_utils/checkMouseOnComponent';
import { useMouseLeaveClose } from '@/app/(dashboard)/_utils/useMouseLeaveCheck';
import { AnimatePresence, motion } from 'framer-motion';
import InputWithModal from '@/app/(dashboard)/ledger/_component/form/InputWithModal';

const getTransactionClassification = () => {
    return [
        '월급',
        '상여금',
        '펀드, 주식',
        '기타수익',
        '식비',
        '교통비',
        '주거, 통신',
        '생활용품',
        '경조사비',
        '지식, 문화',
        '의복, 미용',
        '의료, 건강',
        '여가, 유흥',
        '세금, 이자',
        '기타비용',
    ];
};

export default function TransactionClassificationInput() {
    const closeShowListDelayTime = 500; //ms

    const [classificationInput, setClassificationInput] = useState<string>('');
    const [showClassificationList, setShowClassificationList] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const classificationListRef = useRef<HTMLDivElement>(null);

    return (
        <div className={'flex flex-col w-80 gap-2'}>
            <InputWithModal
                title={'수입/지출 유형'}
                containerRef={containerRef}
                name={'classification'}
                value={classificationInput}
                showList={showClassificationList}
                setShowList={setShowClassificationList}
                onClick={() => setShowClassificationList(true)}
                readOnly={true}
                listRef={classificationListRef}
                modalDelayTime={closeShowListDelayTime}
                inputStyle={'notDefinedWidth'}
                motionDivStyle={'overflow'}
            >
                {getTransactionClassification().map((c) => {
                    return (
                        <div
                            className={`border-b border-gray-400 p-2 hover:bg-pink-50 hover:cursor-pointer snap-start
                                    ${classificationInput === c && 'bg-pink-200 text-black'}`}
                            key={`modal_${c}`}
                            onClick={() => {
                                setShowClassificationList(false);
                                setClassificationInput(c);
                            }}
                        >
                            {c}
                        </div>
                    );
                })}
            </InputWithModal>
            <div className={'flex flex-wrap gap-2 text-sm text-gray-700'}>
                {getTransactionClassification().map((c) => {
                    return (
                        <div
                            className={`${classificationInput === c && 'bg-pink-200 text-black'} p-1 rounded-2xl hover:cursor-pointer hover:bg-pink-50 select-none`}
                            key={c}
                            onClick={() => {
                                setShowClassificationList(false);
                                setClassificationInput(c);
                            }}
                        >
                            {c}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
