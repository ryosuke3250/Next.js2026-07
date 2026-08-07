"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/src/components/ui/button";
import { getPosts } from "./api/posts";
import type { Post } from "./types/post";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿一覧</h1>
        <Link
          href="/posts/new"
          className={buttonVariants({ variant: "default" })}
        >
          新規投稿
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>投稿がありません。</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.createdAt}</CardDescription>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-2 whitespace-pre-wrap break-words">
                  {post.content}
                </p>
              </CardContent>

              <CardFooter className="justify-end">
                <Link
                  href={`/posts/${post.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  詳細を見る
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}