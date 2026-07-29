export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type PostFormData = {
  title: string;
  content: string;
};