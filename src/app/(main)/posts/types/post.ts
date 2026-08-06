export type Post = {
  id: number;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

export type PostFormData = {
  title: string;
  content: string;
};