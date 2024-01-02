import { supabaseServerClient } from '@/utils/supabase/server';
import { SignInWithOAuth } from '@/components/button';
import { redirect } from 'next/navigation';

export default async function Index() {
  const supabase = supabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (user) {
    redirect('/my-timelines');
  }

  return (
    <div className="absolute w-full flex h-full">
      <div className="w-full absolute h-full flex">
        <div className="w-full h-full bg-black bg-opacity-[0.42] z-10 absolute" />
        <div className="bg-[url('/assets/sign.png')] bg-no-repeat bg-cover lg:bg-repeat-x lg:bg-contain bg-center w-full relative h-full" />
      </div>
      <form className="w-full relative z-10">
        <div className="px-4 lg:px-20 flex flex-col my-auto justify-center items-center h-full">
          <small className="text-white text-sm mb-1">History is a joy.</small>
          <h1 className="text-4xl font-semibold text-white text-center mb-8">
            Welcome to EasyTimeline
          </h1>
          <SignInWithOAuth />
        </div>
      </form>
    </div>
  );
}
