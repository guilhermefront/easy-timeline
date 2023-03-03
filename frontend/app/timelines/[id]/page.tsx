import { Events, Timelines } from '@prisma/client';
import { CreateTimelineCard, TimelineCard } from 'components/timeline-card';
import { TimelineTitle } from 'components/timeline-title';
import { TimelineYear } from 'components/timeline-year';
import { apiClient } from 'utils/fetch-client';

const getTimeline = async (id: string) => {
  const { data } = await apiClient<Timelines & { events: Events[] }>(
    `/timelines/${id}`
  );

  return data;
};

export const generateMetadata = async ({ params }) => {
  const timeline = await getTimeline(params.id);

  return { title: `${timeline.title.toUpperCase()} | EasyTimeline` };
};

const TimelinePage = async ({ params }) => {
  const timeline = await getTimeline(params.id);
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
      <div className="flex gap-2">
        {timeline.events.map((event) => (
          <TimelineYear
            eventId={event.event_id}
            year={event.year}
            key={event.event_id}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelinePage;
