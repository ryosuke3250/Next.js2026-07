"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DeletePostButton from "../components/DeletePostButton";
import { getPost } from "../api/posts";
import {createComment, deleteComment, getComments, updateComment } from "../api/comments";
import CommentForm from "../components/CommentForm";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";
import type { CommentFormData } from "../schemas/commentSchema";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";

type CurrentUser = {
  id: string;
  name: string;
  email: string;}

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();

  const [post, setPost] = useState<Post | undefined>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    const postId = Number(params.id);

    setPost(getPost(postId));
    setComments(getComments(params.id));
    
    const savedUser = localStorage.getItem("currentUser");
    if(savedUser) {
      setCurrentUser(
        JSON.parse(savedUser) as CurrentUser,
      );
    }
    setIsLoading(false);
  }, [params.id]);

  const handleCreateComment = (data: CommentFormData) => {
    if(!currentUser){
      return
    }
    createComment(params.id, currentUser.id, data);
    setComments(getComments(params.id));
  };

  //編集開始
  const handleStartEdit = (comment: Comment) => {
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

    if (!content) {
      return;
    }

    updateComment(commentId, { content });

    setComments(getComments(params.id));
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDeleteComment = (commentId: string) => {
    const shouldDelete = window.confirm("このコメントを削除しますか？");

    if (!shouldDelete) {
      return;
    }

    deleteComment(commentId);

    setComments(getComments(params.id));
    setEditingCommentId(null);
    setEditingContent("");
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

      <section className="mt-10">
        <h2 className="text-xl font-bold">コメント</h2>

        {comments.length === 0 ? (
          <Card className="mt-5">
            <CardContent className="text-muted-foreground">
              コメントをしてみよう
            </CardContent>
          </Card>
        ) : (
          <div className="mt-5 space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} size="sm">
                <CardContent>
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
                          onClick={() => handleUpdateComment(comment.id)}
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

                      <div className="mt-4 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="text-xs text-gray-500">
                          <p>作成：{comment.createdAt}</p>

                          {comment.updatedAt && (
                            <p className="mt-1">
                              編集：{comment.updatedAt}
                            </p>
                          )}
                        </div>
                        {currentUser?.id === comment.userId &&(
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartEdit(comment)}
                            >
                              編集
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              削除
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>コメントを送る</CardTitle>
          </CardHeader>
          <CardContent>
            <CommentForm onSubmit={handleCreateComment} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
