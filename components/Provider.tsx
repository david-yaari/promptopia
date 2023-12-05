'use client';
import { SessionProvider } from 'next-auth/react';
import { DefaultSession, DefaultUser, Session } from 'next-auth';
import { ReactNode } from 'react';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    };
    username: string; // Here you are telling typescript that you session will have the username property, if you want your client to have access to this property
  }
  interface User extends DefaultUser {
    username: string; // the user will now have the property
  }
}

// function Provider({
//   children,
//   pageProps: { session, ...pageProps },
// }: {
//   children: ReactNode;
//   pageProps: { session: Session };
// }) {
//   return <SessionProvider> {children} </SessionProvider>;
// }
type LayoutProps = {
  children: React.ReactNode;
};

function Provider({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
