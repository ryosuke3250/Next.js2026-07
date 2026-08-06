"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { Button } from "@base-ui/react/button";
import { useRouter } from "next/navigation";

type CurrentUser = {
  id: string;
  name: string;
  email: string;
}

export default function Header() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    
    if(savedUser){
      setCurrentUser(JSON.parse(savedUser) as CurrentUser);
    }
  },[]);
  
  const handleLogout = () => {
    //ログインユーザーの情報を削除
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/login")
  }
  return(
    <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="text-2xl font-bold">
        Nextter
      </Link>
      <nav className="flex flex-wrap items-center gap-2" aria-label="メインメニュー">
        {/*cyrrentUserの有無で表示内容変更*/}
        {currentUser ? (
          <>
            <span className="px-2">
             ようこそ、{currentUser.name}さん
            </span>

        <Link href="/posts" className={buttonVariants({ variant: "ghost" })}>
          トップ
        </Link>
            <Link href="/mypage" className={buttonVariants({ variant: "ghost" })}>
              マイページ
            </Link>
            <Button
              type="button"
              onClick={handleLogout}  
            >
              ログアウト
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className={buttonVariants({ variant: "outline" })}>
              ログイン
            </Link>
            <Link href="/" className={buttonVariants()}>
              会員登録
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}