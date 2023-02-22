import { AxiosRequestConfig } from 'axios';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

export const useMutation = () => {
  const router = useRouter();
  const mutate = (cb: () => void) => {
    cb();
    startTransition(() => {
      router.refresh();
    });
  };

  return { mutate };
};
