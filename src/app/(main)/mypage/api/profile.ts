import type { ProfileFormData } from "../types/user";

// localStorageで使うキー
const CURRENT_USER_STORAGE_KEY = "currentUser";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
}

const getCurrentUser = (): CurrentUser | null => {
  const savedCurrentUser = localStorage.getItem(
    CURRENT_USER_STORAGE_KEY,
  );

  if(!savedCurrentUser){
    return null;
  }

  return JSON.parse(savedCurrentUser) as CurrentUser;
};

const getProfileStorageKey = (
  userId: string,
): string => {
  return `userProfile-${userId}`;
};

// ユーザー情報を取得する
export const getProfile = (): ProfileFormData | null => {
  const currentUser = getCurrentUser();

  if(!currentUser){
    return null;
  }
  
  const profileStrageKey = getProfileStorageKey(currentUser.id);

  const savedProfile = localStorage.getItem(
    profileStrageKey,
  );

  if(savedProfile) {
    return JSON.parse(savedProfile) as ProfileFormData;
  };


  // 保存された文字列をオブジェクトに戻して返す
  return {
    name: currentUser.name,
    email: currentUser.email,
    introduction: "",
  };
};

// ユーザー情報を更新する
export const updateProfile = (
  data: ProfileFormData,
): void => {
  const currentUser = getCurrentUser();

  if(!currentUser){
    return;
  }

  const profileStrageKey = getProfileStorageKey(currentUser.id);

  // ユーザー情報を更新する
    localStorage.setItem(
      profileStrageKey,
      JSON.stringify(data),
    );
};