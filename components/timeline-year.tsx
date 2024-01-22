'use client';

import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export const TimelineYear = ({
  eventId,
  year,
}: {
  eventId: string;
  timelineId: string;
  year: string;
}) => {
  const router = useRouter();
  const [, setCookie] = useCookies();
  return (
    <button
      type="button"
      onClick={async () => {
        setCookie('activeEventId', eventId);
        document
          .getElementById(`event-${eventId}`)
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }}
    >
      {year}
    </button>
  );
};
