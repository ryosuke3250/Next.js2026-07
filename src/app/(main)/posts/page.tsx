import Link from "next/link"
export default function PostsPage(){
  return(
    <main className="mx-auto w-full max-w-2xl p-6">
      <div  className="flex item-center justify-between mb-4">
        <h1 className="text-center font-bold text-2xl">投稿一覧</h1>
        <Link 
          href="/posts/new"
          className="border px-4 py-2"
        >
          新規登録
        </Link>
      </div>
      <div className="space-y-5">
        <div className="border p-4 ">
          <h2 className="text-lg">サンプルデータ</h2>
          <p>投稿内容の表示</p>
        </div>
        <div className="border p-4 ">
          <h2 className="text-lg">サンプルデータ</h2>
          <p>投稿内容の表示</p>
        </div>
        <div className="border p-4 ">
          <h2 className="text-lg">サンプルデータ</h2>
          <p>投稿内容の表示</p>
        </div>
        <div className="border p-4 ">
          <h2 className="text-lg">サンプルデータ</h2>
          <p>投稿内容の表示</p>
        </div>

      </div>
    </main>
  )
}