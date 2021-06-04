import { Observable } from '@waves.exchange/reactive';

export function createPolling<T>(
    operation: () => Promise<T>,
    interval: number
): Observable<T> {
    return new Observable((observer) => {
        let timerId: ReturnType<typeof setTimeout>;
        const fn = async () => {
            try {
                const res = await operation();

                observer.next(res);
            } catch (e) {
                // TODO Подумать как лучше ошибки обработать при отсутствии операторов
                // observer.error(e);
            } finally {
                timerId = setTimeout(fn, interval);
            }
        };

        fn();

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    });
}
