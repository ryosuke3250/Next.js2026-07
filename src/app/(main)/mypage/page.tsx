"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getProfile } from "./api/profile";

import type { ProfileFormData } from "./types/user";

export default function MyPage() {
  // 表示するユーザー情報を管理する
  const [profile, setProfile] =
    useState<ProfileFormData | null>(null);

  // 画面表示後にlocalStorageから取得する
  useEffect(() => {
    const userProfile = getProfile();

    setProfile(userProfile);
  }, []);

  // データ取得前の表示
  if (!profile) {
    return <p className="p-6">読み込み中です。</p>;
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          マイページ
        </h1>

        <Link
          href="/mypage/edit"
          className="border px-4 py-2"
        >
          編集
        </Link>
      </div>

      <div className="space-y-5 border p-6">
        <div>
          <p>名前</p>

          {/* 保存されている名前を表示する */}
          <p className="mt-1 font-medium">
            {profile.name}
          </p>
        </div>

        <div>
          <p>メールアドレス</p>

          {/* 保存されているメールアドレスを表示する */}
          <p className="mt-1 font-medium">
            {profile.email}
          </p>
        </div>

        <div>
          <p>自己紹介</p>

          {/* 保存されている自己紹介を表示する */}
          <p className="mt-1 whitespace-pre-wrap leading-7">
            {profile.introduction}
          </p>
        </div>
      </div>
    </main>
  );
}