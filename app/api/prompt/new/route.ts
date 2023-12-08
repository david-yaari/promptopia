import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt: prompt, tag: tag });

    // console.log(newPrompt);

    await newPrompt
      .save()
      .then(() => {
        //console.log('Saved new prompt');
      })
      .catch((err: Error) => {
        console.log(err);
      });

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
