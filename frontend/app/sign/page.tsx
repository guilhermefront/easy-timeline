import { SignupForm } from 'components/form';
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
      <div className="w-full bg">
        <SignupForm />
      </div>
    </div>
  );
}
