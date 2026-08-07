import type { Post, PostFormData } from "../types/post";

const STORAGE_KEY = "posts";

const formatDate = (): string => {
  return new Date().toLocaleString("ja-JP",{
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// localStorageへ投稿一覧を保存する
const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// 投稿一覧を取得する
export const getPosts = (): Post[] => {
  const savedPosts = localStorage.getItem(STORAGE_KEY);

  if (!savedPosts) {
    return [];
  }

  return JSON.parse(savedPosts) as Post[];
};

export const getPost = (id: number): Post | undefined => {
  const posts = getPosts();

  return posts.find((post) => post.id === id);
};

export const createPost = (userId: string, data: PostFormData): Post => {
  const posts = getPosts();

  const newPost: Post = {
    id: Date.now(),
    userId,
    title: data.title,
    content: data.content,
    createdAt: formatDate(),
  };

  savePosts([newPost, ...posts]);

  return newPost;
};

export const updatePost = (
  id: number,
  data: PostFormData,
): Post | undefined => {
  const posts = getPosts();

  const targetPost = posts.find((post) => post.id === id);

  if (!targetPost) {
    return undefined;
  }

  const updatedPost: Post = {
    ...targetPost,
    title: data.title,
    content: data.content,
    updatedAt: formatDate(),
  };

  const updatedPosts = posts.map((post) =>
    post.id === id ? updatedPost : post,
  );

  savePosts(updatedPosts);

  return updatedPost;
};

export const deletePost = (id: number): void => {
  const posts = getPosts();

  const filteredPosts = posts.filter((post) => post.id !== id);

  savePosts(filteredPosts);
};