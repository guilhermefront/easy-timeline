'use client';

import { Button } from './button';
import { Input } from './input';

export const SignupForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log(e.target.username);
      }}
      className="px-4 lg:px-20 flex flex-col my-auto justify-center items-center h-full"
    >
      <h1 className="text-4xl font-semibold text-center mb-16">
        Welcome to EasyTimeline
      </h1>
      <div className="flex w-full max-w-[470px] flex-col mb-20 gap-9">
        <Input placeholder="guilhermefront" label="Username" />
        <Input
          placeholder="Must have at least 6 characters"
          type="password"
          label="Password"
        />
      </div>
      <Button className="max-w-[470px]" type="submit">
        Create Account
      </Button>
    </form>
  );
};
