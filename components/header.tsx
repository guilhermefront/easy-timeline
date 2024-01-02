import Image from 'next/image';
import Link from 'next/link';

import { Logout } from '../../easy-timeline/frontend/components/logout';
import { supabaseServerClient } from '@/utils/supabase/server';

const HeaderName = async () => {
  const supabase = supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="py-4 border-b border-b-[#D4D4D4]">
      <div className="flex justify-between items-center px-10">
        <Link href="/timelines">EasyTImeline</Link>
        <div className="text-sm items-center gap-3 flex justify-end">
          <div>
            <Link href={routes.myTimelines}>
              <Image
                alt={user?.email}
                src={user?.image}
                width={48}
                height={48}
                className="rounded-full"
              />
            </Link>
          </div>
          <Logout />
        </div>
      </div>
    </header>
  );
};
export const Header = () => {
  return <HeaderName />;
};
