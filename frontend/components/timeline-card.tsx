'use client';

import CreateIcon from '@assets/create.svg';
import { Events } from '@prisma/client';
import Image from 'next/image';
import { useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { apiClient } from 'utils/fetch-client';
import { useMutation } from 'utils/mutate';
import { useDebounce } from 'utils/use-debounce';

interface TimelineCard extends Events {
  create?: boolean;
  timelineId: string;
}

export const TimelineCard = ({
  create,
  timelineId,
  year,
  order,
  title,
  content,
  image,
  event_id: eventId,
  link,
}: TimelineCard) => {
  const { mutate } = useMutation();

  const defaultInfo = useRef({ year, order, title, content, image, link });

  const handleChange = useDebounce(
    async (value, field: 'content' | 'year' | 'link' | 'image' | 'title') => {
      const data: Partial<Events> = {
        timeline_id: timelineId,
        event_id: eventId,
        content,
        image,
        link,
        order,
        title,
        year,
      };

      data[field] = value;
      await mutate(async () => {
        await apiClient.patch('/events', data);
      });
      toast.success(`Updated ${field} to ${value}`);
    },
    500
  );

  if (create) {
    return (
      <article className="px-6 lg:min-h-[620px] shrink-0 flex items-center text-center justify-center min-w-[270px] py-11 border-x border-[#D4D4D4]">
        <button
          onClick={async () => {
            await mutate(() => {
              apiClient.post('/events/create-empty', {
                timelineId,
              });
            });
          }}
          className="font-bold flex gap-2 flex-col mx-auto"
          type="button"
        >
          <CreateIcon width={24} className="mx-auto" />
          <div>Create event</div>
        </button>
      </article>
    );
  }

  return (
    <article className="px-6 py-11 min-w-[270px] max-w-[270px] shrink-0 border-l border-[#D4D4D4]">
      <div className="flex justify-between items-center">
        <p
          title="year"
          contentEditable
          onInput={(e) => {
            const currentYear = Number(e.currentTarget.textContent);
            const maxYear = new Date().getFullYear();
            if (currentYear > 0 && currentYear <= maxYear) {
              handleChange(e.currentTarget.textContent, 'year');
            } else {
              toast.error(
                `${currentYear} is an invalid year. Should be at min 0 and at most ${maxYear}.`,
                { id: 'error-year' }
              );
            }
          }}
          className="text-[#371D16] max-w-[200px] font-medium w-max text-2xl"
        >
          {defaultInfo.current.year}
        </p>
        <p className="text-[#D0D0D0] text-xl font-medium">{order}</p>
      </div>
      <h3
        contentEditable
        onInput={(e) => {
          const qtyChars = e.currentTarget.textContent?.length || 0;
          const maxChars = 30;
          if (qtyChars > 0 && qtyChars <= maxChars) {
            handleChange(e.currentTarget.textContent, 'title');
          } else {
            toast.error(
              qtyChars === 0
                ? 'Title should have at least 1 character'
                : `Title should have at most ${maxChars} characters. Currently it has ${qtyChars}, which is ${
                    qtyChars - maxChars
                  } more than the max allowed.`,
              { id: 'error-title' }
            );
          }
        }}
        title="title"
        className="text-2xl max-w-[220px] break-words font-medium uppercase mt-9 mb-6 text-[#944D3B]"
      >
        {defaultInfo.current.title}
      </h3>
      <p className="text-xs text-[#25120D] mb-20">{content}</p>

      <div className="h-[204px] rounded bg-[#D9D9D9] relative w-full">
        {image && title && (
          <Image alt={title} src={image} className="object-cover" fill />
        )}
      </div>
      <Toaster position="bottom-right" containerStyle={{ paddingRight: 500 }} />
    </article>
  );
};
