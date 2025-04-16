import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoMdArrowDropright } from 'react-icons/io';

export default function ItemInput({ title }: { title: string }) {
    const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
    const [itemInput, setItemInput] = useState<string>('');
    const [memoInput, setMemoInput] = useState<string>('');

    return (
        <div className={'flex flex-col flex-auto gap-2 h-full select-none'}>
            <p className={'text-xs text-gray-600'}>{title}</p>
            <input
                autoComplete={'off'}
                name={'item'}
                value={itemInput}
                onChange={(e) => setItemInput(e.currentTarget.value)}
                placeholder={title}
                className={'outline-1 outline-gray-400 rounded-md px-2 py-2 '}
            />
            <div
                className={`flex items-center ${isMemoOpen && 'text-gray-600'}`}
                onClick={() => setIsMemoOpen(!isMemoOpen)}
            >
                {isMemoOpen ? <IoMdArrowDropdown size={20} /> : <IoMdArrowDropright size={20} />}
                <p className={`select-none text-sm `}>{isMemoOpen ? '메모접기' : '메모열기'}</p>
            </div>

            {isMemoOpen && (
                <textarea
                    value={memoInput}
                    className={
                        'focus:outline-none text-sm bg-white rounded-md px-2 py-2 resize-none h-24 w-full select-none'
                    }
                    name={'memo'}
                    placeholder={'memo..'}
                    onChange={(e) => setMemoInput(e.currentTarget.value)}
                />
            )}
        </div>
    );
}
