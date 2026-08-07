"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DeletePostButton from "../components/DeletePostButton";
import { getPost } from "../api/posts";
import type { Post } from "../types/post";
import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import CommentSection from "../components/CommentSection";

type CurrentUser = {
  id: string;
  name: string;
  email: string;}

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const postId = Number(params.id);

    setPost(getPost(postId));
    
    const savedUser = localStorage.getItem("currentUser");
    if(savedUser) {
      setCurrentUser(
        JSON.parse(savedUser) as CurrentUser,
      );
    }
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
        <Link
          href="/posts"
          className={buttonVariants({ variant: "outline" })}
        >
          一覧へ戻る
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{post.title}</CardTitle>
          <CardDescription>{post.createdAt}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="whitespace-pre-wrap break-words">{post.content}</p>
        </CardContent>
        {currentUser?.id === post.userId &&(
          <CardFooter className="justify-end gap-2">
            <Link
              href={`/posts/${post.id}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              編集する
            </Link>
            <DeletePostButton postId={post.id} />
          </CardFooter>
        )}
      </Card>

        <CommentSection
          postId={params.id}
          currentUser={currentUser}
        />
    </main>
  );
}
