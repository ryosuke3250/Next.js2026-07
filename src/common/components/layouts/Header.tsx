import Link from "next/link";

export default function Header() {
  return(
    <header>
      <Link href="/">
        Next
      </Link>
      <nav>
        <Link href="/">トップ</Link>
        <Link href="/">ログイン</Link>
        <Link href="/">会員登録</Link>
      </nav>
    </header>
  )
}