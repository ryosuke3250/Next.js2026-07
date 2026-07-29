"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ProfileForm from "../components/ProfileForm";
import {
  getProfile,
  updateProfile,
} from "../api/profile";
import type { ProfileFormData } from "../types/user";

export default function MyPageEditPage() {
  const router = useRouter();

  // localStorageから取得したユーザー情報を保存
  const [user, setUser] =
    useState<ProfileFormData | null>(null);

  // 画面が表示されたあとにlocalStorageから取得
  useEffect(() => {
    const profile = getProfile();

    setUser(profile);
  }, []);

  // 保存ボタンを押したときの処理
  const handleUpdate = (data: ProfileFormData) => {
    // 入力された内容をlocalStorageへ保存
    updateProfile(data);

    // 保存後にマイページへ移動する
    router.push("/mypage");
  };

  // ユーザー情報を取得するまではフォームを表示しない
  if (!user) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p>読み込み中...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          マイページ編集
        </h1>

        <Link
          href="/mypage"
          className="border px-4 py-2"
        >
          戻る
        </Link>
      </div>

      <ProfileForm
        initialValues={user}
        onSubmit={handleUpdate}
      />
    </main>
  );
}