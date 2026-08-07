import type { ProfileFormData } from "../types/user";

// localStorageで使うキー
const PROFILE_STORAGE_KEY = "userProfile";
const CURRENT_USER_STORAGE_KEY = "currentUser";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
}

// ユーザー情報を取得する
export const getProfile = (): ProfileFormData | null => {
  const savedProfile = localStorage.getItem(
    PROFILE_STORAGE_KEY,
  );

  if(savedProfile) {
    return JSON.parse(savedProfile) as ProfileFormData;
  };

  const savedCurrentUser = localStorage.getItem(
    CURRENT_USER_STORAGE_KEY,
  )

  // 保存されたデータがない場合
  if (!savedCurrentUser) {
    return null;
  };

  const currentUser = JSON.parse(
    savedCurrentUser,
  ) as CurrentUser;

  // 保存された文字列をオブジェクトに戻して返す
  return {
    name: currentUser.name,
    email: currentUser.email,
    introduction: "",
  }
};

// ユーザー情報を更新する
export const updateProfile = (
  data: ProfileFormData,
): void => {
  localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify(data),
  );
};