import { useRef, useState } from 'react';
import InputWithModal from '@/app/(dashboard)/ledger/_component/form/InputWithModal';

const getTransactionTypes = () => {
    return [
        { displayName: '수입', title: 'INCOME' },
        { displayName: '지출', title: 'EXPENDITURE' },
    ];
};

export default function TransactionTypeSelectBox() {
    const [showTypeList, setShowTypeList] = useState<boolean>(false);
    const [typeInput, setTypeInput] = useState<string>('수입');
    const containerRef = useRef<HTMLDivElement>(null);
    const priceListRef = useRef<HTMLDivElement>(null);

    return (
        <InputWithModal
            title={'수입/지출'}
            containerRef={containerRef}
            name={'transactionType'}
            value={typeInput}
            showList={showTypeList}
            setShowList={setShowTypeList}
            listRef={priceListRef}
            onMouseEnter={() => setShowTypeList(true)}
            readOnly={true}
            inputStyle={'short'}
            motionDivStyle={'topPositionFixed'}
        >
            {getTransactionTypes().map((t) => {
                return (
                    <div
                        key={t.title}
                        className={`text-md py-1 ml-2 hover:cursor-pointer hover:bg-gray-100 rounded-md`}
                        onClick={() => {
                            setTypeInput(t.displayName);
                        }}
                    >
                        {t.displayName}
                    </div>
                );
            })}
        </InputWithModal>
    );
}
