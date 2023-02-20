import { SignedLayout } from 'components/signed-layout';
import { fetchClient } from 'utils/fetch-client';
import { getCurrentUser } from 'utils/get-current-user';

const getMyTimelines = async () => {
  const user = await getCurrentUser();

  if (user?.id) {
    const response = await fetchClient(`user/${user?.id}/timelines`);
    const data = await response.json();
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
      <ul>
        {}
        <li>Create one</li>
      </ul>
    </SignedLayout>
  );
};

export default Timelines;
