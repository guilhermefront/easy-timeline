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
  const { mutate } = useMutation();
  const [title] = useState(timeline.title || '');

  const debouncedUpdate = useDebounce((title: string) => {
    mutate(() =>
      apiClient.patch('/timelines', {
        title,
        timeline_id: timeline.timeline_id,
      })
    );
  }, 500);

  return (
    <h1
      suppressHydrationWarning
      suppressContentEditableWarning
      contentEditable
      className="text-[42px] font-semibold"
      onInput={(e) => {
        const updatedTitle = e.currentTarget.textContent;
        debouncedUpdate(updatedTitle);
      }}
    >
      {title}
    </h1>
  );
};
