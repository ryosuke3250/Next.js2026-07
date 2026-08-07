import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1,"コメントを入力してください")
    .max(200,"コメントは２００文字以内にしてください"),
});

export type CommentFormData = z.infer<typeof commentSchema>;