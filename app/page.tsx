'use client';
import Feed from '@components/Feed';
import { useSession } from 'next-auth/react';

function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> AI-Powered Prompts</span>
      </h1>
      <p className=' desc text-center'>
        Promptopia is a modern open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>
      {session && <Feed />}
    </section>
  );
}

export default Home;
