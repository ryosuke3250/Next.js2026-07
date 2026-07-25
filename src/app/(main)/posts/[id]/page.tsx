import Link from "next/link";

import { posts } from "../testdata/posts";

type PostDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostDetailPage({
  params,
}: PostDetailPageProps) {
  const { id } = await params;

  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p>投稿が見つかりませんでした。</p>

        <Link href="/posts" className="text-blue-600">
          投稿一覧へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <Link href="/posts" >
        一覧へ戻る
      </Link>

      <article className="mt-6 border p-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>

        <p className="mt-4 ">{post.content}</p>

        <p className="mt-6 text-right">
          {post.createdAt}
        </p>
      </article>
    </main>
  );
}