'use client';

import CreateIcon from '@assets/create.svg';
import { Timelines } from '@prisma/client';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { routes } from 'utils/constants';
import { apiClient } from 'utils/fetch-client';

interface CreateTimeline extends Timelines {
  create: true;
  cardsQty?: never;
}

const CreateTimelineButton = () => {
  const session = useSession();
  const router = useRouter();
  return (
    <button
      type="button"
      className="px-4 py-7 flex flex-col text-center gap-4 border justify-center"
      onClick={async () => {
        const { data } = await apiClient.post('timelines/create-empty', {
          userId: session?.data?.user?.id,
        });

        router.push(routes.timeline(data?.timeline_id));
      }}
    >
      <CreateIcon width={24} className="mx-auto" />
      <p className="font-bold text-title">Add one more</p>
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
