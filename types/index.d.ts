type Prompt = {
  creator: string;
  prompt: string;
  tag: string;
  _id: string;
};

type Post = {
  creator: {
    email: string;
    image: string;
    username: string;
    _id: string;
  };
  prompt: string;
  tag: string;
  _id: string;
};

type HandleEdit = (post: Post) => void;

type HandleDelete = (post: Post) => void;

type ResponseFindObject = {
  params: {
    id: string;
  };
};

type ResponseUpdatePrompt = {
  params: {
    id: string;
    prompt: string;
    tag: string;
  };
};
