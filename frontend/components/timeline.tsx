import { Timelines } from '@prisma/client';
import Link from 'next/link';
import { routes } from 'utils/constants';

interface TimelineProps extends Timelines {
  create: never;
  cardsQty: number;
}

export const Timeline = ({
  cardsQty,
  timeline_id: timelineId,
  title,
}: TimelineProps) => {
  return (
    <Link href={routes.timeline(timelineId)}>
      <div className="px-5 py-4 flex-col justify-between flex gap-4 border hover:border-600 h-full">
        <p className="font-bold">{title}</p>
        <p className="font-bold">{cardsQty} cards</p>
      </div>
    </Link>
  );
};
