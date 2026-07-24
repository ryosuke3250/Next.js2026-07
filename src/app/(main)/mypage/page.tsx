import Link from "next/link";

export default function MyPage() {
 return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">マイページ</h1>

        <Link
          href="/mypage/edit"
          className="border px-4 py-2 "
        >
          編集
        </Link>
      </div>

      <div className="space-y-5 border p-6 ">
        <div>
          <p>名前</p>
          <p className="mt-1 font-medium">内城諒祐</p>
        </div>

        <div>
          <p>メールアドレス</p>
          <p className="mt-1 font-medium">aaaaa@example.com</p>
        </div>

        <div>
          <p>自己紹介</p>
          <p className="mt-1 leading-7">
            テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト。
          </p>
        </div>
      </div>
    </main>
  );
}