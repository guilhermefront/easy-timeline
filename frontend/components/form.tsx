'use client';
import { signIn } from 'next-auth/react';
import { routes } from 'utils/constants';
import { Button } from './button';

export const SignupForm = () => {
  return (
    <div className="px-4 lg:px-20 flex flex-col my-auto justify-center items-center h-full">
      <small className="text-white text-sm mb-1">History is a joy.</small>
      <h1 className="text-4xl font-semibold text-white text-center mb-8">
        Welcome to EasyTimeline
      </h1>
      <Button
        className="max-w-[470px]"
        onClick={() => {
          signIn('google', { callbackUrl: routes.myTimelines });
        }}
        type="button"
      >
        Sign with Google
      </Button>
    </div>
  );
};
