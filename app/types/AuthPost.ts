export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  Post: {
    createAt: string;
    id: string;
    title: string;
    Comment: {
      createAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};
