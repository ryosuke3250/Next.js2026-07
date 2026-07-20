import Link from "next/link";

export default function Header() {
  return(
    <header className="flex items-center justify-between mx-5 py-3 border">
      <Link href="/" className="px-5 text-2xl font-bold">
        Next
      </Link>
      <nav className="px-5">
        <Link href="/posts" className="pr-5 ">トップ</Link>
        <Link href="/login" className="pr-5">ログイン</Link>
        <Link href="/" className="pr-5">会員登録</Link>
      </nav>
    </header>
  )
}