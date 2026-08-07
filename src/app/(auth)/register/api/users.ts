import type { User } from "../types/user";
import type { RegisterFormData } from "../schemas/registerSchema";

const USERS_STORAGE_KEY = "users";
//登録済みユーザー一覧を取得
export const getUsers = (): User[] => {
  const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if(!savedUsers) {
    return [];
  }

  return JSON.parse(savedUsers) as User[];
};

export const createUser = (
  data:RegisterFormData,
): User => {
  const users = getUsers();

  //入力した内容のアカウント作成
  const newUser: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: data.password,
  };

  //末尾にユーザーを追加、保存
  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify([...users, newUser]),
  );

  return newUser
}