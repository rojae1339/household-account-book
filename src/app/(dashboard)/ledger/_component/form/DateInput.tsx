import Button from '@/_component/Button';
import { useEffect, useRef, useState } from 'react';
import { checkMouseOnComponent } from '@/app/(dashboard)/_utils/checkMouseOnComponent';
import { useMouseLeaveClose } from '@/app/(dashboard)/_utils/useMouseLeaveCheck';
import { AnimatePresence, motion } from 'framer-motion';
import InputWithModal from '@/app/(dashboard)/ledger/_component/form/InputWithModal';

// 지난 7일 날짜 배열 생성
const getLastSevenDays = (today: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        // yyyy-mm-dd 형식으로 포맷팅
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // 오늘 날짜인지 확인
        const isToday = i === 0;

        dates.push({
            dateObj: date,
            formatted: `${year}-${month}-${day}`,
            display: `${month}/${day}`,
            isToday,
        });
    }
    return dates;
};

export default function DateInput({ title, isRangeDate }: { title: string; isRangeDate: boolean }) {
    const today = new Date();
    const [showCurrentDateList, setShowCurrentDateList] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dateListRef = useRef<HTMLDivElement>(null);
    const [selectedDate, setSelectedDate] = useState('');

    // 2년후, 현재날짜까지 지정가능
    const maxDate = `${today.getFullYear() + 2}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;

    if (isRangeDate) {
        return (
            <div>
                <div>todo</div>
            </div>
        );
    }

    return (
        <InputWithModal
            title={title}
            type={'date'}
            maxDate={maxDate}
            containerRef={containerRef}
            inputStyle={'common'}
            motionDivStyle={'topPositionFixed'}
            name={'date'}
            value={selectedDate}
            showList={showCurrentDateList}
            setShowList={setShowCurrentDateList}
            listRef={dateListRef}
            onMouseEnter={() => setShowCurrentDateList(true)}
            onChange={(e) => setSelectedDate(e.currentTarget.value)}
        >
            <p className="text-xs font-semibold pl-2 mb-1">최근 7일</p>
            {getLastSevenDays(today).map((date, index) => (
                <div
                    key={index}
                    className="text-sm py-1 px-2 hover:bg-gray-100 cursor-pointer rounded"
                    onClick={() => {
                        setSelectedDate(date.formatted);
                        const inputTag = containerRef.current?.children[1] as HTMLInputElement;
                        if (inputTag) {
                            inputTag.value = date.formatted;
                        }
                        setShowCurrentDateList(false);
                    }}
                >
                    {date.display}
                    <span className="text-xs text-gray-500 ml-2">
                        {date.dateObj.toLocaleDateString('ko-KR', { weekday: 'short' })}
                        {index === 0 ? ', 오늘' : ''}
                    </span>
                </div>
            ))}
        </InputWithModal>
    );
}
