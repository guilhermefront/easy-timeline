import { SignedLayout } from 'components/signed-layout';
import { Timeline } from 'components/timeline';
import { apiClient } from 'utils/fetch-client';
import { getCurrentUser } from 'utils/get-current-user';

const getMyTimelines = async () => {
  const user = await getCurrentUser();

  if (user?.id) {
    const { data } = await apiClient(`user/${user?.id}/timelines`);
    return data;
  }

  return null;
};

const Timelines = async () => {
  const timelines = await getMyTimelines();
  return (
    <SignedLayout>
      <h1 className="text-3xl font-semibold text-title mb-6 mt-12">
        YOUR TIMELINES
      </h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        <Timeline create />
      </div>
    </SignedLayout>
  );
};

export default Timelines;
