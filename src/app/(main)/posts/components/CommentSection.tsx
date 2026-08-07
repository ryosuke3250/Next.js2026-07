"use client";

import { useEffect, useState } from "react";

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../api/comments";
import CommentForm from "./CommentForm";
import type { Comment } from "../types/comment";
import type { CommentFormData } from "../schemas/commentSchema";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
};

type CommentSectionProps = {
  postId: string;
  currentUser: CurrentUser | null;
};

export default function CommentSection({
  postId,
  currentUser,
}: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(
    null,
  );
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    setComments(getComments(postId));
  }, [postId]);

  // コメント一覧を再取得
  const reloadComments = () => {
    setComments(getComments(postId));
  };

  // 編集状態をリセット
  const resetEditing = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  // コメント作成
  const handleCreateComment = (data: CommentFormData) => {
    if (!currentUser) {
      return;
    }

    createComment(postId, currentUser.id, data);
    reloadComments();
  };

  // 編集開始
  const handleStartEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  // 編集キャンセル
  const handleCancelEdit = () => {
    resetEditing();
  };

  // コメント更新
  const handleUpdateComment = (commentId: string) => {
    const content = editingContent.trim();

    if (!content) {
      return;
    }

    updateComment(commentId, { content });

    reloadComments();
    resetEditing();
  };

  // コメント削除
  const handleDeleteComment = (commentId: string) => {
    const shouldDelete = window.confirm(
      "このコメントを削除しますか？",
    );

    if (!shouldDelete) {
      return;
    }

    deleteComment(commentId);

    reloadComments();
    resetEditing();
  };

  return (
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

                    <div className="mt-4 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-end sm:justify-between">
                      <div className="text-xs text-gray-500">
                        <p>作成：{comment.createdAt}</p>

                        {comment.updatedAt && (
                          <p className="mt-1">
                            編集：{comment.updatedAt}
                          </p>
                        )}
                      </div>

                      {currentUser?.id === comment.userId && (
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
                            onClick={() =>
                              handleDeleteComment(comment.id)
                            }
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

      {currentUser ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>コメントを送る</CardTitle>
          </CardHeader>

          <CardContent>
            <CommentForm onSubmit={handleCreateComment} />
          </CardContent>
        </Card>
      ) : (
        <p className="mt-8 text-sm text-muted-foreground">
          コメントするにはログインしてください。
        </p>
      )}
    </section>
  );
}