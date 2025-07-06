import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLoadingOptions {
    initialLoading?: boolean;
    timeout?: number;
    onTimeout?: () => void;
}

interface UseAsyncLoadingOptions<T> extends UseLoadingOptions {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
    const { initialLoading = false, timeout, onTimeout } = options;
    const [isLoading, setIsLoading] = useState(initialLoading);

    useEffect(() => {
        if (!isLoading || !timeout) return;

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
            onTimeout?.();
        }, timeout);

        return () => clearTimeout(timeoutId);
    }, [isLoading, timeout, onTimeout]);

    const startLoading = useCallback(() => setIsLoading(true), []);
    const stopLoading = useCallback(() => setIsLoading(false), []);

    return {
        isLoading,
        startLoading,
        stopLoading,
        setIsLoading
    };
};

export const useAsyncLoading = <T>(options: UseAsyncLoadingOptions<T> = {}) => {
    const { initialLoading = false, onSuccess, onError, ...loadingOptions } = options;
    const { isLoading, startLoading, stopLoading } = useLoading(loadingOptions);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Use refs to store callbacks to prevent dependency issues
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);

    // Update refs when callbacks change
    useEffect(() => {
        onSuccessRef.current = onSuccess;
    }, [onSuccess]);

    useEffect(() => {
        onErrorRef.current = onError;
    }, [onError]);

    const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
        startLoading();
        setError(null);

        try {
            const result = await asyncFunction();
            setData(result);
            onSuccessRef.current?.(result);
            return result;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Erro desconhecido');
            setError(error);
            onErrorRef.current?.(error);
            throw error;
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]); // Remove onSuccess and onError from dependencies

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        stopLoading();
    }, [stopLoading]);

    return {
        isLoading,
        data,
        error,
        execute,
        reset,
        startLoading,
        stopLoading
    };
};

export const useImageLoading = (src: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) {
            setIsLoading(false);
            setHasError(true);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        const img = new Image();

        img.onload = () => {
            setIsLoading(false);
            setHasError(false);
        };

        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };

        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    return { isLoading, hasError };
};

export const useImagesLoading = (srcs: string[]) => {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!srcs.length) return;

        const initialLoadingStates = srcs.reduce((acc, src) => {
            acc[src] = true;
            return acc;
        }, {} as Record<string, boolean>);

        setLoadingStates(initialLoadingStates);
        setErrorStates({});

        srcs.forEach(src => {
            const img = new Image();

            img.onload = () => {
                setLoadingStates(prev => ({ ...prev, [src]: false }));
                setErrorStates(prev => ({ ...prev, [src]: false }));
            };

            img.onerror = () => {
                setLoadingStates(prev => ({ ...prev, [src]: false }));
                setErrorStates(prev => ({ ...prev, [src]: true }));
            };

            img.src = src;
        });
    }, [srcs]);

    const allLoaded = Object.values(loadingStates).every(loading => !loading);
    const hasErrors = Object.values(errorStates).some(hasError => hasError);
    const loadedCount = Object.values(loadingStates).filter(loading => !loading).length;
    const progress = srcs.length > 0 ? (loadedCount / srcs.length) * 100 : 0;

    return {
        loadingStates,
        errorStates,
        allLoaded,
        hasErrors,
        progress,
        loadedCount,
        totalCount: srcs.length
    };
};

export const useDebouncedLoading = (delay: number = 300) => {
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedLoading, setDebouncedLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedLoading(isLoading);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [isLoading, delay]);

    return {
        isLoading,
        debouncedLoading,
        setIsLoading
    };
};
