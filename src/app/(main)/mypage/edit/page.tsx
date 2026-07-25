import Input from "@/src/components/ui/Input";
import Link from "next/link";

export default function MyPage() {
 return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/mypage"
          className="border px-4 py-2"
        >
          一覧に戻る
        </Link>
      </div>

      <div className="space-y-5 border p-6 ">
        <div>
          <label htmlFor="name" className="flex block">名前</label>
          <Input id="name" className="border p-2"/>
        </div>

        <div>
          <label htmlFor="email" className="flex block">メールアドレス</label>
          <Input className="mt-1 font-medium"/>
        </div>

        <div>
          <label htmlFor="content" className="flex block">自己紹介</label>
          <Input className="mt-1 font-medium"/>  
        </div>
      </div>
    </main>
  );
}