'use client';
import { useSession } from 'next-auth/react';
import { AuthProvider } from './auth-provider';

const HeaderName = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <header className="py-7 border-b border-b-[#D4D4D4]">
      <div className="text-[#271510] text-sm flex justify-end px-10">
        {data?.user?.email}
      </div>
    </header>
  );
};

export const Header = () => {
  return (
    <AuthProvider>
      <HeaderName />
    </AuthProvider>
  );
};
