"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getPosts } from "./api/posts";
import type { Post } from "./types/post";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿一覧</h1>

        <Link href="/posts/new" className="border px-4 py-2">
          新規投稿
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>投稿がありません。</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="rounded border p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>

              <p className="mt-2 text-sm text-gray-500">
                {post.createdAt}
              </p>

              <p className="mt-3 line-clamp-2">{post.content}</p>

              <Link
                href={`/posts/${post.id}`}
                className="mt-4 inline-block underline"
              >
                詳細を見る
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}