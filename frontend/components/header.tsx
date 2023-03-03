import Image from 'next/image';
import Link from 'next/link';
import { routes } from 'utils/constants';
import { getCurrentUser } from 'utils/get-current-user';
import { Logout } from './logout';

const HeaderName = async () => {
  const user = await getCurrentUser();
  return (
    <header className="py-4 border-b border-b-[#D4D4D4]">
      <div className="text-sm items-center gap-3 flex justify-end px-10">
        <div>
          <Link href={routes.myTimelines}>
            <Image
              alt={user.email}
              src={user.image}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
        <Logout />
      </div>
    </header>
  );
};
export const Header = () => {
  /* @ts-expect-error Server Component */
  return <HeaderName />;
};
