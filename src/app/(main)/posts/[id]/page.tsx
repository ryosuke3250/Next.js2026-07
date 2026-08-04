"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DeletePostButton from "../components/DeletePostButton";
import { getPost } from "../api/posts";
import { getComments, createComment, updateComment } from "../api/comments";
import CommentForm from "../components/CommentForm";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";
import type { CommentFormData } from "../schemas/commentSchema";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null,);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    const postId = Number(params.id);

    setPost(getPost(postId));
    setComments(getComments(params.id))
    setIsLoading(false);
  }, [params.id]);

  const handleCreateComment = (
    data: CommentFormData,
  ) => {
    createComment(params.id, data)
    setComments(getComments(params.id));
  };

  //編集開始
  const handleStartEdit = (comment:Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  //編集キャンセル
  const handleCancelEdit = () => {
  setEditingCommentId(null);
  setEditingContent("");
};

  //更新
  const handleUpdateComment = (commentId: string) => {
    const content = editingContent.trim();

    if(!content) {
      return;
    }

    updateComment(commentId, { content });

    setComments(getComments(params.id));
    setEditingCommentId(null);
    setEditingContent("");
  }

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
        <Button variant="outline">
          <Link
            href={`/posts/${post.id}/edit`}
            className=" px-4 py-2"
          >
            編集する
          </Link>
        </Button>

        <DeletePostButton postId={post.id} />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">コメント</h2>
        
        {comments.length === 0 ? (
          <p>コメントをしてみよう</p>
        ): (
          <div className="mt-5 space-y-4 ">
            {comments.map((comment) =>(
              <article key={comment.id} className="border p-2">
                {editingCommentId === comment.id ? (
                  <>
                    <Textarea
                      value={editingContent}
                      onChange={(event) =>
                        setEditingContent(event.target.value)
                      }
                      rows={4}
                      className="resize-none"
                    />

                    {!editingContent.trim() && (
                      <p className="mt-2 text-sm text-destructive">
                        コメントを入力してください
                      </p>
                    )}

                    <div className="mt-3 flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        キャンセル
                      </Button>

                      <Button
                        type="button"
                        onClick={() =>
                          handleUpdateComment(comment.id)
                        }
                        disabled={!editingContent.trim()}
                      >
                        更新する
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>

                    <div className="mt-4 flex items-end justify-between gap-4 border-t pt-3">
                      <div className="text-xs text-gray-500">
                        <p>作成：{comment.createdAt}</p>

                        {comment.updatedAt && (
                          <p className="mt-1">
                            編集：{comment.updatedAt}
                          </p>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartEdit(comment)}
                      >
                        編集
                      </Button>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
        <CommentForm onSubmit={handleCreateComment} />
      </section>
      <section className="mt-10">

      </section>
    </main>
  );
}