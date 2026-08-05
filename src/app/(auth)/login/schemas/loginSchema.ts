import { z } from "zod";

export const loginSchema = z.object({
  email:z
   .string()
   .min(1,"メールアドレスを入力してください")
   .pipe(
      z.email({error:"正しいメールアドレスを入力してください"}),
    ),

  password:z
    .string()
    .min(1,"パスワードを入力してください")
    .min(8,"パスワードは8文字以上入力してください"),
});

export type LoginFormData = z.infer<typeof loginSchema>