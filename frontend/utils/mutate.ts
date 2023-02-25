import { useRouter } from 'next/navigation';

export const useMutation = () => {
  const router = useRouter();
  const mutate = async (cb) => {
    await cb();
    router.refresh();
  };

  return { mutate };
};
