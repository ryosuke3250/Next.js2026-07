"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import PostForm from "../components/PostForm";
import { createPost } from "../api/posts";
import type { PostFormData } from "../types/post";
import { Card, CardContent } from "@/src/components/ui/card";
import { buttonVariants } from "@/src/components/ui/button";

export default function NewPostPage() {
  const router = useRouter();

  const handleCreate = (data: PostFormData) => {
    createPost(data);
    router.push(`/posts`);
  };

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">新規投稿</h1>

        <Link
          href="/posts"
          className={buttonVariants({ variant: "outline" })}
        >
          一覧へ
        </Link>
      </div>

      <Card>
        <CardContent>
          <PostForm submitLabel="投稿する" onSubmit={handleCreate} />
        </CardContent>
      </Card>
    </main>
  );
}