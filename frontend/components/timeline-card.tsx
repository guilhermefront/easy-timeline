'use client';

import { Events } from '@prisma/client';
import Image from 'next/image';
import { apiClient } from 'utils/fetch-client';
import { useMutation } from 'utils/mutate';

interface TimelineCardCreate {
  create: true;
  event?: never;
  timelineId: string;
}

interface TimelineCardCommon {
  create?: false;
  timelineId: string;
  event: Events;
}

export const TimelineCard = ({
  create,
  event,
  timelineId,
}: TimelineCardCommon | TimelineCardCreate) => {
  const { mutate } = useMutation();

  if (create) {
    return (
      <article className="px-6 py-11 border-x border-[#D4D4D4]">
        <button
          onClick={async () => {
            await mutate(() => {
              apiClient.post('/events/create-empty', {
                timelineId,
              });
            });
          }}
          type="button"
        >
          Create event
        </button>
      </article>
    );
  }

  return (
    <article className="px-6 py-11 border-x border-[#D4D4D4]">
      <div className="flex justify-between items-center">
        <p className="text-[#371D16] font-medium text-2xl">{event.year}</p>
        <p className="text-[#D0D0D0] text-xl font-medium">{event.order}</p>
      </div>
      <h3 className="text-2xl font-medium uppercase mb-6 text-[#944D3B]">
        {event.title}
      </h3>
      <p className="text-xs text-[#25120D] mb-20">{event.content}</p>

      <div className="h-[204px] rounded bg-[#D9D9D9] relative w-full">
        {event?.image && (
          <Image
            alt={event.title}
            src={event.image}
            className="object-cover"
            fill
          />
        )}
      </div>
    </article>
  );
};
