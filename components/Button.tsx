'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cx from 'clsx';
import { createClient } from '@/utils/supabase/client';

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={cx(
        props.className,
        'py-2.5 bg-primary w-full text-white font-poppins text-base font-medium min-h-[46px] rounded hover:bg-primary-dark'
      )}
    />
  );
};

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';

  // Make sure to include https:// when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing /.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

const supabase = createClient();
const handleSignInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${getURL()}auth/callback` },
  });
};

export const SignInWithOAuth = () => {
  return (
    <Button
      onClick={handleSignInWithGoogle}
      className="w-max px-8"
      type="submit"
    >
      Sign in with Google
    </Button>
  );
};
