import { posts } from "./testdata/posts"
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
       <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border p-4"
          >
            <Link href={`/posts/${post.id}`}>
             <h2 className="text-lg font-bold">{post.title}</h2>
            </Link>
            <p className="mt-2 ">{post.content}</p>

            <p className="mt-3 text-right">
              {post.createdAt}
            </p>
          </article>
        ))}
      </div>
    </main>
  )
}