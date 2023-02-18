import { AuthProvider } from 'components/auth-provider';
import { SignupForm } from 'components/form';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="absolute w-full flex h-full">
      <div className="w-full absolute h-full flex">
        <div className="absolute w-full h-full bg-black bg-opacity-[0.42] z-10" />
        <div className="w-1/3 relative h-full">
          <Image
            fill
            alt="Pelé celebrating"
            src="/assets/sign.png"
            className="object-cover flex"
          />
        </div>
        <div className="w-1/3 relative h-full">
          <Image
            fill
            alt="Pelé celebrating"
            src="/assets/sign.png"
            className="object-cover flex"
          />
        </div>
        <div className="w-1/3 relative h-full">
          <Image
            fill
            alt="Pelé celebrating"
            src="/assets/sign.png"
            className="object-cover flex"
          />
        </div>
      </div>
      <div className="w-full relative z-10">
        <AuthProvider>
          <SignupForm />
        </AuthProvider>
      </div>
    </div>
  );
};

export default Home;
