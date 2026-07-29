"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import Textarea from "@/src/components/ui/Textarea";

import { profileSchema } from "../schemas/profileSchema";
import type { ProfileFormData } from "../types/user";

// ProfileFormが親コンポーネントから受け取る値
type ProfileFormProps = {
  // 編集画面で最初に表示するユーザー情報
  initialValues: ProfileFormData;

  // バリデーション成功後に実行する処理
  onSubmit: (data: ProfileFormData) => void;
};

export default function ProfileForm({
  initialValues,
  onSubmit,
}: ProfileFormProps) {
  // React Hook Formを設定する
  const {
    // 入力欄をRHFへ登録する
    register,

    // フォーム送信とバリデーションを管理する
    handleSubmit,

    // フォームの状態を取得する
    formState: {
      // 各入力欄のエラー情報
      errors,

      isSubmitting,
    },
  } = useForm<ProfileFormData>({
    // Zodの入力ルールをRHFへ接続
    resolver: zodResolver(profileSchema),

    // 編集画面に最初から表示する値
    defaultValues: initialValues,
  });

  return (
    // 入力内容が正しい場合だけonSubmitを実行する
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* 名前入力欄 */}
      <div>
        <label htmlFor="name" className="mb-2 block">
          名前
        </label>

        <Input
          id="name"
          type="text"
          placeholder="名前を入力"
          className="w-full"

          {...register("name")}
        />

        {/* 名前にエラーがあれば表示 */}
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* メールアドレス入力欄 */}
      <div>
        <label htmlFor="email" className="mb-2 block">
          メールアドレス
        </label>

        <Input
          id="email"
          type="email"
          placeholder="メールアドレスを入力"
          className="w-full"

          {...register("email")}
        />

        {/* メールアドレスにエラーがあれば表示 */}
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 自己紹介入力欄 */}
      <div>
        <label htmlFor="introduction" className="mb-2 block">
          自己紹介
        </label>

        <Textarea
          id="introduction"
          placeholder="自己紹介を入力"
          className="w-full"

          {...register("introduction")}
        />

        {/* 自己紹介にエラーがあれば表示 */}
        {errors.introduction && (
          <p className="mt-1 text-sm text-red-600">
            {errors.introduction.message}
          </p>
        )}
      </div>

      {/* 保存ボタン */}
      <div className="text-center">
        <Button
          type="submit"

          disabled={isSubmitting}
        >
          {isSubmitting ? "保存中..." : "保存する"}
        </Button>
      </div>
    </form>
  );
}