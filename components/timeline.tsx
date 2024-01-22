import { Timelines } from '@prisma/client';
import Link from 'next/link';
import { routes } from '@/utils/constants';
import { DeleteTimeline } from './delete-timeline';
import { TimelineCardTitle } from './timeline-card-title';

interface TimelineProps extends Timelines {
  cardsQty: number;
  allowDelete?: boolean;
}

export const Timeline = ({
  cardsQty,
  timeline_id: timelineId,
  title,
  allowDelete,
}: TimelineProps) => {
  return (
    <div className="relative">
      <div className="pl-5 pr-[30px] py-4 relative flex-col justify-between flex gap-4 h-full">
        <div className="flex justify-between">
          <TimelineCardTitle
            title={title}
            timelineId={timelineId}
            className="font-bold relative z-10"
          />
          {allowDelete && (
            <DeleteTimeline title={title} timelineId={timelineId} />
          )}
        </div>
        <p className="font-bold">{cardsQty} cards</p>
      </div>
      <Link legacyBehavior href={routes.timeline(timelineId)}>
        <a className="w-full h-full absolute inset-0 border hover:border-gray-600"></a>
      </Link>
    </div>
  );
};
