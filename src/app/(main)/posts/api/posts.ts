import type { Post, PostFormData } from "../types/post";

const STORAGE_KEY = "posts";

const initialPosts: Post[] = [
  {
    id: 1,
    title: "最初の投稿",
    content: "最初の投稿内容です。",
    createdAt: "2026-07-26",
  },
  {
    id: 2,
    title: "2件目の投稿",
    content: "2件目の投稿内容です。",
    createdAt: "2026-07-26",
  },
];

// localStorageへ投稿一覧を保存する
const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

// 投稿一覧を取得する
export const getPosts = (): Post[] => {
  const savedPosts = localStorage.getItem(STORAGE_KEY);

  if (!savedPosts) {
    savePosts(initialPosts);
    return initialPosts;
  }

  return JSON.parse(savedPosts) as Post[];
};

export const getPost = (id: number): Post | undefined => {
  const posts = getPosts();

  return posts.find((post) => post.id === id);
};

export const createPost = (data: PostFormData): Post => {
  const posts = getPosts();

  const newPost: Post = {
    id: Date.now(),
    title: data.title,
    content: data.content,
    createdAt: new Date().toLocaleDateString("ja-JP"),
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