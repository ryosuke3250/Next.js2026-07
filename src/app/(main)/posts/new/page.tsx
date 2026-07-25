import Link from "next/link";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

export default function NewPostPage(){
  return(
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">新規投稿</h1>

        <Link href="/posts" className="border px-4 py-2">
          一覧へ
        </Link>
      </div>

      <form className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block">
            タイトル
          </label>

          <Input
            id="title"
            name="title"
            type="text"
            placeholder="タイトルを入力"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block">
            投稿内容
          </label>

          <textarea
            id="content"
            name="content"
            placeholder="投稿内容を入力"
            className="min-h-40 w-full border p-2"
          />
        </div>

        <div className="text-center">
          <Button type="submit">投稿する</Button>
        </div>
      </form>
    </main>
  )
}