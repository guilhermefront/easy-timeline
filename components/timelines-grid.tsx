import { CreateTimeline } from '@/components/create-timeline';
import { Timeline } from '@/components/timeline';

export const TimelinesGrid = ({
  timelines,
  title = 'YOUR TIMELINES',
  create,
}: {
  timelines: (Timelines & { Events: Events[] })[];
  title?: string;
  create?: boolean;
}) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-title mb-6 mt-12">{title}</h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {(timelines || [])?.map((timeline) => (
          <Timeline
            cardsQty={timeline.Events?.length}
            key={timeline.timeline_id}
            {...timeline}
            allowDelete={create}
          />
        ))}
        {/* {create && <CreateTimeline />} */}
      </div>
    </>
  );
};
