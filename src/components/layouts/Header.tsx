import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Header() {
  return(
    <header className="mx-auto flex w-full max-w-5xl flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link href="/" className="text-2xl font-bold">
        Next
      </Link>
      <nav className="flex flex-wrap items-center gap-2" aria-label="メインメニュー">
        <Link href="/posts" className={buttonVariants({ variant: "ghost" })}>
          トップ
        </Link>
        <Link href="/mypage" className={buttonVariants({ variant: "ghost" })}>
          マイページ
        </Link>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>
          ログイン
        </Link>
        <Link href="/" className={buttonVariants()}>
          会員登録
        </Link>
      </nav>
    </header>
  )
}