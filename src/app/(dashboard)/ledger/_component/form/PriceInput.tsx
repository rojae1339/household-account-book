import React, { useRef, useState } from 'react';
import Big from 'big.js';
import { makePriceWithComma } from '@/app/(dashboard)/ledger/_utils/priceUtils';
import InputWithModal from '@/app/(dashboard)/ledger/_component/form/InputWithModal';

// 천 단위 콤마
const getPriceList = () => {
    let startPrice = 0.01;
    const endPrice = 1000000;

    const lists = [];
    lists.push({ display: '초기화', price: 0 });

    do {
        lists.push({ display: '+' + makePriceWithComma(startPrice), price: startPrice });
        startPrice *= 10;
    } while (startPrice <= endPrice);

    return lists.reverse();
};

export default function PriceInput() {
    const [showPriceList, setShowPriceList] = useState<boolean>(false);
    const [priceInput, setPriceInput] = useState<string>('');
    const containerRef = useRef<HTMLDivElement>(null);
    const priceListRef = useRef<HTMLDivElement>(null);

    return (
        <InputWithModal
            title={'가격'}
            containerRef={containerRef}
            name={'price'}
            value={priceInput}
            showList={showPriceList}
            setShowList={setShowPriceList}
            inputStyle={'common'}
            motionDivStyle={'topPositionFixed'}
            listRef={priceListRef}
            onMouseEnter={() => setShowPriceList(true)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
                const isNumber = /^[0-9]$/.test(e.key);

                if (!isNumber && !allowedKeys.includes(e.key)) {
                    e.preventDefault();
                }
            }}
            onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                setPriceInput(onlyNumbers);
            }}
        >
            {getPriceList().map((p) => (
                <div
                    key={`${p.price}`}
                    className={`${p.price === 0 ? 'text-xs text-gray-500' : 'text-sm text-gray-800'} py-1 ml-2 hover:cursor-pointer hover:bg-gray-100 rounded-md`}
                    onClick={() => {
                        if (p.price === 0) {
                            setPriceInput('');
                        } else {
                            const currentPrice = priceInput === '' ? '0' : priceInput;
                            const total = new Big(currentPrice).plus(p.price);

                            // 소수점 이하 처리 (필요한 경우)
                            setPriceInput(total.toString());
                        }
                    }}
                >
                    {p.display}
                </div>
            ))}
        </InputWithModal>
    );
}
