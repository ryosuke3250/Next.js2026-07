import { z } from "zod";

export const profileSchema = z.object({
   // 名前の入力ルール
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(50, "名前は50文字以内で入力してください"),

  // メールアドレスの入力ルール
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),

  // 自己紹介の入力ルール（任意にするためminはなし）
  introduction: z
    .string()
    .max(200, "自己紹介は200文字以内で入力してください"),
})