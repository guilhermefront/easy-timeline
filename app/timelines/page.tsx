import { TimelinesGrid } from 'components/my-timelines';
import { apiClient } from 'utils/fetch-client';

export const metadata = {
  title: 'My Timelines | EasyTimelines',
};

const getRecommendedTimelines = async () => {
  const { data } = await apiClient.get('/user/recommended');
  return data;
};

const Timelines = async () => {
  const timelines = await getRecommendedTimelines();
  if (timelines == null) {
    return <div className="p-10">Login first</div>;
  }

  return <TimelinesGrid title="Recommended Timelines" timelines={timelines} />;
};

export default Timelines;
