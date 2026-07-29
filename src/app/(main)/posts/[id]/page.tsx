// import Link from "next/link";

// import { posts } from "../testdata/posts";

// type PostDetailPageProps = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// export default async function PostDetailPage({
//   params,
// }: PostDetailPageProps) {
//   const { id } = await params;

//   const post = posts.find((post) => post.id === Number(id));

//   if (!post) {
//     return (
//       <main className="mx-auto w-full max-w-2xl p-6">
//         <p>投稿が見つかりませんでした。</p>

//         <Link href="/posts" className="text-blue-600">
//           投稿一覧へ戻る
//         </Link>
//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto w-full max-w-2xl p-6">
//       <Link href="/posts" >
//         一覧へ戻る
//       </Link>

//       <article className="mt-6 border p-6">
//         <h1 className="text-2xl font-bold">{post.title}</h1>

//         <p className="mt-4 ">{post.content}</p>

//         <p className="mt-6 text-right">
//           {post.createdAt}
//         </p>
//       </article>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DeletePostButton from "../components/DeletePostButton";
import { getPost } from "../api/posts";
import type { Post } from "../types/post";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postId = Number(params.id);

    setPost(getPost(postId));
    setIsLoading(false);
  }, [params.id]);

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
      <div className="mb-6">
        <Link href="/posts" className="underline">
          一覧へ戻る
        </Link>
      </div>

      <article className="rounded border p-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>

        <p className="mt-2 text-sm text-gray-500">
          {post.createdAt}
        </p>

        <p className="mt-6 whitespace-pre-wrap">
          {post.content}
        </p>
      </article>

      <div className="mt-6 flex gap-4">
        <Link
          href={`/posts/${post.id}/edit`}
          className="border px-4 py-2"
        >
          編集する
        </Link>

        <DeletePostButton postId={post.id} />
      </div>
    </main>
  );
}