'use client';

import CreateIcon from '@assets/create.svg';
import { Timelines } from '@prisma/client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { routes } from 'utils/constants';
import { apiClient } from 'utils/fetch-client';
import { useMutation } from 'utils/mutate';

interface CreateTimeline extends Timelines {
  create: true;
  cardsQty?: never;
}

const CreateTimelineButton = () => {
  const session = useSession();
  const router = useRouter();
  const { trigger: addTimeline } = useMutation(
    'add-timeline',
    async () =>
      await apiClient.post('timelines/create-empty', {
        userId: session?.data?.user?.id,
      }),
    {
      onSuccess: ({ data }: { data: CreateTimeline }) => {
        router.push(routes.timeline(data?.timeline_id));
        toast.success('Timeline created');
      },
      onError: () => {
        toast.error('Something went wrong, please try again later');
      },
    }
  );

  return (
    <button
      type="button"
      className="px-4 py-7 flex flex-col text-center gap-4 border hover:border-gray-600 justify-center"
      onClick={async () => {
        const toastId = toast.loading('Creating timeline...');
        try {
          addTimeline();
        } finally {
          toast.dismiss(toastId);
        }
      }}
    >
      <CreateIcon width={24} className="mx-auto" />
      <p className="font-bold text-title mx-auto">Add one more</p>
    </button>
  );
};

export const CreateTimeline = () => {
  return (
    <SessionProvider>
      <CreateTimelineButton />
    </SessionProvider>
  );
};
