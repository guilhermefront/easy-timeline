import { Input } from 'components/input';
import Image from 'next/image';

export default function Sign() {
  return (
    <div className="flex h-full">
      <div className="relative shrink-0 grow-0 w-1/2 h-full hidden lg:block max-w-[750px]">
        <Image
          fill
          alt="Pelé celebrating"
          src="/assets/sign.png"
          className="object-cover flex"
        />
      </div>
      <div className="w-1/2 bg">
        <form className="px-20 flex justify-center items-center">
          <h1 className="text-5xl font-semibold">Welcome to EasyTimeline</h1>
          <Input label="Username" />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
