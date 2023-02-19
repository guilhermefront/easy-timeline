import { getCurrentUser } from 'utils/get-current-user';

const HeaderName = async () => {
  const email = await getCurrentUser();
  return (
    <header className="py-7 border-b border-b-[#D4D4D4]">
      <div className="text-[#271510] text-sm flex justify-end px-10">
        {email?.email}
      </div>
    </header>
  );
};
export const Header = () => {
  /* @ts-expect-error Server Component */
  return <HeaderName />;
};
