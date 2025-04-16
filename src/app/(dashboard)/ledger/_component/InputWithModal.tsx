import { AnimatePresence, motion } from 'framer-motion';
import React, { Ref, RefObject } from 'react';
import { baseProps } from '@/_constants/props';
import { useMouseLeaveClose } from '@/app/(dashboard)/_utils/useMouseLeaveCheck';

type TInputStyleKey = 'common' | 'short' | 'notDefinedWidth';
type IMotionDivStyleKey = 'common' | 'topPositionFixed' | 'overflow';

type props = baseProps & {
    title: string;
    containerRef: RefObject<HTMLDivElement | null>;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    maxDate?: string;
    onMouseEnter?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    value: string;
    showList: boolean;
    setShowList: React.Dispatch<React.SetStateAction<boolean>>;
    listRef: RefObject<HTMLDivElement | null>;
    readOnly?: boolean;
    inputStyle: TInputStyleKey;
    motionDivStyle: IMotionDivStyleKey;
    isInputForClassification?: boolean;
    modalDelayTime?: number;
};

export default function InputWithModal({
    children,
    title,
    containerRef,
    name,
    type,
    maxDate,
    onMouseEnter,
    onKeyDown,
    onChange,
    onClick,
    value,
    showList,
    setShowList,
    listRef,
    inputStyle,
    motionDivStyle,
    readOnly,
    modalDelayTime,
}: props) {
    const inputStyleMap: Record<TInputStyleKey, string> = {
        common: 'outline-1 outline-gray-400 rounded-md px-2 py-2 w-36',
        short: 'outline-1 outline-gray-400 rounded-md px-2 py-2 w-20',
        notDefinedWidth: 'outline-1 outline-gray-400 rounded-md px-2 py-2 hover:cursor-pointer',
    };

    const motionDivStyleMap: Record<IMotionDivStyleKey, string> = {
        common: 'absolute top-full left-0 mt-1 bg-white shadow-md rounded-md p-2 z-10 w-full',
        topPositionFixed:
            'absolute top-16 left-0 mt-1 bg-white shadow-md rounded-md p-2 z-10 w-full',
        overflow:
            'absolute flex flex-col w-full h-40 overflow-y-scroll bg-white top-18 rounded-md shadow-md snap-y snap-mandatory',
    };

    useMouseLeaveClose({
        containerRef: containerRef,
        targetRef: listRef,
        shouldWatch: showList,
        onClose: () => {
            setShowList(false);
        },
        delay: modalDelayTime,
    });

    return (
        <div
            ref={containerRef}
            className={'flex flex-col gap-2 relative select-none '}
        >
            <p className={'text-xs text-gray-600'}>{title}</p>
            <input
                autoComplete={'off'}
                name={name}
                type={type}
                max={name === 'date' ? maxDate : ''}
                onMouseEnter={onMouseEnter}
                className={`${inputStyleMap[inputStyle]} select-none`}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onClick={onClick}
                readOnly={readOnly}
            />
            <AnimatePresence>
                {showList && (
                    <motion.div
                        ref={listRef}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.1 }}
                        className={motionDivStyleMap[motionDivStyle]}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
