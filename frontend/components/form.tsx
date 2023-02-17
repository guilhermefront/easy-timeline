'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from './button';

export const SignupForm = () => {
  const { data, status } = useSession();
  const router = useRouter();

  console.log(data?.user);
  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/user/${data?.user?.id}/timelines`);
    }
  }, [data?.user?.id, router, status]);

  return (
    <div className="px-4 lg:px-20 flex flex-col my-auto justify-center items-center h-full">
      <small className="text-white text-sm mb-1">History is a joy.</small>
      <h1 className="text-4xl font-semibold text-white text-center mb-8">
        Welcome to EasyTimeline
      </h1>
      <Button
        className="max-w-[470px]"
        onClick={() => {
          signIn('google');
        }}
        type="button"
      >
        Sign with Google
      </Button>
    </div>
  );
};
