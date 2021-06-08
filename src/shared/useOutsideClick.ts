import * as React from 'react';
import { useEffect } from 'react';

export const useClickOut = (handler: (event) => void, ref: React.RefObject<HTMLElement>) => {

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handler(event);
            }
        };
        if (ref.current) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return (): void => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handler, ref]);
};
