import { SignupForm } from 'components/form';

const Home = () => {
  return (
    <div className="absolute w-full flex h-full">
      <div className="w-full absolute h-full flex">
        <div className="w-full h-full bg-black bg-opacity-[0.42] z-10 absolute" />
        <div className="bg-[url('/assets/sign.png')] bg-no-repeat bg-cover lg:bg-repeat-x lg:bg-contain bg-center w-full relative h-full" />
      </div>
      <div className="w-full relative z-10">
        <SignupForm />
      </div>
    </div>
  );
};

export default Home;
