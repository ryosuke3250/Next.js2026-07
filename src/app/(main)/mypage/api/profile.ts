import type { ProfileFormData } from "../types/user";

// localStorageで使うキー
const STORAGE_KEY = "userProfile";

// 初期表示用のユーザー情報
const initialProfile: ProfileFormData = {
  name: "内城諒祐",
  email: "aaaaa@example.com",
  introduction:
    "テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト。",
};

// ユーザー情報を取得する
export const getProfile = (): ProfileFormData => {
  const savedProfile = localStorage.getItem(STORAGE_KEY);

  // 保存されたデータがない場合
  if (!savedProfile) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initialProfile),
    );

    return initialProfile;
  }

  // 保存された文字列をオブジェクトに戻して返す
  return JSON.parse(savedProfile) as ProfileFormData;
};

// ユーザー情報を更新する
export const updateProfile = (
  data: ProfileFormData,
): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data),
  );
};