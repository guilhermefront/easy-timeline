import { Poppins } from '@next/font/google';
import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  fallback: ['Arial'],
  variable: '--font-poppins',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className={poppins.variable} lang="en">
      <head>
        <meta
          name="description"
          content="Easily create and share great looking timelines"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <main className="bg h-full">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
