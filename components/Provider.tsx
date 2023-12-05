'use client';
import { SessionProvider } from 'next-auth/react';
import { DefaultSession, DefaultUser, Session } from 'next-auth';
import { ReactNode } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

function Provider({ children }: LayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
