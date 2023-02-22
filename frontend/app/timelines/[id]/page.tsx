import { Timeline } from 'components/timeline';
import { TimelineTitle } from 'components/timeline-title';
import { apiClient } from 'utils/fetch-client';

const getTimeline = async (id: string) => {
  const { data } = await apiClient(`/timelines/${id}`);

  return data;
};

const TimelinePage = async ({ params }) => {
  const timeline = await getTimeline(params.id);
  return (
    <div className="pt-11 pl-11">
      <TimelineTitle timeline={timeline} />
    </div>
  );
};

export default TimelinePage;
