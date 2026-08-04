"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

import {
   commentSchema,
   type CommentFormData
} from "../schemas/commentSchema";

type CommentFormProps = {
  onSubmit: (data:CommentFormData) => void;
};

export default function CommentForm({
  onSubmit,
}: CommentFormProps){
  // RHFでコメント入力を管理
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<CommentFormData>({
    //Zodのスキーマを使って入力内容を検証
    resolver: zodResolver(commentSchema),
    //入力欄の初期値
    defaultValues: {
      content:""
    },
  });

  const handleCommentSubmit = (
    data:CommentFormData,
  ) => {
    onSubmit(data);
    reset();
  };

  return(
    <form
     onSubmit={handleSubmit(handleCommentSubmit)}
     >
      <Label htmlFor="comment" className="block mt-10">
        コメントを送る
      </Label>

      <Textarea
       id="comment"
       rows={4}
       {...register("content")}
       className="w-full mt-2"
      />

      {errors.content && (
        <p className="text-red-500 mt-2">
          {errors.content.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="outline"
        className="mt-3 px-4 py-2 border">
          投稿する
      </Button>
     </form>
  )
}