'use client';

import { Timelines } from '@prisma/client';
import { useMutation } from 'utils/mutate';
import { useState } from 'react';
import { useDebounce } from 'utils/use-debounce';
import { apiClient } from 'utils/fetch-client';

export const TimelineTitle = function TimelineTitle({
  timeline,
}: {
  timeline: Timelines;
}) {
  const { trigger } = useMutation('delete-timeline', async () =>
    apiClient.patch('/timelines', {
      title,
      timeline_id: timeline.timeline_id,
    })
  );
  const [title] = useState(timeline.title || '');

  const debouncedUpdate = useDebounce(async (title: string) => {
    trigger();
  });

  return (
    <h1
      suppressHydrationWarning
      suppressContentEditableWarning
      contentEditable
      className="text-[42px] mt-11 min-w-[300px] max-w-[300px] uppercase font-semibold break-words"
      onInput={async (e) => {
        const updatedTitle = e.currentTarget.textContent;
        await debouncedUpdate(updatedTitle);
      }}
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
};
