import { useState, useEffect } from 'react';

/**
 * Debouncer, allows to skip some time between events
 * 
 * @param {any} value value to check with delay, mosty number
 * @param {number} delay amount of time to skip in milis
 */
export const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}

