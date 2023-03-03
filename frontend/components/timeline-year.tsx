'use client';

export const TimelineYear = ({
  eventId,
  year,
}: {
  eventId: string;
  year: string;
}) => {
  return (
    <button
      onClick={() => {
        document
          .getElementById(`event-${eventId}`)
          ?.scrollIntoView({ block: 'center' });
      }}
      type="button"
      key={eventId}
    >
      {year}
    </button>
  );
};
