'use client';
import LogoutIcon from '@assets/logout.svg';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export const Logout = () => {
  return (
    <button
      type="button"
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
    >
      <span className="sr-only">Logout</span>
      <LogoutIcon width={24} />
    </button>
  );
};
