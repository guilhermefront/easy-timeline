import { Events, Timelines } from '@prisma/client';
import { CreateTimeline } from 'components/create-timeline';
import { SignedLayout } from 'components/signed-layout';
import { Timeline } from 'components/timeline';
import { apiClient } from 'utils/fetch-client';
import { getCurrentUser } from 'utils/get-current-user';

const getMyTimelines = async () => {
  const user = await getCurrentUser();

  if (user?.id) {
    const { data } = await apiClient<
      Timelines &
        {
          Events: Events;
        }[]
    >(`user/${user?.id}/timelines`);
    return data;
  }

  return [];
};

const Timelines = async () => {
  const timelines = await getMyTimelines();
  return (
    <SignedLayout>
      <h1 className="text-3xl font-semibold text-title mb-6 mt-12">
        YOUR TIMELINES
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {timelines.map((timeline) => (
          <Timeline
            cardsQty={timeline.Events?.length}
            key={timeline.timeline_id}
            {...timeline}
          />
        ))}
        <CreateTimeline />
      </div>
    </SignedLayout>
  );
};

export default Timelines;
