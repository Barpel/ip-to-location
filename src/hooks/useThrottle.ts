import { useState, useEffect } from 'react';


function useThrottle<T>(value: T, delay: number): T {

    const [throttledValue, setThrottledValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value);
        }, delay);


        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return throttledValue;
}

export default useThrottle;