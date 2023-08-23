import { useCallback, useEffect } from 'react';

export const useConsoleLogOnChange = (state) => {
  useEffect(() => {
    console.log(state);
  }, [...Object.values(state)]);
};

export function useDebounceCallback(effect, dependencies, delay) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}

