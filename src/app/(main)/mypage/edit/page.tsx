import Link from "next/link";

export default function EditMyPage() {
  return (
    <main className="mx-auto w-full p-6">
      <Link href="../mypage" className="border">戻る</Link>
    </main>
  );
}