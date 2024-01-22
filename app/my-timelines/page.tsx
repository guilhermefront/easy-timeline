import { TimelinesGrid } from '@/components/timelines-grid';
import { supabaseServerClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'My Timelines | EasyTimelines',
};

const MyTimelines = async () => {
  const supabase = supabaseServerClient();

  const timelines = await supabase.from('Timelines').select();
  console.log(timelines);

  return <div>whatever</div>;
};

export default MyTimelines;
