import { RefObject, useEffect, useRef } from 'react';
import { checkMouseOnComponent } from '@/app/(dashboard)/_utils/checkMouseOnComponent';

type UseMouseLeaveCloseProps = {
    containerRef: RefObject<HTMLElement | null>;
    targetRef: RefObject<HTMLElement | null>;
    shouldWatch: boolean;
    onClose: () => void;
    delay?: number; // optional delay in ms
};

export const useMouseLeaveClose = ({
    containerRef,
    targetRef,
    //이벤트 watch
    shouldWatch,
    //닫혀야하는 컴포넌트 제어
    onClose,
    delay = 0,
}: UseMouseLeaveCloseProps) => {
    //useRef 쓰는이유 : 리렌더링방지,최신값유지
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const container = containerRef.current;
            const target = targetRef.current;

            if (!container || !target) return;

            const { isMouseInContainer, isMouseInTarget } = checkMouseOnComponent(
                e,
                container,
                target,
            );

            if (!isMouseInContainer && !isMouseInTarget) {
                if (delay > 0 && !timerRef.current) {
                    timerRef.current = setTimeout(() => {
                        onClose();
                        timerRef.current = null;
                    }, delay);
                } else if (delay === 0) {
                    onClose();
                }
            } else {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            }
        };

        if (shouldWatch) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [shouldWatch, containerRef, targetRef, onClose, delay]);
};
