import { Header } from './header';

export const SignedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="px-4 lg:px-8">{children}</main>
    </div>
  );
};
