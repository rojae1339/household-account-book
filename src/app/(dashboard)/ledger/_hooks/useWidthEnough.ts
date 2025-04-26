import { RefObject, useEffect, useRef, useState } from 'react';

export function useWidthEnough(threshold: number, ref: RefObject<HTMLElement | null>) {
    const [isWidthEnough, setIsWidthEnough] = useState<boolean>(true);

    useEffect(() => {
        const handle = () => {
            const width = ref.current?.offsetWidth ?? 0;
            setIsWidthEnough(width >= threshold);
        };

        handle(); // 최초 실행
        window.addEventListener('resize', handle);
        return () => window.removeEventListener('resize', handle);
    }, [threshold, ref]);

    return { isWidthEnough, ref };
}
