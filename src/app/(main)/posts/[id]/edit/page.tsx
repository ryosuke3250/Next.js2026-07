"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PostForm from "../../components/PostForm";
import { getPost, updatePost } from "../../api/posts";
import type { Post, PostFormData } from "../../types/post";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<Post | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const postId = Number(params.id);

  useEffect(() => {
    setPost(getPost(postId));
    setIsLoading(false);
  }, [postId]);

  const handleUpdate = (data: PostFormData) => {
    const updatedPost = updatePost(postId, data);

    if (!updatedPost) {
      return;
    }

    router.push(`/posts/${updatedPost.id}`);
  };

  if (isLoading) {
    return <p className="p-6">読み込み中です。</p>;
  }

  if (!post) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p>投稿が見つかりません。</p>

        <Link href="/posts" className="mt-4 inline-block underline">
          一覧へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">投稿編集</h1>

        <Link href={`/posts/${post.id}`} className="border px-4 py-2">
          詳細へ戻る
        </Link>
      </div>

      <PostForm
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        submitLabel="更新する"
        onSubmit={handleUpdate}
      />
    </main>
  );
}