import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import { toast } from 'react-hot-toast';

export const useMutation = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const mutate = async (cb) => {
    setIsLoading(true);
    const toastId = toast.loading('Loading...');
    await cb();
    startTransition(() => {
      router.refresh();
    });
    toast.dismiss(toastId);
    setIsLoading(false);
  };

  return { mutate, isLoading };
};
