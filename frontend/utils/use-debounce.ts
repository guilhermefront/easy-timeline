import debounce from 'lodash/debounce';
import { useRef } from 'react';
export const useDebounce = (func: any, ms: number) => {
  const ref = useRef(debounce(func, ms));

  if (!ref.current) {
    return () => {};
  }
  return ref.current;
};
