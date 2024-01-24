import { TimelinesGrid } from '@/components/timelines-grid';
import { supabaseServerClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'My Timelines | EasyTimelines',
};

const MyTimelines = async () => {
  const supabase = supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: timelines } = await supabase
    .from('Timelines')
    .select()
    .eq('user_id', user?.id);


  return <div>whatever</div>;
};

export default MyTimelines;
