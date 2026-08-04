"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";

import { deletePost } from "../api/posts";

type DeletePostButtonProps = {
  postId: number;
};

export default function DeletePostButton({
  postId,
}: DeletePostButtonProps) {
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "この投稿を削除してもよろしいですか？",
    );

    if (!confirmed) {
      return;
    }

    deletePost(postId);

    router.push("/posts");
  };

  return (
    <Button type="button" onClick={handleDelete}>
      削除
    </Button>
  );
}