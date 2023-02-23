import { Events, Timelines } from '@prisma/client';
import { Timeline } from 'components/timeline';
import { TimelineCard } from 'components/timeline-card';
import { TimelineTitle } from 'components/timeline-title';
import { apiClient } from 'utils/fetch-client';

const getTimeline = async (id: string) => {
  const { data } = await apiClient<Timelines & { events: Events[] }>(
    `/timelines/${id}`
  );

  return data;
};

const TimelinePage = async ({ params }) => {
  const timeline = await getTimeline(params.id);
  console.log(timeline);
  return (
    <div className="pt-11 pl-11">
      <TimelineTitle timeline={timeline} />
      <TimelineCard create timelineId={timeline.timeline_id} />
      {/* {timeline.events?.map((event) => (
        <TimelineCard key={event.event_id} event={event} />
      ))} */}
    </div>
  );
};

export default TimelinePage;
