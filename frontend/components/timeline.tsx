'use client';

import CreateIcon from '@assets/create.svg';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { routes } from 'utils/constants';
import { apiClient } from 'utils/fetch-client';

interface CreateTimeline {
  create: true;
  cardsQty?: never;
}

interface CommonTimeline {
  create: never;
  cardsQty: number;
}

const CreateTimelineButton = () => {
  const session = useSession();
  console.log(session?.data?.user?.id);
  const router = useRouter();
  return (
    <button
      type="button"
      className="px-4 py-7 flex flex-col text-center gap-4 border"
      onClick={async () => {
        const { data } = await apiClient.post('timelines/create-empty', {
          userId: session?.data?.user?.id,
        });

        router.push(routes.createTimeline(data?.timeline_id));
      }}
    >
      <CreateIcon width={24} className="mx-auto" />
      <p className="font-bold text-title">Create one</p>
    </button>
  );
};

export const Timeline = ({
  create,
  cardsQty,
}: CreateTimeline | CommonTimeline) => {
  if (create) {
    return (
      <SessionProvider>
        <CreateTimelineButton />
      </SessionProvider>
    );
  }

  return (
    <div className="px-4 py-3 flex gap-4 border">
      <p className="font-bold">Explore the World together with us!</p>
      <p className="font-bold">{cardsQty} cards</p>
    </div>
  );
};
