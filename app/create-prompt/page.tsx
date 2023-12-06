'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

function CreatePromt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setSPost] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
      setSPost({
        prompt: '',
        tag: '',
      });
    }
  };
  return (
    <Form
      type='Create'
      post={post}
      setPost={setSPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    ></Form>
  );
}

export default CreatePromt;
