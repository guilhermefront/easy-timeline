import { Events, Timelines } from '@prisma/client';
import { capitalize } from 'lodash';
import { apiClient } from 'utils/fetch-client';
import { CreateTimelineCard, TimelineCard } from './timeline-card';
import { TimelineTitle } from './timeline-title';
import { TimelineYear } from './timeline-year';

export const TimelineList = (timeline: Timelines & { events: Events[] }) => {
  return (
    <div>
      <div className="pl-11 flex gap-12">
        <TimelineTitle timeline={timeline} />
        <div className="flex overflow-auto">
          {timeline?.events?.map((event, i) => (
            <TimelineCard
              {...event}
              key={event.event_id + event.year}
              order={i + 1}
            />
          ))}
          <CreateTimelineCard timelineId={timeline.timeline_id} />
        </div>
      </div>
      <div className="border-b-2 left-0 border-b-[#D9D9D9] pb-3 mb-9 absolute bottom-0 w-full">
        <div className="flex justify-evenly">
          {timeline.events.map((event) => (
            <TimelineYear
              timelineId={event.timeline_id!}
              eventId={event.event_id}
              year={event.year}
              key={event.event_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const generateTimelinePageMetadata = async ({ params }) => {
  const timeline = await getTimeline(params.timelineId);

  return {
    title: `${capitalize(timeline.title).replace('<br>', '')} | EasyTimeline`,
  };
};

export const getTimeline = async (timelineId: string) => {
  const { data } = await apiClient<Timelines & { events: Events[] }>(
    `/timelines/${timelineId}`
  );

  return data;
};

export const TimelinePage = async ({ params }) => {
  const timeline = await getTimeline(params.timelineId);
  return <TimelineList {...timeline} />;
};
